import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  sorters: {
    weekEnding: "up",
    retailSales: "up",
    wholesaleSales: "up",
    unitsSold: "up",
    retailerMargin: "up"
  }
}

export const fetchData = createAsyncThunk('product/fetchData', async () => {
  const response = await fetch('/data/stackline_frontend_assessment_data_2021.json').then(data => data.json())
  return response
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchData.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(fetchData.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.data = action.payload
        })
        .addCase(fetchData.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
    }
  })

  export const selectProduct = (state) => {
    const products = state.product.data;
    return products[0];
  }

  export const selectSorting = (state) => {
    return state.product.sorters;
  }
  
  export default productSlice.reducer