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

export default class Event extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      buildingSource: [],
      selected: [],
      wantedid: "",
      data: []
    };
  }

  renderItem = ({ item }) => {
    let date = String(item.beginning_date).split("-");
    let month = parseInt(date[1]);
    let i = 0;
    let months = [
      "Γενάρης",
      "Φλεβάρης",
      "Μάρτιος",
      "Απρίλη",
      "Μάιος",
      "Ιούνη",
      "Ιούλη",
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
    //alert(this.state.data[0].label);
    let name = "";
    for (i = 0; i < this.state.data.length; i++) {
      if (item.building_id == this.state.data[i].id) {
        name = this.state.data[i].name;
      }
    }

    let place = "";
    if (item.building_place != null) {
      place = "," + item.building_place;
    }
    return (
      <View key={item.event_id} style={styles.box}>
        <View style={styles.date}>
          <Text style={styles.textday}>{day}</Text>
          <Text style={styles.textDate}>{month}</Text>
        </View>
        <View style={styles.announcementBox}>
          <TouchableOpacity
            onPress={() =>
              Actions.eventpage({
                event: item.event_title,
                id: item.event_id,
                details: item.details,
                url: item.event_url,
                beginning_time: item.beginning_time,
                ending_time: item.ending_time,
                beginning_date: item.beginning_date,
                ending_date: item.ending_date,
                building: name,
                place: place,
                image: item.image_path
              })
            }
          >
            <Text numberOfLines={2} style={styles.text}>
              {item.event_title}
            </Text>
            <Text numberOfLines={3} style={styles.details}>
              {item.details}
            </Text>
            <Text style={styles.building}>
              {name}
              {place}
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
    fetch("http://192.168.2.45/backend/public/api/events")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            dataSource: responseJson.events
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
    fetch("http://192.168.2.45/backend/public/api/buildings")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            buildingSource: responseJson.buildings,
            data: responseJson.buildings.map(function(item) {
              return {
                id: item.building_id,
                name: item.building_name
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
    marginBottom: (25 / 683.4285) * realheight
  },
  date: {
    backgroundColor: "#E49C1F",
    width: (80 / 411.42) * screen,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
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
  },
  building: {
    fontSize: (12 / 411.42) * screen,
    paddingTop: (7 / 683.4285) * realheight,
    paddingLeft: (8 / 411.42) * screen,
    paddingRight: (8 / 411.42) * screen,
    paddingBottom: (4 / 683.4285) * realheight,
    color: "black"
  }
});
