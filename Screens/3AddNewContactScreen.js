import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Keyboard, 
    AsyncStorage, 
    Alert, 
    TouchableWithoutFeedback, 
    ScrollView 
} from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';

class AddNewContactScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            firstName : "",
            lastName : "",
            phoneNumber : "",
            email : "",
            address : ""
        }
    }
    static navigationOptions = {
        title: 'Add New Contact',
    };

    saveContact = async () => {
        if ( 
            this.state.firstName !== "" &&
            //this.state.lastName !== "" &&
            this.state.phoneNumber !== ""
            // this.state.email !== "" &&
            // this.state.address !== ""
         ) {
            //create contact object
            var contact = {
                firstName : this.state.firstName ,
                lastName : this.state.lastName ,
                phoneNumber : this.state.phoneNumber ,
                email : this.state.email ,
                address : this.state.address 
            }
            await AsyncStorage.setItem( 
                Date.now().toString(),
                JSON.stringify(contact)
             )
             .then( ()=> {
                 this.props.navigation.goBack()
             } )
             .catch( error => {
                 console.log(error);
                 
             } )
         }
         else { 
             Alert.alert("All fields are Required")
         }
    }
    render(){
        return(
           <TouchableWithoutFeedback
                onPress = { ()=> {Keyboard.dismiss} }
           >
               <ScrollView style = {styles.container}>
                    <Form>
                        <Item style = { styles.inputItem }>
                            <Label> First Name </Label>
                            <Input 
                                autoCorrect = { false }
                                autoCapitalize = "none"
                                keyboardType = "default"
                                onChangeText = { firstName => this.setState({ firstName }) }
                            />
                        </Item>

                        <Item style = { styles.inputItem }>
                            <Label> Last Name </Label>
                            <Input 
                                autoCorrect = { false }
                                autoCapitalize = "none"
                                keyboardType = "default"
                                onChangeText = { lastName => this.setState({ lastName }) }
                            />
                        </Item>

                        <Item style = { styles.inputItem }>
                            <Label> Phone Number </Label>
                            <Input 
                                autoCorrect = { false }
                                autoCapitalize = "none"
                                keyboardType = "decimal-pad"
                                onChangeText = { phoneNumber => this.setState({ phoneNumber }) }
                            />
                        </Item>

                        <Item style = { styles.inputItem }>
                            <Label> Email </Label>
                            <Input 
                                autoCorrect = { false }
                                autoCapitalize = "none"
                                keyboardType = "default"
                                onChangeText = { email => this.setState({ email }) }
                            />
                        </Item>

                        <Item style = { styles.inputItem }>
                            <Label> Address </Label>
                            <Input 
                                autoCorrect = { false }
                                autoCapitalize = "none"
                                keyboardType = "default"
                                onChangeText = { address => this.setState({ address }) }
                            />
                        </Item>

                    </Form>
                    <Button 
                        style = {styles.button}
                        full 
                        onPress = { ()=> {
                            this.saveContact();
                        } }
                    >
                        <Text style={ styles.buttonText }> Save </Text>
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
      margin: 10,
      height: 500
    },
    inputItem: {
      margin: 10
    },
    button: {
      backgroundColor: "#BA2F16",
      marginTop: 40,
      borderRadius: 20
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize : 20,
    },
    empty: {
      height: 330,
      backgroundColor: "#FFF"
    }
  });
export default AddNewContactScreen;