import React from "react";
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity
} from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/FontAwesome";

import comonStyles from "../commonStyles";
import moment from "moment";
import "moment/locale/pt-br";

export default props => {
    const doneOrNotStyle = props.done_at ? 
        { textDecorationLine: "line-through" } : {}

    const date = props.done_at ? props.done_at : props.estimate_at

    const formatedDate = moment(date).locale("pt-br").format("ddd, D [de] MMMM")

    function getCheckView(done_at){
        if(done_at != null){
            return (
                <View style={styles.done}>
                    <Icon 
                        name="check" 
                        size={20} 
                        color="white" 
                    ></Icon>
                </View>
            )
        }else{
            return (
                <View style={styles.pending} ></View>
            )
        }
    }

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}
                onPress={() => props.onDelete && props.onDelete(props.id)}
            >
                <Icon name="trash" size={30} color="#fff" />
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon style={styles.excludeIcon} name="trash" size={20} color="#fff"/>
                <Text style={styles.excludeText}>Remove</Text>
            </View>
        )
    }

    return (
        <GestureHandlerRootView>
            <Swipeable 
                renderRightActions={getRightContent} 
                renderLeftActions={getLeftContent}
                onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
            >
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={ () => props.onToggleTask(props.id) } >
                        <View style={styles.checkContainer} >
                            {getCheckView(props.done_at)}
                        </View>
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={[styles.desc, doneOrNotStyle]} >{props.desc}</Text>
                        <Text style={styles.date}>{formatedDate}</Text>
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderColor: "",
        borderBottomWidth: 1,
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "#fff",   
    },
    checkContainer: {
        width: '20%',
        alignItems: "center",
        justifyContent: "center",
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#555",
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: "#4D7031",
        justifyContent: "center",
        alignItems: "center",
    },
    desc: {
        fontFamily: comonStyles.fontFamily,
        color: comonStyles.colors.mainText,
    },
    date: {
        fontFamily: comonStyles.fontFamily,
        color: comonStyles.colors.subText,
        fontSize: 12,
    },
    right: {
        color: "white",
        backgroundColor: "#F53F57",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 20,
    },
    left: {
        flex: 1,
        backgroundColor: "#F53F57",
        flexDirection: "row",
        alignItems: "center",
    },
    excludeText: {
        fontFamily: comonStyles.fontFamily,
        color: "#fff",
        fontSize: 20,
        margin: 10,
    },
    excludeIcon: {
        marginLeft: 10,
    }
})