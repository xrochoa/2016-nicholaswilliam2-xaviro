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
            return `${basket.name}-${basket.color}-${basket.size}`;
        });

        let basketIndex = shirtsInCart.indexOf(`${shirt.name}-${shirt.color}-${shirt.size}`);

        //console.log('before', this.cart, shirtsInCart, basketIndex);

        if (basketIndex === -1) {
            //new shirt
            this.cart.push({
                quantity: 1,
                shirt: shirt
            });
        } else {
            //increase quantity
            this.cart[basketIndex].quantity++;
        }

        //save changes to local storage
        localStorage.setItem('cart', JSON.stringify(this.cart));

        //console.log('after', this.cart, string, shirtsInCart, basketIndex);

    }

    removeFromCart(shirt) {

        let shirtsInCart = this.cart.map((basket, i) => {
            return basket.shirt.name;
        });

        let basketIndex = shirtsInCart.indexOf(shirt.name);

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
