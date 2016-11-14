export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '' };

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        this.logIn(this.state.email, this.state.password);
    }


    logIn(email, password) {

        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        } else {
            if (!email) {
                this.setState({ error: 'Please enter your email address.' });
                return;
            }
            if (!password) {
                this.setState({ error: 'Please enter your password.' });
                return;
            }
            firebase.auth().signInWithEmailAndPassword(email, password)
                .catch((err) => {
                    let errorCode = err.code;
                    let errorMessage = err.message;
                    if (errorCode === 'auth/wrong-password') {
                        this.setState({ error: 'The username or password is wrong.' });
                    } else {
                        this.setState({ error: errorMessage });
                    }
                });
        }
    }


    render() {
        return (
            <div>
            	<h1>Login</h1>
            	<form onSubmit={this.onSubmit}>
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
