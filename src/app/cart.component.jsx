import { Checkout } from './checkout.component';

import cartStore from './stores/cart.store';

import * as cartActions from './actions/cart.actions';

export class Cart extends React.Component {

    constructor() {
        super();
        this.updateCart = this.updateCart.bind(this); //ensures listener will be removed on unmount
        this.state = { cart: cartStore.getAll() };

    }

    componentWillMount() {
        //add event listener (for state/view change)
        cartStore.on('UPDATE_CART_ITEMS', this.updateCart);
        //console.log(cartStore.listenerCount('UPDATE_CART_ITEMS'));
    }

    componentWillUnmount() {
        //remove event listener (for state/view change)
        cartStore.removeListener('UPDATE_CART_ITEMS', this.updateCart); //prevents memory leaks and errors
    }

    updateCart() {
        //get number of items from local storage
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) { this.setState({ cart }); }
    }

    addToCart(shirt) {
        cartActions.addToCart(shirt);
    }

    removeFromCart(shirt) {
        cartActions.removeFromCart(shirt);
    }

    render() {

        let total = this.state.cart.map((basket, i) => {
            return (basket.shirt.price * basket.quantity)
        }).reduce((a, b) => a + b, 0)

        return (
            <div className="cart">
              { this.state.cart.map((basket, i)=>{
                  return (
                    <div key={ i }>
                      <p>{basket.shirt.name}</p>
                      <p>Quantity: {basket.quantity}</p>
                      <p>Price: {basket.shirt.price}</p>
                      <p>Subtotal: {basket.shirt.price * basket.quantity}</p>
                      <button onClick={ () => this.removeFromCart(basket.shirt) }> - </button>
            <button onClick={ () => this.addToCart(basket.shirt) }> + </button>
                  </div>
              )}) }
              { (total === 0) ? <p>Your cart is empty</p> : 
                <div>
                  <div>TOTAL:  { total }</div>
                  <Checkout total={ total * 100 }/>
                </div> }
            </div>
        );
    }
}

//LOCAL STORAGE FOR CART
//date; for expiration action
//items: []
//item: { number, item }
//<button onClick={ this.addToCart(basket.shirt) }> + </button>
//<button onClick={ this.removeFromCart(basket.shirt).bind(this) }> - </button>
