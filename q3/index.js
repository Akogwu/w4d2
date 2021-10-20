const express = require('express'); // npm run dev - to run nodemon
const path = require('path');
const app = express();

const session = require('express-session');

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"));

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'view', 'js')));

app.use(express.urlencoded({ extended: false }));

const productList = [
    { id: 1, name: 'Dell Laptop', price: 800, description: 'It is good product It is good product It is good product' },
    { id: 2, name: 'Samsung Mobile', price: 750, description: 'It is good mobile' },
    { id: 3, name: 'Wireless Mouse', price: 30, description: 'very smooth' },
    { id: 4, name: 'MAC 1200 series', price: 2000, description: 'Awesome features and hardware Awesome features and hardware Awesome features and hardware' },
    { id: 5, name: 'Test Prodct Test Product', price: 12345, description: 'test description' }
];

app.use(session({
    secret: 'salt123',
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: true
}));
app.use((req, res, next) => {
    if (!req.session.cart)
        req.session.cart = [];
    next();
});

app.get('/', (req, res) => {
    res.render("product", {
        productList: productList,
        'productCount': req.session.cart.length
    });
});

app.get('/productDetail/:id', (req, res) => {
    res.render('productSingle', {
        'product': productList.find(p => p.id == req.params.id)
    });
});

app.get('/cartList', (req, res) => {
    res.render("shoppingcart", {
        cartList: req.session.cart
    });
});

let isPresent;
app.post('/addToCart', (req, res) => {
    let carts = req.session.cart;
    isPresent = false;
    for (let c in carts) {
        if (carts[c]['name'] == req.body.name) {
            carts[c]['price'] += parseFloat(req.body.price);
            carts[c]['quantity']++;
            isPresent = true;
        }
    }
    if (!isPresent) {
        req.session.cart.push({
            name: req.body.name,
            price: parseFloat(req.body.price),
            quantity: 1
        });
    }
    // res.send(200);
    return res.send(200, { result: req.session.cart.length });
    res.end();
    // res.redirect(303, '/cartList');
});

app.listen(3000, () => {
    console.log("Server running at port 3000.");
});