import { Link } from 'react-router';
import { Modal } from '../core/modal';

import * as cartActions from '../actions/cart.actions';
import cartStore from '../stores/cart.store';

import { SizePicker } from './size-picker';
import { ColorPicker } from './color-picker';


export class ShirtModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { shirt: {}, sizes: ['S', 'M', 'L', 'XL'], cartItems: 0 };

        this.getCartItems = this.getCartItems.bind(this); //ensures function is the same for removeListener
    }

    getCartItems() {
        //get number of items from local storage
        let cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems !== null) { this.setState({ cartItems }); }
    }

    componentWillMount() {
        this.getCartItems();
        //add event listener (for state/view change)
        cartStore.on('UPDATE_CART_ITEMS', this.getCartItems);

        if (this.props.params.name) {
            this.fetchData();
        }
    }

    componentWillUnmount() {
        //remove event listener (for state/view change)
        cartStore.removeListener('UPDATE_CART_ITEMS', this.getCartItems);
        //console.log('count', cartStore.listenerCount('UPDATE_CART_ITEMS'));
    }

    selectSize(event) {
        let shirt = this.state.shirt;
        shirt.size = event.target.innerHTML;
        this.setState({ shirt }); //did it this way since setStae cant chage properties recursively
    }

    selectColor(color) {
        let shirt = this.state.shirt;
        shirt.color = color;
        this.setState({ shirt });
        //console.log(shirt);
    }

    fetchData() {
        fetch(`https://nicholaswilliamapi.firebaseio.com/shirts/${ this.props.params.name }.json`)
            .then((response) => {
                return response.json();
            })
            .then((shirt) => {
                this.setState({ shirt });
            })
            .catch(function(err) {
                console.log('There was a problen accessing the shirt API: ' + err.message);
            });
    }

    addToCart() {
        cartActions.addToCart(this.state.shirt);
    }

    render() {
        return (
            <Modal contentClass="shirt-modal">
                <div className="flex">
                    <div className="modal-shirt-wrapper">
                        <img className="shirt" src="../assets/img/shirt.svg" style={{ backgroundColor: this.state.shirt.color }}/>
                        <img className="sketch" src={this.state.shirt.url}/>
                    </div>
                    <div className="modal-shirt-text-wrapper">
                        <h2>{this.state.shirt.name}</h2>
                        <p>{ this.state.shirt.desc }</p>
                        <SizePicker size={ this.state.shirt.size } selectSize={ this.selectSize.bind(this) }/>
                        <ColorPicker color={ this.state.shirt.color } selectColor={ this.selectColor.bind(this) }/>
                        <p>Price: ${ this.state.shirt.price }</p>
                        <div className="cart-row">
                            <button onClick={ this.addToCart.bind(this) }>Add to cart</button>
                            <Link to="/cart" className="icon-cart">
                                <img className={ 'icon' + this.state.animate } src="./assets/img/icon-cart.svg" />
                            </Link>                            
                            <span className="cart-items">{ this.state.cartItems }</span>
                        </div>
                        <Link to="/"><button>Back</button></Link>
                    </div>
                </div>
            </Modal>
        );
    }
}
