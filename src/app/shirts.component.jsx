export class Shirts extends React.Component {

    render() {
        return (
            <div>
              <header></header>
              <div>SHIRTS</div>
              <div className="modal">
                {this.props.children}
              </div>
            </div>
        );
    }
}
