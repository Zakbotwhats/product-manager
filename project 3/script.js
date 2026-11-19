let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productQuantity = document.getElementById("productQuantity");
let saveBtn = document.getElementById("saveBtn");
let message = document.getElementById("message");
let productsDisplayContainer = document.getElementById("productsDisplayContainer");
let productsCount = document.getElementById("productsCount");

let products = [];
let editindex = null;

let savedProducts = localStorage.getItem("allProducts"); 

if (savedProducts !== null){
    products = JSON.parse(savedProducts);
};

function saveProducts(){
    localStorage.setItem("allProducts",JSON.stringify(products));
}

function updateCount() {
    productsCount.textContent = products.length;
}

function displayProducts(){
    productsDisplayContainer.innerHTML = "";

    if (products.length === 0) {
        productsDisplayContainer.innerHTML = `<p class="no-products">No products added yet.</p>`;
        return;
    }

    products.forEach(function(product,index){
        productsDisplayContainer.innerHTML  += `
        <div class="product-card">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p><span>Price:</span> $${product.price}</p>
                <p><span>Quantity:</span> ${product.quantity}</p>
            </div>
            <div class="product-actions">
                <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
            </div>
        </div>
        `;
    });
};

saveBtn.addEventListener("click",function(){
    if (productName.value.trim() === "" || productPrice.value.trim() === "" || productQuantity.value.trim() === "") {
        message.textContent = "please enter all product details!";
        message.className = "error-msg";
        return;
    }

    let product = {
        name: productName.value.trim(),
        price: Number(productPrice.value),
        quantity: Number(productQuantity.value)
    };

    if (editindex === null){
        products.push(product);
        message.textContent = "Product saved successfully!";
        message.className = "success-msg";
    } else {
        products[editindex] = product;
        editindex = null;
        saveBtn.textContent = "save Product";
        message.textContent = "Product Updated successfully!";
        message.className = "success-msg";
    }

    saveProducts();
    displayProducts();
    updateCount();

    productName.value = '';
    productPrice.value = '';
    productQuantity.value = '';

    setTimeout(() => {
        message.textContent = "";
        message.className = "";
    }, 3000);
});

function editProduct(index){
    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productQuantity.value = products[index].quantity;

    editindex = index;
    saveBtn.textContent = "Update Product";
    message.textContent = "Editing product details...";
    message.className = "error-msg";
}

function deleteProduct(index){
    products.splice(index,1);

    saveProducts();
    displayProducts();
    updateCount();

    message.textContent = "Product Deleted successfully!";
    message.className = "success-msg";

    setTimeout(() => {
        message.textContent = "";
        message.className = "";
    }, 3000);
}

displayProducts();
updateCount();