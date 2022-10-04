import { menuArray } from "./data.js";
const menuDiv = document.querySelector(".menu");

const getMenuHtml = () => {
  let menuHtml = ``;
  menuArray.map((item) => {
    menuHtml += `<div class="menu__self">
        <div class="menu__left">
          <div class="emoji">${item.emoji}</div>
          <div class="menu__text">
            <div class="name"><h1>${item.name}</h1></div>
            <div class="ingredients"><p>${item.ingredients}</p></div>
            <div class="price"><p>$ ${item.price}</p></div>
          </div>
        </div>
        <div class="menu__right">
          <button data-id=${item.id} class="addBtn">+</button>
        </div>
      </div>`;
  });

  return menuHtml;
};
const render = () => {
  menuDiv.innerHTML = getMenuHtml();
};
render();

const addBtn = document.querySelectorAll("button");
const orderDiv = document.querySelector(".orders");
addBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    orderDiv.innerHTML += renderOrder(e.target.dataset.id);
    calculateTotal();
  });
});
const renderOrder = (orderId) => {
  let targetObj = menuArray.filter((meal) => {
    return meal.id == orderId;
  })[0];
  return `
    <div class="order">
      <div class="order__left">
        <p>${targetObj.name}</p>
        <button class="remove__btn">Remove</button>
      </div>
      <div class="order__right">
        <strong>${targetObj.price}</strong>
      </div>
    </div>
  `;
};
const totalDiv = document.querySelector(".total");
const calculateTotal = () => {
  let totalPriceArray = [];
  document.querySelectorAll(".order__right strong").forEach((orderPrice) => {
    totalPriceArray.push(orderPrice.textContent);
  });
  let totalPrice = totalPriceArray.reduce((acc, prev) => {
    return Number(acc) + Number(prev);
  });
  totalDiv.innerHTML = `
    <div class="total__price">
        <h1>Total: $ </h1> 
        <h1>${totalPrice}</h1>
    </div>
    <button class="complete__order">Complete Order</button>
  `;

  // REMOVE BUTTON LOGIC
  const removeBtns = document.querySelectorAll(".remove__btn");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      totalPrice -= e.target.parentElement.parentElement.querySelector(
        ".order__right strong"
      ).textContent;
      e.target.parentElement.parentElement.remove();
      totalDiv.innerHTML = `${
        totalPrice > 0
          ? `<div class="total__price">
      <h1>Total: $ </h1> 
      <h1>${totalPrice}</h1>
  </div>
  <button class="complete__order">Complete Order</button>`
          : ``
      }`;
    });
  });
  // MODAL
  const orderBtn = document.querySelector(".complete__order");
  orderBtn.addEventListener("click", () => {
    let modalHtml = `
        <div class="modal">
            <h2>Enter Card Details</h2>
            <div class="inputs__all">
            <form>
                <input type="text" placeholder="Enter your name" required />
                <input type="text" placeholder="Enter card number" required />
                <input type="text" placeholder="Enter CVV" required />
                <button type="submit" class="pay">Pay</button>
                </form>
            </div>
        </div>
    `;
    document.body.innerHTML += modalHtml;
    //   handling pay btn submitting form
    const payBtn = document.querySelector(".pay");
    payBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let customerName = document.querySelector("form input").value
      document.querySelector(
        ".modal"
      ).innerHTML = `<div class="thanks__message"><h1>Thanks ${customerName} for Buying</h1><small>window will reload shortly!</small></div>`;
      setTimeout(() => {
        location.reload();
      }, 1500);
    });
  });
};
