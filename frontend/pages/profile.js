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
import Header from "../components/header.js";
import Bar from "../components/bar.js";
import { Actions } from "react-native-router-flux";

var screen = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;
export default class Prof extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      dataSource: [],
      email: ""
    };
  }
  componentDidMount() {
    let user = {
      email: this.props.username
    };

    fetch("http://192.168.2.45/backend/public/api/checkuser", {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(responseJson =>
        this.setState({
          dataSource: responseJson.message[0],
          username: responseJson.message[0].name,
          email: responseJson.message[0].email
        })
      )
      .catch(error => console.error("error:", error));
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
          source={require("../pictures/epiisenEdit.jpg")}
        >
          <Header {...this.state} />
          <Bar {...this.state} />
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
    width: (170 / 411.42) * screen,
    height: (170 / 683.4285) * realheight,
    marginVertical: (50 / 683.4285) * realheight
  }
});
