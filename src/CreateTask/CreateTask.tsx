import { Button, Pressable, StyleSheet, TextInput, View } from 'react-native'
import { COLORS } from '@/src/colors'
import { useEffect, useState } from 'react'
import { saveToLocalStorage } from '@/dataHandler/saveToLocalStorage'
import { router } from 'expo-router'
import { getDataFromLocalStorage } from '@/dataHandler/getDataFromLocalStorage'
import { LOCAL_STORAGE_KEYS } from '@/src/constants'
import { Task } from '@/src/TaskList/TaskList'
import { ThemedText } from '@/components/ThemedText'
import { updateDataInForm } from '../utils'
import { FlatList } from 'react-native-gesture-handler'

export default function CreateTask() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [alreadyCreatedTasks, setAlreadyCreatedTask] = useState<Task[]>([])

  const onTextChange = (index: number) => (text: string) => {
    const updatedValue = [...tasks]
    updatedValue[index] = { ...updatedValue[index], name: text}
    setTasks(updatedValue)
  }

  useEffect(() => {
    getDataFromLocalStorage(LOCAL_STORAGE_KEYS.Tasks).then((data) => {
      setAlreadyCreatedTask(data)
      setTasks([{
        id: data.length + 1,
        name: '',
        completionStatus: false,
        createdOn: new Date().toISOString(),
      }])
    })
  }, [])

  const createTask = () => {
    const newTasks = [...alreadyCreatedTasks, ...tasks]
    saveToLocalStorage(LOCAL_STORAGE_KEYS.Tasks, newTasks).then(() => {
      router.back()
    })
  }

  const addTask = () => {
    const newTasks = [...tasks]
    newTasks.push({
      id: alreadyCreatedTasks.length + newTasks.length + 1,
      name: '',
      completionStatus: false,
      createdOn: new Date().toISOString(),
    })
    setTasks(newTasks)
  }

  return (
    <View style={styles.container}>
      {tasks.map((task, index) => (
        <TextInput
          placeholder={'Task name...'}
          key={task.id}
          style={styles.textInput}
          value={task.name}
          onChangeText={onTextChange(index)}
        />
      ))}
      <Pressable onPress={addTask}>
        <ThemedText
          type={'defaultSemiBold'}
          style={styles.subtaskButtonText}>
          + ADD TASK
        </ThemedText>
      </Pressable>
      <Button
        title={'Create'}
        onPress={createTask}
        color={COLORS.buttonColor}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundColor,
    flex: 1,
    padding: 20,
    gap: 20,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    color: COLORS.backgroundColor,
    padding: 12,
  },
  subtaskButtonText: {
    color: COLORS.blueTextColor,
    fontSize: 12,
    marginTop: 6,
  },
})
