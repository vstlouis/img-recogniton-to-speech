import React from "react";
import { View } from "react-native";
import { observer } from "mobx-react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { styles, colors } from "./styles";
import { StoreProvider } from "./components";
import { HomeScreen } from "./Screens";

// Bootstrap our main application
export const App = observer(() => {
  return (
    <PaperProvider theme={DefaultTheme}>
      <SafeAreaProvider>
        <View style={[styles.container, { backgroundColor: colors.white }]}>
          <StoreProvider>
            <HomeScreen />
          </StoreProvider>
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
});
