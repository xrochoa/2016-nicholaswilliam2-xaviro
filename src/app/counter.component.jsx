export class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.incrementCount = this.incrementCount.bind(this);
    }

    incrementCount() {
        this.setState({
            count: this.state.count + 1
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, {this.props.name}! Count: {this.state.count}</h1>
                <button type="button" onClick={this.incrementCount}>Increment</button>
            </div>
        );
    }
}
