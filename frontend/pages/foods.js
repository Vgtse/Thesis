import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  FlatList,
  Dimensions,
  Picker,
  TouchableOpacity,
  BackHandler,
  Alert
} from "react-native";
import StarRating from "react-native-star-rating";
import { getDistance } from "geolib";
import { Actions } from "react-native-router-flux";

var screen = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;
export default class Foods extends React.Component {
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
  constructor(props) {
    super(props);
    this.state = { isLoading: true, mylatitude: 0, mylongitude: 0, data: [] };
  }

  renderItem = ({ item }) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          mylatitude: position.coords.latitude,
          mylongitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message })
    );

    let distance = getDistance(
      { latitude: item.latitude, longitude: item.longitude },
      { latitude: this.state.mylatitude, longitude: this.state.mylongitude }
    );

    return (
      <View key={item.building_id} style={styles.box}>
        <TouchableOpacity
          onPress={() =>
            Actions.foodpage({
              food: item.building_name,
              id: item.building_id,
              details: item.details,
              latitude: item.latitude,
              longitude: item.longitude,
              images: item.images_path,
              rating: item.rating
            })
          }
        >
          <View
            styles={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text style={styles.boxText}>{item.building_name}</Text>
            <View style={styles.star}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={item.rating}
                starSize={20}
              />
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.boxdetails}>{item.details}</Text>
            </View>
            <View>
              <Text style={styles.boxdetails}>{distance} meters</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ width: 100 + "%", height: 100 + "%", alignItems: "center" }}
          source={require("../pictures/parkoeit.jpg")}
        >
          <FlatList
            style={{ marginTop: (30 / 683.4285) * realheight }}
            data={this.props.data}
            renderItem={this.renderItem}
          />
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
  box: {
    width: screen,
    backgroundColor: "rgba(227,139,16,0.9)",
    height: (120 / 683.4285) * realheight,
    marginBottom: (25 / 683.4285) * realheight,
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
    borderColor: "rgba(227,139,16,0.9)"
  },
  boxText: {
    fontSize: (26 / 411.42) * screen,
    color: "black",
    marginLeft: (5 / 411.42) * screen
  },
  star: {
    width: (50 / 411.42) * screen,
    height: (15 / 683.4285) * realheight,
    marginLeft: (5 / 411.42) * screen,
    marginTop: (5 / 683.4285) * realheight
  },
  boxdetails: {
    fontSize: (14 / 411.42) * screen,
    marginTop: (7 / 683.4285) * realheight,
    marginLeft: (5 / 411.42) * screen
  }
});
