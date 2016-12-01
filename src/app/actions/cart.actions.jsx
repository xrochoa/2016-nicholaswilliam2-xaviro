import dispatcher from '../dispatcher';

export function addToCart(shirt) { //emited from actions -> dispatcher -> store (triggered by component)
    dispatcher.dispatch({
        type: 'ADD_TO_CART',
        shirt
    });
}

export function removeFromCart(shirt) { //emited from actions -> dispatcher -> store (triggered by component)
    dispatcher.dispatch({
        type: 'REMOVE_FROM_CART',
        shirt
    });
}

export function resetCart() { 
    dispatcher.dispatch({
        type: 'RESET_CART'
    });
}