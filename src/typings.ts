export type Word = {
  definition: string;
  tags: string[];
  authorId: string;
  createdAt: number;
  example: string;
  word: string;
  author: string;
  updatedAt: number;
  approvedAt: number;
  id: string;
  heartCount: number;
  status: string;
};

export type SearchBarWord = {
  entityId: string;
  word: string;
  content: string;
  author: string;
  wordId: string;
}

export type LoginData = [{ email: string; password: string }];

export type StatusType = 'loading' | 'authenticated' | 'unauthenticated';

export type UserDetails = {
  createdAt: { _seconds: number; _nanoseconds: number };
  email: string;
  hashedPass: string;
  id: string;
  image: string;
  role: string[];
  updatedAt: { _seconds: number; _nanoseconds: number };
  username: string;
  words?: number,
  hearts?: number
};

// for stack screen
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  WordList: {
    title: string;
    id?: 'today-words' | 'trending-words';
    uid?: string;
    wordName?: string;
  };
}

// for bottom tab screen
export type HomeTabParamList = {
  Dictionary: undefined;
  Add: undefined;
  Profile: undefined;
}
