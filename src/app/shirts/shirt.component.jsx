export class Shirt extends React.Component {

    constructor(props) {
        super(props);
        this.state = { url: '' };
    }

    componentWillMount() {
        let storageRef = firebase.storage().ref();
        storageRef.child(`${this.props.imgName}.png`).getDownloadURL().then((url) => {
            this.setState({ url: url });
        }).catch(function(err) {
            console.log('There was a problen getting the shirt image: ', err.message)
        });
    }

    render() {
        return (
            <div>
              <h1>{this.props.children}</h1>
              <img src={this.state.url}/>
            </div>
        );
    }
}
