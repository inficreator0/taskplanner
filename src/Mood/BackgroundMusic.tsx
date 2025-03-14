import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Audio } from 'expo-av'
import { COLORS } from '@/src/colors'

export const BackgroundMusic = () => {
  const soundRef = useRef<Audio.Sound | null>(null)

  useEffect(() => {
    const playMusic = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/music/motivational.mp3'),
          { isLooping: true, shouldPlay: true, volume: 0.7 },
        )
        soundRef.current = sound
        await sound.playAsync()
      } catch (error) {
        console.log('Error loading sound', error)
      }
    }

    // playMusic().then()

    return () => {
      if (soundRef.current) {
        soundRef.current.stopAsync().then()
        soundRef.current.unloadAsync().then()
      }
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎵 Background Music Playing 🎵</Text>
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
  text: {
    fontSize: 20,
    color: COLORS.textColor,
    fontWeight: 'bold',
  },
})
