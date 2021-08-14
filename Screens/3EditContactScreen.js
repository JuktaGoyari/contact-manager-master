import React from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Alert,
  ScrollView
} from 'react-native';
import { Form, Item, Label, Button, Input } from 'native-base';

class EditContactScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      firstName : "",
      lastName : "",
      phoneNumber : "",
      email : "",
      address : "",
      key : ""
    }
  }

  static navigationOptions = {
    title: 'Edit Contact',
  };

  componentDidMount(){
    const { navigation } = this.props;
    navigation.addListener("willFocus", ()=>{
      var key = this.props.navigation.getParam("key", "");
      this.getContact(key);
    })
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then( contactJsonString => {
        var contact = JSON.parse(contactJsonString);
        contact["key"] = key;
        this.setState(contact);
      })
      .catch( error => console.log(error) )
  }

  updateContact = async key => {
    if (
      this.state.firstName !== "" &&
      this.state.phoneNumber !== ""
    ){
      var contact = {
        firstName : this.state.firstName,
        lastName : this.state.lastName,
        phoneNumber : this.state.phoneNumber,
        email : this.state.email,
        address : this.state.address
      }
      await AsyncStorage.mergeItem(key, JSON.stringify(contact))
       .then( () => {
         this.props.navigation.goBack();
       })
       .catch( error => {
         console.log(error)
       })
     }
  }

  getAutoScroll = () => {
    return styles.empty;
  }

  render(){
      return(
          <TouchableWithoutFeedback
            onPress = { () => {
              Keyboard.dismiss();
            }}
          >
            <ScrollView>
              <Form>
                <Item style = {styles.inputItem}>
                   <Label> First Name </Label>
                   <Input 
                      autoCorrect = {false}
                      autoCapitalize = "none"
                      keyboardType = "default"
                      onChangeText = {
                        firstName => this.setState({
                          firstName
                        })
                      }
                      value = {
                        this.state.firstName
                      }
                   />
                </Item>

                <Item style = {styles.inputItem}>
                   <Label> last Name </Label>
                   <Input 
                      autoCorrect = {false}
                      autoCapitalize = "none"
                      keyboardType = "default"
                      onChangeText = {
                        lastName => this.setState({
                          lastName
                        })
                      }
                      value = {
                        this.state.lastName
                      }
                   />
                </Item>

                <Item style = {styles.inputItem}>
                   <Label> Phone Number </Label>
                   <Input 
                      autoCorrect = {false}
                      autoCapitalize = "none"
                      keyboardType = "default"
                      onChangeText = {
                        phoneNumber => this.setState({
                          phoneNumber
                        })
                      }
                      value = {
                        this.state.phoneNumber
                      }
                   />
                </Item>

                <Item style = {styles.inputItem}>
                   <Label> Email </Label>
                   <Input 
                      autoCorrect = {false}
                      autoCapitalize = "none"
                      keyboardType = "default"
                      onChangeText = {
                        email => this.setState({
                          email
                        })
                      }
                      value = {
                        this.state.email
                      }
                   />
                </Item>

                <Item style = {styles.inputItem}>
                   <Label> Address </Label>
                   <Input 
                      autoCorrect = {false}
                      autoCapitalize = "none"
                      keyboardType = "default"
                      onChangeText = {
                        address => this.setState({
                         address
                        })
                      }
                      value = {
                        this.state.address
                      }
                      onPress = { () => this.getAutoScroll() }
                   />
                </Item>
              </Form>
              <Button 
                style = {styles.button}
                full 
                onPress = { ()=> {
                    this.updateContact(this.state.key);
                }}
              >
                  <Text style={ styles.buttonText }> Update </Text>
              </Button>
              <View style = { styles.empty }></View>
            </ScrollView>
          </TouchableWithoutFeedback>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      margin: 10
    },
    inputItem: {
      margin: 10
    },
    button: {
      backgroundColor: "#B83227",
      marginTop: 40,
      borderRadius: 20
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold"
    },
    empty: {
      height: 330,
      backgroundColor: "#FFF"
    }
  });
  
export default EditContactScreen;