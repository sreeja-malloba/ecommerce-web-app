const productsDiv = document.getElementById("products");

const cartDiv = document.getElementById("cart");

let cart = [];

let token = "";


// FETCH PRODUCTS

fetch("http://localhost:5000/api/products")

.then(res => res.json())

.then(data => {

    data.forEach(product => {

        productsDiv.innerHTML += `

            <div class="product">

                <h3>${product.name}</h3>

                <p>Price: ₹${product.price}</p>

                <p>${product.description}</p>

                <button onclick='addToCart(${JSON.stringify(product)})'>

                    Add To Cart

                </button>

            </div>
        `;
    });

});


// ADD TO CART

function addToCart(product) {

    cart.push(product);

    displayCart();
}


// DISPLAY CART

function displayCart() {

    cartDiv.innerHTML = "";

    cart.forEach(item => {

        cartDiv.innerHTML += `

            <p>
                ${item.name} - ₹${item.price}
            </p>
        `;
    });
}


// CHECKOUT

function checkout() {

    let total = 0;

    cart.forEach(item => {

        total += item.price;
    });

    fetch("http://localhost:5000/api/orders", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            userId: "123",

            products: cart,

            totalPrice: total
        })
    })

    .then(res => res.json())

    .then(data => {

        alert("Order Placed Successfully");

        cart = [];

        displayCart();
    });
}



// REGISTER

function register() {

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    fetch("http://localhost:5000/api/auth/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            email,
            password
        })
    })

    .then(res => res.json())

    .then(data => {

        alert(data.message);
    });
}



// LOGIN

function login() {

    const email =
    document.getElementById("loginEmail").value;

    const password =
    document.getElementById("loginPassword").value;

    fetch("http://localhost:5000/api/auth/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })
    })

    .then(res => res.json())

    .then(data => {

        token = data.token;

        localStorage.setItem("token", token);

        alert("Login Success");
    });
}