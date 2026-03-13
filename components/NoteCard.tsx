import { Alert, Pressable, StyleSheet, Text } from 'react-native';

import { MAX_NOTE_CARD_CHAR_COUNT } from '@/constant';
import { COLORS } from '@/theme/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

type NoteCardProps = {
  text: string,
}

const NoteCard = (props: NoteCardProps) => {
  const truncatedText = props.text.length > MAX_NOTE_CARD_CHAR_COUNT ?
    props.text.slice(0, MAX_NOTE_CARD_CHAR_COUNT) + '...' :
    props.text;

  return (
    <Pressable style={styles.card} onPress={
      () => Alert.alert('Under Construction', 'Note detail page is under construction.')}>
      <Text style={styles.text}>{truncatedText}</Text>
      <Ionicons
        name="chevron-forward"
        size={18}
        color={COLORS.PINK}
      />
    </Pressable>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    backgroundColor: COLORS.CONTAINER,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    flex: 1,
    marginRight: 8,
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
  },
});
