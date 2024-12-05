import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet
} from "react-native"

export default class AuthOrApp extends Component {

    componentDidMount = async () => {
        const userInfoJson = await AsyncStorage.getItem("userInfo");
        let userInfo = null;
        
        try{
            userInfo = JSON.parse(userInfoJson);            
        }catch(e){
            console.warn("Invalid user's info")
        }
        
        if(userInfo && userInfo.token){
            axios.defaults.headers.common["Authorization"] = `bearer ${userInfo.token}`;
            this.props.navigation.navigate("Home", userInfo);
        }else{
            this.props.navigation.navigate("Auth");
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
    }
})