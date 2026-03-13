import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, NoteCategory } from '../types/note';

const STORAGE_KEY = 'notes';

function generateId() {
    return Date.now().toString();
}

/**
 * Retrieves the list of notes from AsyncStorage.
 * @returns A promise that resolves to an array of Note objects, sorted by creation date in descending order.
 * If there are no notes stored, it returns an empty array.
 */
export async function getNotes(): Promise<Note[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);

    if (!raw) return [];

    const notes: Note[] = JSON.parse(raw);

    return notes.sort(
        (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
    );
}

/**
 * Adds a new note to the list of notes stored in AsyncStorage.
 * @param category - The category of the note, which should be of type NoteCategory.
 * @param content - The content of the note as a string.
 * @returns A promise that resolves when the note has been successfully added to AsyncStorage.
 * The function generates a unique ID for the new note using the current timestamp, creates a new Note object, and then updates the stored notes by appending the new note to the existing list before saving it back to AsyncStorage.
 */
export async function addNote(
    category: NoteCategory,
    content: string,
): Promise<void> {
    const notes = await getNotes();

    const newNote: Note = {
        id: generateId(),
        category,
        content,
        createdAt: new Date().toISOString(),
    };

    const updated = [...notes, newNote];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/**
 * Clears all notes stored in AsyncStorage.
 * @returns A promise that resolves when all notes have been successfully removed from AsyncStorage.
 * This function removes the storage key associated with the notes, effectively deleting all stored notes.
 */
export async function clearNotes(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY)
  }
