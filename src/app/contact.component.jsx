export class Contact extends React.Component {

    render() {
        return (
            <form method="POST" action="http://formspree.io/XXXNICHOLASXXX.com">
			  <input type="email" name="email" placeholder="Your email" />
			  <textarea name="message" placeholder="Your message"></textarea>
			  <button type="submit">Send</button>
			</form>
        );
    }
}
