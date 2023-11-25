import { NativeBaseProvider } from "native-base";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Clipboard,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Button from "./components/Button";
import calculate from "./utils/calculate";

type HistoryRecord = {
  expression: string;
  result: string;
};

const Row = ({ children }: { children: any }) => (
  <View style={styles.row}>{children}</View>
);

export default function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [mode, setMode] = useState(1);
  const [history, setHistory] = useState<HistoryRecord[]>([]); // State variable to store the history
  const [showHistory, setShowHistory] = useState(false); // State variable to control the visibility of the history modal

  const handleEqualsPress = () => {
    setDisplayValue(calculate(displayValue).toString());
  };

  const handleClearPress = () => {
    setDisplayValue("0");
  };

  const handleCopyPress = () => {
    Clipboard.setString(displayValue);
  };

  const handlePastePress = async () => {
    const clipboardContent = await Clipboard.getString();
    setDisplayValue(clipboardContent);
  };

  const handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const input = event.nativeEvent.text;
    const validInput = input.replace(/[^0-9+\-*/%÷×]/g, "");
    setDisplayValue(validInput);
  };

  const handleLandscapeMode = async () => {
    const mode = await ScreenOrientation.getOrientationAsync();
    if (mode === ScreenOrientation.Orientation.PORTRAIT_UP) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      setMode(0);
    } else {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setMode(1);
    }
  };

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };

  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress={handleScreenPress}>
        <View
          style={[
            styles.container,
            mode !== ScreenOrientation.Orientation.PORTRAIT_UP
              ? styles.containerLandscape
              : null,
          ]}
        >
          <StatusBar />
          <SafeAreaView style={{ width: "100%" }}>
            <TextInput
              style={styles.computedValue}
              value={displayValue}
              onChange={handleChange}
            />
            <Row>
              <Button value="C" onPress={handleClearPress} />
              <Button value="=" onPress={handleEqualsPress} />
            </Row>
            <Row>
              <Button value="Copy" onPress={handleCopyPress} />
              <Button value="Paste" onPress={handlePastePress} />
            </Row>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#202020",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLandscape: {
    flexDirection: "row",
  },
  computedValue: {
    color: "#fff",
    fontSize: 40,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
  },
  btnText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "500",
  },
});
