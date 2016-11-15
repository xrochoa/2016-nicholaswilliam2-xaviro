import { Link } from 'react-router';
import cartStore from '../stores/cart.store';

export class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: '', error: '', 'cartItems': 0 };
        this.signOut = this.signOut.bind(this);
    }

    componentWillMount() {
        this.checkAuth();
        this.getCartItems();
        //add event listener (for state/view change)
        cartStore.on('UPDATE_CART_ITEMS', () => {
            this.getCartItems();
        });
    }

    checkAuth() {
        //check if user is logged in
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let username = user.displayName;
                this.setState({ username: username });
            }
        });
    }

    getCartItems() {
        //get number of items from local storage
        let cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems !== null) { this.setState({ cartItems: cartItems }); }
    }



    signOut() {
        firebase.auth().signOut()
            .then(() => { this.setState({ username: '' }); })
            .catch((err) => { this.setState({ error: err.message }); });
    }

    render() {
        return (
            <nav>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart { this.state.cartItems }</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                { this.state.username ? <button onClick={ this.signOut }>Sign Out</button> : null }
                <p>{ this.state.username }</p>
                <p>{ this.state.error }</p>
            </nav>
        );
    }
}

//still need shirts/:name
//remember in ES6 { type } replaces { type: type }
//remember in ES6 const { params } = this.props improves readability just using params instead of this.props.params
