import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import GradientScreen from '@/components/GradientScreen';
import ScreenHeader from '@/components/ScreenHeader';
import { CATEGORY_OPTIONS, MAX_NOTE_CHAR_COUNT, NOTE_CATEGORY } from '@/constant';
import { addNote } from '@/services/noteService';
import { COLORS } from '@/theme/colors';
import { NoteCategory } from '@/types/note';
import { showToast } from '@/utils/toast';
import Ionicons from '@expo/vector-icons/Ionicons';

const NewNote = () => {
  const [category, setCategory] = useState<NoteCategory>(NOTE_CATEGORY.EMPTY);
  const [content, setContent] = useState<string>('');
  
  const onButtonPress = useCallback(async () => {
    if (!category && !content.trim()) {
      Alert.alert('Validation Error', 'Please select a category and input note content');
      return;
    } else if (!category) {
      Alert.alert('Validation Error', 'Please select a category');
      return;
    } else if (!content.trim()) {
      Alert.alert('Validation Error', 'Please input note content');
      return;
    }
    try {
      await addNote(category, content);
  
      setCategory(NOTE_CATEGORY.EMPTY);
      setContent('');
  
      showToast('Note saved successfully');
      router.back();
    } catch (error) {
      console.error('Failed to save note:', error);
  
      Alert.alert(
        'Save Failed',
        'Unable to save your note. Please try again.'
      );
    }
  }, [category, content]);

  const renderButton = useCallback(() => (
    <Pressable
      onPress={onButtonPress}>
      <LinearGradient
        colors={[
          COLORS.BUTTON_GRADIENT_1,
          COLORS.BUTTON_GRADIENT_2
        ]}
        style={styles.saveButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.buttonText}>Save</Text>
      </LinearGradient>
    </Pressable>
  ), [onButtonPress]);

  const renderDropdown = useCallback(() => (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.itemStyle}
        selectedTextStyle={[styles.itemStyle, styles.selectedTextStyle]}
        containerStyle={styles.dropdownContainer}
        itemTextStyle={styles.itemTextStyle}
        activeColor={COLORS.WHITE_10}
        data={CATEGORY_OPTIONS}
        labelField='label'
        valueField='category'
        placeholder='Choose a category'
        value={category}
        onChange={item => {
          setCategory(item.category)
        }}
        renderRightIcon={() => (
          <Ionicons
            name='chevron-down'
            size={24}
            color={COLORS.WHITE}
          />
        )}
      />
  ), [category]);

  const renderContentInput = useCallback(() => {
    const isContentMax: boolean = content.length === MAX_NOTE_CHAR_COUNT;
    return (
    <>
      <TextInput
        value={content}
        onChangeText={setContent}
        maxLength={MAX_NOTE_CHAR_COUNT}
        placeholder='Please input note content'
        placeholderTextColor={COLORS.TEXT_SECONDARY}
        multiline
        textAlignVertical='top'
        style={styles.textInput}
      />
      <Text style={[styles.charCount, isContentMax && { color: COLORS.RED }]}>
        {content.length}/{MAX_NOTE_CHAR_COUNT}
        </Text>
    </>
  )}, [content]);

  const renderNoteInputContainer = useCallback(() => (
    <View style={styles.noteInputContainer}>
      {renderDropdown()}
      {renderContentInput()}
    </View>
  ), [renderDropdown, renderContentInput]);

  return (
    <GradientScreen
      style={styles.gradientScreen}
    >
      <ScreenHeader title='New Note' showBack={true}/>
      <StatusBar barStyle='light-content' />
      <View style={styles.container}>
      {renderNoteInputContainer()}
      {renderButton()}
      </View>
    </GradientScreen>
  );
}

const styles = StyleSheet.create({
  gradientScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 26,
    justifyContent: 'space-between',
  },
  noteInputContainer: {
    gap: 16,
  },
  dropdown: {
    borderRadius: 16,
    borderWidth: 1,
    paddingRight: 16,
    justifyContent: 'center',
    backgroundColor: COLORS.CONTAINER,
    borderColor: COLORS.BORDER,
  },
  itemStyle: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 18,
    marginHorizontal: 16,
    color: COLORS.TEXT_SECONDARY,
  },
  selectedTextStyle: {
    color: COLORS.TEXT_PRIMARY,
  },
  dropdownContainer: {
    borderRadius: 16,
    backgroundColor: COLORS.BACKGROUND_GRADIENT_2,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    overflow: 'hidden'
  },
  itemTextStyle: {
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
  },
  textInput: {
    height: 260,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    backgroundColor: COLORS.CONTAINER,
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
  },
  charCount: {
    alignSelf: 'flex-end',
    marginTop: 8,
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: '600'
  },
});

export default NewNote;
