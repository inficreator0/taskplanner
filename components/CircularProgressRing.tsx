import React from 'react'
import Svg, { Circle } from 'react-native-svg'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '@/src/colors'

export const CircularProgress = ({
  progress = 50,
  total = 100,
  label = '',
  strokeColor = '#4CAF50',
  progressBackgroundColor = '#ddd',
  showPercentage = true,
}) => {
  const RADIUS = 50 // Circle radius
  const STROKE_WIDTH = 8 // Stroke width
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS // Full circumference

  const percentage = (progress / total) * CIRCUMFERENCE
  const percentText = (progress / total) * 100

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg
        width='120'
        height='120'
        viewBox='0 0 120 120'>
        {/* Background Circle */}
        <Circle
          cx='60'
          cy='60'
          r={RADIUS}
          stroke={progressBackgroundColor}
          strokeWidth={STROKE_WIDTH}
          fill='none'
        />
        {/* Progress Circle */}
        <Circle
          cx='60'
          cy='60'
          r={RADIUS}
          stroke={strokeColor} // Default Green progress color
          strokeWidth={STROKE_WIDTH}
          fill='none'
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE - percentage}
          strokeLinecap='round'
          transform='rotate(-90 60 60)' // Start from top
        />
        {/* Percentage Text */}
        {showPercentage ? (
          <Text style={styles.percentage}>{percentText}%</Text>
        ) : (
          <Text style={styles.percentage}>{progress}</Text>
        )}
      </Svg>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: COLORS.lightGreyColor,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
  percentage: {
    fontSize: 20,
    top: 45,
    color: COLORS.textColor,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
})
