import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ImageSourcePropType, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import GradientScreen from '@/components/GradientScreen';
import NoteCard from '@/components/NoteCard';
import ScreenHeader from '@/components/ScreenHeader';
import SectionHeader from '@/components/SectionHeader';
import { NOTE_CATEGORY } from '@/constant';
import { getNotes } from '@/services/noteService';
import { COLORS } from '@/theme/colors';
import { Note } from '@/types/note';
import Ionicons from '@expo/vector-icons/Ionicons';

const WorkImage = require('@/assets/images/homeWork.png');
const LifeImage = require('@/assets/images/homeLife.png');
const HealthImage = require('@/assets/images/homeHealth.png');
const SettingImage = require('@/assets/images/setting.png');

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

    const hasNotes = notes.length > 0;
    const EmptyState = () => {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name='document-outline' size={60} color={COLORS.TEXT_TERTIARY} />
          <Text style={styles.emptyTitle}>No notes yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap middle icon below to create your first note.
          </Text>
        </View>
      )
    }

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

  const renderSection = useCallback((title: string, image: ImageSourcePropType, notes: Note[]) => {
    if (!notes.length) {
      return null;
    }

    return (
      <>
        <SectionHeader
          title={title}
          image={image}
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
        rightImage={SettingImage}
        onRightPress={
          () => router.push('/settings')
        }
      />
      <StatusBar barStyle='light-content' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {renderHeader()}
        {hasNotes ? (
          <>
        {renderSection(NOTE_CATEGORY.WORK, WorkImage, workNotes)}
        {renderSection(NOTE_CATEGORY.LIFE, LifeImage, lifeNotes)}
        {renderSection(NOTE_CATEGORY.HEALTH, HealthImage, healthNotes)}
        </>
        ):(
          <EmptyState />
        )}
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.TEXT_TERTIARY,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default HomeScreen;
