import { StyleSheet, View } from 'react-native'

export const LinearProgressBar = (props: { progress: number }) => {
  return (
    <View style={styles.progressContainer}>
      <View
        style={[styles.progress, { width: `${props.progress * 100}%` }]}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  progressContainer: {
    position: 'absolute',
    bottom: 8,
    left: 20,
    backgroundColor: '#2b4438',
    height: 6,
    borderRadius: 12,
    width: '100%',
  },
  progress: {
    borderRadius: 12,
    height: 6,
    backgroundColor: 'green',
  },
})
