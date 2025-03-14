import { PropsWithChildren, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { COLORS } from '@/src/colors'

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useColorScheme() ?? 'light'

  return (
    <ThemedView style={{ backgroundColor: 'transparent', flex: 1 }}>
      <Pressable
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}>
        <IconSymbol
          name='chevron.right'
          size={18}
          weight='medium'
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <ThemedText
          type='defaultSemiBold'
          style={styles.title}>
          {title}
        </ThemedText>
      </Pressable>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'transparent',
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
    backgroundColor: 'transparent',
  },
  title: {
    color: COLORS.textColor,
  },
})
