import { menuArray } from "/data.js";

let cart = [];
// renders menu items
const menuArrHtml = menuArray
	.map(function (item) {
		return `
  <section class="card">
        <div class="card-start">
            <img src="/assets/${item.icon}">
        </div>
            <div class="card-mid">
                <h3 class="card-name">${item.name} $${item.price}</h3>
                <p class="card-toppings">${item.toppings}</p>
                
            </div>
        <div class="card-end">
            <p class="card-menu">
               <img src="/assets/add-black.png" class="img-add-black"
               data-name="${item.name}"
               data-price="${item.price}"/>
            </p>
        </div>
    </section>
  `;
	})
	.join("");
document.getElementById("container").innerHTML = menuArrHtml;

const addBtns = document.querySelectorAll(".img-add-black");
addBtns.forEach((btn) => {
	btn.addEventListener("click", addToCart);
});

function addToCart(event) {
	let name = event.target.dataset.name;
	let price = event.target.dataset.price;
	let item = {
		name,
		price,
	};
	cart.push(item);
}

// renders items user adds to cart
function calculateCart(cart) {
	let cartHtml = "";
	let total = 0;
	cart.forEach((item) => {
		cartHtml += `
<section class="order-card">
				<div class="added-item">
					<h4 class="item-name">${item.name}</h4>
					<p class="remove-item">remove</p>
					<p class="item-price">${item.price}</p>
				</div>
				<button class="complete-btn">Complete order</button>
			</section>
    `;
		total += item.price;
	});
	document.getElementById("cart-container").innerHTML = cartHtml;
	document.getElementById("total").innerHTML = total;
}
calculateCart(cart);
