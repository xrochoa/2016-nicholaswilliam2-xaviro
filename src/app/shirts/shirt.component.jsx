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

    render() {
        return (
            <div>
              <h1>{this.props.children}</h1>
              <Link to={ `/shirts/${ this.props.shirtData.code }`}><img src={this.props.shirtData.url}/></Link>
            </div>
        );
    }
}
