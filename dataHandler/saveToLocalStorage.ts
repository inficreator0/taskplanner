import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveToLocalStorage = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value)) // Store data as a string
    console.log(`Data with key: ${key} saved!`)
  } catch (error) {
    console.error('Error saving data:', error)
  }
}
