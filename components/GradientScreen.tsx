import { LinearGradient } from 'expo-linear-gradient'
import { ReactNode } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

import { COLORS } from '@/theme/colors'

type GradientScreenProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const GradientScreen = ({ children, style }: GradientScreenProps) => {
  return (
    <LinearGradient
      colors={[
        COLORS.BACKGROUND_GRADIENT_1,
        COLORS.BACKGROUND_GRADIENT_2,
        COLORS.BACKGROUND_GRADIENT_3,
        COLORS.BACKGROUND_GRADIENT_4,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default GradientScreen
