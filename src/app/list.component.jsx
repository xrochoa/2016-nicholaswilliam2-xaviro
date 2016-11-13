export class List extends React.Component {

    render() {
        return (
            <ul>{this.props.items.map(function(item) {
              return <li key={item}>{item}</li>
            })}</ul>
        )
    }
}
