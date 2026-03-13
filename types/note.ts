import { NOTE_CATEGORY } from "@/constant";

export type NoteCategory = typeof NOTE_CATEGORY[keyof typeof NOTE_CATEGORY];

export interface Note {
  id: string;
  category: NoteCategory;
  content: string;
  createdAt: string;
}
