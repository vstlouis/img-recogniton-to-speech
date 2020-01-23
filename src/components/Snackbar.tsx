import React from "react";
import { Snackbar as RNPSnackbar } from "react-native-paper";
import { observer } from "mobx-react";
import { useStore } from "./StoreContext";

// Snackbar component (for error notifications)
export const Snackbar = observer(() => {
  const store = useStore();
  return (
    <RNPSnackbar
      visible={store.snackbarVisible}
      onDismiss={store.clearSnackbar}
      duration={RNPSnackbar.DURATION_SHORT}
      action={{
        label: "Close",
        onPress: store.clearSnackbar,
      }}
    >
      {store.snackbarMessage}
    </RNPSnackbar>
  );
});
