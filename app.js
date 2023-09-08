import { menuArray } from "/data.js";

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
               <img src="/assets/add-black.png" class="img-add-black"/>
            </p>
        </div>
    </section>
  `;
	})
	.join("");
document.getElementById("container").innerHTML = menuArrHtml;

// renders items user adds to cart
function calculateCart(menuArray) {
	const totalCart = menuArray.reduce(function (item) {
		return `
<section class="order-card">
				<div class="added-item">
					<h4 class="item-name">${item.name}</h4>
					<p class="remove-item">remove</p>
					<p class="item-price">${item.price}</p>
				</div>
				<div class="order-total">
					<h4 class="total-price">Total price: ${totalCart}</h4>
				</div>
				<button class="complete-btn">Complete order</button>
			</section>
    `;
	});
}
document.getElementById("cart-container").innerHTML = calculateCart;
