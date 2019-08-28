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
var height = Dimensions.get("window").height;
export default class AnnouncementPage extends React.Component {
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
    let date = String(this.props.date).split("-");
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

    let files = this.props.files;

    let filess = String(files).split(",");
    let b = filess.length;

    let output = [];
    for (i = 0; i < b; i++) {
      let name = String(filess[i]).replace(
        "https://www.upatras.gr/sites/www.upatras.gr/files/announcements/",
        ""
      );
      fileoperation = (
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              "https://www.upatras.gr/sites/www.upatras.gr/files/announcements/" +
                name
            );
          }}
        >
          <View numberOfLines={1} style={{ flexDirection: "row" }}>
            <Icon name="file-text" size={20} color={"white"} />
            <Text
              numberOfLines={1}
              style={{ fontSize: (16 / 411.42) * screen, color: "black" }}
            >
              {" "}
              {name}
            </Text>
          </View>
        </TouchableOpacity>
      );

      output[i] = fileoperation;
    }
    if (this.props.files == null) {
      output = <View />;
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ width: 100 + "%", height: 100 + "%", alignItems: "center" }}
          source={require("../pictures/2320515edit.jpg")}
        >
          <View style={styles.header}>
            <Text numberOfLines={8} style={styles.headerText}>
              {this.props.announcement}
            </Text>
            <Text style={styles.date}>
              {day}
              {month}
              {year}-{this.props.time}
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
          <View style={styles.files}>{output}</View>
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
    marginVertical: (20 / 683.42) * height,
    backgroundColor: "rgba(228,156,31,0.9)",
    width: screen - 20,
    height: (230 / 683.42) * height,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(228,156,31,0.9)"
  },
  headerText: {
    fontSize: (22 / 411.42) * screen,
    color: "black",
    fontWeight: "400",
    textAlign: "center"
  },
  date: {
    fontSize: (16 / 411.42) * screen
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
    height: (250 / 683.42) * height,
    width: screen - 10
  },
  detailsText: {
    fontSize: (18 / 411.42) * screen,
    textAlign: "center",
    color: "black",
    marginTop: (10 / 683.42) * height
  },
  files: {
    marginTop: (7 / 683.42) * height,
    backgroundColor: "rgba(228,156,31,0.9)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(228,156,31,0.9)"
  }
});
