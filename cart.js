class Cart {
  constructor() {
    const orderBtns = [...document.getElementsByClassName("order-btn")];
    orderBtns.forEach((orderBtn) =>
      orderBtn.addEventListener("click", this.handleOnClickOrderBtn)
    );

    document.getElementById("orders-count").innerText = this.getOrdersCount();

    const ordersListHTML = this.getOrders().map((order) => {
      return `
            <div>${order.dishName}</div>
        `;
    });
    document.getElementById("orders-list").innerHTML = ordersListHTML;
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
    }
  }

  getOrders() {
    const currentOrders = JSON.parse(localStorage.getItem("order") ?? "[]");
    return currentOrders;
  }

  getOrdersCount() {
    const currentOrders = this.getOrders();
    return currentOrders.length;
  }

  removeOrderFromCart(order) {
    const currentOrders = this.getOrders();
    const indexOrderToRemove = currentOrders.findIndex(
      (e) => e.dishName === order.dishName
    );
    if (indexOrderToRemove > -1) {
      currentOrders.splice(indexOrderToRemove, 1);
      localStorage.setItem("order", JSON.stringify(currentOrders));
    }
  }
}

new Cart();
