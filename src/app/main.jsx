var MyComponent = React.createClass({
    render: function(){
        return (
            <h1>Hello, world!</h1>
        );
    }
});

ReactDOM.render(
    <MyComponent/>,
    document.getElementById('my-app')
);
