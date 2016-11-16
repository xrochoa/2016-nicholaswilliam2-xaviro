export class Footer extends React.Component {

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
            <footer id="site-footer" className={ this.state.animate }>
                <p>Nicholas William 2016 { String.fromCharCode(169) } All rights reserved</p>
            </footer>
        );
    }
}
