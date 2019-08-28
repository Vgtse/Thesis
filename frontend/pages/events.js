import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  Dimensions,
  BackHandler,
  Alert
} from "react-native";
import Event from "../components/event.js";
var screen = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;

export default class Events extends React.Component {
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
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ width: 100 + "%", height: 100 + "%", alignItems: "center" }}
          source={require("../pictures/dionysios.jpg")}
        >
          <Event />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  }
});
