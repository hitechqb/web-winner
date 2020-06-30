<template>
  <div>
    <template v-if="order">
      <div style="margin-bottom: 80px;" v-if="order">
        <customer-order-component :customer="order.customer"/>
        <product-order-component :products="order.products" :totalAmount="order.totalAmount"/>
        <pay-method-component :indexPay.sync="indexPay"/>
        <div class="fixed-bottom region-cart">
          <q-btn
            @click="handleCreateOrder(order, currentPayment)"
            icon="verified_user"
            color="primary"
            class="btn-payment"
            label="Thanh Toán"
          >&nbsp;({{ order.totalAmount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}})
          </q-btn>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="row justify-between absolute-center cart-no-order">
        <q-card dark flat bordered class="cart-no-order items-center">
          <q-card-section>
            <div class="text-h6">Giỏ Hàng</div>
          </q-card-section>
          <q-separator dark inset/>

          <q-card-section class="col items-center">
            <p class="q-mt-sm"> Không có sản phẩm trong giỏ hàng... </p>
            <q-btn
              align="between"
              class="btn-fixed-width"
              label="Tới trang order"
              icon="thumb_down"
              style="background-color: #164d18"
              :to="{name: RouteHome}"
            />
          </q-card-section>
        </q-card>

      </div>
    </template>
  </div>
</template>

<script>
  import CustomerOrderComponent from '../components/orders/CustomerOrderComponent.vue'
  import ProductOrderComponent from '../components/orders/ProductOrderComponent.vue'
  import PayMethodComponent from '../components/orders/PayMethodComponent.vue'

  import {mapGetters} from 'vuex'
  import {options} from 'src/models/PaymentModel'
  import {KEY_LOCAL_ORDER} from "../helpers/const";
  import {RouterName} from "../router/index";

  export default {
    name: "PageOrderDetail",
    components: {CustomerOrderComponent, ProductOrderComponent, PayMethodComponent},
    computed: {
      ...mapGetters('orders', {
        currentPayment: 'getCurrentPayment',
        response: 'getResponseOrder',
        error: 'getErrorOrder'
      }),
    },

    created() {
      let zaloPayScript = document.createElement('script')
      zaloPayScript.setAttribute('src', 'statics/js/zalopay.js');
      document.head.appendChild(zaloPayScript);
    },

    data() {
      const RouteHome = RouterName.HOME;
      const indexPay = options.WALLET;
      const order = localStorage.getItem(KEY_LOCAL_ORDER) ? JSON.parse(localStorage.getItem(KEY_LOCAL_ORDER)) : null;
      return {indexPay, order, RouteHome}
    },

    methods: {
      async handleCreateOrder(order, currentPayment) {
        await this.$store.dispatch('orders/createOrderApi', {order, currentPayment});
        this.handlerResponse();
      },

      handlerResponse() {
        const haveError = this.error && this.error['isError'];
        if (!haveError) {
          if (this.currentPayment === options.IN_APP) {
            let zpTransToken = this.response['zp_trans_token'];
            let zptranstoken = zpTransToken;

            // check zptranstoken have been decode or NOT
            if (zpTransToken.length > 50) {
              // NOT decode -> decode it
              let orderUrl = this.response['order_url'];
              const arr = orderUrl.split('?order=');

              if (arr.length > 1) {
                zpTransToken = arr[1];
                const dataJson = JSON.parse(window.atob(zpTransToken));
                zptranstoken = dataJson['zptranstoken'];
              }
            }

             this.handleInApp(zptranstoken);

          } else {
             window.location = this.response['order_url'];
          }
        }
      },

      handleInApp(zpTransToken) {
        ZaloPay.ready(() => {
          this.$q.notify({
            position: 'top',
            color: 'green-6',
            textColor: 'white',
            icon: 'info',
            message: 'ZaloPayBridge is ready'
          });
        });

        this.$q.notify({
          position: 'top',
          color: 'green-6',
          textColor: 'white',
          icon: 'info',
          message: 'appid: ' + process.env.APP_ID + '\n zptranstoken: ' + zpTransToken
        });

        ZaloPay.payOrder({
          appid: process.env.APP_ID,
          zptranstoken: zpTransToken
        }, this.handleCallback);
      },

      handleCallback(data) {
        if (typeof data === "object") {
          this.$q.notify({
            position: 'top',
            color: 'green-6',
            textColor: 'white',
            icon: 'info',
            message: 'data callback: ' + JSON.stringify(data),
          });

          if (data.error === 1) {
            this.$q.notify({
              position: 'top',
              color: 'green-6',
              textColor: 'white',
              icon: 'info',
              message: 'Thanh toán đơn hàng thành công'
            });

          } else if (data.error === 4) {
            this.$q.notify({
              position: 'top',
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Người dùng huỷ việc thanh toán đơn hàng'
            });

          } else {
            this.$q.notify({
              position: 'top',
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Thanh toán đơn hàng thất bại với mã lỗi: ' + data.errorCode
            });
          }
        }

        this.$router.push({name: RouterName.HOME})
      }
    },
  }
</script>

<style scoped>
  .btn-payment {
    border-radius: 0 !important;
    width: 100%;
    padding: 10px;
    box-shadow: 0 -3px 20px 0 #2196f3;
  }

  .cart-no-order {
    background-color: #4caf50;
    text-align: center;
    justify-items: center;
  }
</style>
