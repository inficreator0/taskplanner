import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { saveToLocalStorage } from '@/dataHandler/saveToLocalStorage'
import { LOCAL_STORAGE_KEYS, WINDOW_HEIGHT } from '@/src/constants'
import { getDataFromLocalStorage } from '@/dataHandler/getDataFromLocalStorage'
import { COLORS } from '@/src/colors'

export const VisionBoard = () => {
  const [note, setNote] = useState('')

  useEffect(() => {
    loadNote().then()
  }, [])

  const saveNote = () => {
    saveToLocalStorage(LOCAL_STORAGE_KEYS.VisionBoard, note).then()
    alert('Note saved successfully.')
  }

  const loadNote = async () => {
    getDataFromLocalStorage(LOCAL_STORAGE_KEYS.VisionBoard).then((data) => {
      if (data) {
        setNote(data)
      }
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.notepadContainer}>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder='Start writing here...'
          placeholderTextColor={COLORS.lightGreyColor}
          value={note}
          onChangeText={(text) => setNote(text)}
          onBlur={saveNote}
        />
      </ScrollView>
      <Pressable
        style={styles.button}
        onPress={saveNote}>
        <Text style={styles.buttonText}>💾 SAVE</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    padding: 20,
  },
  notepadContainer: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 12,
  },
  textInput: {
    fontSize: 16,
    color: COLORS.textColor,
    minHeight: WINDOW_HEIGHT - 200,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#6A0DAD',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.textColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
