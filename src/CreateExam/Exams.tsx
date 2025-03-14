import { FlatList, Pressable, StyleSheet } from 'react-native'
import { COLORS } from '@/src/colors'
import { ThemedView } from '@/components/ThemedView'
import { router, useFocusEffect } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { useCallback, useState } from 'react'
import { getDataFromLocalStorage } from '@/dataHandler/getDataFromLocalStorage'
import { LOCAL_STORAGE_KEYS } from '@/src/constants'
import { ExamData } from '@/src/CreateExam/CreateExam'
import { ExamCard } from '@/src/CreateExam/ExamCard'
import Animated from 'react-native-reanimated'
import LottieView from 'lottie-react-native'
import { useConfettiAnimation } from '@/hooks/useConfettiAnimation'

export const Exams = () => {
  const [exam, setExam] = useState<ExamData[]>([])

  const createExam = () => {
    router.push('/createExam')
  }

  const { animatedStyle } = useConfettiAnimation({})

  useFocusEffect(
    useCallback(() => {
      getDataFromLocalStorage(LOCAL_STORAGE_KEYS.Exam).then(
        (data: ExamData) => {
          if (data) {
            setExam([data])
          }
        },
      )
    }, []),
  )

  const renderItem = ({ item }: { item: ExamData }) => {
    return (
      <ExamCard
        item={item}
        key={item.createdAt}
      />
    )
  }

  return (
    <ThemedView style={styles.container}>
      {false && (
        <Animated.View
          style={[
            animatedStyle,
            {
              position: 'absolute',
              left: '10%',
              zIndex: 50,
              height: '100%',
              width: '100%',
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
      <FlatList
        data={exam}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <Pressable
            onPress={createExam}
            style={styles.button}>
            <ThemedText
              style={styles.buttonText}
              type={'subtitle'}>
              {exam.length ? `Update ${exam[0].exam.name}` : '+ Create Exam'}
            </ThemedText>
          </Pressable>
        }
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  buttonText: {
    color: COLORS.textColor,
  },
  button: {
    borderColor: COLORS.lightGreyColor,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 12,
    marginHorizontal: 20,
  },
})
