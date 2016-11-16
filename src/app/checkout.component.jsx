import StripeCheckout from 'react-stripe-checkout';

import { browserHistory } from 'react-router';

export class Checkout extends React.Component {

    onToken(token) {

        let postData = {
            token,
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
                    browserHistory.push('/thankyou');
                } else {
                    console.log('There was an error with the payment, Nicholas William will contact you soon', data.body);

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
                image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
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
