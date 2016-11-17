import { Modal } from './core/modal';

export class Contact extends React.Component {

    render() {
        return (
			<Modal contentClass="contact-modal">
				<form method="POST" action="http://formspree.io/XXXNICHOLASXXX.com">
					<input type="email" name="email" placeholder="Your email" />
					<textarea name="message" placeholder="Your message"></textarea>
					<button type="submit">Send</button>
				</form>
			</Modal>
        );
    }
}
