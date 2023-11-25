import { NativeBaseProvider } from "native-base";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, Text, Clipboard } from "react-native";
import { Modal } from "native-base";
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

  const handlePress = (value: string) => {
    if (displayValue === "0") return setDisplayValue(value);
    setDisplayValue(displayValue + value);
  };

  const handleDecimalPress = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

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



  return (
    <NativeBaseProvider>
      <View
        style={[
          styles.container,
          mode !== ScreenOrientation.Orientation.PORTRAIT_UP
            ? styles.containerLandscape
            : null,
        ]}
      >
        <StatusBar style="light" />
        <SafeAreaView style={{ width: "100%" }}>
          <Text style={styles.computedValue}>{displayValue}</Text>

          <Modal onClose={() => setShowHistory(false)} isOpen={showHistory}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: "60%",
                backgroundColor: "#fff",
                height: "60%",
                padding: 12,
                overflow: "scroll",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>History</Text>
              {history.map((record, index) => (
                <Text key={index}>
                  {record.expression} = {record.result}
                </Text>
              ))}
            </View>
          </Modal>
          <Row>
            <Button
              mode={mode}
              value="C"
              style="secondary"
              onPress={handleClearPress}
            />
            <Button
              mode={mode}
              value="+/-"
              style="secondary"
              onPress={() => handlePress("+/-")}
            />
            <Button
              mode={mode}
              value="%"
              style="secondary"
              onPress={() => handlePress("%")}
            />
            <Button
              mode={mode}
              value="/"
              style="accent"
              onPress={() => handlePress("/")}
            />
          </Row>
          <Row>
            <Button mode={mode} value="7" onPress={() => handlePress("7")} />
            <Button mode={mode} value="8" onPress={() => handlePress("8")} />
            <Button mode={mode} value="9" onPress={() => handlePress("9")} />
            <Button
              mode={mode}
              value="x"
              style="accent"
              onPress={() => handlePress("x")}
            />
          </Row>
          <Row>
            <Button mode={mode} value="4" onPress={() => handlePress("4")} />
            <Button mode={mode} value="5" onPress={() => handlePress("5")} />
            <Button mode={mode} value="6" onPress={() => handlePress("6")} />
            <Button
              mode={mode}
              value="-"
              style="accent"
              onPress={() => handlePress("-")}
            />
          </Row>
          <Row>
            <Button mode={mode} value="1" onPress={() => handlePress("1")} />
            <Button mode={mode} value="2" onPress={() => handlePress("2")} />
            <Button mode={mode} value="3" onPress={() => handlePress("3")} />
            <Button
              mode={mode}
              value="+"
              style="accent"
              onPress={() => handlePress("+")}
            />
          </Row>
          <Row>
            <Button mode={mode} value="0" onPress={() => handlePress("0")} />
            <Button mode={mode} value="." onPress={handleDecimalPress} />
            <Button
              mode={mode}
              value="="
              style="accent"
              onPress={handleEqualsPress}
            />
          </Row>
          <Row>
            <Button mode={mode} value="Paste" onPress={handlePastePress} />
            <Button mode={mode} value="Copy Result" onPress={handleCopyPress} />
          </Row>
          <Row>
            <Button
              mode={mode}
              value={"History"}
              onPress={() => setShowHistory(true)}
            />
            <Button
              mode={mode}
              value={
                mode === ScreenOrientation.Orientation.PORTRAIT_UP
                  ? "Portrait"
                  : "Landscape"
              }
              onPress={handleLandscapeMode}
            />
          </Row>
        </SafeAreaView>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#202020",
    flexDirection: "column",
  },
  containerLandscape: {
    flexDirection: "row",
  },

  computedValue: {
    color: "#fff",
    fontSize: 40,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
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
