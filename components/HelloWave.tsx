import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

import { ThemedText } from '@/components/ThemedText'

export function HelloWave({
  waveCount = 4,
  size = 20,
}: {
  waveCount?: number
  size?: number
}) {
  const rotationAnimation = useSharedValue(0)

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withSequence(
        withTiming(45, { duration: 150 }),
        withTiming(0, { duration: 150 }),
      ),
      waveCount,
    )
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }))

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={[styles.text, { fontSize: size }]}>👋</ThemedText>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    lineHeight: 32,
    marginTop: -6,
  },
})
