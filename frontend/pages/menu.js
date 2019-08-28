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
import MenuComp from "../components/menu.js";
import { Actions } from "react-native-router-flux";
//import { createStore } from "redux";
//import { Provider } from "react-redux";

//import { connect } from "react-redux";

var screen = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      mylatitude: 0,
      mylongitude: 0,
      data: [],
      username: ""
    };
  }

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
          source={require("../pictures/edit3.jpg")}
        >
          <Image
            style={styles.image}
            source={require("../pictures/logo.png")}
          />

          <MenuComp {...this.state} />
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
  },
  image: {
    width: 0.4135 * screen,
    height: 0.4135 * screen,
    marginVertical: realheight * 0.0731
  }
});
