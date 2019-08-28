import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from "react-native";
var screen = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;

export default class Logo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            width: (220 / 411.42) * screen,
            height: (220 / 683.4285) * realheight
          }}
          source={require("../pictures/logo.png")}
        />
        <Text style={styles.logotext}>Αpplication of Patras University</Text>
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
  logotext: {
    fontSize: (18 / 411.42) * screen,
    marginVertical: (15 / 683.4285) * realheight,
    color: "rgba(255,255,255,0.7)"
  }
});
