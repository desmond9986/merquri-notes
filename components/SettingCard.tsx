import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native'

import { COLORS } from '@/theme/colors'
import Ionicons from '@expo/vector-icons/Ionicons'

type Props = {
  image: ImageSourcePropType
  title: string
  onPress?: () => void
}

const SettingItem = ({ image, title, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={24}
        color={COLORS.PINK}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.CONTAINER,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  image: {
    width: 18,
    height: 18,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
  },
})

export default SettingItem;
