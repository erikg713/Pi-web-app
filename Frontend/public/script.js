document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById("loginBtn");
  const userInfo = document.getElementById("userInfo");
  const productList = document.getElementById("productList");
  const API_URL = "http://localhost:5000/api/products";

  const products = [
    { id: 'product_1', name: 'Product 1', description: 'Nice item for Pi users.', price: 1 },
    { id: 'product_2', name: 'Product 2', description: 'Another item available.', price: 2 }
  ];

  loginBtn.onclick = async () => {
    try {
      const scopes = ['username', 'payments'];
      const authResult = await Pi.authenticate(scopes, onIncompletePaymentFound);
      const username = authResult.user.username;
      userInfo.innerHTML = `<p>Welcome, @${username}!</p>`;
      console.log("Authenticated:", authResult);
    } catch (error) {
      userInfo.innerHTML = `<p>Authentication failed. Please try again.</p>`;
      console.error("Authentication failed:", error);
    }
  };

  function onIncompletePaymentFound(payment) {
    console.log("Incomplete payment found:", payment);
  }

  function renderProducts(products) {
    productList.innerHTML = ''; // Clear any existing products
    products.forEach(product => {
      const section = document.createElement('section');
      section.className = 'product';
      section.innerHTML = `
        <div class="product-details">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
        </div>
        <button data-id="${product.id}" data-price="${product.price}">
          Buy for ${product.price}π
        </button>
      `;
      productList.appendChild(section);
    });
  }

  async function fetchProducts() {
    try {
      const res = await fetch(API_URL);
      const products = await res.json();
      renderProducts(products);
    } catch (err) {
      productList.innerHTML = "<p>Failed to load products.</p>";
      console.error("Error fetching products:", err);
    }
  }

  async function buyItem(productId, amount) {
    try {
      const paymentData = {
        amount,
        memo: `Buying ${productId} from Palace of Goodz`,
        metadata: { productId }
      };

      await Pi.createPayment(paymentData, {
        onReadyForServerApproval: paymentId => {
          console.log("Ready for server approval", paymentId);
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("Ready for server completion", paymentId, txid);
          alert("Payment successful!");
        },
        onCancel: paymentId => {
          console.log("User cancelled payment", paymentId);
          alert("Payment cancelled.");
        },
        onError: (error, payment) => {
          console.error("Payment error", error);
          alert("Payment error occurred.");
        }
      });
    } catch (error) {
      console.error("Failed to process payment:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  }

  productList.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button) {
      const productId = button.getAttribute('data-id');
      const amount = parseFloat(button.getAttribute('data-price'));
      buyItem(productId, amount);
    }
  });

  // Fetch products on window load
  window.onload = fetchProducts;
});
window.onload = async () => {
  const container = document.querySelector(".container");
  try {
    const res = await fetch("/api/products");
    const products = await res.json();

    products.forEach(p => {
      const productEl = document.createElement("div");
      productEl.className = "product";
      productEl.innerHTML = `
        <div>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
        </div>
        <button onclick="buyItem('${p._id}', ${p.price})">Buy for ${p.price}π</button>
      `;
      container.appendChild(productEl);
    });
  } catch (err) {
    console.error("Failed to load products:", err);
  }
};
let currentUser = null;

loginBtn.onclick = async () => {
  try {
    const scopes = ['username', 'payments'];
    const authResult = await Pi.authenticate(scopes, onIncompletePaymentFound);
    currentUser = authResult.user;
    localStorage.setItem("piUser", JSON.stringify(currentUser));
    userInfo.innerHTML = `<p>Welcome, @${currentUser.username}!</p>`;
    console.log("Authenticated:", currentUser);
  } catch (error) {
    console.error("Authentication failed:", error);
  }
};
