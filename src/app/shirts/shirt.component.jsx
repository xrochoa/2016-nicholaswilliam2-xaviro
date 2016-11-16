import { Link } from 'react-router';

export class Shirt extends React.Component {

    constructor(props) {
        super(props);
        this.state = { animate: '' };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ animate: ' animate' });
        }, 300)
    }

    randomHex() {
        return { backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16) };
    }

    render() {
        return (
            <div className={ 'shirt-wrapper' + this.state.animate }>
                <h2>{this.props.children}</h2>
                <Link to={ `/shirts/${ this.props.shirtData.code }`}>
                    <img className="shirt" src="./assets/img/shirt.svg" style={ this.randomHex() }/>
                    <img className="sketch" src={this.props.shirtData.url}/>
                </Link>
            </div>
        );
    }
}
