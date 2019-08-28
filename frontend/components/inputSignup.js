import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
  Dimensions
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
var screen = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;

export default class InputSignup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      dataSource: [],
      building_id: "",
      loginstate: ""
    };
  }
  componentDidMount() {
    fetch("http://192.168.2.45/backend/public/api/schools")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            dataSource: responseJson.schools.map(function(item) {
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
  yo() {
    alert(this.state.building_id);
  }
  renderItems = item => {
    this.setState({ building_id: item.id });
  };
  submit() {
    const user = {
      email: this.state.username,
      password: this.state.password,
      building: this.state.building_id
    };

    fetch("http://192.168.2.45/backend/public/api/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(response =>
        this.setState({
          loginstate: response.message
        })
      )
      .catch(error => console.error("error:", error));
  }

  render() {
    if (this.state.loginstate == "Success") {
      alert("Registered!");
      Actions.replace("prof", { username: this.state.username });
      Actions.replace("maps", { username: this.state.username });
      Actions.replace("label", { username: this.state.username });
    } else if (this.state.loginstate == "DENIED") {
      alert(this.state.loginstate);
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={"Create Username"}
          placeholderTextColor="white"
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          secureTextEntry={true}
          placeholder={"Create Password"}
          placeholderTextColor="white"
          onChangeText={password => this.setState({ password })}
        />
        <SearchableDropdown
          onItemSelect={this.renderItems}
          containerStyle={{ padding: 12 }}
          textInputStyle={{
            padding: 12,
            paddingHorizontal: (16 / 411.42) * screen,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.3)",
            backgroundColor: "rgba(255,255,255,0.3)",
            fontSize: (22 / 411.42) * screen,
            color: "white",
            borderRadius: 25,
            width: (330 / 411.42) * screen,
            height: (55 / 683.4285) * realheight
          }}
          itemStyle={{
            padding: 10,
            marginTop: (2 / 683.4285) * realheight,
            borderColor: "rgba(255,255,255,0.3)",
            backgroundColor: "rgba(255,255,255,0.3)",
            borderWidth: 1,
            borderRadius: 25
          }}
          itemTextStyle={{ color: "white", fontSize: (15 / 411.42) * screen }}
          itemsContainerStyle={{ maxHeight: 140 }}
          items={this.state.dataSource}
          placeholder="Choose School"
          placeholderTextColor="white"
          resetValue={false}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
          <Text style={styles.buttonText}>Create User</Text>
          <Icon style={styles.icon} name="user-plus" size={25} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    top: (5 / 683.4285) * realheight
  },
  inputBox: {
    width: (330 / 411.42) * screen,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 25,
    paddingHorizontal: (16 / 411.42) * screen,
    fontSize: (22 / 411.42) * screen,
    marginVertical: (10 / 683.4285) * realheight
  },
  buttonText: {
    fontSize: (25 / 411.42) * screen,
    color: "rgba(250,250,250,1)",
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: (9 / 411.42) * screen
  },
  button: {
    width: (200 / 411.42) * screen,
    borderRadius: 25,
    backgroundColor: "rgba(227,139,16,0.7)",
    marginVertical: (10 / 683.4285) * realheight,
    paddingVertical: (12 / 683.4285) * realheight,
    flexDirection: "row"
  },
  icon: {
    paddingHorizontal: (5 / 411.42) * screen,
    paddingVertical: (5 / 683.4285) * realheight
  }
});
