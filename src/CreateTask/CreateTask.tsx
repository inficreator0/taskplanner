import { Button, StyleSheet, TextInput, View } from 'react-native'
import { COLORS } from '@/src/colors'
import { useEffect, useState } from 'react'
import { saveToLocalStorage } from '@/dataHandler/saveToLocalStorage'
import { router } from 'expo-router'
import { getDataFromLocalStorage } from '@/dataHandler/getDataFromLocalStorage'
import { LOCAL_STORAGE_KEYS } from '@/src/constants'
import { Task } from '@/src/TaskList/TaskList'

export default function CreateTask() {
  const [value, setValue] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])

  const onTextChange = (text: string) => {
    setValue(text)
  }

  useEffect(() => {
    getDataFromLocalStorage(LOCAL_STORAGE_KEYS.Tasks).then((data) => {
      setTasks(data)
    })
  }, [])

  const createTask = () => {
    const taskId = tasks ? tasks?.[tasks?.length - 1]?.id + 1 : 1
    const task = {
      id: taskId,
      name: value,
      completionStatus: 0,
      createdOn: new Date().toISOString(),
    }

    const newTask = tasks ? [...tasks, task] : [task]

    saveToLocalStorage(LOCAL_STORAGE_KEYS.Tasks, newTask).then(() => {
      router.back()
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Task name...'}
        style={styles.textInput}
        value={value}
        onChangeText={onTextChange}
      />
      <Button
        title={'Create'}
        disabled={value.length === 0}
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
})
