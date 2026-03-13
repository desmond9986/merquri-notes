import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GradientScreen from '@/components/GradientScreen';
import { NOTE_CATEGORY } from '@/constant';
import { getNotes } from '@/services/noteService';
import { COLORS } from '@/theme/colors';
import { Note, SummaryItem } from '@/types/note';

const WorkIcon = require('@/assets/images/work.png');
const LifeIcon = require('@/assets/images/life.png');
const HealthIcon = require('@/assets/images/health.png');
const SummaryImage = require('@/assets/images/summary.png');

const Summary = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = useCallback(async () => {
    try {
      const storedNotes = await getNotes();
      setNotes(storedNotes);
    } catch (error) {
      console.error('Failed to load notes:', error);
      Alert.alert('Error', 'Failed to load summary data.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [loadNotes]),
  );

  const summaryItems: SummaryItem[] = [
    {
      key: NOTE_CATEGORY.WORK,
      title: NOTE_CATEGORY.WORK,
      count: notes.filter((note) => note.category === NOTE_CATEGORY.WORK).length,
      icon: WorkIcon,
    },
    {
      key: NOTE_CATEGORY.LIFE,
      title: NOTE_CATEGORY.LIFE,
      count: notes.filter((note) => note.category === NOTE_CATEGORY.LIFE).length,
      icon: LifeIcon,
    },
    {
      key: NOTE_CATEGORY.HEALTH,
      title: NOTE_CATEGORY.HEALTH,
      count: notes.filter((note) => note.category === NOTE_CATEGORY.HEALTH).length,
      icon: HealthIcon,
    },
  ];

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Summary</Text>
        <Image source={SummaryImage} style={styles.headerImage} />
      </View>
    );
  }, []);

  const renderSummaryItem = useCallback((item: SummaryItem) => {
    const renderButton = () => (
      <Pressable>
        <LinearGradient
          colors={[COLORS.BUTTON_GRADIENT_1, COLORS.BUTTON_GRADIENT_2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.detailButton}
        >
          <Text style={styles.detailButtonText}>Detail</Text>
        </LinearGradient>
      </Pressable>
    );

    const renderCountBanner = () => (
      <View style={styles.countBanner}>
        <Text style={styles.countText}>
          {`This topic has a total of ${item.count} records.`}
        </Text>
      </View>
    );

    const renderIconAndTitle = () => (
      <View style={styles.summaryTitleRow}>
        <Image source={item.icon} style={styles.icon} />
        <Text style={styles.summaryTitle}>{item.title}</Text>
      </View>
    );

    return (
      <View key={item.key} style={styles.summaryBlock}>
        <View style={styles.summaryHeaderRow}>
          {renderIconAndTitle()}
          {renderButton()}
        </View>
        {renderCountBanner()}
      </View>
    );
  }, []);

  return (
    <GradientScreen style={styles.container}>
      <StatusBar barStyle='light-content' />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      {renderHeader()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.summaryCoontainer}>
          {summaryItems.map((item) => renderSummaryItem(item))}
        </View>
      </ScrollView>
      </SafeAreaView>
    </GradientScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    marginTop: 14,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  headerImage: {
    width: 210,
    height: 130,
    alignSelf: 'flex-end'
  },
  robotText: {
    fontSize: 48,
  },
  contentContainer: {
    flexGrow: 1,
  },
  summaryCoontainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 22,
    paddingHorizontal: 20,
    backgroundColor: COLORS.CONTAINER,
  },
  summaryBlock: {
    marginBottom: 24,
  },
  summaryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 30,
    marginRight: 6,
  },
  summaryTitle: {
    flex: 1,
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
  },
  detailButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailButtonText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: '600',
  },
  countBanner: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    backgroundColor: COLORS.CONTAINER,
  },
  countText: {
    fontSize: 14,
    color: COLORS.TEXT_TERTIARY,
  },
});

export default Summary;
