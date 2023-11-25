import { NativeBaseProvider } from "native-base";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, Text, Clipboard } from "react-native";
import { Modal } from "native-base";
import Button from "./components/Button";

type HistoryRecord = {
  expression: string;
  result: string;
};

const Row = ({ children }: { children: any }) => (
  <View style={styles.row}>{children}</View>
);

export default function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState("");
  const [storedValue, setStoredValue] = useState("");
  const [mode, setMode] = useState(1);
  const [history, setHistory] = useState<HistoryRecord[]>([]); // State variable to store the history
  const [showHistory, setShowHistory] = useState(false); // State variable to control the visibility of the history modal
  const handleNumberPress = (value: string) => {
    if (displayValue === "0") {
      setDisplayValue(value);
    } else {
      setDisplayValue(displayValue + value);
    }
    if (parseFloat(displayValue) < 0) {
      setDisplayValue("-" + displayValue);
    }
  };

  const handleDecimalPress = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const handleOperatorPress = (value: string) => {
    if (value === "%") {
      const currentValue = parseFloat(displayValue);
      const result = currentValue / 100;
      setDisplayValue(result.toString());
    } else if (value === "+/-") {
      setDisplayValue((parseFloat(displayValue) * -1).toString());
    } else {
      setOperator(value);
      setStoredValue(displayValue);
      setDisplayValue("0");
    }
  };

  const handleEqualsPress = () => {
    const currentValue = parseFloat(displayValue);
    const storedValueFloat = parseFloat(storedValue);
    let result = 0;
    switch (operator) {
      case "+":
        result = storedValueFloat + currentValue;
        break;
      case "-":
        result = storedValueFloat - currentValue;
        break;
      case "x":
        result = storedValueFloat * currentValue;
        break;
      case "/":
        result = storedValueFloat / currentValue;
        break;
      default:
        break;
    }
    setDisplayValue(result.toString());
    setOperator("");
    setStoredValue("");
    const expression = `${storedValue} ${operator} ${currentValue}`;
    const historyRecord: HistoryRecord = {
      expression,
      result: result.toString(),
    };
    setHistory([...history, historyRecord]);
  };

  const handleClearPress = () => {
    setDisplayValue("0");
    setOperator("");
    setStoredValue("");
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

  const handleTrigPress = (trigFunction: string) => {
    const currentValue = parseFloat(displayValue);
    let result = 0;
    switch (trigFunction) {
      case "sin":
        result = Math.sin(currentValue);
        break;
      case "cos":
        result = Math.cos(currentValue);
        break;
      case "tan":
        result = Math.tan(currentValue);
        break;
      default:
        break;
    }
    setDisplayValue(result.toString());
  };

  const handleLogPress = () => {
    const currentValue = parseFloat(displayValue);
    const result = Math.log10(currentValue);
    setDisplayValue(result.toString());
  };

  const handleLnPress = () => {
    const currentValue = parseFloat(displayValue);
    const result = Math.log(currentValue);
    setDisplayValue(result.toString());
  };

  const handleInversePress = () => {
    const currentValue = parseFloat(displayValue);
    const result = 1 / currentValue;
    setDisplayValue(result.toString());
  };

  const handleExponentialPress = () => {
    const currentValue = parseFloat(displayValue);
    const result = Math.exp(currentValue);
    setDisplayValue(result.toString());
  };

  const handleSquarePress = () => {
    const currentValue = parseFloat(displayValue);
    const result = Math.pow(currentValue, 2);
    setDisplayValue(result.toString());
  };

  const handlePowerPress = () => {
    const currentValue = parseFloat(displayValue);
    const result = Math.pow(currentValue, parseFloat(storedValue));
    setDisplayValue(result.toString());
  };
  const handleAbsolutePress = () => {
    const currentValue = parseFloat(displayValue);
    const result = Math.abs(currentValue);
    setDisplayValue(result.toString());
  };

  const handlePiPress = () => {
    setDisplayValue(Math.PI.toString());
  };

  const handleEPress = () => {
    setDisplayValue(Math.E.toString());
  };
  const handleRadPress = () => {
    const currentValue = parseFloat(displayValue);
    const result = currentValue * (Math.PI / 180); // Convert degrees to radians
    setDisplayValue(result.toString());
  };

  const handleSquareRootPress = () => {
    const currentValue = parseFloat(displayValue);
    const result = Math.sqrt(currentValue);
    setDisplayValue(result.toString());
  };

  const isLandScape = mode !== ScreenOrientation.Orientation.PORTRAIT_UP;

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
            {isLandScape && (
              <>
                <Button mode={mode} value="rad" onPress={handleRadPress} />
                <Button mode={mode} value="√" onPress={handleSquareRootPress} />
              </>
            )}
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
              onPress={() => handleOperatorPress("+/-")}
            />
            <Button
              mode={mode}
              value="%"
              style="secondary"
              onPress={() => handleOperatorPress("%")}
            />
            <Button
              mode={mode}
              value="/"
              style="accent"
              onPress={() => handleOperatorPress("/")}
            />
          </Row>
          <Row>
            {isLandScape && (
              <>
                <Button
                  mode={mode}
                  value="sin"
                  onPress={() => handleTrigPress("sin")}
                />
                <Button
                  mode={mode}
                  value="cos"
                  onPress={() => handleTrigPress("cos")}
                />
                <Button
                  mode={mode}
                  value="tan"
                  onPress={() => handleTrigPress("tan")}
                />
              </>
            )}
            <Button
              mode={mode}
              value="7"
              onPress={() => handleNumberPress("7")}
            />
            <Button
              mode={mode}
              value="8"
              onPress={() => handleNumberPress("8")}
            />
            <Button
              mode={mode}
              value="9"
              onPress={() => handleNumberPress("9")}
            />
            <Button
              mode={mode}
              value="x"
              style="accent"
              onPress={() => handleOperatorPress("x")}
            />
          </Row>
          <Row>
            {isLandScape && (
              <>
                <Button mode={mode} value="1/x" onPress={handleInversePress} />
                <Button mode={mode} value="log" onPress={handleLogPress} />
                <Button mode={mode} value="ln" onPress={handleLnPress} />
              </>
            )}
            <Button
              mode={mode}
              value="4"
              onPress={() => handleNumberPress("4")}
            />
            <Button
              mode={mode}
              value="5"
              onPress={() => handleNumberPress("5")}
            />
            <Button
              mode={mode}
              value="6"
              onPress={() => handleNumberPress("6")}
            />
            <Button
              mode={mode}
              value="-"
              style="accent"
              onPress={() => handleOperatorPress("-")}
            />
          </Row>
          <Row>
            {isLandScape && (
              <>
                <Button
                  mode={mode}
                  value="e^x"
                  onPress={handleExponentialPress}
                />
                <Button mode={mode} value="x^2" onPress={handleSquarePress} />
                <Button mode={mode} value="x^y" onPress={handlePowerPress} />
              </>
            )}
            <Button
              mode={mode}
              value="1"
              onPress={() => handleNumberPress("1")}
            />
            <Button
              mode={mode}
              value="2"
              onPress={() => handleNumberPress("2")}
            />
            <Button
              mode={mode}
              value="3"
              onPress={() => handleNumberPress("3")}
            />
            <Button
              mode={mode}
              value="+"
              style="accent"
              onPress={() => handleOperatorPress("+")}
            />
          </Row>
          <Row>
            {isLandScape && (
              <>
                <Button mode={mode} value="π" onPress={handlePiPress} />
                <Button mode={mode} value="e" onPress={handleEPress} />
                <Button mode={mode} value="|x|" onPress={handleAbsolutePress} />
                <Button
                  mode={mode}
                  value="+/-"
                  onPress={() => handleOperatorPress("+/-")}
                />
              </>
            )}
            <Button
              mode={mode}
              value="0"
              onPress={() => handleNumberPress("0")}
            />
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
