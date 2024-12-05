import React, { Component } from "react";
import { 
    ImageBackground, 
    Text, 
    StyleSheet, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Platform,
    Alert
} from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import backgroundImage from "../../assets/imgs/login.jpg";
import commonStyles from "../commonStyles";
import AuthInput from "../components/AuthInput";

import { server, showError, showSuccess } from "../common";

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    stageNew: false
}

export default class Auth extends Component {

    state = {
        ...initialState
    }

    signinOrSignup = () => {
        if(this.state.stageNew) {
            this.signup();
        } else {
            this.signin();
        }
    }

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })

            showSuccess("User registered!")
            this.setState({ ...initialState })
        } catch(e) {
            showError(e)
        }
    }

    signin = async () => {
        try {
            const response = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            });
            axios.defaults.headers.common["Authorization"] = `bearer ${response.data.token}`;

            AsyncStorage.setItem("userInfo", JSON.stringify(response.data))
            this.props.navigation.navigate("Home", response.data);
        }catch(e) {
            showError(e);
        }
    }

    render() {

        const validations = [];
        validations.push(this.state.email && this.state.email.includes("@"))
        validations.push(this.state.password && this.state.password.length >= 6)

        if(this.state.stageNew){
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.confirmPassword)
            validations.push(this.state.confirmPassword === this.state.confirmPassword)
        }

        const validForm = validations.reduce((t, a) => t && a)

        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? "Create account" : "Enter your datas"}
                    </Text>
                    {
                        this.state.stageNew &&
                        <AuthInput 
                            icon="user"
                            placeholder="Name" 
                            value={this.state.name} 
                            style={styles.input} 
                            onChangeText={name => this.setState({ name })}
                        />
                    }
                    <AuthInput 
                        icon="at"
                        placeholder="E-mail" 
                        value={this.state.email} 
                        style={styles.input} 
                        onChangeText={email => this.setState({ email })}
                    />
                    <AuthInput 
                        icon="lock"
                        placeholder="Password" 
                        value={this.state.password} 
                        style={styles.input} 
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry={true}
                    />
                    {
                        this.state.stageNew &&
                        <AuthInput 
                            icon="lock"
                            placeholder="Confirm Password" 
                            value={this.state.confirmPassword} 
                            style={styles.input} 
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            secureTextEntry={true}
                        />
                    }

                    <TouchableOpacity 
                        style={[styles.button, validForm ? {} : { backgroundColor: "#AAA" }]} 
                        onPress={this.signinOrSignup}
                        disabled={!validForm}
                    >
                        <Text style={styles.buttonText}>
                            {this.state.stageNew ? "Register" : "Login"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={{ padding: 10 }} 
                    onPress={() => this.setState({...this.state, stageNew: !this.state.stageNew})}
                >
                    <Text style={{color: "#FFF"}}>
                        {
                            this.state.stageNew ? "Already have an account?" : "Don't have an account?"
                        }
                    </Text>        
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginBottom: 10,
        textAlign: "center"
    },
    input: {
        marginTop: 10,
        backgroundColor: "#FFF",
        padding: Platform.OS == "ios" ? 10 : 10
    },
    formContainer: {
        backgroundColor: "rgba(0,0,0,.5)",
        padding: 20,
        width: "90%"
    },
    button: {
        backgroundColor: "#080",
        marginTop: 20,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: "#FFF",
        fontSize: 18,
    }
})