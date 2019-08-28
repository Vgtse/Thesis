import React, { Component } from "react";
import { Router, Stack, Scene, Tabs } from "react-native-router-flux";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
import Menu from "./pages/menu.js";
import Maps from "./pages/maps.js";
import Mapss from "./pages/map.js";
import Prof from "./pages/profile.js";
import Announcements from "./pages/announcements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
import AnnouncementPage from "./pages/announcementPage.js";
import Events from "./pages/events.js";
import EventPage from "./pages/eventPage.js";
import Foodchoise from "./pages/foodchoise.js";
import Foods from "./pages/foods.js";
import FoodPage from "./pages/foodPage.js";
console.disableYellowBox = true;
//import { createStore } from "redux";
//import { Provider, connect } from "react-redux";

var screen = Dimensions.get("window").width;
class TabIcon extends React.Component {
  render() {
    return <Icon name="user" size={25} />;
  }
}

export default class Routes extends React.Component {
  onBackPress() {
    Actions.menu();
  }
  onBackNewsPress() {
    Actions.news();
  }
  onBackEventsPress() {
    Actions.event();
  }
  onBackFoodsPress() {
    Actions.foodchoise();
  }
  onBackFoodFeedPress() {
    Actions.foods();
  }

  render() {
    return (
      <Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle}>
        <Stack key="root" initial hideNavBar={true}>
          <Stack key="logsign" initial hideNavBar={true}>
            <Scene key="login" initial component={Login} title="Login" />
            <Scene key="signup" component={Signup} title="Register" />
          </Stack>

          <Stack
            key="tabs"
            tabBarStyle={styles.tabBar}
            labelStyle={styles.label}
            inactiveTintColor="white"
            activeTintColor="rgba(227,139,16,0.7)"
            tabBarPosition={"top"}
            tabs
          >
            <Scene title="My School" hideNavBar={true}>
              <Scene
                key="maps"
                title="My School"
                showLabel={false}
                hideNavBar={true}
                icon={TabIcon}
                component={Maps}
              />
            </Scene>

            <Scene title="StudentApp" key="menu" hideNavBar={true} initial>
              <Scene
                key="label"
                hideNavBar={true}
                component={Menu}
                title="StudentApp"
              />
            </Scene>
            <Scene title="Profile" hideNavBar={true}>
              <Scene
                key="prof"
                title="Profile"
                hideNavBar={true}
                icon={TabIcon}
                component={Prof}
              />
            </Scene>
          </Stack>

          <Stack key="rooter">
            <Scene
              key="news"
              component={Announcements}
              title="Ανακοινώσεις"
              backAndroidHandler={this.onBackPress}
              back={true}
              titleStyle={styles.navigationBarTitleStyle}
              navigationBarStyle={styles.news}
              headerTintColor={"#E49C1F"}
              initial
            />
            <Scene
              key="newpage"
              component={AnnouncementPage}
              title="Ανακοινώση"
              backAndroidHandler={this.onBackNewsPress}
              back={true}
              titleStyle={styles.navigationBarTitleStyle}
              navigationBarStyle={styles.news}
              headerTintColor={"#E49C1F"}
            />
          </Stack>

          <Stack key="events">
            <Scene
              key="event"
              component={Events}
              title="Εκδηλώσεις"
              initial
              backAndroidHandler={this.onBackPress}
              back={true}
              titleStyle={styles.navigationBarTitleStyle}
              navigationBarStyle={styles.news}
              headerTintColor={"#E49C1F"}
            />
            <Scene
              key="eventpage"
              component={EventPage}
              title="Εκδήλωση"
              backAndroidHandler={this.onBackEventsPress}
              back={true}
              titleStyle={styles.navigationBarTitleStyle}
              navigationBarStyle={styles.news}
              headerTintColor={"#E49C1F"}
            />
          </Stack>
          <Stack key="food">
            <Scene
              key="foodchoise"
              component={Foodchoise}
              title="Φαγητό/Καφές"
              backAndroidHandler={this.onBackPress}
              back={true}
              titleStyle={styles.navigationBarTitleStyle}
              navigationBarStyle={styles.news}
              headerTintColor={"#E49C1F"}
              initial
            />
            <Scene
              key="foods"
              component={Foods}
              title="Φαγητό"
              backAndroidHandler={this.onBackFoodsPress}
              back={true}
              titleStyle={styles.navigationBarTitleStyle}
              navigationBarStyle={styles.news}
              headerTintColor={"#E49C1F"}
            />
            <Scene
              key="foodpage"
              component={FoodPage}
              title="Φαγητό"
              backAndroidHandler={this.onBackFoodFeedPress}
              back={true}
              titleStyle={styles.navigationBarTitleStyle}
              navigationBarStyle={styles.news}
              headerTintColor={"#E49C1F"}
            />
          </Stack>
        </Stack>
      </Router>
    );
  }
}
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#455a64"
  },
  label: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: (14 / 411.42) * screen,
    fontWeight: "500"
  },
  navigationBarTitleStyle: {
    // centering for Android
    flex: 1,
    paddingLeft: screen * 0.1336,
    fontSize: (16 / 411.42) * screen
  },
  news: {
    backgroundColor: "#455a64"
  }
});
