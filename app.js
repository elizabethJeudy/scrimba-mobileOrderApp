import { menuArray } from "/data.js";

let orderArr = [];
let paymentHtml = "";
const orderSubmit = document.getElementById("order-details");
const paymentModal = document.getElementById("payment-modal");
const mobilePaymentModal = document.getElementById("mobile-payment-modal");

// site event listeners
document.addEventListener("click", (event) => {
	if (event.target.dataset.id) {
		handleAddClick(e.target.dataset.id);
	}
	if (event.target.dataset.remove) {
		handleDeleteClick(e.target.dataset.remove);
	}
	if (event.target.dataset.add) {
		handleAddClick(e.target.dataset.add);
	}
});

orderSubmit.addEventListener("submit", renderPaymentModal);

// handles add clicks for items
const handleAddClick = (itemId) => {
	const targetItemObj = menuArray.filter((item) => item.id == itemId)[0];
	// add to bill if not already there
	if (!orderArr.includes(targetItemObj)) {
		orderArr.push(targetItemObj);
	}
	// increment numberOrdered
	targetItemObj.numberOrdered++;
	renderOrderDetails();
};

const handleDeleteClick = (itemId) => {
	const targetItemObj = orderArr.filter((item) => item.id == itemId)[0];
	// if multiples decrement or else remove from orderArr by finding index to splice
	if (targetItemObj.numberOrdered == 1 || targetItemObj.numberOrdered == 0) {
		const indexOfItemToBeRemoved = orderArr.indexOf(targetItemObj);
		orderArr.splice(indexOfItemToBeRemoved, 1);
	}
	targetItemObj.numberOrdered--;
	renderOrderDetails();
};

// generate dynamic content
const getMenuHtml = () => {
	let menuHtml = "";
	menuArray.forEach((item) => {
		menuHtml += `
    <div class="menu-item">
      <img src="${item.icon}" alt="${item.name}" class="menu-img">
      <div class="menu-item-description">
        <h3>${item.name}</h3>
        <p>${item.toppings}</p>
      </div>
      <div class="menu-item-controls">
        <i class="fa-solid fa-plus add-btn" data-id="${item.id}" title="Add to cart" tabindex="0" role="button" aria-label="Add to cart"></i>
        <p class="price">$${item.price}</p>
      </div>
    </div>
    `;
	});
	return menuHtml;
};

const getOrderHtml = () => {
	// build the html
	let orderDetailsHtml = `
    <h2>Your Order</h2>
  `;
	let totalPrice = 0;
	orderArr.forEach((added) => {
		orderDetailsHtml += `
    <div class="order-items">
      <ul>
        <li>
        <div class="order-line">
          <div class="order-item-dets">
            <p>${added.name}</p>
            <p class="number-ordered">x ${added.numberOrdered}</p>
            <i class="fa-solid fa-plus add-btn" tabindex="0" title="Add another!" role="button" aria-label="Add another!" data-add="${
							added.id
						}"></i>
            <i class="fa-sharp fa-solid fa-delete-left delete-btn" tabindex="0" role="button" title="Remove" aria-label="Remove item" data-remove="${
							added.id
						}"></i>
          </div>
          <p>$${added.price * added.numberOrdered}</p>
        </li>
        </div>
      </ul>
    </div>
  `;
	});
	// Calculate totalPrice
	orderArr.map((item) => {
		totalPrice += Number(`${item.numberOrdered}`) * Number(`${item.price}`);
	});
	orderDetailsHtml += `
    <p class ="total">Total  <span class="total-price">$${totalPrice}</span></p>
    <button class="order-btn" tabindex="0" role="button" title="Order your yummy treats!" aria-label="Place order">Place Order</button>
  `;
	return orderDetailsHtml;
};

const getPaymentHtml = () => {
	paymentHtml = `
  <div class="payment-modal-display">
    <h3>Pay via WeChat</h3>
    <p id="instructions">Open your app and scan the QR Code to process your payment.</p>
    <img src="images/QRcode.png" alt="QR Code" class="QRcode" id="pay-img">
  </div>
  `;
	return paymentHtml;
};

function simulatePayment() {
	setTimeout(function () {
		document.querySelector(".payment-modal-display").innerHTML = `
        <h3>Processing payment...</h3>
        <img src="images/spinning-circles.svg" alt="" class="spinner">
      `;
	}, firstTimeout);
	setTimeout(function () {
		document.querySelector(".payment-modal-display").innerHTML = `
        <h3>Thank you for your order!</h3>
        <p>Expect your snacks in 15-30 minutes!</p>
        <img src="https://img.icons8.com/stickers/100/null/delivery-scooter.png" class="final-img" alt="scooter delivery"/>
      `;
	}, secondTimeout);
}
// generate a random numbers for setTimeouts
const firstTimeout = setTimeout(getPaymentHtml, 1000);
const secondTimeout = setTimeout(paymentModal, 2000);

// render to page
const renderMenu = () => {
	document.getElementById("menu").innerHTML = getMenuHtml();
};

const renderOrderDetails = () => {
	// display if orderArr has items in it, else remove from display
	if (orderArr.length >= 1) {
		document.getElementById("order-details").innerHTML = getOrderHtml();
	} else if (orderArr.length == 0) {
		document.getElementById("order-details").innerHTML = "";
	}
};

// can't use an arrow function here, as needs to be hoisted
function renderPaymentModal(e) {
	e.preventDefault();
	paymentModal.classList.remove("hidden");
	const mediaQuery = window.matchMedia("(max-width: 767px)");
	if (mediaQuery.matches) {
		mobilePaymentModal.classList.remove("hidden");
		// move focus to next input box on keyup
		one.addEventListener("keyup", function () {
			two.focus();
		});
		two.addEventListener("keyup", function () {
			three.focus();
		});
		three.addEventListener("keyup", function () {
			four.focus();
		});
		four.addEventListener("keyup", function () {
			five.focus();
		});
		five.addEventListener("keyup", function () {
			six.focus();
		});
		six.addEventListener("keyup", simulatePayment);
	} else {
		paymentModal.innerHTML = getPaymentHtml();
		simulatePayment();
	}
}

renderMenu();

/**let orderArray = [];
let paymentHtml = "";
const orderSubmit = document.getElementById("cart-modal");
const paymentModal = document.getElementById("payment-modal");

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
	if (!orderArray.includes(targetItem)) {
		orderArray.push(targetItem);
	}
	// increments number ordered from dataset
	targetItem.numberOrdered++;
	renderOrder();
};

// handles deleting an item
const handleDeleteClick = (itemID) => {
	const targetItem = orderArray.filter((item) => item.id == itemID)[0];
	// decrements or removes item by finding the index
	if (targetItem.numberOrdered == 1 || targetItem.numberOrdered == 0) {
		const indexOfRemovedItem = orderArray.indexOf(targetItem);
		orderArray.splice(indexOfRemovedItem, 1);
	}
	targetItem.numberOrdered--;
	renderOrder();
};

// renders menu items
const getMenuHtml = () => {
	let menuArrayHtml = "";
	menuArray.forEach((item) => {
		menuArrayHtml += `
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
	return menuArrayHtml;
};

// renders order menu
const getOrderHtml = () => {
	let orderHtml = `<h2>Your Order</h2>`;
	let totalPrice = 0;
	orderArray.forEach((item) => {
		orderHtml += `
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
	orderArray.map((item) => {
		totalPrice += Number(`${item.numberOrdered}`) * Number(`${item.price}`);
	});
	orderHtml += `<p class ="total">Total  <span class="total-price">$${totalPrice}</span></p>
  <button class="order-btn">Place Order</button>`;
	return orderHtml;
};

const firstTimeout = setTimeout(getPaymentHtml, 1000);
const secondTimeout = setTimeout(paymentModal, 2000);

const getPaymentHtml = () => {
	paymentHtml = `
  <div id="payment-modal">
  <h3>Enter card details</h3>
  <form>
	  <input type="text" placeholder="First name" required />
	  <input type="email" placeholder="Enter email address" required />
	    <button type="submit" class="submit-btn">Next</button>
</form>
  </div>
  `;
	return paymentHtml;
};

function paymentModal() {
	setTimeout(function () {
		document.querySelector("payment-modal").innerHTML = `
     <div id="payment-modal">
  <h3>Enter card details</h3>
  <form>
	  <input type="text" placeholder="Enter name on card..." required />
	  <input type="number" placeholder="123-456-789" required />
	  <input type="number" placeholder="CVV" required />
	    <button type="submit" class="submit-btn">Pay</button>
</form>
  </div>
    `;
	}, firstTimeout());
	setTimeout(function () {
		document.querySelector("payment-modal").innerHTML = `
    <h3>Thanks for placing your order</h3>
    <p>Check your email for confirmation and enjoy!</p>
    `;
	}, secondTimeout);
}

const renderMenu = () => {
	document.getElementById("menu-container").innerHTML = getMenuHtml();
};

const renderOrderDetails = () => {
	if (orderArray.length >= 1) {
		document.getElementById("cart-modal").innerHTML = getOrderHtml();
	} else if (orderArray.length == 0) {
		document.getElementById("cart-modal").innerHTML = "";
	}
};
renderMenu();
/**
 * 
 const addBtns = document.querySelectorAll(".img-add-black");
addBtns.forEach((btn) => {
	btn.addEventListener("click", addToCart);
});
 */
