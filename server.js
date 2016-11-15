var express = require('express');
var stripe = require("stripe")("sk_test_REDACTED");
var morgan = require('morgan');
var bodyParser = require('body-parser');


var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

app.post('/savetoken', function(req, res) {

    var token = req.body.token.id;
    var amount = req.body.amount;

    //console.log(req.body, token, amount);

    var charge = stripe.charges.create({
        amount: amount, // Amount in cents
        currency: "usd",
        source: token,
        description: "Example charge"
    }, function(err, charge) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send('success!');
        }
    });

});

app.listen(3000, function() {
    console.log('Listening on port 3000')
});
