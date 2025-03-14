import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { cardBackgroundColor, LOCAL_STORAGE_KEYS } from '@/src/constants'
import { StyleSheet, View } from 'react-native'
import { HelloWave } from '@/components/HelloWave'
import { ThemedText } from '@/components/ThemedText'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { getDataFromLocalStorage } from '@/dataHandler/getDataFromLocalStorage'
import { COLORS } from '@/src/colors'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().then()

const Header = ({ name }: { name: string }) => {
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
        <ThemedText style={styles.headerText}>{name}</ThemedText>
      </View>
      <ThemedText style={styles.headerText}> 24 🔥</ThemedText>
    </LinearGradient>
  )
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [userName, setUserName] = useState('')
  const [localDataLoaded, setLocalDataLoaded] = useState(false)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded && localDataLoaded) {
      SplashScreen.hideAsync().then()
    }
  }, [loaded && localDataLoaded])

  useEffect(() => {
    getDataFromLocalStorage(LOCAL_STORAGE_KEYS.UserData).then((data) => {
      if (data) {
        setUserName(data)
      }
      setLocalDataLoaded(true)
    })
  }, [])

  if (!loaded || !localDataLoaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
        <StatusBar style={'auto'} />
        <Header name={userName} />
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen
              name='index'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='createTask'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='tasks'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='moodUplift'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='startTracking'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='vision'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='exams'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='createExam'
              options={{ headerShown: false }}
            />
            <Stack.Screen name='+not-found' />
          </Stack>
        </GestureHandlerRootView>
      </SafeAreaView>
    </ThemeProvider>
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
