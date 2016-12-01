import { Modal } from './core/modal';
import { Link } from 'react-router';

import { browserHistory } from 'react-router';

export class Thankyou extends React.Component {

    componentWillMount() {
        setTimeout(() => {
            browserHistory.push('/');
        }, 10000);
    }

    render() {
        return (
            <Modal contentClass="thankyou-modal">
				<div className="thankyou-wrapper">
					<h1>Alright!</h1>
					<p>Your order has been placed.</p>
					<p>Thank you for your purchase.</p>
					<div>
						<Link to="/"><button className="btn-back">Back</button></Link>
					</div>
				</div>
			</Modal>
        );
    }
}
