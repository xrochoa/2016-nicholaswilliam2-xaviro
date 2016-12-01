import { Modal } from './core/modal';
import { Link } from 'react-router';

export class ErrorModal extends React.Component {

    render() {
        return (
            <Modal contentClass="error-modal">
				<div className="error-wrapper">
					<h1>Error</h1>
					<p>There was an error processing the payment due to unknown reasons.</p>
					<p>Please try again soon or contact Nicholas William using the button bellow.</p>
					<div>
						<Link to="/contact"><button className="btn-back">Contact</button></Link>
						<Link to="/"><button className="btn-back">Back</button></Link>
					</div>
				</div>
			</Modal>
        );
    }
}
