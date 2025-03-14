import React, { useState } from 'react'
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { COLORS } from '@/src/colors'
import { FontAwesome } from '@expo/vector-icons'

interface DatePickerProps {
  placeholder?: string
  value: Date
  onDateChange: (date: Date | undefined) => void
}

export const DatePickerInput = (props: DatePickerProps) => {
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)

  const handleDateChange = (_: any, selectedDate: Date | undefined) => {
    setShow(false) // Hide picker after selection
    if (selectedDate) setDate(selectedDate)
    props.onDateChange(selectedDate)
  }

  return (
    <View style={styles.container}>
      {/* Pressable Input Field to Open Date Picker */}
      <Pressable
        onPress={() => setShow(true)}
        style={{ width: 250 }}>
        <TextInput
          value={date.toLocaleDateString()} // Format DD/MM/YYYY
          editable={false} // Prevent manual typing
          style={styles.textInput}
          placeholder={props.placeholder}
        />
        <FontAwesome
          name='calendar'
          size={24}
          color='grey'
          style={{ position: 'absolute', top: 20, right: 10 }}
        />
      </Pressable>

      {/* Date Picker (Only visible when `show` is true) */}
      {show && (
        <DateTimePicker
          value={date}
          mode='date'
          display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Different styles for iOS & Android
          onChange={handleDateChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    color: COLORS.backgroundColor,
    padding: 12,
    width: '100%',
    marginVertical: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
})
