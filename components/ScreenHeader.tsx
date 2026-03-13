import { useRouter } from 'expo-router'
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { COLORS } from '@/theme/colors'
import Ionicons from '@expo/vector-icons/Ionicons'

type Props = {
  title: string
  showBack?: boolean
  rightImage?: ImageSourcePropType
  onRightPress?: () => void
}

const ScreenHeader = ({
  title,
  showBack,
  rightImage,
  onRightPress
}: Props) => {
  const router = useRouter()

  const renderBackAndTitle = () => {
    return (
      <View style={styles.leftHeaderContainer}>
        {showBack && (
          <Pressable onPress={() => router.back()}>
            <Ionicons name='chevron-back' size={24} color={COLORS.WHITE} />
          </Pressable>
        )}

        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  const renderRightIcon = () => {
    if (rightImage && onRightPress) {
      return (
        <Pressable onPress={onRightPress} >
          <Image source={rightImage} style={styles.image} />
        </Pressable>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View style={styles.headerContainer} >
          {renderBackAndTitle()}
          {renderRightIcon()}
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: COLORS.HEADER,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  image: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  }
})

export default ScreenHeader;
