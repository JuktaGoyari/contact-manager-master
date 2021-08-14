//react navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// screens 
import HomeScreen from './Screens/HomeScreen';
import AddNewContactScreen from './Screens/AddNewContactScreen';
import EditContactScreen from './Screens/EditContactScreen';
import ViewContactScreen from './Screens/ViewContactScreen';

const AppNavigator = createStackNavigator(
  {
    Home : { screen : HomeScreen },
    AddNewContact : { screen : AddNewContactScreen },
    EditContact : { screen : EditContactScreen },
    ViewContact : { screen : ViewContactScreen }
  },
  {
    defaultNavigationOptions : {
      headerTintColor: "#fff",
      headerStyle : {
        backgroundColor: "#BA2F16",
      },
      headerTitleStyle : {
        color: "#fff"
      },
    }
  },
  {
    initialRouteName: 'Home'
  }
)

const App = createAppContainer(AppNavigator);
export default App;
