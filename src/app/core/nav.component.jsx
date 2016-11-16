import { Link } from 'react-router';
import cartStore from '../stores/cart.store';

export class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 'cartItems': 0, animate: '' };
    }

    componentWillMount() {
        this.getCartItems();
        //add event listener (for state/view change)
        cartStore.on('UPDATE_CART_ITEMS', () => {
            this.getCartItems();
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ animate: ' animate' });
        }, 300)
    }

    getCartItems() {
        //get number of items from local storage
        let cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems !== null) { this.setState({ cartItems }); }
    }

    render() {
        return (
            <nav id="site-nav" className="flex">
                <img className={ 'img-logo' + this.state.animate } src="../assets/img/logo.svg" />
                <div id="social-icons" className="flex">                
                    <a href="https://www.facebook.com/nwconcept" target="_blank">
                        <img className={ 'icon' + this.state.animate } src="./assets/img/icon-facebook.svg" />
                        <p>Facebook</p>
                    </a>
                    <Link to="/about">
                        <img className={ 'icon' + this.state.animate } src="./assets/img/icon-about.svg" />
                        <p>About</p>
                    </Link>
                    <Link to="/contact">
                        <img className={ 'icon' + this.state.animate } src="./assets/img/icon-contact.svg" />
                        <p>Contact</p>
                    </Link>
                    <Link to="/cart">
                        <img className={ 'icon' + this.state.animate } src="./assets/img/icon-cart.svg" />
                        <p>Cart</p>
                    </Link>
                    <div className={ 'cart-items' + this.state.animate }>{ this.state.cartItems }</div>
                </div>
            </nav>
        );
    }
}
