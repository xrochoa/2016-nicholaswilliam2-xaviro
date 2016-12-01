import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class CartStore extends EventEmitter {

    constructor() {
        super();
        let cart = JSON.parse(localStorage.getItem('cart'));
        this.cart = (cart) ? cart : [];
    }

    getAll() {
        return this.cart;
    }

    increaseCartItems() {
        let cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems) {
            let int = parseInt(cartItems);
            localStorage.setItem('cartItems', ++int);
        } else {
            localStorage.setItem('cartItems', 1);
        }
    }

    decreaseCartItems() {
        let cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems) {
            let int = parseInt(cartItems);
            localStorage.setItem('cartItems', --int);
        } else {
            //if there was nothing previously
            localStorage.setItem('cartItems', 0);
        }
    }

    addToCart(shirt) {

        let shirtsInCart = this.cart.map((basket, i) => {
            return `NAME: ${basket.shirt.name} - COLOR: ${basket.shirt.color} - SIZE: ${basket.shirt.size}`;
        });

        let shirtString = `NAME: ${shirt.name} - COLOR: ${shirt.color} - SIZE: ${shirt.size}`;

        let basketIndex = shirtsInCart.indexOf(shirtString);

        //console.log('cartstring:', shirtsInCart, ' - newshirtstring:', shirtString, ' - index:', basketIndex);

        if (basketIndex === -1) {
            //new shirt
            this.cart.push(JSON.parse(JSON.stringify({
                quantity: 1,
                shirt: shirt
            })));
            //console.log('newshirt', this.cart);

        } else {
            //increase quantity
            this.cart[basketIndex].quantity++;
            //console.log('oldshirt', this.cart);

        }

        //save changes to local storage
        localStorage.setItem('cart', JSON.stringify(this.cart));

    }

    removeFromCart(shirt) {

        let shirtsInCart = this.cart.map((basket, i) => {
            return `NAME: ${basket.shirt.name} - COLOR: ${basket.shirt.color} - SIZE: ${basket.shirt.size}`;
        });

        let shirtString = `NAME: ${shirt.name} - COLOR: ${shirt.color} - SIZE: ${shirt.size}`;

        let basketIndex = shirtsInCart.indexOf(shirtString);

        //decreases quantity
        this.cart[basketIndex].quantity--;

        //remove from cart if 0
        if (this.cart[basketIndex].quantity <= 0) {
            this.cart.splice(basketIndex, 1);
        }

        //save changes to local storage
        localStorage.setItem('cart', JSON.stringify(this.cart));

    }

    //handles the flux actions i want
    handleActions(action) {
        //console.log(action);
        switch (action.type) {
            case 'ADD_TO_CART': //listened by store from dispatcher
                {
                    this.addToCart(action.shirt);
                    this.increaseCartItems();
                    this.emit('UPDATE_CART_ITEMS'); //listened by view/component
                    break;
                }
            case 'REMOVE_FROM_CART': //listened by store from dispatcher
                {
                    this.removeFromCart(action.shirt);
                    this.decreaseCartItems();
                    this.emit('UPDATE_CART_ITEMS'); //listened by view/component
                    break;
                }
        }
    }
}

let cartStore = new CartStore();

dispatcher.register(cartStore.handleActions.bind(cartStore)); //listened by store from dispatcher

export default cartStore;
