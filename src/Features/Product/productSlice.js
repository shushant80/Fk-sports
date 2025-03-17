// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import StoreData from "../../Data/StoreData"; // Mock Data

// export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
//   return StoreData; // Fetch from API in a real app
// });

// const productSlice = createSlice({
//   name: "products",
//   initialState: {
//     allProducts: [],
//     filteredProducts: [],
//     filters: { category: "all", sortBy: "default" },
//   },
//   reducers: {
//     setFilters: (state, action) => {
//       state.filters = action.payload;
//       state.filteredProducts = filterProducts(state.allProducts, action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchProducts.fulfilled, (state, action) => {
//       state.allProducts = action.payload;
//       state.filteredProducts = action.payload;
//     });
//   },
// });

// // Function to filter products
// const filterProducts = (products, filters) => {
//   let filtered = filters.category === "all" ? products : products.filter((p) => p.category === filters.category);

//   if (filters.sortBy === "lowToHigh") {
//     filtered.sort((a, b) => a.productPrice - b.productPrice);
//   } else if (filters.sortBy === "highToLow") {
//     filtered.sort((a, b) => b.productPrice - a.productPrice);
//   } else if (filters.sortBy === "a-z") {
//     filtered.sort((a, b) => a.productName.localeCompare(b.productName));
//   } else if (filters.sortBy === "z-a") {
//     filtered.sort((a, b) => b.productName.localeCompare(a.productName));
//   }

//   return filtered;
// };

// export const { setFilters } = productSlice.actions;
// export default productSlice.reducer;
