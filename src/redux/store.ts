import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authReducer, usersReducer, wordReducer } from './slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // users: usersReducer,
    // words: wordReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
