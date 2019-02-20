const addItem = document.querySelector("#AddToCartForm");
const cartSnippet = document.getElementById("quick-cart");

addItem.addEventListener("submit", addItemToCart);
document.addEventListener("click", removeItemFromCart);

const baseUrl = "https://neto-api.herokuapp.com";
const getUrl = url => `${baseUrl}${url}`;

const url = {
  color: getUrl("/cart/colors"),
  size: getUrl("/cart/sizes"),
  cart: getUrl("/cart"),
  removeCart: getUrl("/cart/remove")
};

function loadData(url, callBack) {
  fetch(url)
    .then(res => res.json())
    .then(res => callBack(res))
    .catch(error => console.log(error));
}

Promise.all([loadData(url.color, loadColors),
  loadData(url.size, loadSizes),
  loadData(url.cart, updateCart)
]);

function loadColors(response) {
  const colorSnippet = document.getElementById("colorSwatch");

  for (let color of response) {
    colorSnippet.insertAdjacentHTML(
      "beforeend",
      `<div data-value="${color.type}" class="swatch-element color ${
        color.type
      }">
  <div class="tooltip">${color.title}</div>
  <input quickbeam="color" id="${
    color.type
  }" type="radio" name="color" value="${color.type}">
  <label for="${color.type}" style="border-color: red;">
    <span style="background-color: ${color.code};"></span>
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>`
    );

    if (color.isAvailable === false) {
      let thisInput = colorSnippet.lastElementChild.querySelector("input");
      thisInput.disabled = true;
      colorSnippet.lastElementChild.classList.add("soldout");
    } else {
      colorSnippet.lastElementChild.classList.add("available");
      let newElement = colorSnippet.lastElementChild;
      let colorRadio = newElement.querySelector("input");
      if (colorRadio.value === localStorage.color) {
        colorRadio.checked = true;
      }
    }
  }
}

function loadSizes(response) {
  const sizeSnippet = document.getElementById("sizeSwatch");
  for (let size of response) {
    sizeSnippet.insertAdjacentHTML(
      "beforeend",
      `<div data-value="${size.type}" class="swatch-element ${
        size.type
      } plain s">
  <input id="${size.type}" type="radio" name="size" value="${size.type}">
  <label for="${size.type}">
    ${size.title}
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>`
    );
    if (size.isAvailable === false) {
      let thisInput = sizeSnippet.lastElementChild.querySelector("input");
      thisInput.disabled = true;
      sizeSnippet.lastElementChild.classList.add("soldout");
    } else {
      sizeSnippet.lastElementChild.classList.add("available");
      let newElement = sizeSnippet.lastElementChild;
      if (newElement.firstElementChild.value === localStorage.size) {
        newElement.firstElementChild.checked = true;
      }
    }
  }
}
//////////////////////////////////////////////////////
function sendCart(url, data) {
  return fetch(url, {
      method: "POST",
      body: data
    })
    .then(res => res.json())
    .then(res => {
      return res;
    })
    .catch(error => console.log(error));
}

/////////////////////////////////////////////////////////
function updateCart(cart) {
  if (cart.length === 0) {
    cartSnippet.innerHTML = "";
    return;
  }
  let sum = cart[0].quantity * cart[0].price;
  cartSnippet.innerHTML = "";
  cartSnippet.insertAdjacentHTML(
    "beforeend",
    `<div class="quick-cart-product quick-cart-product-static" id="${
      cart[0].id
    }" style="opacity: 1;">
  <div class="quick-cart-product-wrap">
    <img src="${cart[0].pic}" title="${cart[0].title}">
    <span class="s1" style="background-color: #000; opacity: .5">${sum}</span>
    <span class="s2"></span>
  </div>
  <span class="count hide fadeUp" id="${cart[0].id}">${cart[0].quantity}</span>
  <span class="quick-cart-product-remove remove" data-id="${cart[0].id}"></span>
</div><a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
<span>
  <strong class="quick-cart-text">Оформить заказ<br></strong>
  <span id="quick-cart-price">$${sum}</span>
</span>
</a>`
  );
}
//////////////////////////////////////////////////
function addItemToCart() {
  event.preventDefault();
  const id = event.currentTarget.dataset.productId;
  const formData = new FormData(event.currentTarget);
  formData.append("productId", id);
  sendCart(url.cart, formData).then(response => {
    updateCart(response);
  });
}
/////////////////////////////////////////////
function removeItemFromCart() {
  if (!event.target.classList.contains("remove")) {
    return;
  }
  const formData = new FormData();
  formData.append("productId", event.target.dataset.id);
  sendCart(url.removeCart, formData).then(response => {
    updateCart(response);
  });
}