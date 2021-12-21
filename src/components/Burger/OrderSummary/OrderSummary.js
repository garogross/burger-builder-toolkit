import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { ingredientActions } from '../../../slices/ingredientsSlice';

import Aux from '../../../hoc/Auxx/Auxx';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const {ingredients,totalPrice} = useSelector(state => state.ingredients)
    const dispatch = useDispatch()

    const purchaseCancelHandler = () => {
        dispatch(ingredientActions.cancelPurchase())
    }

    const ingredientSummary = Object.keys(ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {ingredients[igKey]}
                </li>);
        });
    

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={purchaseCancelHandler}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
}

export default OrderSummary
