import { Link } from 'react-router';

import * as cartActions from '../actions/cart.actions';

export class ShirtModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { shirt: {} };
    }

    componentWillMount() {
        if (this.props.params.name) {
            this.fetchData();
        }
    }

    fetchData() {
        fetch(`https://nicholaswilliamapi.firebaseio.com/shirts/${ this.props.params.name }.json`)
            .then((response) => {
                return response.json();
            })
            .then((shirt) => {
                this.setState({ shirt: shirt });
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
            <div>
                <h1>ShirtModal : {this.state.shirt.name}</h1>
                <img src={ this.state.shirt.url }/>
                <p>{ this.state.shirt.desc }</p>
                <p>{ this.state.shirt.price }</p>
                <p>{ this.state.shirt.size }</p>
                <button onClick={ this.addToCart.bind(this) }>Add to cart</button>
              <Link to="/">Home</Link>
            </div>
        );
    }
}
