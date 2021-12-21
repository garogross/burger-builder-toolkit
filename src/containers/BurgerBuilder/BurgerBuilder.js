

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import {componentDidMount} from './../../actions/ingredients';

import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';




const BurgerBuilder = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { ingredients, error, purchasable, loading, purchasing } = useSelector(state => state.ingredients)

    useEffect(() => {
        dispatch(componentDidMount())
    }, [dispatch])



    const purchaseContinueHandler = () => {
        navigate("/checkout",{replace: true})
    }


    const disabledInfo = {
        ...ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (ingredients) {
        burger = (
            <Aux>
                <Burger />
                <BuildControls
                    disabled={disabledInfo}
                />
            </Aux>
        );
        orderSummary = <OrderSummary
            purchaseContinued={purchaseContinueHandler} />;
    }
    if (loading) {
        orderSummary = <Spinner />;
    }
    return (
        <Aux>
            <Modal
                show={purchasing}
            >
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
}
export default BurgerBuilder
