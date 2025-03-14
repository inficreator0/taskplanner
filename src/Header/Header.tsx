import { useEffect, useState } from 'react'
import { getDataFromLocalStorage } from '@/dataHandler/getDataFromLocalStorage'
import { cardBackgroundColor, LOCAL_STORAGE_KEYS } from '@/src/constants'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '@/src/colors'
import { StyleSheet, View } from 'react-native'
import { HelloWave } from '@/components/HelloWave'
import { ThemedText } from '@/components/ThemedText'

export const Header = () => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    getDataFromLocalStorage(LOCAL_STORAGE_KEYS.UserData).then((data) => {
      if (data) {
        setUserName(data)
      }
    })
  }, [])

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[
        cardBackgroundColor,
        COLORS.backgroundColor,
        COLORS.backgroundColor,
      ]}
      style={styles.header}>
      <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 4 }}>
        <HelloWave />
        <ThemedText style={styles.headerText}>{userName}</ThemedText>
      </View>
      {/*<ThemedText style={styles.headerText}> 24 🔥</ThemedText>*/}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 20,
    backgroundColor: cardBackgroundColor,
  },
  headerText: {
    color: '#f6f6f6',
  },
})
