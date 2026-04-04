import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikeState {
  favorited: string[];
}

const initialState: LikeState = {
  favorited: (() => {
    const stored = localStorage.getItem("articleFavorited");
    return stored ? JSON.parse(stored) : [];
  })(),
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    addLike: (state, action: PayloadAction<string>) => {
      state.favorited.push(action.payload);
      localStorage.setItem("articleFavorited", JSON.stringify(state.favorited));
    },
    removeLike: (state, action: PayloadAction<string>) => {
      state.favorited = state.favorited.filter(
        (slug) => slug !== action.payload,
      );
      localStorage.setItem("articleFavorited", JSON.stringify(state.favorited));
    },
  },
});

export const { addLike, removeLike } = likeSlice.actions;
export default likeSlice.reducer;
