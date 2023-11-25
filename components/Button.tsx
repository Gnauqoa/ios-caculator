import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
const BTN_MARGIN = 5;

interface IButton {
  value: string;
  style?: "secondary" | "accent" | "double";
  onPress: () => void;
  mode: number;
}
const Button = ({ value, style, onPress, mode }: IButton) => {
  const { height, width } = useWindowDimensions();
  const isLandScape = mode !== ScreenOrientation.Orientation.PORTRAIT_UP;
  const buttonWidth = isLandScape
    ? width / 4 - BTN_MARGIN * 2
    : width / 4 - BTN_MARGIN * 2;
  const buttonHeight = isLandScape
    ? height / 9 - BTN_MARGIN * 2
    : height / 8 - BTN_MARGIN * 2;

  const btnStyles: any[] = [
    styles.btn,
    { width: buttonWidth, height: buttonHeight },
  ];
  const txtStyles: any[] = [styles.btnText];
  if (style === "secondary") {
    btnStyles.push(styles.btnSecondary);
    txtStyles.push(styles.btnTextSecondary);
  }
  if (style === "accent") {
    btnStyles.push(styles.btnAccent);
  }
  return (
    <TouchableOpacity style={[btnStyles]} onPress={onPress}>
      <Text style={txtStyles}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});


export default Button;