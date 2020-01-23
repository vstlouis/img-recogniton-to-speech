// Simple store that gets converted to a localStore for mobx
export function createStore() {
  return {
    translateTo: "zh",
    translation: "",
    predictionName: "",
    predictionValue: 0,
    snackbarMessage: "",
    hasPermission: null,
    loadingVisible: false,
    helpDisplayed: false,
    languageModalDisplayed: false,
    get snackbarVisible() {
      return this.snackbarMessage.length > 0;
    },
    get prediction() {
      if (this.predictionName && this.predictionValue) {
        return {
          name: this.predictionName,
          value: this.predictionValue,
        };
      }
      return null;
    },
    toggleLanguageModal() {
      this.languageModalDisplayed = !this.languageModalDisplayed;
    },
    setSnackbarMessage(msg: string) {
      this.snackbarMessage = msg;
    },
    setHasPermission(val: boolean) {
      this.hasPermission = val;
    },
    setLoader(val: boolean) {
      this.loadingVisible = val;
    },
    setPrediction(prediction) {
      this.predictionName = prediction.name;
      this.predictionValue = Number.parseFloat(prediction.value);
    },
    setTranslation(translation) {
      this.translation = translation;
    },
    setTranslateTo(lang) {
      this.translateTo = lang;
    },
    clearSnackbar() {
      this.setSnackbarMessage("");
    },
  };
}

// export the type so we can use TypeScript <3
export type TStore = ReturnType<typeof createStore>;
