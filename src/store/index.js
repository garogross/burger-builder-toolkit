import { configureStore } from "@reduxjs/toolkit";
import ingredientSlice from "../slices/ingredientsSlice"
import orderSlice from "../slices/orderSlice"


const store = configureStore({
 reducer: {
  ingredients: ingredientSlice.reducer,
  orders: orderSlice.reducer
 }

})

export default store