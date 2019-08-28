import MapView, { Polyline, Marker } from "react-native-maps";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Alert
} from "react-native";
import React, { Component } from "react";
import PolyLine from "@mapbox/polyline";
import Icon from "react-native-vector-icons/FontAwesome";
var screen = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;

const api = "AIzaSyAttxQ9oTgBtCQLWJ9TmftEn3AixDBNWCc";

export default class Maps extends React.Component {
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    navigator.geolocation.clearWatch(this.watchid);
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
    this.state = {
      latitude: 38.287243,
      longitude: 21.788197,
      error: null,
      pointCoords: [],
      showDriving: true,
      showWalking: false,
      yo2: 21.791285,
      yo1: 38.288804
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          yo1: 38.288804,
          yo2: 21.791285,

          error: null
        });
        let mad = "driving";

        this.watchid = navigator.geolocation.watchPosition(current =>
          this.setState({
            latitude: current.coords.latitude,
            longitude: current.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            yo1: 38.288804,
            yo2: 21.791285,

            error: null
          })
        );
        this.getRouteDirections(mad);
      },
      error => this.setState({ error: error.message })
    );
  }

  operationWalking() {
    this.setState({
      showDriving: false,
      showWalking: true
    });
    const walking = "walking";
    this.getRouteDirections(walking);
  }
  operationDriving() {
    this.setState({
      showDriving: true,
      showWalking: false
    });
    const driving = "driving";
    this.getRouteDirections(driving);
  }
  async getRouteDirections(walking) {
    try {
      let method = walking;

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${
          this.state.latitude
        },${this.state.longitude}&destination=${this.state.yo1},${
          this.state.yo2
        }&mode=${method}&key=AIzaSyAttxQ9oTgBtCQLWJ9TmftEn3AixDBNWCc
        `
      );

      const json = await response.json();
      const points = PolyLine.decode(json.routes[0].overview_polyline.points);
      const pointCoords = points.map(point => {
        return { latitude: point[0], longitude: point[1] };
      });
      this.setState({ pointCoords });
      this.map.fitToCoordinates(pointCoords, {
        edgePadding: { top: 20, bottom: 20, left: 20, right: 20 }
      });
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    let marker = null;
    if (this.state.pointCoords.length > 1) {
      marker = (
        <Marker
          coordinate={this.state.pointCoords[this.state.pointCoords.length - 1]}
        />
      );
    }

    return (
      <View style={styles.container}>
        <MapView
          ref={map => (this.map = map)}
          style={styles.map}
          region={{
            latitude: 38.287243,
            longitude: 21.788197,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          showsUserLocation={true}
        >
          {this.state.showWalking ? (
            <Polyline
              coordinates={this.state.pointCoords}
              strokeWidth={2}
              strokeColor="blue"
            />
          ) : null}
          {this.state.showDriving ? (
            <Polyline
              coordinates={this.state.pointCoords}
              strokeWidth={2}
              strokeColor="red"
            />
          ) : null}
          {marker}
        </MapView>
        <View style={styles.main}>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => this.operationWalking()}>
              {this.state.showDriving ? (
                <Icon style={styles.icon} name="male" size={32} color="white" />
              ) : null}
              {this.state.showWalking ? (
                <Icon
                  style={styles.icon}
                  name="male"
                  size={32}
                  color="orange"
                />
              ) : null}
            </TouchableOpacity>
          </View>

          <View style={styles.secondbox}>
            <TouchableOpacity onPress={() => this.operationDriving()}>
              {this.state.showWalking ? (
                <Icon style={styles.icon} name="car" size={30} color="white" />
              ) : null}
              {this.state.showDriving ? (
                <Icon style={styles.icon} name="car" size={30} color="orange" />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  main: {
    top: 200
  },
  box: {
    backgroundColor: "#455a64",
    alignItems: "center",
    width: 70,
    height: 50
  },
  secondbox: {
    backgroundColor: "#455a64",
    alignItems: "center",
    width: 70,
    height: 50,
    top: 10
  },

  textbutton: {
    fontSize: 24,
    color: "white"
  },
  icon: {
    paddingTop: 8
  },
  arrow: {
    paddingTop: 4
  }
});
