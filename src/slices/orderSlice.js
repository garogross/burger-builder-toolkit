import { createSlice } from '@reduxjs/toolkit';


const initialState = {
 orders: [],
 loading: false
 }


const orderSlice = createSlice({
 name: "orders",
 initialState,
 reducers: {
  loadingStart(state) {
   state.loading = true
  },
  loadingOver(state) {
   state.loading = false
  },
  getOrders(state, action) {
   state.orders = action.payload.orders
  }
 }
})



export const orderActions = orderSlice.actions

export default orderSlice