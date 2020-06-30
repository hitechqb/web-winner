<template>

  <div class="payment-component">
    <q-item-label header class="title-cart color-title">{{title}}</q-item-label>
    <q-list v-for="option in paymentOption" :key="option.value">
      <q-item tag="label">
        <q-item-section avatar>
          <q-radio
            keep-color
            @input="handleOnChange"
            v-model="currentPayment"
            :val="option.value"
            :color="option.color"/>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{option.label}}</q-item-label>
        </q-item-section>
        <q-item-section avatar class="icon-payment">
          <q-icon :name="option.icon"/>
        </q-item-section>

      </q-item>
    </q-list>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import {options} from 'src/models/PaymentModel'

  export default {
    name: "PayMethodComponent",
    computed: {
      ...mapGetters('orders', {
        paymentOption: 'getPaymentOption',
      })
    },

    data() {
      return {
        title: 'Phương thức thanh toán',
        currentPayment: options.GATEWAY
      }
    },

    methods: {
      handleOnChange(value, evt) {
        this.$store.commit('orders/setPayMethod', {currentPayment: this.currentPayment});
      }
    }
  }
</script>

<style scoped>
  .payment-component {
    background-color: #edf7ff;
  }

  .title-cart {
    font-weight: 500;
    text-transform: uppercase;
  }

  .color-title {
    color: darkgreen !important;
  }

  .icon-payment {
    color: #6f6f6f;
  }
</style>
