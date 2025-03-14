import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '@/src/colors'

export const Motivation = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🔥WAKE UP! YOU CAN DO THIS I BELIEVE IN YOU! 🔥
      </Text>
      <Text style={styles.heading}>💡 Think About Your Future Self</Text>
      <Text style={styles.text}>
        Imagine yourself a few years from now, you are on a vacation with the
        love of your life roaming in the streets of your favourite county. Don't
        just read, imagine it.{'\n\n'} Take a moment, feel it. {'\n\n'} You are
        on top of everything you once dreamed of. This version of you who made
        it. Would that version of you thank you for pushing through? Or would
        they look back in disappointment, wondering why you gave up?
        {'\n'}
        {'\n'}The power to shape that future is in your hands. RIGHT NOW.
      </Text>

      <Text style={styles.heading}>
        🔥 I KNOW IT CAN BE TIRING… BUT KEEP GOING! 🔥
      </Text>
      <Text style={styles.text}>
        I know… I know it’s hard. I know you’re tired. I know exactly what you
        are feeling right now. I was also a student once. I know sometimes it
        feels like “What’s the point? Why am I even doing this?” But listen to
        me: This is the exact moment when most people quit. {'\n\n'} You are not
        amongst them , YOU 🫵 my friend are not average. {'\n\n'} You are not
        quiting, not today. Not after all the progress you’ve made.{'\n\n'}{' '}
        <Text style={styles.bold}>FIGHT! 🥊</Text>
        {'\n\n'}{' '}
        <Text style={styles.bold}>
          Fight like your life depends on it. Because it does.
        </Text>{' '}
        This is where champions are made. This is where YOU will rise.
      </Text>

      <Text style={styles.heading}>💥 LOOK AROUND YOU!</Text>
      <Text style={styles.text}>
        Some people wish they had the time to study—but they are too busy
        fighting battles just to survive.{'\n'}
        Some people wish they had your education—but they never got the chance
        to sit in a classroom.{'\n'}
        Some people wish they had the energy to work hard—but they are lying in
        hospital beds, unable to move.{'\n'}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>So what’s stopping you?</Text>
        {'\n\n'}
        Laziness? Doubt? Fear? Those are excuses. You are better than your
        excuses!
      </Text>
      <Text style={styles.heading}>⚡ YOU HAVE ONE LIFE. MAKE IT COUNT!</Text>
      <Text style={styles.text}>
        Right now, <Text style={styles.bold}>this very second</Text>, you have
        two choices:{'\n'}
        1️⃣ Stay stuck in your comfort zone and regret it later.{'\n'}
        2️⃣ Push through the pain, fight the laziness, and EARN your success.
      </Text>
      <Text style={styles.text}>
        Your future self is watching you.{'\n'}
        Are you going to let them down?{'\n'}
        Are you going to let this opportunity slip through your fingers?
      </Text>
      <Text style={styles.bold}>NO, YOU WON'T</Text>

      <Text style={styles.heading}>
        🔥 PAIN IS TEMPORARY. REGRET IS FOREVER.
      </Text>
      <Text style={styles.text}>
        The exhaustion, the frustration, the long hours of study—it’s all
        temporary.{'\n'}
        But if you quit now? The regret will haunt you forever.{'\n'}
        <Text style={styles.bold}>
          And there’s nothing worse than looking back and thinking, "I could
          have done more."
        </Text>
      </Text>
      <Text style={styles.heading}>⚡ YOU HAVE A CHANCE. USE IT!</Text>
      <Text style={styles.text}>
        There are people in this world who would give anything to have what you
        have right now—a chance to study, to build a future, to create a legacy.
        {'\n'}
        <Text style={styles.bold}>
          Don’t disrespect this gift by wasting it.
        </Text>
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>You have a brain.</Text> Use it.{'\n'}
        <Text style={styles.bold}>You have time.</Text> Maximize it.{'\n'}
        <Text style={styles.bold}>You have potential.</Text> Unleash it.
      </Text>
      <Text style={styles.heading}>
        🚀 NOW GET UP! GO STUDY! SHOW THE WORLD WHO YOU ARE! 🚀
      </Text>
      <Text style={styles.text}>
        YOU ARE A WARRIOR. YOU ARE UNSTOPPABLE. YOUR SUCCESS IS IN YOUR HANDS.
      </Text>
      <Text style={styles.bold}>GO BACK & CRUSH IT! 💪</Text>
      <Text style={styles.heading}>
        AND REMEMBER WHAT YOUR SUPER HEROES 🦸‍♂️ SAID
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: COLORS.backgroundColor, // Dark theme
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFC107', // Gold/Yellow for emphasis
    textAlign: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF5733', // Vibrant Orange for impact
    marginTop: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 28,
  },
  bold: {
    fontWeight: 'bold',
    color: '#ffc107',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
