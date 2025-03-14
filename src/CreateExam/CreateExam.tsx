import {
  Button,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native'
import { COLORS } from '@/src/colors'
import { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { saveToLocalStorage } from '@/dataHandler/saveToLocalStorage'
import { router } from 'expo-router'
import { LOCAL_STORAGE_KEYS } from '@/src/constants'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler'
import { DatePickerInput } from '@/components/DatePicker'
import { removeFromForm, updateDataInForm } from '@/src/utils'

export interface Exam {
  name: string
  subjects: Subject[]
  endDate: Date
}

export interface Chapter {
  name: string
  isCompleted: boolean
}

export interface Subject {
  name: string
  chapters: Chapter[]
  isCompleted: boolean
}

export interface ExamData {
  exam: Exam
  createdAt: string
}

export const CreateExam = () => {
  const [exam, setExam] = useState<Exam>({
    name: '',
    subjects: [
      {
        name: '',
        chapters: [{ name: '', isCompleted: false }],
        isCompleted: false,
      },
    ],
    endDate: new Date(),
  })

  const onTextChange =
    (key: string) => (value: string | Date | boolean | undefined) => {
      const updatedExam = updateDataInForm(key, value, exam)
      setExam(updatedExam)
    }

  const removeObject = (key: string) => () => {
    const updatedExam = removeFromForm(key, exam)
    setExam(updatedExam)
  }

  const createTask = () => {
    const examData = {
      exam,
      createdAt: new Date().toISOString(),
    }

    saveToLocalStorage(LOCAL_STORAGE_KEYS.Exam, examData).then(() => {
      router.back()
    })
  }

  const addSubjectInput = () => {
    const updatedExams = { ...exam }
    updatedExams.subjects.push({ name: '', chapters: [], isCompleted: false })
    setExam(updatedExams)
  }

  const addChapterInput = (index: number) => () => {
    const updatedExams = { ...exam }
    updatedExams.subjects?.[index].chapters.push({
      name: '',
      isCompleted: false,
    })
    setExam(updatedExams)
  }

  const isCreateDisabled =
    exam.name?.length === 0 ||
    exam.subjects?.[0]?.name.length === 0 ||
    exam.subjects?.[0]?.chapters?.[0]?.name?.length === 0

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ThemedText
        type={'subtitle'}
        style={{ color: COLORS.textColor, marginVertical: 12 }}>
        Create Exam :
      </ThemedText>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        horizontal={false}>
        <TextInput
          placeholder={'Add exam...'}
          style={styles.textInput}
          value={exam.name}
          onChangeText={onTextChange('exam.name')}
        />
        {exam.subjects?.map((subject, index) => {
          return (
            <ThemedView
              style={styles.subtask}
              key={index}>
              {subject.chapters.length && (
                <ThemedView
                  style={[styles.dashedLine, styles.dashedLineSubject]}
                />
              )}
              <ThemedView
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  width: '90%',
                  alignItems: 'center',
                  gap: 4,
                }}>
                <TextInput
                  placeholder={`Subject ${index + 1}`}
                  style={styles.textInput}
                  value={subject.name}
                  onChangeText={onTextChange(`exam.subjects.${index}.name`)}
                />
                {exam.subjects.length > 1 && (
                  <Pressable
                    onPress={removeObject(`exam.subjects.${index}`)}
                    hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                    <MaterialIcons
                      name='cancel'
                      size={20}
                      color={COLORS.lightGreyColor}
                    />
                  </Pressable>
                )}
              </ThemedView>
              {subject.chapters?.map((chapter, chapterIndex) => (
                <ThemedView
                  style={styles.chapters}
                  key={`${index}-${chapterIndex}`}>
                  <ThemedView style={styles.dashedLine} />
                  <TextInput
                    placeholder={`Chapter ${chapterIndex + 1}`}
                    style={styles.textInput}
                    value={chapter.name}
                    onChangeText={onTextChange(
                      `exam.subjects.${index}.chapters.${chapterIndex}.name`,
                    )}
                  />
                  {subject.chapters.length > 1 && (
                    <Pressable
                      onPress={removeObject(
                        `exam.subjects.${index}.chapters.${chapterIndex}`,
                      )}
                      hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                      <MaterialIcons
                        name='cancel'
                        size={20}
                        color={COLORS.lightGreyColor}
                      />
                    </Pressable>
                  )}
                </ThemedView>
              ))}
              <Pressable onPress={addChapterInput(index)}>
                <ThemedText
                  type={'defaultSemiBold'}
                  style={styles.subtaskButtonText}>
                  + ADD CHAPTERS
                </ThemedText>
              </Pressable>
            </ThemedView>
          )
        })}
        <Pressable
          onPress={addSubjectInput}
          style={styles.addSubject}>
          <ThemedText
            type={'defaultSemiBold'}
            style={styles.subtaskButtonText}>
            + ADD SUBJECT
          </ThemedText>
        </Pressable>
        <ThemedView style={styles.endDate}>
          <ThemedText style={styles.labelText}>End Date: </ThemedText>
          <DatePickerInput
            placeholder={'End date'}
            value={exam.endDate}
            onDateChange={onTextChange('exam.endDate')}
          />
        </ThemedView>

        <Button
          title={'Create'}
          disabled={isCreateDisabled}
          onPress={createTask}
          color={COLORS.buttonColor}
        />
        {isCreateDisabled && (
          <ThemedText style={styles.infoText}>
            Add at least one subject and one chapter
          </ThemedText>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundColor,
    flex: 1,
    paddingHorizontal: 20,
  },
  scroll: {
    flex: 1,
    marginBottom: 20,
  },
  subtaskButtonText: {
    color: COLORS.blueTextColor,
    fontSize: 12,
    marginTop: 6,
  },
  subtask: {
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: COLORS.backgroundColor,
  },
  chapters: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '85%',
    marginLeft: 20,
    marginTop: 6,
    alignItems: 'center',
    gap: 4,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    color: COLORS.backgroundColor,
    padding: 12,
    width: '100%',
    marginVertical: 12,
  },
  addSubject: {
    marginVertical: 6,
  },
  endDate: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 14,
    color: COLORS.lightGreyColor,
  },
  dashedLine: {
    position: 'absolute',
    left: -32,
    top: -40,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGreyColor,
    backgroundColor: 'transparent',
    height: '110%',
    width: 32,
    borderStyle: 'dashed',
  },
  dashedLineSubject: {
    top: 24,
    width: 16,
    left: -12,
    height: 10,
    borderLeftWidth: 0,
  },
  infoText: {
    color: COLORS.lightGreyColor,
    fontSize: 12,
    alignSelf: 'center',
  },
})
