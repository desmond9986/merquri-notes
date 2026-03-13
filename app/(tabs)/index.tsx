import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import GradientScreen from '@/components/GradientScreen';
import NoteCard from '@/components/NoteCard';
import ScreenHeader from '@/components/ScreenHeader';
import SectionHeader from '@/components/SectionHeader';
import { NOTE_CATEGORY } from '@/constant';
import { getNotes } from '@/services/noteService';
import { COLORS } from '@/theme/colors';
import { Note } from '@/types/note';
import Ionicons from '@expo/vector-icons/Ionicons';

const HomeScreen = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = useCallback(async () => {
    try {
      const storedNotes = await getNotes()
      setNotes(storedNotes)
    } catch (error) {
      console.error('Failed to load notes:', error)
      Alert.alert('Error', 'Failed to load notes.')
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadNotes()
    }, [loadNotes])
  );

  const workNotes: Note[] = notes
    .filter((note) => note.category === NOTE_CATEGORY.WORK)
    .slice(0, 3);

  const lifeNotes: Note[] = notes
    .filter((note) => note.category === NOTE_CATEGORY.LIFE)
    .slice(0, 3);

  const healthNotes: Note[] = notes
    .filter((note) => note.category === NOTE_CATEGORY.HEALTH)
    .slice(0, 3);

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.header}>
        <Ionicons
          name={'time-outline'}
          size={18}
          color={COLORS.TEXT_SECONDARY}
        />
        <Text style={styles.headerText}>
          {'Recently created notes'}
        </Text>
      </View>
    )
  }, []);

  const renderSection = useCallback((title: string, icon: keyof typeof Ionicons.glyphMap, notes: Note[]) => {
    if (!notes.length) {
      return null;
    }

    return (
      <>
        <SectionHeader
          title={title}
          icon={icon}
        />
        <View style={styles.noteContainer}>
          {notes.map((note) => (
            <NoteCard key={note.id} text={note.content} />
          ))}
        </View>
      </>
    )
  }, []);

  return (
    <GradientScreen style={styles.container}>
      <ScreenHeader
        title='Home'
        rightIcon='settings-outline'
        onRightPress={
          () => Alert.alert('Settings', 'Settings page is under construction.')
        }
      />
      <StatusBar barStyle='light-content' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {renderHeader()}
        {renderSection(NOTE_CATEGORY.WORK, 'add', workNotes)}
        {renderSection(NOTE_CATEGORY.LIFE, 'add', lifeNotes)}
        {renderSection(NOTE_CATEGORY.HEALTH, 'add', healthNotes)}
      </ScrollView>
    </GradientScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 20,
  },
  headerText: {
    fontSize: 16,
    color: COLORS.TEXT_TERTIARY,
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    color: COLORS.TEXT_SECONDARY,
    fontSize: 14,
  },
  contentContainer: {
    paddingBottom: 50,
    paddingHorizontal: 16
  },
  noteContainer: {
    gap: 11
  },
});

export default HomeScreen;
