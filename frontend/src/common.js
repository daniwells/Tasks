import { Alert } from "react-native";

const server = "<ip_server>:3000";
    
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
