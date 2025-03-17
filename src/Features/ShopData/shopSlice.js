
import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: { items: [] },
  reducers: {
    setShopData: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setShopData } = shopSlice.actions;
export default shopSlice.reducer;
