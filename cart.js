class Cart {
  constructor() {
    const orderBtns = [...document.getElementsByClassName("order-btn")];
    orderBtns.forEach((orderBtn) =>
      orderBtn.addEventListener("click", this.handleOnClickOrderBtn)
    );

    document.getElementById("cart-btn").onclick = () => this.setOrdersList();
    this.updateOrdersBadgeCount();
  }

  setOrdersList() {
    const ordersListHTML = this.getOrders().reduce((carry, order) => {
      return (
        carry +
        `<li>${order.dishName} (${order.price}€) <span class="remove-order" data-dish-name="${order.dishName}">&times;</span></li>`
      );
    }, "");
    const ordersList = document.getElementById("orders-list");
    ordersList.innerHTML = ordersListHTML;
    ordersList.classList.toggle("show");

    const orderRemoveBtns = [
      ...document.getElementsByClassName("remove-order"),
    ];
    orderRemoveBtns.forEach((orderRemoveBtn) =>
      orderRemoveBtn.addEventListener("click", (e) => {
        this.removeOrderFromCart(e.target.dataset.dishName);
        this.setOrdersList();
        ordersList.classList.toggle("show");
      })
    );
  }

  handleOnClickOrderBtn = (event) => {
    const parent = event.target.parentElement;
    const dishName = parent.getElementsByTagName("h1")[0].innerText;
    const price = parent
      .getElementsByTagName("h2")[0]
      .innerText.replace("€", "");

    this.addOrderToCart({
      dishName,
      price,
    });
  };

  addOrderToCart(order) {
    const currentOrders = this.getOrders();
    if (
      currentOrders.filter((e) => e.dishName === order.dishName).length === 0
    ) {
      currentOrders.push(order);
      localStorage.setItem("order", JSON.stringify(currentOrders));
      this.updateOrdersBadgeCount();
    }
    this.setOrdersList();
  }

  removeOrderFromCart(dishName) {
    const currentOrders = this.getOrders();
    const indexOrderToRemove = currentOrders.findIndex(
      (e) => e.dishName === dishName
    );
    if (indexOrderToRemove > -1) {
      currentOrders.splice(indexOrderToRemove, 1);
      localStorage.setItem("order", JSON.stringify(currentOrders));
      this.updateOrdersBadgeCount();
    }
  }

  updateOrdersBadgeCount() {
    document.getElementById("orders-badge").innerText = this.getOrdersCount();
  }

  getOrders() {
    const currentOrders = JSON.parse(localStorage.getItem("order") ?? "[]");
    return currentOrders;
  }

  getOrdersCount() {
    const currentOrders = this.getOrders();
    return currentOrders.length;
  }
}

new Cart();
