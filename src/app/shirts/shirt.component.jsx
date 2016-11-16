import { Link } from 'react-router';

export class Shirt extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = { url: '' };
    // }


    //componentWillMount() {
    //logic to retrieve using firebase storage (unnecessary for this app, to slow and only read is needed, moving it to database instead)
    // let storageRef = firebase.storage().ref();
    // storageRef.child(`${ this.formatedImageName() }.png`).getDownloadURL().then((url) => {
    //     this.setState({ url: url });
    // }).catch(function(err) {
    //     console.log('There was a problen getting the shirt image: ', err.message)
    // });
    //}

    // formatedImageName() {
    //     return this.props.shirtData.name.toLowerCase().split(' ').join('_');
    // }

    randomHex() {
        return { backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16) };
    }

    render() {
        return (
            <div className="shirt-wrapper">
                <h2>{this.props.children}</h2>
                <Link to={ `/shirts/${ this.props.shirtData.code }`}>
                    <img className="shirt" src="./assets/img/shirt.svg" style={ this.randomHex() }/>
                    <img className="sketch" src={this.props.shirtData.url}/>
                </Link>
            </div>
        );
    }
}
