import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getOrdersHandler} from "../../actions/orders"

import Order from '../../components/Order/Order';


const Orders = () => {
    const dispatch = useDispatch()
    const {orders} = useSelector(state => state.orders)

    useEffect(() => {
        dispatch(getOrdersHandler())
    }, [dispatch])


        return (
            <div>
                {orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
}

export default Orders
