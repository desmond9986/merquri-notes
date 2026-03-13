import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/theme/colors';

type SectionHeaderProps = {
  title: string,
  image: ImageSourcePropType,
}

const SectionHeader = ({title, image}: SectionHeaderProps) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 27,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
  },
  image: {
    width: 20,
    height: 20,
  },
});
