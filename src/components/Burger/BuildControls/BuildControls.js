import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ingredientActions } from '../../../slices/ingredientsSlice';
import {addIngredientHandler,removeIngredientHandler} from "../../../actions/ingredients"

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {
    const dispatch = useDispatch()
    const {totalPrice,purchasable} = useSelector(state => state.ingredients)

    const purchaseHandler = () => {
        dispatch(ingredientActions.purchase())
    }
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{totalPrice.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => dispatch(addIngredientHandler(ctrl.type))}
                    removed={() => dispatch(removeIngredientHandler(ctrl.type))}
                    disabled={props.disabled[ctrl.type]} />
            ))}
            <button
                className={classes.OrderButton}
                disabled={!purchasable}
                onClick={purchaseHandler}>ORDER NOW</button>
        </div>
    );
}
export default BuildControls;