import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { FlatList, StyleSheet } from 'react-native'
import { COLORS } from '@/src/colors'
import { Motivation } from '@/src/Mood/Motivation'
import { BackgroundMusic } from '@/src/Mood/BackgroundMusic'

interface IQuotes {
  text: string
  author: string
}

const quotes: IQuotes[] = [
  {
    text: 'It’s not who I am underneath, but what I do that defines me.',
    author: 'Batman',
  },
  { text: 'With great power comes great responsibility.', author: 'Uncle Ben' },
  { text: 'A hero can be anyone.', author: 'Batman' },
  {
    text: 'You either die a hero or live long enough to see yourself become the villain.',
    author: 'Harvey Dent',
  },
  {
    text: 'Hope is like your car keys. Easy to lose, but if you dig around, it’s usually close by.',
    author: 'Superman',
  },
  {
    text: 'The world isn’t perfect, but it’s the only one we’ve got.',
    author: 'Tony Stark',
  },
  { text: 'We are stronger together than apart.', author: 'Wonder Woman' },
  {
    text: 'Sometimes the truth isn’t good enough. Sometimes people deserve more.',
    author: 'Batman',
  },
  {
    text: 'No matter how bad things get, something good is out there, over the horizon.',
    author: 'Wonder Woman',
  },
  {
    text: 'The hardest choices require the strongest wills.',
    author: 'Thanos',
  },
  { text: 'Fear doesn’t make you weak. It makes you human.', author: 'Batman' },
  {
    text: 'A hero isn’t measured by the size of their strength, but by the strength of their heart.',
    author: 'Zeus (Hercules)',
  },
  {
    text: 'If you’re nothing without it, then you shouldn’t have it.',
    author: 'Tony Stark',
  },
]

export const Mood = () => {
  const renderItem = ({ item }: { item: IQuotes }) => {
    return (
      <ThemedView style={styles.quoteSection}>
        <ThemedText style={styles.quoteText}>{item.text}</ThemedText>
        <ThemedText
          style={{
            fontSize: 12,
            alignSelf: 'flex-end',
            color: '#a1a1a1',
          }}>
          -- {item.author}
        </ThemedText>
      </ThemedView>
    )
  }
  return (
    <ThemedView style={styles.container}>
      <BackgroundMusic />
      <FlatList
        ListHeaderComponent={<Motivation />}
        data={quotes}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    paddingHorizontal: 20,
  },
  quoteSection: {
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  quoteText: {
    fontSize: 28,
    lineHeight: 30,
    color: COLORS.textColor,
    textAlign: 'center',
  },
})
