import { FlatList, Pressable, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { router, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { getDataFromLocalStorage } from '@/dataHandler/getDataFromLocalStorage'
import { COLORS } from '@/src/colors'
import { TaskCard } from '@/src/TaskList/TaskCard'
import { LOCAL_STORAGE_KEYS } from '@/src/constants'
import { saveToLocalStorage } from '@/dataHandler/saveToLocalStorage'

export interface Task {
  id: number
  name: string
  completionStatus: boolean
  createdOn: Date
}

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const handleOnPress = () => {
    router.push('/createTask')
  }

  useFocusEffect(
    useCallback(() => {
      getDataFromLocalStorage(LOCAL_STORAGE_KEYS.Tasks).then((data) => {
        if (data) {
          setTasks(data)
        }
      })
    }, []),
  )

  const onDeleteTask = (id: number) => {
    const updateTask = tasks.filter((task) => task.id !== id)
    setTasks(updateTask)
    saveToLocalStorage(LOCAL_STORAGE_KEYS.Tasks, updateTask).then()
  }

  const renderItems = ({ item }: { item: Task }) => {
    return (
      <TaskCard
        item={item}
        onDeleteTask={onDeleteTask}
      />
    )
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[COLORS.backgroundColor, COLORS.backgroundColor]}
      style={styles.container}>
      <ThemedView style={styles.subHeader}>
        <ThemedText style={styles.headerText}>Today: 1 completed</ThemedText>
        <Pressable
          style={styles.button}
          onPress={handleOnPress}>
          <ThemedText style={styles.buttonText}> + Create Task</ThemedText>
        </Pressable>
      </ThemedView>

      {tasks.length ? (
        <FlatList
          data={tasks}
          renderItem={renderItems}
          style={styles.flatList}
          initialNumToRender={8}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ThemedText
          type={'defaultSemiBold'}
          style={{
            color: COLORS.textColor,
            fontSize: 36,
            margin: 'auto',
            lineHeight: 42,
            textAlign: 'center',
          }}>
          📑 Start creating your tasks
        </ThemedText>
      )}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonText: {
    fontSize: 12,
    color: '#f5f5f5',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderColor: 'grey',
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  flatList: {
    marginVertical: 12,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    height: 40,
    marginVertical: 4,
  },
  headerText: {
    color: COLORS.textColor,
  },
})
