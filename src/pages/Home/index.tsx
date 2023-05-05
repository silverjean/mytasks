import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {TaskList} from '../../components/TaskList';
import {useTaskList} from '../../context/TasksContext';

export default function Home() {
  const [newTask, setNewTask] = useState('');
  const {addTask} = useTaskList();

  const handleAddNewTask = () => {
    const data = {
      id: String(new Date().getTime()),
      title: newTask ? newTask : 'Task empty',
    };

    addTask(data);

    setNewTask('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome, Dev!</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#555"
          placeholder="Insira a nova tarefa"
          onChangeText={setNewTask}
          value={newTask}
        />
        <TouchableOpacity
          onPress={handleAddNewTask}
          activeOpacity={0.4}
          style={styles.button}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>

        <Text style={styles.titleTasks}>Minhas Tarefas</Text>

        <TaskList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    paddingHorizontal: 30,
  },
  title: {
    color: '#f1f1f1',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 40,
  },
  input: {
    backgroundColor: '#29292e',
    color: '#f1f1f1',
    fontSize: 18,
    padding: Platform.OS === 'android' ? 12 : 15,
    marginTop: 30,
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#eba417',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#121214',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleTasks: {
    color: '#f1f1f1',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  buttonTask: {
    backgroundColor: '#29292e',
    padding: 10,
    marginTop: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  titleTask: {
    color: '#f1f1f1',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
