import { StyleSheet, Text, View } from 'react-native';
import Navigator from './src/Navigator';
import './gesture-handler';
import TaskList from './src/screens/TaskList';

function App() { 
  return (
    <Navigator/>
  )}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});