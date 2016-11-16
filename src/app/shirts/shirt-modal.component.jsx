import { Link } from 'react-router';

import * as cartActions from '../actions/cart.actions';

export class ShirtModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { shirt: {}, animate: '' };
    }


    componentWillMount() {
        if (this.props.params.name) {
            this.fetchData();
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ animate: ' animate' });
        }, 300)
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
            <div className="modal shirt-modal">
                <Link to="/">
                    <div className={ 'modal-overlay' + this.state.animate }></div>
                </Link>
                <div className={ 'modal-content' + this.state.animate }>
                    <div className="flex">
                        <div className="modal-shirt-wrapper">
                            <img className="shirt" src="../assets/img/shirt.svg" />
                            <img className="sketch" src={this.state.shirt.url}/>
                        </div>
                        <div className="modal-shirt-text-wrapper">
                            <h2>{this.state.shirt.name}</h2>
                            <p>{ this.state.shirt.desc }</p>
                            <p>Price: ${ this.state.shirt.price }</p>
                            <p>Size: { this.state.shirt.size }</p>
                            <br/>
                            <button onClick={ this.addToCart.bind(this) }>Add to cart</button>
                            <Link to="/"><button>Back</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
