import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking, 
  Platform,
  Alert,
  AsyncStorage
} from 'react-native';
import { Card, CardItem } from 'native-base';
import { Entypo } from '@expo/vector-icons';

class ViewContactScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      firstName : "FirstName",
      lastName : "LastName",
      phoneNumber : "+91000",
      email : "example@gmail.com",
      address : "your address",
      key : "something"
    }
  }

  static navigationOptions = {
    title: 'Contact Details',
  };

  componentDidMount(){
    const { navigation } = this.props;
    navigation.addListener("willFocus", ()=> {
      var key = this.props.navigation.getParam("key", ""); 
      this.getContact(key); 
    })
  }
  
  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then( contactJsonString =>{
        var contact = JSON.parse(contactJsonString);
        contact["key"] = key;
        this.setState(contact);
      })
      .catch( error => {
        console.log(error);
      })
  }

  callAction = phone => {
    let phoneNumber = phone;
    if ( Platform.OS !== "android" ) {
      phoneNumber = `telpromt:${phone}`
    }
    else {
      phoneNumber = `tel:${phone}`
    }
    Linking.canOpenURL(phoneNumber)
      .then( supported => {
        if (!supported) {
          Alert.alert("Phone Number is not available")
        } else {
          return Linking.openURL(phoneNumber)
        }
      })
      .catch( error => {
        console.log(error)
      })
  }

  smsAction = phone => {
    let phoneNumber = phone;
    phoneNumber = `sms:${phone}`;
    Linking.canOpenURL(phoneNumber)
      .then( supported => {
        if (!supported) {
          Alert.alert("Phone Number is not available")
        } else {
          return Linking.openURL(phoneNumber)
        }
      })
      .catch( error => {
        console.log(error)
      })
  }

  editContact = (key) => {
    this.props.navigation.navigate("EditContact", {key:key});
  }

  deleteContact = () => {
    Alert.alert(
      "Delete Contact ?",
      `${this.state.firstName} ${this.state.lastName}`,
      [
        {
          text: "cancel", onPress : ()=> {console.log("cancel report");}
        },
        {
          text: "OK",
          onPress: async ()=> {
            await AsyncStorage.removeItem(this.state.key)
              .then( () => {
                this.props.navigation.goBack();
              })
              .catch( error => {
                console.log(error);
              })
          }
        }
      ]
    )
  }

  render(){
      return(
          <ScrollView style = { styles.container }>
              <View style = {styles.contactIconContainer}>
                 <Text style = {styles.contactIcon}> {this.state.firstName[0].toUpperCase()} </Text>
                 <View style = {styles.nameContainer}>
                    <Text style = {styles.name}> {this.state.firstName} {this.state.lastName} </Text>
                 </View>
              </View>

              <Card style= {styles.actionContainer}>
                <CardItem style = { styles.actionButton}>
                  <TouchableOpacity
                      onPress = { ()=> {this.callAction(this.state.phoneNumber);
                    }}
                  >
                    <Entypo 
                      name = "phone"
                      size = {50}
                      color = "#B83227"
                    />
                    <Text style = {styles.actionText}> Call </Text>
                  </TouchableOpacity>
                </CardItem>

                <CardItem style = { styles.actionButton}>
                  <TouchableOpacity
                      onPress = { ()=> {this.smsAction(this.state.phoneNumber);
                    }}
                  >
                    <Entypo 
                      name = "message"
                      size = {50}
                      color = "#B83227"
                    />
                    <Text style = {styles.actionText}> sms </Text>
                  </TouchableOpacity>
                </CardItem>
                  
                <CardItem style = { styles.actionButton}>
                  <TouchableOpacity
                      onPress = { ()=> {this.editContact(this.state.key);
                    }}
                  >
                    <Entypo 
                      name = "edit"
                      size = {50}
                      color = "#B83227"
                    />
                    <Text style = {styles.actionText}> edit </Text>
                  </TouchableOpacity>
                </CardItem>

                <CardItem style = { styles.actionButton}>
                  <TouchableOpacity
                      onPress = { ()=> {this.deleteContact(this.state.key);
                    }}
                  >
                    <Entypo 
                      name = "trash"
                      size = {50}
                      color = "#B83227"
                    />
                    <Text style = {styles.actionText}> delete </Text>
                  </TouchableOpacity>
                </CardItem>
              </Card>

              <View style = {styles.infoContainer}>
                <Card>
                  <CardItem  bordered>
                    <Text style = {styles.infoText}> Contact Number</Text>
                  </CardItem>
                  <CardItem bordered>
                    <Text style = {styles.infoText}> {this.state.phoneNumber} </Text>
                  </CardItem>
                </Card>

                <Card>
                  <CardItem  bordered>
                    <Text style = {styles.infoText}> Email </Text>
                  </CardItem>
                  <CardItem bordered>
                    <Text style = {styles.infoText}> {this.state.email} </Text>
                  </CardItem>
                </Card>

                <Card>
                  <CardItem  bordered>
                    <Text style = {styles.infoText}> Address </Text>
                  </CardItem>
                  <CardItem bordered>
                    <Text style = {styles.infoText}> {this.state.address} </Text>
                  </CardItem>
                </Card>
              </View>
          </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    contactIconContainer: {
      height: 200,
      backgroundColor: "#B83227",
      alignItems: "center",
      justifyContent: "center"
    },
    contactIcon: {
      fontSize: 100,
      fontWeight: "bold",
      color: "#fff"
    },
    nameContainer: {
      width: "100%",
      height: 70,
      padding: 10,
      backgroundColor: "rgba(255,255,255,0.5)",
      justifyContent: "center",
      position: "absolute",
      bottom: 0
    },
    name: {
      fontSize: 24,
      color: "#000",
      fontWeight: "900"
    },
    infoText: {
      fontSize: 18,
      fontWeight: "300"
    },
    actionContainer: {
      flexDirection: "row",
      height : 70
    },
    actionButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    actionText: {
      color: "#B83227",
      fontWeight: "900"
    },
    infoContainer: {
      flexDirection: "column"
    }
  });
  
export default ViewContactScreen;