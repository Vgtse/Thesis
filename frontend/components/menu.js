import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import { Actions } from "react-native-router-flux";
//import { connect } from "react-redux";

var screen = Dimensions.get("window").width - 20;
var realwidth = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;
export default class MenuComp extends Component {
  navigatenews() {
    Actions.rooter();
  }
  navigateevents() {
    Actions.events();
  }
  navigatefood() {
    Actions.food();
  }

  render() {
    return (
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={this.navigatenews}>
            <View style={styles.container}>
              <Text style={styles.header}>News</Text>
              <Text>Get informed about the latest news </Text>
              <Text>of Patras University</Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#455a64",
                  opacity: 1,
                  width: realwidth * 0.6076,
                  top: realheight * 0.02194
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateevents}>
            <View style={styles.container}>
              <Text style={styles.header}>Events</Text>
              <Text>Conferences,seminars,meetings,lectures </Text>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#455a64",
                  opacity: 1,
                  width: realwidth * 0.6076,
                  top: realheight * 0.02194
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigatefood}>
            <View style={styles.container}>
              <Text style={styles.header}>Food/Coffee</Text>
              <Text>Places to eat,drink coffee </Text>
              <Text>or have a snack</Text>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#455a64",
                  opacity: 1,
                  width: realwidth * 0.6076,
                  top: realheight * 0.02194
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.container}>
              <Text style={styles.header}>News</Text>
              <Text>Get informed about the latest news </Text>
              <Text>of Patras University</Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#455a64",
                  opacity: 1,
                  width: realwidth * 0.6076,
                  top: realheight * 0.02194
                }}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(227,139,16,0.8)",
    height: realheight * 0.4682,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(227,139,16,0.8)"
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: realheight * 0.1682,
    width: screen
  },
  header: {
    bottom: realheight * 0.02194,
    fontSize: (25 / 411.42) * realwidth,
    fontWeight: "400",
    color: "black"
  }
});
