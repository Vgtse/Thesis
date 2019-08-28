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
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";
var screen = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;

export default class Announcement extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      tagSource: [],
      selected: [],
      wantedid: ""
    };
  }

  renderItem = ({ item }) => {
    let date = String(item.announcement_date).split("-");
    let month = parseInt(date[1]);
    let i = 0;
    let months = [
      "Γενάρης",
      "Φλεβάρης",
      "Μάρτιος",
      "Απρίλης",
      "Μάιος",
      "Ιούνιος",
      "Ιούλιος",
      "Αύγουστος",
      "Σεπτέμβρης",
      "Οκτώβρης",
      "Νοέμβρης",
      "Δεκέμβρης"
    ];
    for (i = 0; i < 12; i++) {
      if (month == i) {
        month = months[i - 1];
      }
    }
    let day = parseInt(date[2]);

    return (
      <View key={item.announcement_id} style={styles.box}>
        <View style={styles.date}>
          <Text style={styles.textday}>{day}</Text>
          <Text style={styles.textDate}>{month}</Text>
        </View>
        <View style={styles.announcementBox}>
          <TouchableOpacity
            onPress={() =>
              Actions.newpage({
                announcement: item.announcement_title,
                id: item.announcement_id,
                details: item.details,
                time: item.announcement_time,
                date: item.announcement_date,
                files: item.announcement_files
              })
            }
          >
            <Text numberOfLines={2} style={styles.text}>
              {item.announcement_title}
            </Text>
            <Text numberOfLines={3} style={styles.details}>
              {item.details}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#455a64",
          opacity: 0,
          width: (250 / 411.42) * screen,
          top: (40 / 683.4285) * realheight
        }}
      />
    );
  };
  componentDidMount() {
    fetch("http://192.168.2.45/backend/public/api/yolos")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            dataSource: responseJson.yolos
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
    fetch("http://192.168.2.45/backend/public/api/tags")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            tagSource: responseJson.tags
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
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-end",
    width: screen - 20,
    marginVertical: (50 / 683.4285) * realheight
  },
  announcementBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    flexDirection: "row",
    backgroundColor: "rgba(227,139,16,0.9)",
    height: (140 / 683.4285) * realheight,
    marginBottom: (25 / 683.4285) * realheight,
    borderRadius: 25
  },
  date: {
    backgroundColor: "#E49C1F",
    width: (80 / 411.42) * screen,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25
  },
  text: {
    fontSize: (20 / 411.42) * screen,
    color: "black",
    flexWrap: "wrap",
    paddingLeft: (10 / 411.42) * screen,
    paddingRight: (10 / 411.42) * screen,
    fontWeight: "400"
  },
  textDate: {
    fontSize: (22 / 411.42) * screen,
    color: "black"
  },
  textday: {
    fontSize: (28 / 411.42) * screen,
    color: "black"
  },
  details: {
    fontSize: (12 / 411.42) * screen,
    paddingTop: (10 / 683.4285) * realheight,
    paddingLeft: (8 / 411.42) * screen,
    paddingRight: (8 / 411.42) * screen
  }
});
