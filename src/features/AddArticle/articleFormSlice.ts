import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticleRequestT } from "./types";

const initialState: IArticleRequestT = {
  title: "",
  description: "",
  body: "",
  tagList: [],
};

export const articleFormSlice = createSlice({
  name: "articleForm",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<IArticleRequestT>) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.body = action.payload.body;
      state.tagList = action.payload.tagList;
    },
    clearForm: () => initialState,
    addTag: (state, action) => {
      state.tagList.push(action.payload);
    },
    deleteTag: (state, action) => {
      state.tagList = state.tagList.filter((tag) => tag !== action.payload);
    },
  },
});

export const { setForm, clearForm, addTag, deleteTag } =
  articleFormSlice.actions;

export default articleFormSlice.reducer;
