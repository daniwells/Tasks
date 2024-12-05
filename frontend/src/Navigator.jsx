import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';

import Menu from "./Menu/Menu";
import Auth from './screens/Auth';
import AuthOrApp from "./screens/AuthOrApp";

const Stack = createStackNavigator();

function Navigator() {
  return (  
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={Menu} options={{headerShown: false}}/>
        <Stack.Screen name="AuthOrApp" component={AuthOrApp} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;