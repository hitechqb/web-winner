<template>
  <div class="product-order-component">
    <q-item-label
      header
      class="title-cart color-title"
    >Giỏ hàng
    </q-item-label>
    <q-list
      padding
      v-if="products"
      v-for="product in products"
      :key=product.productId>

      <q-item clickable v-ripple>
        <q-item-section side>
          <q-icon name="loyalty" color="green"/>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="color-title">
            {{product.productName}}
          </q-item-label>
          <q-item-label caption>
            {{product.productId}} - <span class="span-price"> {{product.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}} </span>
          </q-item-label>
        </q-item-section>

        <q-item-section side class="q-mr-md">
          <q-item-label class="text-green-9">
            <pre>{{product.quantity}}</pre>
          </q-item-label>
        </q-item-section>

        <q-item-section side class="text-green-9">
          <pre>{{getAmount(product)}}</pre>
        </q-item-section>
      </q-item>

    </q-list>

    <div class="row row-total color-title">
      <div class="col-8">
        <pre>Tổng tiền thanh toán</pre>
      </div>
      <div class="col-4">
        <pre>{{ totalAmount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatter} from 'src/helpers/utils'

  export default {
    name: "ProductOrderComponent",
    props: {
      products: {
        type: Array,
        default: null
      },
      totalAmount: {
        default: 0
      }
    },
    methods: {
      getAmount(product) {
        return formatter.format(product.price * product.quantity)
      }
    }
  }
</script>

<style scoped>
  .product-order-component {
    margin-bottom: 20px;
    box-shadow: 1px 8px 10px 0px rgb(217, 235, 249);
  }

  .title-cart {
    font-weight: 500;
    text-transform: uppercase;
  }

  .color-title {
    color: darkgreen !important;
  }

  .row-total {
    padding: 10px 20px;
    text-align: right;
  }

  .span-price {
    color: orangered;
    font-weight: 500;
  }
</style>
