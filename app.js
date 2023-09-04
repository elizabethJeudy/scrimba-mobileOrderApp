import { menuItems } from "/data.js";

const menuItemHtml = menuItems
	.map(function (item) {
		return `
  <section class="card">
        <div class="card-start">
            <img src="/assets/${item.itemIcon}">
        </div>
            <div class="card-mid">
                <h3 class="card-itemName">${item.itemName} $${item.price}</h3>
                <p class="card-toppings">${item.toppings}</p>
                
            </div>
        <div class="card-end">
            <p class="card-menu">
               <img src="/assets/add-white.png" class="img-add-white"/>
            </p>
        </div>
    </section>
  `;
	})
	.join("");
document.getElementById("container").innerHTML = menuItemHtml;
