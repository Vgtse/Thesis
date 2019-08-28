import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  FlatList,
  Dimensions
} from "react-native";

var screen = Dimensions.get("window").width;

var realheight = Dimensions.get("window").height;
export default class Announcement extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: []
    };
  }
  renderItem = ({ item }) => {
    let day = parseInt(date[2]);
    return (
      <View style={styles.box}>
        <View style={styles.date}>
          <Text style={styles.textday}>{day}</Text>
          <Text style={styles.textDate}>{month}</Text>
        </View>
        <View style={styles.announcementBox}>
          <Text numberOfLines={2} style={styles.text}>
            {item.announcement_title}
          </Text>
          <Text numberOfLines={3} style={styles.details}>
            {item.details}
          </Text>
        </View>
      </View>
    );
  };

  componentDidMount() {
    fetch("http://10.101.115.80/backend/public/api/yolos")
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
  }
  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-end"
  }
});
