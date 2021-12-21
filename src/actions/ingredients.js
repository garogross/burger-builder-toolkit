import { ingredientActions } from '../slices/ingredientsSlice';
import axios from '../axios-orders';


const {
 getIngredients,
 errorExist,
 updatePurchase,
 addIngredient,
 removeIngredient

} = ingredientActions

export const componentDidMount = () => async (dispatch) => {
 try {
  const {data} = await axios.get('/ingredients.json')

  dispatch(getIngredients({
   ingredients: data
  }))
 } catch (error) {
  dispatch(errorExist())

 }
}


export const updatePurchaseHandler = () => (dispatch, getState) => {
 const { ingredients } = getState().ingredients
 const sum = Object.keys(ingredients)
  .map(
   igKey => {
    return ingredients[igKey];
   })
  .reduce((sum, el) => {
   return sum + el;
  }, 0);
 dispatch(updatePurchase({
  purchasable: sum > 0
 }))
}



export const addIngredientHandler = (type) => (dispatch, getState) => {
 const {ingredients,totalPrice,ingredientPrices} = getState().ingredients

 const oldCount = ingredients[type];
 const updatedCount = oldCount + 1;
 const updatedIngredients = {
  ...ingredients
 };
 updatedIngredients[type] = updatedCount;
 const priceAddition = ingredientPrices[type];
 const oldPrice = totalPrice;
 const newPrice = oldPrice + priceAddition;
 dispatch(addIngredient({
  totalPrice: newPrice,
  ingredients: updatedIngredients
 }))
 dispatch(updatePurchaseHandler(updatedIngredients));
}


export const removeIngredientHandler = (type) => (dispatch, getState) => {
 const { ingredients, totalPrice, ingredientPrices } = getState().ingredients

 const oldCount = ingredients[type];
 if (oldCount <= 0) {
  return;
 }
 const updatedCount = oldCount - 1;
 const updatedIngredients = {
  ...ingredients
 };
 updatedIngredients[type] = updatedCount;
 const priceDeduction = ingredientPrices[type];
 const oldPrice = totalPrice;
 const newPrice = oldPrice - priceDeduction;
 dispatch(removeIngredient({
  totalPrice: newPrice,
  ingredients: updatedIngredients
 }))
 dispatch(updatePurchaseHandler(updatedIngredients));
}