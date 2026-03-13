export const NOTE_CATEGORY = {
    WORK: 'Work and Study',
    LIFE: 'Life',
    HEALTH: 'Health and Well-being',
    EMPTY: '',
  } as const;

export const MAX_NOTE_CHAR_COUNT = 200;
export const MAX_NOTE_CARD_CHAR_COUNT = 20;

export const CATEGORY_OPTIONS = [
  { label: NOTE_CATEGORY.WORK, category: NOTE_CATEGORY.WORK },
  { label: NOTE_CATEGORY.LIFE, category: NOTE_CATEGORY.LIFE },
  { label: NOTE_CATEGORY.HEALTH, category: NOTE_CATEGORY.HEALTH },
];
