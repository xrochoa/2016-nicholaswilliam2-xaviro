import { Shirt } from './shirt.component';

export class Shirts extends React.Component {

    constructor(props) {
        super(props);
        this.state = { shirts: [] };
    }

    componentWillMount() {
        fetch('https://nicholaswilliamapi.firebaseio.com/shirts.json')
            .then((response) => {
                return response.json();
            })
            .then((shirts) => {
                let shirtsArray = [];
                for (let key in shirts) {
                    let newShirt = shirts[key];
                    newShirt['code'] = key;
                    shirtsArray.push(newShirt);
                }
                this.setState({ shirts: shirtsArray });
            })
            .catch(function(err) {
                console.log('There was a problen accessing the shirts API: ' + err.message);
            });
    }

    render() {
        return (
            <div className="shirts">
              <header></header>
              { this.state.shirts.map((shirt, i)=>{
                  return <Shirt key={ i } shirtData={ shirt }>{shirt.name}</Shirt>
              }) }
              <div className="modal">
                {this.props.children}
              </div>
            </div>
        );
    }
}
