import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

var screen = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;
export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      password: "",
      user: "",
      loginstate: ""
    };
  }
  onPress() {
    alert("sup bitch");
  }
  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.profilepicWrap} onPress={this.onPress}>
          <Image
            style={styles.profilepic}
            source={require("../pictures/face.jpg")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20
  },
  profilepicWrap: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderColor: "rgba(0,0,0,0.4)",
    borderWidth: 16
  },
  profilepic: {
    flex: 1,
    width: null,
    alignSelf: "stretch",
    borderRadius: 100,
    borderColor: "#fff",
    borderWidth: 4
  },
  name: {
    marginTop: 20,
    fontSize: 23,
    fontWeight: "400",
    color: "black"
  },
  school: {
    fontSize: 18,
    color: "black",
    fontWeight: "300",
    fontStyle: "italic"
  }
});
