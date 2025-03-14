import { FlatList, Pressable, StyleSheet } from 'react-native'

import { ThemedView } from '@/components/ThemedView'
import { LinearGradient } from 'expo-linear-gradient'
import {
  cardBackgroundColor,
  cardBorderColor,
  WINDOW_WIDTH,
} from '@/src/constants'
import { ThemedText } from '@/components/ThemedText'
import { router } from 'expo-router'
import { COLORS } from '@/src/colors'

interface Cards {
  id: number
  name: string
  redirectionUrl: string
}

const cards = [
  { id: 1, name: 'track tasks ⏳', redirectionUrl: '/tasks' },
  // { id: 2, name: 'Check stats 📈', redirectionUrl: '/checkStats' },
  { id: 3, name: 'Vision board 📝 🤔', redirectionUrl: '/vision' },
  { id: 4, name: 'Feeling low ?? 💔', redirectionUrl: '/moodUplift' },
  { id: 5, name: 'Prepare for exams 📚', redirectionUrl: '/exams' },
]

export default function Home() {
  const renderItems = ({ item }: { item: Cards }) => {
    const handleOnPress = () => {
      item.redirectionUrl && router.push(item.redirectionUrl as any)
    }

    return (
      <Pressable
        onPress={handleOnPress}
        style={styles.card}>
        <LinearGradient
          style={styles.gradient}
          colors={[
            COLORS.backgroundColor,
            cardBackgroundColor,
            COLORS.backgroundColor,
          ]}>
          <ThemedText
            style={styles.cardText}
            type={'title'}>
            {item.name}
          </ThemedText>
        </LinearGradient>
      </Pressable>
    )
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={cards}
        numColumns={2}
        renderItem={renderItems}
        ListFooterComponent={
          <ThemedView style={styles.quoteSection}>
            <ThemedText style={styles.quoteText}>
              Sometimes you gotta run before you can walk
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 12,
                alignSelf: 'flex-end',
                color: '#a1a1a1',
              }}>
              -- IronMan
            </ThemedText>
          </ThemedView>
        }
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 12,
    elevation: 10,
    borderRadius: 8,
    backgroundColor: cardBackgroundColor,
    shadowColor: 'white',
  },
  gradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: cardBorderColor,
    borderRadius: 8,
    height: 120,
    width: (WINDOW_WIDTH - 80) / 2,
  },
  cardText: {
    color: COLORS.textColor,
    fontSize: 18,
    textTransform: 'capitalize',
  },
  quoteSection: {
    marginTop: 40,
    backgroundColor: 'transparent',
    height: 120,
  },
  quoteText: {
    fontSize: 32,
    lineHeight: 32,
    color: COLORS.motivationTextColor,
    textAlign: 'center',
  },
})
