import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";

var screen = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;

export default class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      username: "",
      loginstate: ""
    };
  }

  submit() {
    const user = {
      email: this.state.username,
      password: this.state.password
    };
    let answer = "";

    fetch("http://192.168.2.45/backend/public/api/store", {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(response =>
        this.setState({
          loginstate: response.message
        })
      )
      .catch(error => console.error("error:", error));

    //if (this.login == "Success") {
    // Actions.menu();
    //}
  }

  render() {
    if (this.state.loginstate == "DENIED") {
      alert("Λάθος στοιχεία");
      this.setState({
        loginstate: ""
      });
    }
    if (this.state.loginstate == "Success") {
      Actions.replace("prof", { username: this.state.username });
      Actions.replace("maps", { username: this.state.username });
      Actions.replace("label", { username: this.state.username });
      //Actions.jump("label");
      this.setState({
        loginstate: ""
      });
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={"Username"}
          placeholderTextColor="white"
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          secureTextEntry={true}
          placeholder={"Password"}
          placeholderTextColor="white"
          onChangeText={password => this.setState({ password })}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
          <Text style={styles.buttonText}>Log in</Text>
          <Icon style={styles.icon} name="sign-in" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    top: (5 / 683.4285) * realheight
  },
  inputBox: {
    width: (330 / 411.42) * screen,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 25,
    paddingHorizontal: (16 / 411.42) * screen,
    fontSize: (22 / 411.42) * screen,
    marginVertical: (10 / 683.4285) * realheight
  },
  buttonText: {
    fontSize: (25 / 411.42) * screen,
    color: "rgba(250,250,250,1)",
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: (12 / 411.42) * screen
  },
  button: {
    width: (130 / 411.42) * screen,
    height: (70 / 683.4285) * realheight,
    borderRadius: 30,
    backgroundColor: "rgba(227,139,16,0.7)",
    marginVertical: (10 / 683.4285) * realheight,
    paddingVertical: (12 / 683.4285) * realheight,
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    paddingHorizontal: (1 / 411.42) * screen,
    paddingVertical: (5 / 683.4285) * realheight
  }
});
