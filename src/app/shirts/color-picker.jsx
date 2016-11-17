import colors from '../utils/colors';

export class ColorPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = { colors: colors };
    }

    checkSelected(color) {
        return (color === this.props.color) ? ' selected' : '';
    }

    render() {
        return <div className="color-boxes">
                    <div>Color: </div>
                    { this.state.colors.map((color, i) => {
                        return <span 
                                    key={ i } 
                                    onClick={ () => this.props.selectColor(color) }
                                    style={{ backgroundColor: color }}
                                    className={ 'color-box' + this.checkSelected(color) }>
                                </span>
                        })
                    }
                </div>
    }

}
