import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, TextInput, View } from 'react-native'
import { LOCAL_STORAGE_KEYS } from '@/src/constants'
import { saveToLocalStorage } from '@/dataHandler/saveToLocalStorage'
import { COLORS } from '@/src/colors'
import { ThemedText } from '@/components/ThemedText'
import { HelloWave } from '@/components/HelloWave'
import * as Updates from 'expo-updates'

export const UserDetailsModal = () => {
  const [modalVisible, setModalVisible] = useState(true)
  const [name, setName] = useState('')

  const restartApp = async () => {
    try {
      await Updates.reloadAsync() // Reloads the app
    } catch (error) {
      console.error('Error restarting app:', error)
    }
  }

  // Save user data and close modal
  const handleSaveDetails = async () => {
    if (name) {
      saveToLocalStorage(LOCAL_STORAGE_KEYS.UserData, name).then()
      setModalVisible(false)
      restartApp().then()
    } else {
      alert('Please fill all details')
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent
        animationType='fade'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <HelloWave
              waveCount={6}
              size={32}
            />
            <ThemedText
              style={styles.title}
              type={'subtitle'}>
              Hii, I'm Mylo 😃
            </ThemedText>
            <TextInput
              placeholder='What should i call you?'
              value={name}
              autoFocus
              onChangeText={setName}
              style={styles.input}
            />
            <Pressable
              onPress={handleSaveDetails}
              style={styles.button}>
              <ThemedText
                style={styles.buttonText}
                type={'subtitle'}>
                SAVE
              </ThemedText>
            </Pressable>
            <ThemedText style={styles.restartText}>
              App will restart after save
            </ThemedText>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundColor,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: COLORS.textColor,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#888',
    backgroundColor: COLORS.textColor,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#7851A9',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  restartText: {
    fontSize: 12,
    marginTop: 12,
    color: COLORS.lightGreyColor,
  },
})
