import AsyncStorage from '@react-native-async-storage/async-storage'

export const getDataFromLocalStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value ? JSON.parse(value) : null // Convert string back to object
  } catch (error) {
    console.error('Error retrieving data:', error)
  }
}
