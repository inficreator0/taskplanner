import { StyleSheet, View } from 'react-native'
import { TimerApp } from '@/src/Timer/Timer'
import { COLORS } from '@/src/colors'

export default function startTracking() {
  return (
    <View style={styles.container}>
      <TimerApp />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.backgroundColor, flex: 1 },
})
