import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Alert
} from "react-native";
import { Actions } from "react-native-router-flux";
var screen = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;
export default class Foodchoise extends React.Component {
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
  constructor() {
    super();
    this.state = {
      coffeebuildingSource: [],
      foodbuildingSource: [],
      selected: [],
      wantedid: "",
      data: [],
      coffeedata: []
    };
  }

  componentDidMount() {
    fetch("http://192.168.2.45/backend/public/api/foods")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            foodbuildingSource: responseJson.foods,
            data: responseJson.foods.map(function(item) {
              return {
                id: item.building_id,
                name: item.building_name,
                scope: item.building_scope
              };
            })
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
    fetch("http://192.168.2.45/backend/public/api/coffees")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            coffeebuildingSource: responseJson.coffees,
            coffeedata: responseJson.coffees.map(function(item) {
              return {
                id: item.building_id,
                name: item.building_name,
                scope: item.building_scope
              };
            })
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ width: 100 + "%", height: 100 + "%", alignItems: "center" }}
          source={require("../pictures/parkoeit.jpg")}
        >
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                Actions.foods({
                  data: this.state.foodbuildingSource
                })
              }
            >
              <Text style={styles.buttonText}>Φαγητό</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                Actions.foods({
                  data: this.state.coffeebuildingSource
                })
              }
            >
              <Text style={styles.buttonText}>Καφές</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttons: { marginTop: (80 / 683.4285) * realheight, flexDirection: "column" },
  button: {
    marginVertical: (30 / 683.4285) * realheight,
    backgroundColor: "rgba(227,139,16,0.9)",
    width: (200 / 411.42) * screen,
    height: (100 / 683.4285) * realheight,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#455a64"
  },
  buttonText: {
    fontSize: (30 / 411.42) * screen,
    color: "black",
    alignSelf: "center",
    paddingTop: (20 / 683.4285) * realheight
  }
});
