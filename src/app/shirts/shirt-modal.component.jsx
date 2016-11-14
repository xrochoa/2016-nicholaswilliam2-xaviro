import { Link } from 'react-router';

export class ShirtModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { shirt: {} };
    }

    componentWillMount() {
    	console.log(this.props.params.name);
        if (this.props.params.name) {
            this.fetchData();
        }
    }

    fetchData() {
        fetch(`https://nicholaswilliamapi.firebaseio.com/shirts/${ this.props.params.name }.json`)
            .then((response) => {
                return response.json();
            })
            .then((shirt) => {
                this.setState({ shirt: shirt });
            })
            .catch(function(err) {
                console.log('There was a problen accessing the shirt API: ' + err.message);
            });
    }

    render() {
        return (
            <div>
	            <h1>ShirtModal : {this.state.shirt.name}</h1>
	            <img src={ this.state.shirt.url }/>
	            <p>{ this.state.shirt.desc }</p>
	           	<p>{ this.state.shirt.price }</p>
	            <p>{ this.state.shirt.size }</p>
 	          <Link to="/">Home</Link>
            </div>
        );
    }
}
