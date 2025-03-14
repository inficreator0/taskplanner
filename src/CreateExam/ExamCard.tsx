import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { Pressable, StyleSheet, View } from 'react-native'
import {
  cardBackgroundColor,
  cardBorderColor,
  LOCAL_STORAGE_KEYS,
} from '@/src/constants'
import { COLORS } from '@/src/colors'
import { Chapter, Exam, ExamData, Subject } from '@/src/CreateExam/CreateExam'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { saveToLocalStorage } from '@/dataHandler/saveToLocalStorage'
import { CircularProgress } from '@/components/CircularProgressRing'
import { getDate, getDateDifference, updateDataInForm } from '@/src/utils'
import { Collapsible } from '@/components/Collapsible'
import { Fontisto } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'

const Subjects = ({
  subjects,
  markChapterDone,
}: {
  subjects: Subject[]
  markChapterDone: (
    index: number,
  ) => (subjectIndex: number) => (value: boolean) => () => void
}) => {
  return (
    <ThemedView
      style={{
        gap: 4,
        backgroundColor: 'transparent',
        flex: 1,
      }}>
      {subjects?.map((subject, index) => {
        const completedChapters = subject.chapters.filter(
          (chapter) => chapter.isCompleted,
        )?.length
        const totalChapters = subject.chapters?.length

        const perc = (+(completedChapters / totalChapters).toFixed(4) * 100).toString().slice(0, 5) + '%'

        return (
          <ThemedView
            key={subject.name}
            style={[styles.subTaskItem, { borderTopWidth: index ? 1 : 0 }]}>
            {totalChapters && (
              <Collapsible
                title={subject.name}
                rightText={perc}>
                <Chapters
                  chapters={subject.chapters}
                  markChapterDone={markChapterDone}
                  subjectIndex={index}
                />
              </Collapsible>
            )}
          </ThemedView>
        )
      })}
    </ThemedView>
  )
}

const Chapters = ({
  chapters,
  markChapterDone,
  subjectIndex,
}: {
  chapters: Chapter[]
  markChapterDone: (
    index: number,
  ) => (subjectIndex: number) => (value: boolean) => () => void
  subjectIndex: number
}) => {
  return (
    <ThemedView
      style={{
        gap: 4,
        backgroundColor: 'transparent',
        flex: 1,
      }}>
      {chapters?.map((chapter, index) => (
        <ThemedView
          key={chapter.name}
          style={[styles.subTaskItem, { borderTopWidth: index ? 1 : 0 }]}>
          <Pressable
            style={styles.chapter}
            onPress={markChapterDone(index)(subjectIndex)(
              !chapter.isCompleted,
            )}>
            <ThemedText style={styles.buttonText}>{chapter.name}</ThemedText>
            <Fontisto
              name={
                chapter.isCompleted ? 'radio-btn-active' : 'radio-btn-passive'
              }
              size={20}
              color={
                chapter.isCompleted ? COLORS.lightGreen : COLORS.lightGreyColor
              }
            />
          </Pressable>
        </ThemedView>
      ))}
    </ThemedView>
  )
}

export const ExamCard = ({
  item: { exam, createdAt },
  onDeleteExam,
}: {
  item: ExamData
  onDeleteExam: () => void
}) => {
  const [isUpdated, setIsUpdated] = useState({ updated: false }) // using this to update the component when chapter status is changed

  const deleteExam = () => {
    saveToLocalStorage(LOCAL_STORAGE_KEYS.Exam, null).then()
    onDeleteExam()
  }

  const completionStatus = () => {
    let totalChapter = 0
    let completedChapter = 0
    exam.subjects.map((subject) => {
      subject.chapters.forEach((chapter) => {
        totalChapter++
        chapter.isCompleted && completedChapter++
      })
    })

    return +(+(completedChapter / totalChapter).toFixed(4) * 100)
      .toString()
      .slice(0, 4)
  }

  const daysProgress = getDateDifference(createdAt, exam.endDate)
  const leftDays = getDateDifference(new Date(), exam.endDate)

  const markChapterDone =
    (chapterIndex: number) =>
    (subjectIndex: number) =>
    (value: boolean) =>
    () => {
      const updatedExam = updateDataInForm(
        `exam.subjects.${subjectIndex}.chapters.${chapterIndex}.isCompleted`,
        value,
        exam,
      )
      const examData = {
        exam: updatedExam,
        createdAt,
      }
      saveToLocalStorage(LOCAL_STORAGE_KEYS.Exam, examData).then(() => {
        // using this state to rerender the card
        setIsUpdated({ updated: true })
      })
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
      style={styles.taskItem}>
      <ThemedView style={styles.timeContainer}>
        <ThemedText style={styles.createOn}>
          Created : {getDate(createdAt)}
        </ThemedText>
        <ThemedText style={styles.createOn}>
          End Date : {getDate(exam.endDate)}
        </ThemedText>
      </ThemedView>
      <View style={styles.flexRow}>
        <ThemedText
          style={styles.taskName}
          type={'title'}>
          {exam.name}
        </ThemedText>
        <Pressable
          onPress={deleteExam}
          hitSlop={{ top: 10, bottom: 0, left: 10 }}>
          <MaterialIcons
            name='delete'
            size={24}
            color={COLORS.redCrossColor}
          />
        </Pressable>
      </View>
      <ThemedView style={styles.flexRow}>
        <CircularProgress
          progress={completionStatus()}
          total={100}
          label={'Syllabus Completed'}
        />
        <CircularProgress
          progress={leftDays}
          total={daysProgress}
          showPercentage={false}
          label={'Days left'}
        />
      </ThemedView>
      <ThemedView style={styles.subjectContainer}>
        <Subjects
          subjects={exam.subjects}
          markChapterDone={markChapterDone}
        />
      </ThemedView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  taskItem: {
    borderWidth: 1,
    borderColor: cardBorderColor,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: cardBackgroundColor,
    gap: 8,
    elevation: 10,
    shadowColor: cardBorderColor,
    flex: 1,
  },
  taskName: {
    fontSize: 20,
    color: '#f6f6f6',
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
  headerText: {
    color: '#f6f6f6',
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
  buttonText: {
    fontSize: 12,
    color: '#f5f5f5',
  },
  timeContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subTaskItem: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    borderColor: cardBorderColor,
    alignItems: 'center',
    minHeight: 40,
  },
  chapter: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 40,
  },
  subjectContainer: {
    marginTop: 12,
    backgroundColor: 'transparent',
  },
})
