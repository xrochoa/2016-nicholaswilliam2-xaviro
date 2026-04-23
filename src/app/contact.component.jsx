import { Modal } from './core/modal';

// NOTE (2016): in the original deployment this form posted to a Formspree
// endpoint registered to Nicholas William. For the portfolio demo we just
// acknowledge the submission locally so the form stays interactive.
export class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = { sent: false };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ sent: true });
    }

    render() {
        return (
            <Modal contentClass="contact-modal">
                <h1>Contact</h1>
                { this.state.sent ? (
                    <p>Thanks! Your message has been noted (demo mode).</p>
                ) : (
                    <form onSubmit={ this.handleSubmit }>
                        <input type="email" name="email" placeholder="Your email" required />
                        <textarea name="message" placeholder="Your message" required></textarea>
                        <button type="submit">Send</button>
                    </form>
                ) }
            </Modal>
        );
    }
}
