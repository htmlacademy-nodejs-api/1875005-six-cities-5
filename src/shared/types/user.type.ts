export type User = {
  name: string; // 1-15 symbols
  email: string; // Obligatory & valid & unique
  avatarUrl: string; // Not obligatory, .png or .jpg
  password: number; // Obligatory 6-12 symbols
  isPro: boolean; // Obligatory
  }
