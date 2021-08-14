 //react navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// screens 
import HomeScreen from './Screens/HomeScreen';
import AddNewContactScreen from './Screens/AddNewContactScreen';
import EditContactScreen from './Screens/EditContactScreen';
import ViewContactScreen from './Screens/ViewContactScreen';
import { startAsync } from 'expo/build/AR';

const AppNavigator = creatStackNavigator(
  {
    Home : { screen : HomeScreen },
    AddNewContact : { screen : AddNewContactScreen },
    EditContact : { screen : EditContactScreen },
    ViewContact : { screen : ViewContactScreen }
  },
  {
    defaultNavigationOptions : {
      headerTintColor: "#00008B",
      headerStyle : {
        backgroundColor: "#BA2F16",
      },
      headerTitleStyle : {
        color: "#00008B"
      },
    }
  },
  {
    initialRouteName: 'Home'
  }
)

const App = createAppContainer(AppNavigator);
export default App;
