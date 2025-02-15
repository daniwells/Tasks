import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ImageBackground, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    Platform, 
    Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome";

import comonStyles from '../commonStyles';
import todayImage from '../../assets/imgs/today.jpg';
import tomorrowImage from '../../assets/imgs/tomorrow.jpg';
import weekImage from '../../assets/imgs/week.jpg';
import monthImage from '../../assets/imgs/month.jpg';

import axios from "axios";
import moment from "moment";
import "moment/locale/pt-br";

import { server, showError } from "../common";
import Task from '../components/Task';
import AddTask from './AddTask';
import commonStyles from '../commonStyles';

const initialState = {
    showDoneTasks: true,
    visibleTasks: [],
    showAddTask: false,
    tasks: []
}

export default class TaskList extends Component {
    state = {
        ...initialState
    }

    toggleFilter = () => {
        this.setState(
            {
                showDoneTasks: !this.state.showDoneTasks
            },
            this.filterTasks
        )
    }
    
    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem("tasksState");
        const savedState = JSON.parse(stateString) || initialState;
        this.setState({
            showDoneTasks: savedState.showDoneTasks,
        }, this.filterTasks);

        this.loadTasks();
    }

    loadTasks = async () => {
        try {
            const maxDate = moment()
                .add({ days: this.props.daysAhead })
                .format("YYYY-MM-DD 23:59:59");
            
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch(e){
            showError(e);
        }
    }
    
    filterTasks = () => {
        let visibleTasks = null;
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks];
        } else {
            const pending = task => task.done_at === null;
            visibleTasks = this.state.tasks.filter(pending);
        }
        
        this.setState({ visibleTasks });
        AsyncStorage.setItem("tasksState", 
            JSON.stringify({
                showDoneTasks: this.state.showDoneTasks
            })
        );
    }
    
    toggleTask = async taskId => {
        try{
            await axios.put(`${server}/tasks/${taskId}/toggle`);
            await this.loadTasks();
        }catch(e){
            showError(e);
        }
    }

    addTask = async newTask => {
        if(!newTask || !newTask.desc || !newTask.desc.trim()){
            Alert.alert("Invalid datas", "Description doesn't typed!")
            return
        }

        try{
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimate_at: newTask.date
            });

            this.setState({showAddTask: false}, this.loadTasks)
        }catch(e){
            showError(e);
        }
    }

    deleteTask = async taskId => {
        try{
            await axios.delete(`${server}/tasks/${taskId}`);
            this.loadTasks();
        }catch(e){
            showError(e);
        }

        const tasks = this.state.tasks.filter(task => task.id !== id)
        this.setState({ tasks }, this.filterTasks)
    }

    getImage = () => {
        switch(this.props.daysAhead){
            case 0: return todayImage
            case 1: return tomorrowImage
            case 7: return weekImage
            default: return monthImage
        }
    }

    getColor = () => {
        switch(this.props.daysAhead){
            case 0: return commonStyles.colors.today
            case 1: return commonStyles.colors.tomorrow
            case 7: return commonStyles.colors.week
            default: return commonStyles.colors.month
        }
    }

    render(){
        const today = moment().locale("pt-br").format("ddd, D [de] MMMM [de] YYYY")
        return (
            <View style={styles.container}>
                <AddTask 
                    isVisible={this.state.showAddTask} 
                    onCancel={() => this.setState({showAddTask: false})}
                    onSave={this.addTask}
                />
                
                <ImageBackground 
                    source={this.getImage()} 
                    style={styles.background}
                >
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} >
                            <Icon 
                                name="bars" 
                                size={20}
                                color={comonStyles.colors.secondary}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter} >
                            <Icon 
                                name={this.state.showDoneTasks ? "eye" : "eye-slash"} 
                                size={20}
                                color={comonStyles.colors.secondary}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.titleBar} >
                        <Text style={styles.title} >{this.props.title}</Text>
                        <Text style={styles.subtitle} >{today}</Text>
                    </View>   
                </ImageBackground>
                
                <View style={styles.taskList}>
                    <FlatList 
                        data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />}
                    />
                </View>
                
                <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => this.setState({showAddTask: true})} 
                    style={[styles.addButton, {backgroundColor: this.getColor()}]}>
                    <Icon 
                        name="plus" 
                        size={20}
                        color={comonStyles.colors.secondary} 
                    />
                </TouchableOpacity> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        position: "relative"
    },
    background:{
        flex:3
    },
    taskList:{
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: comonStyles.fontFamily,
        fontSize: 50, 
        color: comonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle: { 
        fontFamily: comonStyles.fontFamily,
        fontSize: 20, 
        color: comonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20,
    },  
    iconBar: {
        flexDirection: "row",
        marginHorizontal: 20,
        justifyContent: "space-between",
        marginTop: Platform.OS === "ios" ? 50 : 10,
    },
    addButton: {
        position: "absolute",
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    }

})