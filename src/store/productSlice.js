import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idel",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  // reducers: {
  //   setProducts: (state, action) => {
  //     state.data = action.payload;
  //   },
  //   setStatus:(state,action)=>{
  //     state.status = action.payload;
  //   }
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

//Thunks => =>=>=>=>

// export function fetchProducts() {
//   return async function fetchProductsThunk(dispatch, getState) {

//     dispatch(setStatus(STATUSES.LOADING))

//     try {
//       const response = await fetch("https://fakestoreapi.com/products");
//       const data = await response.json();
//       dispatch(setProducts(data))
//       dispatch(setStatus(STATUSES.IDLE))
//     } catch (error) {
//       console.log(error)
//       dispatch(setStatus(STATUSES.ERROR))
//     }
//   };
// }

//Thunk ===> Create async thunk

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
});
