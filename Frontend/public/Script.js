const loginBtn = document.getElementById("loginBtn");
const userInfo = document.getElementById("userInfo");

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

function onIncompletePaymentFound(payment) {
  console.log("Incomplete payment found:", payment);
  // Handle payment completion/resolution here
}
