import { Alert, Platform } from "react-native";

const server = Platform.OS === "ios"
    ? "http://192.168.0.181:3000" : "http://192.168.0.181:3000";
    // ? "http://10.3.77.97:3000" : "http://10.3.77.97:3000";
    
function showError(err) {
    if(err.response && err.response.data){
        Alert.alert("Oops! An error ocurred!", `Message: ${err.response.data}`);
    }else{
        Alert.alert("Oops! An error ocurred!", `Status: ${err.response.status}`);
    }
    
}

function showSuccess(msg) {
    Alert.alert("Success", msg);
}

export {server, showError, showSuccess};