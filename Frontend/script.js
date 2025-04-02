const loginBtn = document.getElementById("loginBtn");
const userInfo = document.getElementById("userInfo");
const productList = document.getElementById("productList");

const API_URL = "http://localhost:5000/api/products";

// Handle login
loginBtn.onclick = async () => {
  try {
    const scopes = ['username', 'payments'];
    const authResult = await Pi.authenticate(scopes, onIncompletePaymentFound);
    const username = authResult.user.username;
    userInfo.innerHTML = `<p>Welcome, @${username}!</p>`;
    console.log("Authenticated:", authResult);
  } catch (error) {
    console.error("Authentication failed:", error);
  }
};

// Handle incomplete payments
function onIncompletePaymentFound(payment) {
  console.log("Incomplete payment found:", payment);
}

// Handle buying an item
async function buyItem(productId, amount) {
  try {
    const paymentData = {
      amount: amount,
      memo: `Buying ${productId} from Palace of Goodz`,
      metadata: { productId }
    };

    const payment = await Pi.createPayment(paymentData, {
      onReadyForServerApproval(paymentId) {
        console.log("Ready for approval", paymentId);
      },
      onReadyForServerCompletion(paymentId, txid) {
        console.log("Ready for completion", paymentId, txid);
      },
      onCancel(paymentId) {
        console.log("User cancelled", paymentId);
      },
      onError(error, payment) {
        console.error("Payment error", error);
      }
    });

    console.log("Payment response:", payment);
  } catch (error) {
    console.error("Failed to process payment:", error);
  }
}

// Fetch products from the API
async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const products = await res.json();
    productList.innerHTML = "";
    products.forEach(p => {
      productList.innerHTML += `
        <div class="product">
          <div>
            <h3>${p.name}</h3>
            <p>${p.description || ''}</p>
          </div>
          <button onclick="buyItem('${p._id}', ${p.price})">Buy for ${p.price}π</button>
        </div>
      `;
    });
  } catch (err) {
    productList.innerHTML = "<p>Failed to load products.</p>";
    console.error("Error fetching products:", err);
  }
}

// Fetch products on window load
window.onload = fetchProducts;
