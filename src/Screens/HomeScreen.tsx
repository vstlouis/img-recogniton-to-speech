import React, { useRef, useCallback, useEffect } from "react";
import { View } from "react-native";
import { observer } from "mobx-react";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { Camera } from "expo-camera";
import { styles } from "../styles";
import * as Speech from "expo-speech";
import { delay, predict, translateTextTo, fashionImg } from "../utils";
import { CameraMenu, Snackbar, useStore } from "../components";

// The main screen for our application
export const HomeScreen = observer(() => {
  const store = useStore();
  const camera = useRef(null);
  // Trigger the Snackbar if something fails
  const somethingWentWrong = useCallback(async (msg: string) => {
    store.setSnackbarMessage(msg);
    await delay(3000);
    store.clearSnackbar();
  }, []);
  // Clear our predictions when we are done or if we hit a failure
  const resetPrediction = useCallback(() => {
    store.setPrediction({ name: "", value: 0 });
    store.setTranslation("");
  }, []);

  // When users take a photo find the predictions and then generate text to speech
  const takePicture = async () => {
    store.setLoader(true);
    let predictions;

    try {
      // take the photo
      const photo = await camera.current.takePictureAsync({ base64: true });
      predictions = await predict(photo.base64);
    } catch {
      // Taking photos does not work on simulators so this is just a stub for testing
      // This would be handled differently but
      predictions = await predict(fashionImg);
    }
    try {
      // We could not find a prediction for the photo that was taken
      if (!predictions) {
        somethingWentWrong("Unable to find any identify your photo, try again!");
        store.setLoader(false);
        return;
      }
      // Lets use the first one for now
      const [prediction] = predictions;
      // ste the prediction on the store
      store.setPrediction(prediction);
      // Translate the text to our selected language of choice
      const translation = await translateTextTo(prediction.name, store.translateTo);
      // once we translate set it on the store
      store.setTranslation(translation);
      // Stop loading here so that we can display the text
      store.setLoader(false);
      // Your phone speaks!
      Speech.speak(translation, { language: store.translateTo });
      // wait 5 seconds so that the user can at least visualize / remember what it said
      await delay(5000);
    } catch (err) {
      // catch any errors
      somethingWentWrong("Unable to complete your request");
      store.setLoader(false);
    } finally {
      // clean up when we are done
      resetPrediction();
    }
  };
  useEffect(() => {
    (async () => {
      // Request camera permissions on app load
      const { status } = await Camera.requestPermissionsAsync();
      store.setHasPermission(status === "granted");
    })();
  }, []);

  // if we dont have permissions show nothing
  if (store.hasPermission === null) {
    return <View />;
  }

  // If we dont have access to the camera display this message
  if (store.hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    // Set the camera and its ref
    <Camera ref={camera} style={styles.preview} type={Camera.Constants.Type.back}>
      {/* Display the top CameraMenu */}
      <CameraMenu />

      {/* Loading Spinner */}
      <View style={[styles.container]}>
        <ActivityIndicator animating={store.loadingVisible} style={[styles.activityIcon]} size="large" />
      </View>

      {/* If we have a translation show it */}
      {store.translation ? (
        <View style={styles.Concept}>
          <Text style={styles.translationText}>{store.translation}</Text>
        </View>
      ) : null}

      {/* If we have prediction data show it */}
      {store.predictionName ? (
        <View style={styles.Concept}>
          <Text style={styles.englishText}>{`${store.predictionName} ${store.predictionValue}`}</Text>
        </View>
      ) : null}

      {/* Display the Capture button  */}
      <View style={[{ height: 70 }]}>
        <Button
          icon="camera"
          mode="contained"
          onPress={takePicture}
          disabled={store.loadingVisible || store.snackbarVisible}
        >
          Capture
        </Button>
      </View>

      {/* Display the Snackbar */}
      <Snackbar />
    </Camera>
  );
});
