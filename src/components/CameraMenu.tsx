import React from "react";
import { observer } from "mobx-react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Button, RadioButton, Text, Portal, Dialog } from "react-native-paper";
import { useStore } from "./StoreContext";
import languages from "../data/languages.json";
import { styles } from "../styles";

// This component sets the current language
export const CameraMenu = observer(() => {
  const store = useStore();

  const check = val => (val === store.translateTo ? "checked" : "unchecked");
  return (
    <View style={[styles.topIcons]}>
      <View style={[styles.gear]}>
        <Button mode="outlined" icon="settings" onPress={store.toggleLanguageModal}>
          {languages[store.translateTo]}
        </Button>
      </View>
      <Portal>
        <Dialog visible={store.languageModalDisplayed} onDismiss={store.toggleLanguageModal}>
          <Dialog.Title>Languages</Dialog.Title>
          <Dialog.ScrollArea>
            <Dialog.Content style={styles.dialogStlye}>
              <ScrollView>
                {Object.entries(languages).map(([value, text]) => {
                  const isChecked = check(value);
                  return (
                    <View key={value}>
                      <TouchableOpacity
                        onPress={() => store.setTranslateTo(value)}
                        style={{ flex: 1, flexDirection: "row" }}
                      >
                        <Text style={{ flex: 1 }}>{text}</Text>
                        <RadioButton status={isChecked} uncheckedColor={"gray"} value={value} />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </Dialog.Content>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button mode={"contained"} onPress={store.toggleLanguageModal}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
});
