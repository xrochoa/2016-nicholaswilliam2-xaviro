export class SizePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = { sizes: ['S', 'M', 'L', 'XL'] };
    }

    checkSelected(size) {
        return (size === this.props.size) ? ' selected' : '';
    }

    render() {
        return <div className="size-boxes">
                    <span>Size: </span>
                    { this.state.sizes.map((size, i) => {
                        return <span 
                                    key={ i } 
                                    onClick={ (event) => this.props.selectSize(event) } 
                                    className={ 'size-box' + this.checkSelected(size) }>{ size }
                                </span>
                        })
                    }
                </div>
    }

}
