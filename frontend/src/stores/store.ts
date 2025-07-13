import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';

import usersSlice from "./users/usersSlice";
import questionsSlice from "./questions/questionsSlice";
import quizzesSlice from "./quizzes/quizzesSlice";
import resultsSlice from "./results/resultsSlice";
import rolesSlice from "./roles/rolesSlice";
import permissionsSlice from "./permissions/permissionsSlice";
import partiesSlice from "./parties/partiesSlice";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,

users: usersSlice,
questions: questionsSlice,
quizzes: quizzesSlice,
results: resultsSlice,
roles: rolesSlice,
permissions: permissionsSlice,
parties: partiesSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
