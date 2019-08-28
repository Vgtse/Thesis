import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
import Modal from "react-native-modal";
import RNRestart from "react-native-restart";
import SearchableDropdown from "react-native-searchable-dropdown";
var screen = Dimensions.get("window").width;
var realheight = Dimensions.get("window").height;

export default class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isPasswordModalVisible: false,
      isBuildingModalVisible: false,
      new_username: "",
      updated_name: "",
      new_password: "",
      updated_password: "",
      new_building: "",
      dataSource: [],
      building_id: ""
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
  renderItems = item => {
    this.setState({ building_id: item.id });
  };
  signout() {
    RNRestart.Restart();
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  togglePasswordModal = () => {
    this.setState({
      isPasswordModalVisible: !this.state.isPasswordModalVisible
    });
  };
  toggleBuildingModal = () => {
    this.setState({
      isBuildingModalVisible: !this.state.isBuildingModalVisible
    });
  };
  submitschool = () => {
    this.setState({
      isBuildingModalVisible: !this.state.isBuildingModalVisible
    });
    let user = {
      email: this.props.email,
      newuser: this.state.building_id
    };

    fetch("http://192.168.2.45/backend/public/api/updatebuilding", {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(response => this.setState({ new_building: response.message }))
      .catch(error => console.error("error:", error));
  };
  submitpassword = () => {
    this.setState({
      isPasswordModalVisible: !this.state.isPasswordModalVisible
    });
    let user = {
      email: this.props.email,
      newuser: this.state.new_password
    };

    fetch("http://192.168.2.45/backend/public/api/updatepassword", {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(response => this.setState({ updated_password: response.message }))
      .catch(error => console.error("error:", error));
  };
  submit = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
    let user = {
      email: this.props.email,
      newuser: this.state.new_username
    };

    fetch("http://192.168.2.45/backend/public/api/updatename", {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(res => res.json())
      .then(response => this.setState({ updated_name: response.message }))
      .catch(error => console.error("error:", error));
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.name}>
            {this.state.updated_name || this.props.username}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <View style={styles.row}>
            <View style={styles.itemcontainer}>
              <TouchableOpacity onPress={this.toggleModal}>
                <Icon style={styles.icon} name="user" size={40} color="black" />
                <Text style={styles.text}>Change Name</Text>
              </TouchableOpacity>
              <Modal isVisible={this.state.isModalVisible}>
                <View style={styles.modal}>
                  <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder={"Name"}
                    placeholderTextColor="white"
                    onChangeText={new_username =>
                      this.setState({ new_username })
                    }
                  />
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row"
                    }}
                  >
                    <TouchableOpacity
                      style={styles.button}
                      onPress={this.toggleModal}
                    >
                      <Text style={{ color: "white" }}>Ακύρωση</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.submit()}
                    >
                      <Text style={{ color: "white" }}>Εφαρμογή</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            <View style={styles.itemcontainer}>
              <TouchableOpacity onPress={this.togglePasswordModal}>
                <Icon style={styles.icon} name="lock" size={40} color="black" />
                <Text style={styles.text}> Change</Text>
                <Text style={styles.textunder}>Password</Text>
              </TouchableOpacity>
              <Modal isVisible={this.state.isPasswordModalVisible}>
                <View style={styles.modal}>
                  <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder={"Password"}
                    placeholderTextColor="white"
                    onChangeText={new_password =>
                      this.setState({ new_password })
                    }
                  />
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row"
                    }}
                  >
                    <TouchableOpacity
                      style={styles.button}
                      onPress={this.togglePasswordModal}
                    >
                      <Text style={{ color: "white" }}>Ακύρωση</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.submitpassword()}
                    >
                      <Text style={{ color: "white" }}>Εφαρμογή</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.itemcontainer}>
              <TouchableOpacity onPress={this.toggleBuildingModal}>
                <Icon
                  style={styles.icon}
                  name="university"
                  size={40}
                  color="black"
                />
                <Text style={styles.text}>Change School</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.itemcontainer}>
              <TouchableOpacity>
                <Icon
                  style={styles.icon}
                  name="calendar"
                  size={40}
                  color="black"
                />
                <Text style={styles.text}> Manage </Text>
                <Text style={styles.textunder}>your Events</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.itemcontainerlast}>
              <TouchableOpacity onPress={this.signout}>
                <Icon
                  style={styles.icon}
                  name="sign-out"
                  size={40}
                  color="black"
                />
                <Text style={styles.text}>Sign out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Modal
          style={styles.modal}
          isVisible={this.state.isBuildingModalVisible}
        >
          <SearchableDropdown
            onItemSelect={item => {
              this.setState({ building_id: item.id });
            }}
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
              width: (320 / 411.42) * screen,
              height: (60 / 683.4285) * realheight
            }}
            itemStyle={{
              padding: 10,
              marginTop: (2 / 683.4285) * realheight,
              borderColor: "rgba(255,255,255,0.3)",
              backgroundColor: "rgba(255,255,255,0.3)",
              borderWidth: 1,
              borderRadius: 25
            }}
            itemTextStyle={{
              color: "white",
              fontSize: (15 / 411.42) * screen
            }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={this.state.dataSource}
            placeholder="Choose School"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={this.toggleBuildingModal}
            >
              <Text style={{ color: "white" }}>Ακύρωση</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.submitschool()}
            >
              <Text style={{ color: "white" }}>Εφαρμογή</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 23,
    fontWeight: "400",
    color: "black"
  },

  main: {
    flexGrow: 1,
    marginTop: 200
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: screen
  },
  itemcontainer: {
    alignItems: "center",
    width: 150,
    height: 130,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: "#455a64",
    backgroundColor: "rgba(227,139,16,0.8)",
    margin: 12
  },
  text: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "400",
    color: "black"
  },
  textunder: {
    fontSize: 18,
    fontWeight: "400",
    color: "black"
  },
  icon: {
    alignSelf: "center",
    marginTop: 20
  },
  scroll: {
    height: 300
  },
  itemcontainerlast: {
    alignItems: "center",
    width: 130,
    height: 130,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: "#455a64",
    backgroundColor: "rgba(227,139,16,0.8)",
    margin: 12
  },
  modal: {
    height: 150,
    width: 300,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0)",
    alignSelf: "center",
    alignItems: "center"
  },

  inputBox: {
    marginTop: 25,
    width: (250 / 411.42) * screen,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 25,
    paddingHorizontal: (16 / 411.42) * screen,
    fontSize: (22 / 411.42) * screen,
    marginVertical: (10 / 683.4285) * realheight
  },
  button: {
    backgroundColor: "rgba(227,139,16,0.8)",
    borderRadius: 25,
    alignItems: "center",
    width: 100,
    marginHorizontal: 20,
    marginTop: 15,
    height: 30,
    justifyContent: "center"
  }
});
