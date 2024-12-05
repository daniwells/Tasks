import React, { Component } from "react";
import { 
    Modal, 
    View, 
    StyleSheet, 
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text,
    TextInput,
    Platform,
    Alert

} from "react-native";

import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

import comonStyles from "../commonStyles";

const initialState = { desc: "", date: new Date(), showDatePicker: false }

export default class AddTask extends Component {

    state = {
        ...initialState, 
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date,
        };

        this.props.onSave && this.props.onSave(newTask);
        this.setState({...initialState})
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker
            style={styles.dateComponent}
            value={this.state.date}
            onChange={(_, date) => this.setState({
                date: date, 
                showDatePicker: false 
            })}
            mode="date"
            display="spinner"
            textColor="black"

        />
        
        const dateString = moment(this.state.date).format("ddd, D [de] MMMM [de] YYYY");
    
        if(Platform.OS === "android"){
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    { this.state.showDatePicker && datePicker }
                </View>
            )
        }

        return datePicker;
    }

    render() {
        return (
           <Modal 
                transparent={true} 
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType="slide"
            >
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}
                >
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container} >
                    <Text style={styles.header} >New Task</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Enter the description"
                        placeholderTextColor="gray"  
                        value={this.state.desc}
                        onChangeText={desc => this.setState({ desc })}
                    />
                    {this.getDatePicker()}
                    <View style={styles.buttons} >
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}
                >
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
            </Modal> 
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,.7)",

    },
    container: {
        backgroundColor: "#FFF"
    },
    header: {
        fontFamily: comonStyles.fontFamily,
        backgroundColor: comonStyles.colors.today,
        color: comonStyles.colors.secondary,
        textAlign: "center",
        padding: 15,
        dontSize: 18,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "flex-end",

    },
    input: {
        fontFamily: comonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e3e3e3",
        borderRadius: 6,
        paddingHorizontal: 10,
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: comonStyles.colors.today,
    },
    date: {
        fontFamily: comonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15,
    },
    dateComponent: {        
        width: "100%",
        margin: "auto",
        color: "#000",
    }
})

