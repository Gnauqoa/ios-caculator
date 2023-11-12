import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const Row = ({ children }: { children: any }) => (
  <View style={styles.row}>{children}</View>
);

// ADDED
interface IButton {
  value: string;
  style?: "secondary" | "accent" | "double";
}
const Button = ({ value, style }: IButton) => {
  const btnStyles: any[] = [styles.btn];
  const txtStyles: any[] = [styles.btnText];
  if (style === "secondary") {
    btnStyles.push(styles.btnSecondary);
    txtStyles.push(styles.btnTextSecondary);
  }
  if (style === "accent") {
    btnStyles.push(styles.btnAccent);
  }
  if (style === "double") {
    btnStyles.push(styles.btnDouble);
  }
  return (
    <TouchableOpacity style={btnStyles} onPress={() => console.log(value)}>
      <Text style={txtStyles}>{value}</Text>
    </TouchableOpacity>
  );
};

// BUTTONS ADDED
export default function App() {
  const computedValue = 123456.23;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView>
        <Text style={styles.computedValue}>
          {computedValue.toLocaleString()}
        </Text>

        <Row>
          <Button value="C" style="secondary" />
          <Button value="+/-" style="secondary" />
          <Button value="%" style="secondary" />
          <Button value="/" style="accent" />
        </Row>
        <Row>
          <Button value="7" />
          <Button value="8" />
          <Button value="9" />
          <Button value="x" style="accent" />
        </Row>
        <Row>
          <Button value="4" />
          <Button value="5" />
          <Button value="6" />
          <Button value="-" style="accent" />
        </Row>
        <Row>
          <Button value="1" />
          <Button value="2" />
          <Button value="3" />
          <Button value="+" style="accent" />
        </Row>
        <Row>
        <Button value="0" style="double" />
          <Button value="." />
          <Button value="=" style="accent" />
        </Row>
      </SafeAreaView>
    </View>
  );
}
const BTN_MARGIN = 5;
const screen = Dimensions.get("window");
const buttonWidth = screen.width / 4 - BTN_MARGIN * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end",
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

  btn: {
    backgroundColor: "#333333",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: BTN_MARGIN,
    borderRadius: 100,
    height: buttonWidth,
  },
  btnSecondary: {
    backgroundColor: "#a6a6a6",
  },
  btnTextSecondary: {
    color: "#060606",
  },
  btnAccent: {
    backgroundColor: "#f09a36",
  },
  btnDouble: {
    alignItems: "flex-start",
    flex: 0,
    width: buttonWidth * 2 + BTN_MARGIN * 2,
    paddingLeft: buttonWidth / 2 - BTN_MARGIN * 1.5,
  },
});
