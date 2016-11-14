import { Link } from 'react-router';

export class Nav extends React.Component {

    render() {
        return (
            <nav>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/checkout">Checkout</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        );
    }
}

//still need shirts/:name
