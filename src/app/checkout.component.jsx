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

        // In production, /savetoken is redirected to a Netlify Function
        // (see netlify.toml). In local development a mock middleware in the
        // Gulp server (gulpfile.js) answers the same path with a demo success.
        fetch('/savetoken', {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(postData)
            })
            .then((data) => {
                if (data.status === 200) {
                    cartActions.resetCart();
                    browserHistory.push('/thankyou');
                } else {
                    browserHistory.push('/error');
                }
            })
            .catch(() => {
                browserHistory.push('/error');
            });

    }


    render() {
        // Stripe Checkout loads the image from inside its own iframe on
        // checkout.stripe.com, so a relative path would 404. Build an
        // absolute URL from the current origin at render time.
        const logoUrl = (typeof window !== 'undefined')
            ? window.location.origin + '/assets/img/logo.png'
            : undefined;

        return (
            <StripeCheckout
                name="Nicholas William"
                description="Shirts for the bungalow people!"
                image={ logoUrl }
                currency="USD"
                LOCALE="auto"
                //important
                amount={ this.props.total }                 
                token={ this.onToken.bind(this) }
                stripeKey="pk_test_Ec7h9oH3JDBHgxsGF8GaXJL7"
                //shipping info
                shippingAddress
                billingAddress={true}
                zipCode={true}
            />
        )
    }
}


