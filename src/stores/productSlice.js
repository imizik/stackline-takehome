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
    reducers: {
      sort: (state, action) => {
        const key = action.payload;
        const changeTo = state.sorters[key] === 'up' ? 'down' : 'up'

        for (let item in state.sorters) {
          if (state.sorters[item] === changeTo) {
            const reverse = changeTo === 'up' ? 'down' : 'up'
            state.sorters[item] = reverse
          }
        }
        state.sorters[key] = changeTo

        if (key === 'weekEnding') {
          state.data[0].sales.sort((a,b) => {
            const aComps = a.weekEnding.split("-");
            const bComps = b.weekEnding.split("-");
            const aDate = new Date(aComps[0], aComps[1], aComps[2]);
            const bDate = new Date(bComps[0], bComps[1], bComps[2]);
            return state.sorters[key] === 'up' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime()
          })
        } else {
          state.data[0].sales.sort((a,b) => {
            const aComps = Number(a[key])
            const bComps = Number(b[key])
            return state.sorters[key] === 'up' ? aComps-bComps : bComps-aComps
          })
        }
      }
    },
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

export const { sort } = productSlice.actions;

  export const selectProduct = (state) => {
    const products = state.product.data;
    return products[0];
  }

  export const selectSorting = (state) => {
    return state.product.sorters;
  }
  
  export default productSlice.reducer