<template>
  <q-page padding>
    <!--    <pre>products {{products}}</pre>-->
    <div style="margin-bottom: 80px;">
      <product-component
        v-for="product in products"
        :key="product.productId"
        :product="product"
      />
    </div>

    <q-dialog v-model="isCheckout">
      <customer-component
        :customerName.sync="customerName"
        :customerPhone.sync="customerPhone"
        @close="handleCheckOut"
      />
    </q-dialog>

    <div class="fixed-bottom region-cart">
      <q-btn
        @click="preCheckOut"
        icon="shopping_cart"
        color="primary"
        class="btn-float-cart"
        label="Đặt hàng"
      >&nbsp; ({{ countItem }})
      </q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
  import {mapGetters} from 'vuex';
  import ProductComponent from '../components/products/ProductComponent';
  import CustomerComponent from '../components/customers/CustomerComponent.vue';
  import {MSG_NO_PRODUCT} from "../helpers/messages";
  import {KEY_LOCAL_ORDER} from "../helpers/const";
  import {RouterName} from "../router";

  export default {
    name: 'PageProducts',
    components: {ProductComponent, CustomerComponent},
    computed: {
      ...mapGetters('products',
        {
          products: 'getListProduct',
        }
      ),

      ...mapGetters('orders',
        {
          countItem: 'countProductInOrder',
          order: 'getOrder',
          customer: 'getCustomerOrder'
        })
    },

    data() {
      const customerName = '';
      const customerPhone = '';
      const isCheckout = false;

      return {isCheckout, customerName, customerPhone};
    },

    methods: {
      preCheckOut() {
        if (this.countItem == 0) {
          this.$q.notify({
            position: 'top',
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: MSG_NO_PRODUCT
          });
        } else {
          this.isCheckout = true;
        }
      },

      async handleCheckOut() {
        this.isCheckout = false;
        if (!this.validate()) {
          this.$q.notify({
            position: 'top',
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: MSG_NO_PRODUCT
          });
        } else {
          await this.saveOrderToLocalStorage(this.order);
          this.$router.push({name: RouterName.ORDER})
        }
      },

      validate() {
        return this.countItem > 0 &&
          this.customerName.length > 0 &&
          (this.customerPhone.length > 9 && this.customerPhone.length < 12)
      },

      saveOrderToLocalStorage(order) {
        localStorage.removeItem(KEY_LOCAL_ORDER);
        localStorage.setItem(KEY_LOCAL_ORDER, JSON.stringify(order));
      }
    }
  };
</script>

<style scoped>
  .btn-float-cart {
    border-radius: 0 !important;
    width: 100%;
    padding: 10px;
    box-shadow: 0 -3px 20px 0 #2196f3;
  }
</style>
