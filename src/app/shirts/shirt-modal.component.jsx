import { Link } from 'react-router';

import * as cartActions from '../actions/cart.actions';

export class ShirtModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { shirt: {}, animate: '', sizes: ['S', 'M', 'L', 'XL'] };
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

    selectSize(event) {
        let shirt = this.state.shirt;
            shirt.size = event.target.innerHTML;
        this.setState({ shirt }); //did it this way since setStae cant chage properties recursively
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

    checkSelected(size) {
        return (size === this.state.shirt.size) ? ' selected' : '';
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
                            <div className="size-boxes">
                                <span>Size: </span>
                                { this.state.sizes.map((size, i) => {
                                    return <span 
                                                key={ i } 
                                                onClick={ (event) => this.selectSize(event) } 
                                                className={ 'size-box' + this.checkSelected(size) }>{ size }
                                            </span>
                                    })
                                }
                            </div>
                            <p>Color: { this.state.shirt.color }</p>
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
