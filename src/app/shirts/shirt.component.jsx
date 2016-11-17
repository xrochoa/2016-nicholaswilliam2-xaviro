import { Link } from 'react-router';

import colors from '../utils/colors';

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

    randomColorFromArray() {
        let randomIndex = Math.floor(Math.random() * colors.length);
        return { backgroundColor: colors[randomIndex] };
    }

    render() {
        return (
            <div className={ 'shirt-wrapper' + this.state.animate }>
                <h2>{this.props.children}</h2>
                <Link to={ `/shirts/${ this.props.shirtData.code }`}>
                    <img className="shirt" src="./assets/img/shirt.svg" style={ this.randomColorFromArray() }/>
                    <img className="sketch" src={this.props.shirtData.url}/>
                </Link>
            </div>
        );
    }
}
