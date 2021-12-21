import { createSlice } from '@reduxjs/toolkit';


const initialState = {
 ingredients: null,
 totalPrice: 4,
 purchasable: false,
 purchasing: false,
 loading: false,
 error: false,
 ingredientPrices: {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
 }
}


const ingredientSlice = createSlice({
 name: "ingredients",
 initialState,
 reducers: {
  getIngredients(state, action) {
   state.ingredients = action.payload.ingredients
  },
  errorExist(state) {
   state.error = true
  },
  purchase(state) {
   state.purchasing = true
  },
  cancelPurchase(state) {
   state.purchasing = false
  },
  updatePurchase(state, action) {
   state.purchasable = action.payload.purchasable
  },
  addIngredient(state, action) {
   state.totalPrice = action.payload.totalPrice
   state.ingredients = action.payload.ingredients
  },
  removeIngredient(state, action) {
   state.totalPrice = action.payload.totalPrice
   state.ingredients = action.payload.ingredients
  }
 }
})



export const ingredientActions = ingredientSlice.actions

export default ingredientSlice