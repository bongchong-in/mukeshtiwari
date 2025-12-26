export interface JournalEntry {
  id: number;
  title: string;
  hindiTitle: string;
  date: string;
  material: string;
  image: string;
  note: string;
  rotation: string;
}

export type FormType = 'commission' | 'workshop' | 'exhibition';
