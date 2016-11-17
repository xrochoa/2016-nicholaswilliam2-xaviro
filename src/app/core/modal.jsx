import { Link } from 'react-router';

export class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { animate: '' };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ animate: ' animate' });
        }, 300)
    }

    render() {
        return (
            <div className="modal">
                <Link to="/">
                    <div className={ 'modal-overlay' + this.state.animate }></div>
                </Link>
                <div className={ 'modal-content ' + this.props.contentClass + this.state.animate }>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
