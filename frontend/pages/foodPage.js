import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
  BackHandler,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
var screen = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;
import { Actions } from "react-native-router-flux";
import StarRating from "react-native-star-rating";
export default class FoodPage extends React.Component {
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
    this.state = {
      showDetails: true,
      showComments: false
    };
  }
  operationDetails() {
    this.setState({
      showComments: false,
      showDetails: true
    });
  }
  operationComments() {
    this.setState({
      showComments: true,
      showDetails: false
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{
            width: 100 + "%",
            height: 100 + "%",
            alignItems: "center"
          }}
          source={require("../pictures/parkoeit.jpg")}
        >
          <Text style={styles.title}>{this.props.food}</Text>

          {this.state.showDetails ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                width: screen,
                marginRight: (100 / 411.42) * screen,
                // marginTop: (40 / 683.4285) * realheight,
                marginBottom: 0
              }}
            >
              <View style={styles.buttons1}>
                <TouchableOpacity onPress={() => this.operationDetails()}>
                  <Text style={styles.buttonsText}>Λεπτομέρειες</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttons4}>
                <TouchableOpacity onPress={() => this.operationComments()}>
                  <Text style={styles.buttonsText}>Σχόλια</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {this.state.showComments ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                width: screen,
                marginRight: (100 / 411.42) * screen,
                //  marginTop: (40 / 683.4285) * realheight,
                marginBottom: 0
              }}
            >
              <View style={styles.buttons3}>
                <TouchableOpacity onPress={() => this.operationDetails()}>
                  <Text style={styles.buttonsText}>Λεπτομέρειες</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttons2}>
                <TouchableOpacity onPress={() => this.operationComments()}>
                  <Text style={styles.buttonsText}>Σχόλια</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          <View style={styles.box}>
            <View style={styles.canvas}>
              <Image
                style={styles.canvasContainer}
                source={require("../pictures/map.jpg")}
              />
            </View>
            <View style={styles.star}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={this.props.rating}
                starSize={30}
              />
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "#455a64",
                opacity: 1,
                width: (300 / 411.42) * screen,
                top: (30 / 683.4285) * realheight
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                width: screen
              }}
            >
              <View
                style={{
                  width: screen / 2 - 40,
                  marginTop: (40 / 683.4285) * realheight
                }}
              >
                <Text numberOfLines={3} style={styles.details}>
                  {this.props.details}
                </Text>
              </View>
              <TouchableOpacity onPress={() => Actions.menu()}>
                <View
                  style={{
                    width: (150 / 411.42) * screen,
                    height: (150 / 683.4285) * realheight,
                    marginTop: (40 / 683.4285) * realheight
                  }}
                >
                  <Image
                    style={styles.image_canvas}
                    source={require("../pictures/map.jpg")}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                width: screen,
                marginTop: (140 / 683.4285) * realheight
              }}
            >
              <Text
                style={{
                  fontSize: (24 / 411.42) * screen,
                  color: "black"
                }}
              >
                Βαθμολόγησε!
              </Text>
              <View style={styles.star}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={this.props.rating}
                  starSize={28}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttons1: {
    backgroundColor: "rgba(255,255,255,1)",
    //marginTop: (10 / 683.4285) * realheight,
    marginHorizontal: (10 / 411.42) * screen,
    height: (35 / 683.4285) * realheight,
    width: (170 / 411.42) * screen,

    borderRadius: 25,
    borderColor: "rgba(255,255,255,1)"
  },
  buttons2: {
    backgroundColor: "rgba(255,255,255,1)",
    //marginTop: (10 / 683.4285) * realheight,
    marginHorizontal: (10 / 411.42) * screen,
    height: (35 / 683.4285) * realheight,
    width: (95 / 411.42) * screen,
    borderRadius: 20,
    borderColor: "rgba(255,255,255,1)"
  },
  buttons3: {
    backgroundColor: "gray",
    //marginTop: (10 / 683.4285) * realheight,
    marginHorizontal: (10 / 411.42) * screen,
    height: (35 / 683.4285) * realheight,
    width: (170 / 411.42) * screen,
    borderRadius: 25,
    borderColor: "gray"
  },
  buttons4: {
    backgroundColor: "gray",
    //marginTop: (10 / 683.4285) * realheight,
    marginHorizontal: (10 / 411.42) * screen,
    height: (35 / 683.4285) * realheight,
    width: (95 / 411.42) * screen,
    borderRadius: 20,
    borderColor: "gray"
  },
  buttonsText: {
    fontSize: (22 / 411.42) * screen,
    alignSelf: "center"
  },
  title: {
    fontSize: (30 / 411.42) * screen,
    color: "black"
  },
  box: {
    marginTop: 0,
    width: screen - 23,
    height: (455 / 683.4285) * realheight,
    backgroundColor: "rgba(228,156,31,0.9)",
    marginBottom: (35 / 683.4285) * realheight,
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(228,156,31,0.9)"
  },
  canvasContainer: {
    flex: 1,
    alignSelf: "stretch",
    width: null,
    marginVertical: (10 / 683.4285) * realheight,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 2
  },
  canvas: {
    width: (200 / 411.42) * screen,
    height: (200 / 683.4285) * realheight,
    alignSelf: "center"
  },
  star: {
    width: (50 / 411.42) * screen,
    height: (15 / 683.4285) * realheight,
    marginTop: (5 / 683.4285) * realheight,
    marginRight: (85 / 411.42) * screen
  },
  details: {
    fontSize: (20 / 411.42) * screen,
    color: "black"
  },
  image_canvas: {
    flex: 1,
    alignSelf: "stretch",
    width: null,
    marginVertical: (10 / 683.4285) * realheight,
    borderRadius: 25,
    borderColor: "#fff",
    borderWidth: 1
  }
});
