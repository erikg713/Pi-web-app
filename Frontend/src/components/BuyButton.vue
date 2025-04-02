<template>
  <button @click="buy">Buy for {{ product.price }}π</button>
</template>

<script setup>
defineProps(['product'])

const buy = async () => {
  const paymentData = {
    amount: product.price,
    memo: `Buying ${product.name}`,
    metadata: { productId: product._id }
  }

  try {
    await window.Pi.createPayment(paymentData, {
      onReadyForServerApproval: paymentId => console.log('Approval', paymentId),
      onReadyForServerCompletion: (paymentId, txid) => console.log('Completion', paymentId, txid),
      onCancel: paymentId => console.log('Cancelled', paymentId),
      onError: (err, payment) => console.error('Error', err)
    })
  } catch (err) {
    console.error('Payment failed:', err)
  }
}
</script>
