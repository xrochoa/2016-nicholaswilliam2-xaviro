import { MyComponent } from './counter.component';
import { FilteredList } from './filtered-list.component';

ReactDOM.render(
    <div>
		<MyComponent name="Handsome" />
		<FilteredList/>
	</div>,
    document.getElementById('my-app')
);

//LIFECYCLE METHODS

//componentWillMount – Invoked once, on both client & server before rendering occurs. (now constructor in es6)
//componentDidMount – Invoked once, only on the client, after rendering occurs.
//shouldComponentUpdate – Return value determines whether component should update.
//componentWillUnmount – Invoked prior to unmounting component.

// SPECS

// getInitialState – Return value is the initial value for state.
// getDefaultProps – Sets fallback props values if props aren’t supplied.
// mixins – An array of objects, used to extend the current component’s functionality.
