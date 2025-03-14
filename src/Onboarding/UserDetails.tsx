import React, { useEffect, useState } from 'react'
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { getDataFromLocalStorage } from '@/dataHandler/getDataFromLocalStorage'
import { LOCAL_STORAGE_KEYS } from '@/src/constants'
import { saveToLocalStorage } from '@/dataHandler/saveToLocalStorage'

export const UserDetailsModal = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    getDataFromLocalStorage(LOCAL_STORAGE_KEYS.UserData).then((data) => {
      if (data) {
        setName(data)
      }
    })
  }, [])

  // Save user data and close modal
  const handleSaveDetails = async () => {
    if (name) {
      saveToLocalStorage(LOCAL_STORAGE_KEYS.UserData, name).then()
      setModalVisible(false)
    } else {
      alert('Please fill all details')
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent
        animationType='slide'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Enter Your Details</Text>

            <TextInput
              placeholder='Name'
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <Pressable
              onPress={handleSaveDetails}
              style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
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
    color: 'white',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#888',
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
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
})
