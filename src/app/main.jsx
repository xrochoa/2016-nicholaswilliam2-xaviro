import { Router, Route, IndexRoute, Link, browserHistory, IndexRedirect } from 'react-router';

//Core
import { Nav } from './core/nav.component';
import { Footer } from './core/footer.component';

//Routes
import { Shirts } from './shirts/shirts.component';

//Special case routes/modals
import { Cart } from './cart.component';
import { About } from './about.component';
import { Contact } from './contact.component';
import { ShirtModal } from './shirts/shirt-modal.component';
import { Thankyou } from './thankyou.component';

class Layout extends React.Component {

    render() {
        return (
            <div>
              <Nav></Nav>
              <main>
                {this.props.children}
              </main>
              <Footer></Footer>
            </div>
        );
    }
}

// Note that with how CodePen works, I wasn't able to get the browserHistory to work
// as the article suggests. The demo works without it, but you'll want to be sure to 
// use it in a real application
ReactDOM.render((
    <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Shirts} />
      <Route component={Shirts}>
        <Route path="cart" component={Cart} />
        <Route path="about" component={About} />
        <Route path="contact" component={Contact} />
        <Route path="thankyou" component={Thankyou} />
        <Route path="shirts/:name" component={ShirtModal} />
      </Route>
    </Route>
    <Route path="*" component={Layout}>
      <IndexRedirect to="/" /> 
    </Route>
  </Router>
), document.getElementById('my-app'))


//LIFECYCLE METHODS

//componentWillMount – Invoked once, on both client & server before rendering occurs. (now constructor in es6)
//componentDidMount – Invoked once, only on the client, after rendering occurs.
//shouldComponentUpdate – Return value determines whether component should update.
//componentWillUnmount – Invoked prior to unmounting component.

// SPECS

// getInitialState – Return value is the initial value for state.
// getDefaultProps – Sets fallback props values if props aren’t supplied.
// mixins – An array of objects, used to extend the current component’s functionality.
