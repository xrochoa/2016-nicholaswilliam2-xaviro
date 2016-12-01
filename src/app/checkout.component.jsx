import StripeCheckout from 'react-stripe-checkout';

import cartStore from './stores/cart.store';
import * as cartActions from './actions/cart.actions';

import { browserHistory } from 'react-router';

export class Checkout extends React.Component {

    onToken(token) {

        let postData = {
            token,
            details: cartStore.cart,
            amount: this.props.total
        }

        //console.log(postData);

        fetch('/savetoken', {
                method: 'post',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(postData)
            })
            .then(function(data) {
                if (data.status === 200) {
                    cartActions.resetCart();
                    browserHistory.push('/thankyou');
                } else {
                    browserHistory.push('/error');
                }
            })
            .catch(function(err) {
                console.log('Request failed', err);
            });

    }


    render() {
        return (
            <StripeCheckout
                name="Nicholas William"
                description="Shirts for the bungalow people!"
                image="../assets/img/logo.png"
                currency="USD"
                LOCALE="AUTO"
                zipCode={true}
                //important
                amount={ this.props.total }                 
                token={ this.onToken.bind(this) }
                stripeKey="pk_test_Ec7h9oH3JDBHgxsGF8GaXJL7"
            />
        )
    }
}

//            shippingAddress
// billingAddress={false}
