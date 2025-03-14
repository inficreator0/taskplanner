import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'

export const getAnimationTime = (totalTime: number) => {
  return {
    animationStartTime: 0.2 * totalTime, //waiting for the animation to start
    animationScaleTime: 0.2 * totalTime, // scale the size
    animationWaitTime: 0.2 * totalTime, //wait for some time at the same scale
    animationScaleReductionTime: 0.2 * totalTime, //scale the size
    animationTranslateTime: 0.3 * totalTime, //translate and scale
  }
}

export const useConfettiAnimation = ({
  animationHeight = 100,
  animationWidth = 200,
}: {
  animationHeight?: number
  animationWidth?: number
}) => {
  const scaleValue = useSharedValue(0.001)
  const offsetValueY = useSharedValue(0)
  const opacityValue = useSharedValue(1)

  const {
    animationScaleReductionTime,
    animationScaleTime,
    animationStartTime,
    animationTranslateTime,
    animationWaitTime,
  } = getAnimationTime(2000)

  useEffect(() => {
    scaleValue.value = withDelay(
      animationStartTime,
      withTiming(2, {
        duration:
          animationScaleTime + animationWaitTime + animationScaleReductionTime,
      }),
    )
    opacityValue.value = withDelay(
      animationStartTime +
        animationScaleTime +
        animationWaitTime +
        animationScaleReductionTime +
        animationTranslateTime,
      withTiming(0, {
        duration: animationScaleReductionTime + animationTranslateTime,
      }),
    )
    offsetValueY.value = withDelay(
      animationStartTime +
        animationScaleTime +
        animationWaitTime +
        animationScaleReductionTime,
      withTiming(animationHeight, { duration: 4 * animationTranslateTime }),
    )
  }, [
    scaleValue,
    animationStartTime,
    animationScaleTime,
    animationWaitTime,
    animationScaleReductionTime,
    animationTranslateTime,
    opacityValue,
    offsetValueY,
  ])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: 2 * scaleValue.value * animationHeight,
      width: scaleValue.value * animationWidth,
      opacity: opacityValue.value,
      transform: [
        {
          translateY: offsetValueY.value,
        },
      ],
    }
  })

  return { animatedStyle }
}
