import React, {useEffect, useState} from 'react';
import { Text, Platform, View, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Gravatar } from "react-native-gravatar";
import commonStyles from '../commonStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import Icon from "react-native-vector-icons/FontAwesome";


function DrawerContent(props) {
    const [userInfo, setUserInfo] = useState({email: "", name:""});

    useEffect(() => {
        const getUserInfo = async () => {
            const userInfoJson = await AsyncStorage.getItem("userInfo");
            setUserInfo(JSON.parse(userInfoJson));
        }
        
        getUserInfo();
    }, [])

    const logout = () => {
        delete axios.defaults.headers.common['Authorization'];
        AsyncStorage.removeItem("userInfo");
        props.navigation.navigate("AuthOrApp");
    }
    
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <View style={styles.headerTitle}>
                    <Gravatar style={styles.avatar} options={{
                        email: userInfo.email ? userInfo.email : "",
                        secure: true
                    }} />
                    <Text style={styles.title}>Tasks</Text>
                </View>
                
                <View
                    style={styles.userInfo}
                >
                    <Text style={styles.name}>{userInfo.name ? userInfo.name : ""}</Text>
                    <Text style={styles.email} >{userInfo.email ? userInfo.email : ""}</Text>
                </View>
                <TouchableOpacity onPress={logout}>
                    <View style={styles.logoutIcon} >
                        <Icon name="sign-out" size={30} color="#800" ></Icon>
                    </View>
                </TouchableOpacity>
            </View>

            <DrawerItem
                label="Today"
                onPress={() => props.navigation.navigate("Today")}
            />
            <DrawerItem
                label="Tomorrow"
                onPress={() => props.navigation.navigate("Tomorrow")}
            />
            <DrawerItem
                label="Week"
                onPress={() => props.navigation.navigate("Week")}
            />
            <DrawerItem
                label="Month"
                onPress={() => props.navigation.navigate("Month")}
            />
        </DrawerContentScrollView>
    );
}

export default DrawerContent

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: "#DDD"
    },
    headerTitle: {
        flexDirection: "row",
        alignItems: "center",
        gap: "10px"
    },
    title: {
        color: "#000",
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        fontWeight: "bold",
    },
    avatar: {
        width: 50,
        height: 50,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
        marginTop: Platform.OS === "ios" ? 20 : 10,
        backgroundColor: "#222"
    },
    userInfo: {
        marginLeft: 10,
    },
    name: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        margonBottom: 5,
        color: commonStyles.colors.subText
    },
    email: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 15,
        color: commonStyles.colors.subText,
        marginBottom: 10
    },
    logoutIcon: {
        marginLeft: 10,
        marginBottom: 10
    }
});