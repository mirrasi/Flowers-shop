// console.log("hello")
let cartBtn = document.querySelector('.cart-btn')
let cartWrapper = document.querySelector('.cart-wrapper')
let productsDiv = document.querySelector('.products')
cartBtn.addEventListener("click", () => cartWrapper.classList.toggle("cart-on"))

// chạy hàm
init()

// hàm khởi tạo, setup cho trang web
function init() {
    getProducts()
}

// hàm lấy dữ liệu giả từ trang web
async function getProducts() {
    let data = await fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => json)
    console.log(data)
    outputProducts(data)
}

//In sản phẩm ra website
function outputProducts(products) {
    let output = ''
    products.forEach(product => {
        output += `
    <div class="col-md-4 col-lg-3 my-3 product-wrapper">
      <div class="card product-${product.id}" style = "height: 39.5em !important;">
        <img class="card-img-top" src="${product.image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${product.title.substr(0, 50)}</h5>
          <p class="card-body">${product.description.substr(0, 50)} </p>
          <button type="button" class="btn btn-light bought">
              <i class="fa-solid fa-cart-shopping mr-2"></i>
            <span class="badge badge-danger ml-2">0</span>
          </button>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${product.category}</li>
          <li class="list-group-item">$ ${product.price}</li>
          <li class="list-group-item list-group-counter">
            <div class="btn-group product-count" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-primary minus">-</button>
              <button type="button" class="btn btn-light counter">0</button>
              <button type="button" class="btn btn-primary plus">+</button>
              <button type="button" class="btn btn-success add" data-price="${product.price}" data-id="${product.id}" data-title="${product.title}"><i class="fa-solid fa-cart-shopping mr-1"></i> Add</button>
            </div>
          </li>
        </ul>
      </div>
    </div> <!-- end of col-4 product -->
    `
    })
    productsDiv.innerHTML = output
    productCountEventListener()
}

function productCountEventListener() {
    let productCounter = document.querySelectorAll('.product-count')
    productCounter.forEach(function (counter) {
        counter.addEventListener("click", function (event) {
            console.log(event.target)
            // write the logic to incremeent or decrement the counter
            let countVal = event.target.closest(".product-count").children[1].innerText
            let countBtn = event.target.closest(".product-count").children[1]
            countVal = parseInt(countVal)

            if (event.target.classList.contains("plus")) {
                countVal++
                countBtn.textContent = countVal
                console.log(countVal)
            } else if (event.target.classList.contains("minus")) {
                if (countVal > 0) {
                    countVal--
                    countBtn.textContent = countVal
                    console.log(countVal)
                }
            } else if (event.target.classList.contains("add") && countVal != 0) {
                addToCart(event.target, countVal)
                countBtn.textContent = 0
            }
        })
    })
}

function addToCart(el, num) {
    let product = {
        "id": el.getAttribute("data-id"),
        "title": el.getAttribute("data-title"),
        "price": el.getAttribute("data-price"),
        "count": num
    }
    let cart = []
    if (localStorage.getItem("cart") !== null) {
        cart = JSON.parse(localStorage.getItem('cart'))
    }
    let count = product.count
    let existingItem = false
    cart.forEach((item) => {
        if (item.id == product.id) {
            item.count += product.count
            count = item.count
            existingItem = true
        }
    })
    if (!existingItem) {
        cart.push(product)
    }
    // update card on page
    updateCart(cart)
    // send cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart))
}

function updateCart(cart) {
    let cartBtn = document.querySelector('.cart-btn .badge')
    cartBtn.innerText = cart.length
    if (cart.length > 0) {
        cart.forEach((item) => {
            let itemBadge = document.querySelector(`.product-${item.id} .badge`)
            let itemAlert = document.querySelector(`.product-${item.id} .bought`)
            itemAlert.style.display = "block"
            itemBadge.innerText = item.count
        })
    }
    let tbody = document.querySelector('tbody')
    let tfooter = document.querySelector('tfoot .total')
    let output = ''
    let total = 0
    cart.forEach((item, i) => {
        total += (item.price * item.count)
        output += `<tr class="cart-item">
        <th scope="row">${i + 1}</th>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>${item.count} <button onclick="removeCart()" class="remove"><i class="fa fa-trash"></i></button></td>
      </tr>`
    })
    tbody.innerHTML = output
    tfooter.innerText = total.toLocaleString()
}

function removeCart() {
    let getLocalStorage = JSON.parse(localStorage.getItem("cart"))

    // console.log(getLocalStorage)

    for (let i = 0; i <= getLocalStorage.length; i++) {
            getLocalStorage.splice(i, 1)
    }
    localStorage.setItem('cart', JSON.stringify(getLocalStorage))
    updateCart(getLocalStorage)
    console.log(getLocalStorage)

    setTimeout(() => {
        if(localStorage.getItem('cart') == '[]'){
            location.reload()
        }
    },1000)
}