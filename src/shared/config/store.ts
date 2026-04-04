import { baseApi } from "@/shared/api/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from "@widgets/ListArticles/paginationSlice";
import articleFormReducer from "@features/AddArticle/articleFormSlice";
import authReducer from "@features/SignUp/authSlice";
import likesReducer from "@shared/slice/likeSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    pagination: paginationReducer,
    articleForm: articleFormReducer,
    auth: authReducer,
    likes: likesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
