import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { Pressable, StyleSheet, View } from 'react-native'
import { cardBackgroundColor, cardBorderColor } from '@/src/constants'
import { Task } from '@/src/TaskList/TaskList'
import { useState } from 'react'
import LottieView from 'lottie-react-native'
import { COLORS } from '@/src/colors'
import Animated from 'react-native-reanimated'
import { useConfettiAnimation } from '@/hooks/useConfettiAnimation'
import { LinearGradient } from 'expo-linear-gradient'
import { getDate } from '@/src/utils'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export const TaskCard = ({
  item,
  onDeleteTask,
}: {
  item: Task
  onDeleteTask: (taskId: number) => void
}) => {
  const [maskDone, setMaskDone] = useState(false)

  const { animatedStyle } = useConfettiAnimation({
    animationHeight: 40,
    animationWidth: 200,
  })

  const handleDoneMark = () => {
    setMaskDone(true)
  }

  const deleteTask = () => {
    onDeleteTask(item.id)
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[
        COLORS.backgroundColor,
        cardBackgroundColor,
        COLORS.backgroundColor,
      ]}
      style={styles.taskItemContainer}>
      <Pressable
        onPress={deleteTask}
        style={{ position: 'absolute', right: -8, top: -8 }}
        hitSlop={{ top: 10, bottom: 0, left: 10 }}>
        <MaterialIcons
          name='cancel'
          size={20}
          color={COLORS.lightGreyColor}
        />
      </Pressable>
      {maskDone && (
        <Animated.View
          style={[
            animatedStyle,
            {
              position: 'absolute',
              zIndex: 50,
            },
          ]}>
          <LottieView
            source={require('../../assets/lottie/confetti.json')}
            autoPlay
            loop
            speed={3}
            resizeMode={'center'}
            style={{
              flex: 1,
              position: 'absolute',
              zIndex: 50,
              height: '100%',
              width: '100%',
            }}
          />
        </Animated.View>
      )}
      <ThemedView style={styles.timeContainer}>
        <ThemedText style={styles.createOn}>
          Created : {getDate(item.createdOn)}
        </ThemedText>
      </ThemedView>
      <View style={styles.flexRow}>
        <ThemedText style={styles.taskName}>{item.name}</ThemedText>
        {maskDone ? (
          <ThemedText style={{}}>✅</ThemedText>
        ) : (
          <Pressable onPress={handleDoneMark}>
            <ThemedText style={styles.status}>{'Mark as done'}</ThemedText>
          </Pressable>
        )}
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  flexRow: { flexDirection: 'row', justifyContent: 'space-between' },
  taskItemContainer: {
    marginVertical: 8,
    borderRadius: 12,
    marginHorizontal: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: cardBorderColor,
    paddingHorizontal: 20,
    paddingVertical: 4,
    height: 100,
    gap: 8,
    elevation: 10,
    shadowColor: cardBorderColor,
  },
  taskName: {
    fontSize: 16,
    color: COLORS.textColor,
  },
  createOn: {
    fontSize: 10,
    color: '#a1a1a1',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    height: 40,
  },
  status: {
    fontSize: 12,
    color: '#f5f5f5',
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
    borderColor: cardBorderColor,
  },
  timeContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
