import { Link } from 'react-router';

export class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: '', error: '' };

        this.signOut = this.signOut.bind(this);
    }

    componentWillMount() {
        //check if user is logged in
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let username = user.displayName;
                this.setState({ username: username });
            }
        });
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
                <Link to="/cart">Cart</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/checkout">Checkout</Link>
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
