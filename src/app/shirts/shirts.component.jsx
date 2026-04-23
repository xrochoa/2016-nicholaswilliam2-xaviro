import { Shirt } from './shirt.component';

export class Shirts extends React.Component {

    constructor(props) {
        super(props);
        this.state = { shirts: [] };
    }

    componentWillMount() {
        fetch('./assets/res/shirts.json')
            .then((response) => response.json())
            .then((shirts) => {
                let shirtsArray = [];
                for (let key in shirts) {
                    let newShirt = shirts[key];
                    newShirt['code'] = key;
                    shirtsArray.push(newShirt);
                }
                this.setState({ shirts: shirtsArray });
            })
            .catch((err) => {
                console.log('There was a problem loading the shirts catalog: ' + err.message);
            });
    }

    render() {
        return (
            <div className="shirts">
                { this.state.shirts.map((shirt, i)=>{
                  return <Shirt key={ i } shirtData={ shirt }>{shirt.name}</Shirt>
                }) }
                {this.props.children}
            </div>
        );
    }
}
