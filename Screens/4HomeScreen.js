import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, AsyncStorage, ScrollView } from 'react-native';
import { Card, Item } from 'native-base';
import { Entypo } from "@expo/vector-icons";

class HomeScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          data: [],
        }
    }

    static navigationOptions = {
        title: 'My Contact Manager',
    };

    componentWillMount(){
      const { navigation } = this.props;
      navigation.addListener("willFocus", ()=>{
        this.getAllContact();
      })
    }

    getAllContact = async () => {
      await AsyncStorage.getAllKeys()
      .then( keys => {
        //console.log(keys);
        return AsyncStorage.multiGet(keys)
         .then( contactList => {
            this.setState({
              data : contactList.sort( function(a, b) {
                if ( JSON.parse(a[1]).firstName < JSON.parse(b[1]).firstName ){
                  return -1;
                }
                else if ( JSON.parse(a[1]).firstName > JSON.parse(b[1]).firstName ){
                  return -1;
                }
                return 0;
              })
            })
         })
         .catch( error => {
           console.log(error);
         })
      })
      .catch(error => {
        console.log(error);
      })

      console.log('====================================');
      console.log(this.state.data);
      console.log('====================================');
    }

    render(){
        return(
            <View style = {styles.container}>  
              <ScrollView>
                <FlatList 
                  data = {this.state.data}
                  renderItem = { ({item}) =>{
                      contact = JSON.parse( item[1] );
                      return (
                        <TouchableOpacity
                          onPress = { ()=> {
                            this.props.navigation.navigate("ViewContact", {
                              key: item[0].toString()
                            });
                          }}
                        >
                          <Card style  = { styles.listItem }>
                            <View style = { styles.iconContainer }>
                                <Text style = { styles.contactIcon } >
                                    {contact.firstName[0].toUpperCase()}
                                </Text>
                            </View>
                            <View style = { styles.infoContainer }>
                                <Text style = { styles.infoText }>
                                  { contact.firstName } { contact.lastName }
                                </Text>
                                <Text style = { styles.infoText }>
                                  { contact.phoneNumber }
                                </Text>
                            </View>
                          </Card>
                        </TouchableOpacity>
                      )
                  } }
                  keyExtractor = { ( item, index ) => item[0].toString() }
                />
              </ScrollView>

              <TouchableOpacity
                    style = { styles.floatButton }
                    onPress = { ()=> {this.props.navigation.navigate('AddNewContact')} }
                >
                    <Entypo 
                        name = "plus"
                        size = {30}
                        color = "#fff"
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    listItem: {
      flexDirection: "row",
      padding: 20
    },
    iconContainer: {
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#B83227",
      borderRadius: 100
    },
    contactIcon: {
      fontSize: 28,
      color: "#fff"
    },
    infoContainer: {
      flexDirection: "column"
    },
    infoText: {
      fontSize: 16,
      fontWeight: "400",
      paddingLeft: 10,
      paddingTop: 2
    },
    floatButton: {
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.2)",
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      position: "absolute",
      bottom: 10,
      right: 10,
      height: 60,
      backgroundColor: "#BA2F16",
      borderRadius: 100
    }
  });
export default HomeScreen;