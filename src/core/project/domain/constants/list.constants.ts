import { randomUUID } from 'crypto';

export const DEFAULT_LISTS = [
  { id: randomUUID(), name: 'To Do' },
  { id: randomUUID(), name: 'In Progress' },
  { id: randomUUID(), name: 'Done' },
];
