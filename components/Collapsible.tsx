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
  rightText
}: PropsWithChildren & { title: string , rightText?: string}) {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useColorScheme() ?? 'light'

  return (
    <ThemedView style={{ backgroundColor: 'transparent', flex: 1 }}>
      <Pressable
        style={[styles.heading, styles.spaceBetween]}
        hitSlop={{top: 4, bottom: 4}}
        onPress={() => setIsOpen((value) => !value)}>
        <ThemedView style={styles.heading}>
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
        </ThemedView>

        <ThemedText
          type='default'
          style={styles.rightText}>
          {rightText}
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
  spaceBetween: {
    justifyContent: 'space-between',
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
    backgroundColor: 'transparent',
  },
  title: {
    color: COLORS.textColor,
  },
  rightText: {
    alignSelf: 'flex-end',
    color: COLORS.lightGreyColor,
    fontSize: 12
  },
})
