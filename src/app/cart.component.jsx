import { Checkout } from './checkout.component';
import { Modal } from './core/modal';
import { Link } from 'react-router';

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
            <Modal contentClass="cart-modal">
              { (total === 0) ? 
                <div className="cart-empty">
                  <p>Your cart is empty</p>
                  <Link to="/"><button className="btn-back">Back</button></Link>
                </div> : 
              <table>
                <thead>
                  <tr>
                    <td><h3>Shirt</h3></td>
                    <td><h3>Price</h3></td>
                    <td><h3>Quantity</h3></td>
                    <td><h3>Subtotal</h3></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  { this.state.cart.map((basket, i)=>{
                      return (
                        <tr className="cart-item" key={ i }>
                          <td>
                            <div className="cart-shirt-wrapper">
                              <div className="cart-shirt">
                                  <img className="shirt" src="../assets/img/shirt.svg" style={{ backgroundColor: basket.shirt.color }}/>
                                  <img className="sketch" src={basket.shirt.url}/>
                              </div>
                              <div>
                                <h3>{basket.shirt.name}</h3>
                                <p>Size: {basket.shirt.size}</p>
                              </div>
                            </div>
                          </td>
                          <td>{basket.shirt.price}</td>
                          <td>{basket.quantity}</td>
                          <td>{basket.shirt.price * basket.quantity}</td>
                          <td>
                            <button onClick={ () => this.removeFromCart(basket.shirt) }> - </button>
                            <button onClick={ () => this.addToCart(basket.shirt) }> + </button>
                          </td>
                        </tr>
                  )}) }
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3"><h3>TOTAL:</h3></td>
                      <td>{ total }</td>
                      <td><Checkout total={ total * 100 }/></td>
                    </tr>
                    <tr>
                      <td colSpan="4"></td>
                      <td><Link to="/"><button className="btn-back">Back</button></Link></td>
                    </tr>
                  </tfoot>
              </table> }
            </Modal>
        );
    }
}

//LOCAL STORAGE FOR CART
//date; for expiration action
//items: []
//item: { number, item }
//<button onClick={ this.addToCart(basket.shirt) }> + </button>
//<button onClick={ this.removeFromCart(basket.shirt).bind(this) }> - </button>
