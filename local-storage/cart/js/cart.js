"use strict";

function loadColors(callBack) {
  const colorSnippet = document.querySelector("#colorSwatch");
  for (let color of callBack) {
    colorSnippet.insertAdjacentHTML(
      "beforeend",
      `<div data-value="${color.type}" class="swatch-element color ${
        color.type
      }">
  <div class="tooltip">${color.title}</div> <input quickbeam="color" id="${
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
    }
  }
  const div = colorSnippet.querySelector(`div`)
  let colorRadio = colorSnippet.querySelector("input");
  if(div.classList.contains('available')){
    colorRadio.setAttribute('checked', '')
  }else{ colorRadio.removeAttribute('checked') }
}

function loadSizes(callBack) {
  const sizeSnippet = document.getElementById("sizeSwatch");
  for (let size of callBack) {
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
    }
  }
  const div = sizeSnippet.querySelector('div')
  let input = sizeSnippet.querySelector('input');
  if(div.classList.contains('available')){
    input.setAttribute('checked', '')
  }else{ input.removeAttribute('checked') }
}

function loadData(url, callBack) {
  fetch(url)
    .then(res => res.json())
    .then(res => callBack(res))
    .catch(error => console.log(error));
}

Promise.all([
  loadData("https://neto-api.herokuapp.com/cart/colors", loadColors),
  loadData("https://neto-api.herokuapp.com/cart/sizes", loadSizes)
]);

const loadCart = cart => {
  console.log(cart);
  const quickCart = document.querySelector("#quick-cart");
  const quantity = cart[0].quantity ? cart[0].quantity : 1;
  if (cart.length === 0) {
    quickCart.innerHTML = "";
    return;
  }
  let sum = quantity * cart[0].price;
  quickCart.innerHTML = "";
  quickCart.insertAdjacentHTML(
    "beforeend",
    `<div class="quick-cart-product quick-cart-product-static" id="${
      cart[0].id
    }" style="opacity: 1;">
<div class="quick-cart-product-wrap"><img src="${cart[0].pic}" title="${
      cart[0].title
    }">
  <span class="s1" style="background-color: #000; opacity: .5">${sum}</span><span class="s2"></span>
</div>
<span class="count hide fadeUp" id="${cart[0].id}">${quantity}</span>
<span class="quick-cart-product-remove remove" data-id="${cart[0].id}"></span>
</div>`)
  quickCart.insertAdjacentHTML("beforeend", `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
 <span>
   <strong class="quick-cart-text">Оформить заказ<br></strong>
   <span id="quick-cart-price">$${sum}</span>
 </span>
</a>`);
  const remove = document.querySelector(".remove");
  remove.addEventListener("click", handleSubmitForm);
};

const sendRequest = (data, url) => {
  fetch(url, {
      body: data,
      method: "POST"
    })
    .then(res => res.json())
    .then(res => loadCart(res))
    .catch(error => console.log(error));
};

/////////
const getFormData = form => {
  let id = form.dataset.productId;
  const formData = new FormData(form);
  formData.append("productId", id);
  return formData;
};

const handleSubmitForm = evt => {
  evt.preventDefault();
  const form = evt.currentTarget
  let url = `https://neto-api.herokuapp.com/cart`;
  if (evt.target.classList.contains("remove")) {
    url = `https://neto-api.herokuapp.com/cart/remove`;
  }
  sendRequest(getFormData(form), url);
};
const AddToCartForm = document.querySelector("#AddToCartForm");
AddToCartForm.addEventListener("submit", handleSubmitForm);

//////////////////
const updateLocalStorage = evt => {
  if (evt.target.type !== "radio") {
    return;
  }
  localStorage.setItem(`${evt.target.name}`, `${evt.target.value}`);
};

document.addEventListener("click", updateLocalStorage);