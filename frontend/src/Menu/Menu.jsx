import { createDrawerNavigator } from "@react-navigation/drawer";
import TaskList from "../screens/TaskList";
import 'react-native-gesture-handler';
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

function Menu() {
    const TodayScreen = (props) => <TaskList title="Today" daysAhead={0} {...props} />;
    const TomorrowScreen = (props) => <TaskList title="Tomorrow" daysAhead={1} {...props} />;
    const WeekScreen = (props) => <TaskList title="Week" daysAhead={7} {...props} />;
    const MonthScreen = (props) => <TaskList title="Month" daysAhead={30} {...props} />;

    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props}/>} id={undefined}>
            <Drawer.Screen name="Today" component={TodayScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Tomorrow" component={TomorrowScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Week" component={WeekScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Month" component={MonthScreen} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
}

export default Menu;