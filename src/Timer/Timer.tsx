import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import Svg, { Line } from 'react-native-svg'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'
import { getHrMinSecFromSeconds } from '@/src/utils'
import { useLocalSearchParams } from 'expo-router'

const AnimatedLine = Animated.createAnimatedComponent(Line)

export const TimerApp = () => {
  const { taskId } = useLocalSearchParams()

  const TOTAL_TICKS = 60 // Number of tick marks (one per second)
  const RADIUS = 50 // Circle size
  const STROKE_WIDTH = 2 // Line thickness

  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const progress = useSharedValue(0) // Tracks tick progress

  useEffect(() => {
    let interval = undefined

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1)
        progress.value = withTiming((seconds + 1) / TOTAL_TICKS, {
          duration: 1000,
        })
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isRunning, seconds])

  const ticks = Array.from({ length: TOTAL_TICKS }).map((_, i) => {
    const angle = (i / TOTAL_TICKS) * 2 * Math.PI // Convert to radians
    const x1 = 60 + RADIUS * Math.cos(angle)
    const y1 = 60 + RADIUS * Math.sin(angle)
    const x2 = 60 + (RADIUS + 10) * Math.cos(angle)
    const y2 = 60 + (RADIUS + 10) * Math.sin(angle)
    return { x1, y1, x2, y2 }
  })

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Svg
        height='140'
        width='140'
        viewBox='0 0 120 120'
        style={{ transform: [{ rotate: '-90deg' }] }}>
        {ticks.map((tick, index) => (
          <AnimatedLine
            key={index}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={index < seconds % 60 ? '#3498db' : '#f6f6f6'}
            strokeWidth={STROKE_WIDTH}
          />
        ))}
      </Svg>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'semibold',
          color: 'white',
          marginTop: 10,
        }}>
        {getHrMinSecFromSeconds(seconds)}
      </Text>
      <Pressable
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: isRunning ? 'red' : 'green',
          borderRadius: 10,
        }}
        onPress={() => setIsRunning(!isRunning)}>
        <Text style={{ color: 'white', fontSize: 18 }}>
          {isRunning ? 'Pause' : 'Start'}
        </Text>
      </Pressable>
      <Pressable
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: 'gray',
          borderRadius: 10,
        }}
        onPress={() => {
          setSeconds(0)
          setIsRunning(false)
          progress.value = 0
        }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Reset</Text>
      </Pressable>
    </View>
  )
}
