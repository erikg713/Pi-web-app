export const authenticateWithPi = async () => {
  try {
    const scopes = ['username', 'payments']
    const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound)
    return authResult.user
  } catch (err) {
    console.error('Pi login failed:', err)
    return null
  }
}

function onIncompletePaymentFound(payment) {
  console.log('Incomplete payment found:', payment)
}
