export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: number;
  updatedAt: number;
  order: number;
}

export function createPrompt(
  title: string,
  content: string,
  overrides?: Partial<Prompt>
): Prompt {
  const now = Date.now();
  return {
    id: now.toString(36) + Math.random().toString(36).slice(2, 6),
    title,
    content,
    category: '',
    tags: [],
    isFavorite: false,
    createdAt: now,
    updatedAt: now,
    order: now,
    ...overrides,
  };
}
