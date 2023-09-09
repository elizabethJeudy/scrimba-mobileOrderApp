import { menuArray } from "/data.js";

let cartArray = [];

// handles clicks for adding item and removing
document.addEventListener("click", (event) => {
	if (event.target.dataset.id) {
		handleAddClick(event.target.dataset.id);
	}
	if (event.target.dataset.remove) {
		handleDeleteClick(event.target.dataset.remove);
	}
	if (event.target.dataset.add) {
		handleAddClick(event.target.dataset.add);
	}
});

orderSubmit.addEventListener("submit", renderPayment);

// handles adding an item
const handleAddClick = (itemID) => {
	// grabs matching id
	const targetItem = menuArray.filter((item) => item.id == itemID)[0];
	// adds item to cart
	if (!cartArray.includes(targetItem)) {
		cartArray.push(targetItem);
	}
	// increments number ordered from dataset
	targetItem.numberOrdered++;
	renderOrder();
};

// handles deleting an item
const handleDeleteClick = (itemID) => {
	const targetItem = cartArray.filter((item) => item.id == itemID)[0];
	// decrements or removes item by finding the index
	if (targetItem.numberOrdered == 1 || targetItem.numberOrdered == 0) {
		const indexOfRemovedItem = cartArray.indexOf(targetItem);
		cartArray.splice(indexOfRemovedItem, 1);
	}
	targetItem.numberOrdered--;
	renderOrder();
};

// renders menu items
const getMenuHtml = () => {
	let menuArrHtml = "";
	menuArray.forEach((item) => {
		menuArrHtml += `
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
	});
	return menuArrHtml;
};

// renders order menu
const getCartHtml = () => {
	let cartHtml = `<h2>Your Order</h2>`;
	let totalPrice = 0;
	cartArray.forEach((item) => {
		cartHtml += `
<section class="order-card">
	<ul>
		<li>
			<div class="added-item">
				<div class="">
					<p class="item-name">${item.name}</p>
					<p class="number-ordered">${item.numberOrdered}</p>
					<i
						class="fa-solid fa-plus add-btn"
						tabindex="0"
						role="button"
						title="Add another"
						style="color: #000000"
						data-add="${item.id}"
					></i>
					<i
						class="fa-solid fa-trash delete-btn"
						tabindex="0"
						role="button"
						title="Remove item"
						style="color: #000000"
						data-remove="${item.id}"
					></i>
				</div>
				<p>$${item.price * item.numberOrdered}</p>
			</div>
		</li>
	</ul>
</section>
`;
	});
	// calculates total price
	cartArray.map((item) => {
		totalPrice += Number(`${item.numberOrdered}`) * Number(`${item.price}`);
	});
	cartHtml += `<p class ="total">Total  <span class="total-price">$${totalPrice}</span></p>
  <button class="order-btn">Place Order</button>`;
	return cartHtml;
};

/**
 * 
 const addBtns = document.querySelectorAll(".img-add-black");
addBtns.forEach((btn) => {
	btn.addEventListener("click", addToCart);
});
 */

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
	cartArray.forEach((item) => {
		cartHtml += `
<section class="order-card">
	<h3 class="title">Your Order</h3>
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
calculateCart(cartArray);
