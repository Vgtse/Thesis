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
export default class EventPage extends React.Component {
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
    let date = String(this.props.beginning_date).split("-");
    let month = parseInt(date[1]);
    let i = 0;
    let months = [
      "Γενάρη",
      "Φλεβάρη",
      "Μάρτιου",
      "Απρίλη",
      "Μάιου",
      "Ιούνιου",
      "Ιούλιου",
      "Αύγουστου",
      "Σεπτέμβρη",
      "Οκτώβρη",
      "Νοέμβρη",
      "Δεκέμβρη"
    ];
    for (i = 0; i < 12; i++) {
      if (month == i) {
        month = months[i - 1] + " ";
      }
    }
    let day = parseInt(date[2]) + " ";
    let year = parseInt(date[0]);

    let endingdate = "";
    if (this.props.ending_date != null) {
      endingdate = " έως " + this.props.ending_date;
    }
    let endingtime = "";
    if (this.props.ending_time != null) {
      endingtime = "-" + this.props.ending_time;
    }
    let url = [];
    if (this.props.url != null) {
      urloperation = (
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(this.props.url);
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon name="globe" size={20} color={"white"} />
            <Text
              numberOfLines={1}
              style={{ fontSize: (16 / 411.42) * screen, color: "black" }}
            >
              {" "}
              {this.props.url}
            </Text>
          </View>
        </TouchableOpacity>
      );
      url = urloperation;
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{
            width: 100 + "%",
            height: 100 + "%",
            alignItems: "center"
          }}
          source={require("../pictures/2320515edit.jpg")}
        >
          <View style={styles.canvas}>
            <Image
              style={styles.canvasContainer}
              source={{ uri: this.props.image }}
            />
          </View>
          <View style={styles.files}>{url}</View>
          <View style={styles.header}>
            <Text style={styles.headerText}>{this.props.event}</Text>
            <Text style={styles.date}>
              {day}
              {month}
              {year}-{this.props.beginning_time}
              {endingdate}
              {endingtime}
            </Text>
            <Text style={styles.building}>
              {this.props.building}
              {this.props.place}
            </Text>
          </View>
          <View style={styles.containerScroll}>
            <ScrollView
              style={styles.details}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.detailsText}>{this.props.details}</Text>
            </ScrollView>
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
  header: {
    marginVertical: (10 / 683.4285) * realheight,
    backgroundColor: "rgba(228,156,31,0.9)",
    width: screen - 20,
    height: (150 / 683.4285) * realheight,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(228,156,31,0.9)"
  },
  headerText: {
    fontSize: (20 / 411.42) * screen,
    color: "black",
    fontWeight: "400",
    textAlign: "center"
  },
  date: {
    fontSize: (16 / 411.42) * screen
  },
  building: {
    fontSize: (16 / 411.42) * screen,
    color: "black"
  },
  details: {
    backgroundColor: "rgba(255,255,255,0.9)",
    width: screen - 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(227,139,16,0.9)"
  },
  containerScroll: {
    alignItems: "center",
    justifyContent: "center",
    height: (200 / 683.4285) * realheight,
    width: screen - 10
  },
  detailsText: {
    fontSize: (18 / 411.42) * screen,
    textAlign: "center",
    color: "black",
    marginTop: (10 / 683.4285) * realheight
  },
  files: {
    backgroundColor: "rgba(228,156,31,0.9)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(228,156,31,0.9)"
  },
  image: {
    width: (100 / 411.42) * screen,
    marginTop: (10 / 683.4285) * realheight,
    marginBottom: (2 / 683.4285) * realheight
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
  }
});
