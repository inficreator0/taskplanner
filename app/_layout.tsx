import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Header } from '@/src/Header/Header'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().then()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().then()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
        <StatusBar style={'auto'} />
        <Header />
        <GestureHandlerRootView>
          <Stack screenOptions={{ headerShown: false }}>
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
