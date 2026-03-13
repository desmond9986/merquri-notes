import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/theme/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

type SectionHeaderProps = {
  title: string,
  icon: keyof typeof Ionicons.glyphMap,
}

const SectionHeader = (props: SectionHeaderProps) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name={props.icon}
        size={18}
        color={COLORS.TEXT_SECONDARY}
      />
      <Text style={styles.title}>
        {props.title}
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
});
