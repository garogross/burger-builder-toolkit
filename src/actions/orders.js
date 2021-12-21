import { orderActions } from '../slices/orderSlice';
import { ingredientActions } from '../slices/ingredientsSlice';
import axios from '../axios-orders';

const {
 loadingStart,
 loadingOver,
 getOrders
} = orderActions

const {
 cancelPurchase 
} = ingredientActions


export const postOrder = (data, navigate) => async (dispatch) => {
 dispatch(loadingStart())
 try {
  const res = await axios.post("orders.json", data)
  dispatch(loadingOver())
  dispatch(cancelPurchase())
  navigate("/", { replace: true })


 } catch (error) {
  dispatch(loadingOver())
 }
}


export const getOrdersHandler = () => async (dispatch) => {
 dispatch(loadingStart())

 try {
  const { data } = await axios.get("orders.json")
  const fetchedOrders = [];
  for (let key in data) {
   fetchedOrders.push({
    ...data[key],
    id: key
   });
  }
  dispatch(getOrders({
   orders: fetchedOrders
  }))
  dispatch(loadingOver())


 } catch (error) {
  dispatch(loadingOver())

 }
}