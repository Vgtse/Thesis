import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Alert
} from "react-native";
import Logo from "../components/logo.js";
import InputSignup from "../components/inputSignup.js";
var screen = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;
import { Actions } from "react-native-router-flux";

export default class Signup extends React.Component {
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    Alert.alert(
      "Exit From App",
      "Do you want to exit from app?",
      [
        { text: "Yes", onPress: () => BackHandler.exitApp() },
        { text: "No", onPress: () => console.log("NO Pressed") }
      ],
      { cancelable: false }
    );
    return true;
  };
  signin() {
    Actions.login();
  }

  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <InputSignup />
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: "white",
            opacity: 0.4,
            width: (350 / 411.42) * screen
          }}
        />
        <View style={styles.signup}>
          <Text style={styles.textsignup}>Already have an account?</Text>
          <TouchableOpacity onPress={this.signin}>
            <Text style={styles.signinbutton}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#455a64",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  signup: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: (16 / 683.4285) * realheight,
    flexDirection: "row"
  },
  textsignup: {
    color: "rgba(255,255,255,0.7)",
    fontSize: (16 / 411.42) * screen
  },
  signinbutton: {
    color: "rgba(227,139,16,0.8)",
    fontSize: (16 / 411.42) * screen,
    fontWeight: "500"
  }
});
