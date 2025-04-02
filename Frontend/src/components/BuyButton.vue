<template>
  <button @click="buy" :disabled="isLoading">
    <span v-if="isLoading">Processing...</span>
    <span v-else>Buy for {{ product.price }}π</span>
  </button>
</template>

<script setup>
import { ref } from 'vue';

defineProps(['product']);

const isLoading = ref(false);

const buy = async () => {
  if (!product || !product.price || !product.name || !product._id) {
    console.error('Invalid product data');
    alert('Invalid product data. Please try again.');
    return;
  }

  const paymentData = {
    amount: product.price,
    memo: `Buying ${product.name}`,
    metadata: { productId: product._id }
  };

  isLoading.value = true;

  try {
    await window.Pi.createPayment(paymentData, {
      onReadyForServerApproval: paymentId => console.log('Approval', paymentId),
      onReadyForServerCompletion: (paymentId, txid) => {
        console.log('Completion', paymentId, txid);
        alert('Payment completed successfully!');
      },
      onCancel: paymentId => {
        console.log('Cancelled', paymentId);
        alert('Payment was cancelled.');
      },
      onError: (err, payment) => {
        console.error('Error', err);
        alert(`Payment error: ${err.message}`);
      }
    });
  } catch (err) {
    console.error('Payment failed:', err);
    alert('Payment failed. Please try again.');
  } finally {
    isLoading.value = false;
  }
};
</script>
