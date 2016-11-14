export class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: '', email: '', password: '', error: '' };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        this.signUp(this.state.username, this.state.email, this.state.password);
    }


    signUp(username, email, password) {

        if (!username) {
            this.setState({ error: 'Please enter a username.' });
            return;
        }
        if (!email) {
            this.setState({ error: 'Please enter an email address.' });
            return;
        }
        if (!password) {
            this.setState({ error: 'Please enter a password.' });
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                //save diplayname
                let user = firebase.auth().currentUser;
                user.updateProfile({ displayName: username })
                    .catch(this.handleErrors.bind(this));

            })
            .catch(this.handleErrors.bind(this));
    }

    handleErrors(err) {
        let errorCode = err.code;
        let errorMessage = err.message;
        this.setState({ error: errorMessage });
    }


    render() {
        return (
            <div>
            	<h1>Signup</h1>
            	<form onSubmit={this.onSubmit}>
            		<label>Username:</label>
			        <input type="text" value={this.state.username} onChange={this.onUsernameChange} />
			        <label>Email:</label>
			        <input type="text" value={this.state.email} onChange={this.onEmailChange} />
			        <label>Password:</label>
			        <input type="text" value={this.state.password} onChange={this.onPasswordChange} />
			        <input type="submit" value="Submit" />
			    </form>
			    <p>{this.state.error}</p>
			</div>
        );
    }
}
