<template>
  <div class="ProductComponent">
    <q-list>
      <q-toolbar style="padding: 10px 0 !important;">
        <q-item-section avatar="">
          <q-avatar rounded style="width: 50px; height: 50px;">
            <img :src="'statics/images/'+product.photo" alt=""/>
          </q-avatar>
        </q-item-section>

        <q-toolbar-title style="font-size: 14px !important;">
          <q-item-section>
            <q-item-label>{{ product.productName }}</q-item-label>
            <q-item-label caption style="font-size: x-small;">{{
              product.description
              }}
            </q-item-label>
            <q-item-label class="text-orange" style="padding-top: 10px;">{{
              product.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
              }}
            </q-item-label>
          </q-item-section>
        </q-toolbar-title>

        <q-btn
          @click="handleAddProduct(product)"
          flat
          round
          dense
          icon="add_circle"
          class="text-orange"
        />
      </q-toolbar>
    </q-list>
  </div>
</template>

<script>

  export default {
    name: 'ProductComponent',
    props: {
      product: {
        type: Object
      }
    },

    methods: {
      handleAddProduct(product) {
        const currentOrder = this.$store.getters['orders/getOrder'];
        product.quantity = 1;

        if (currentOrder) {
          return this.$store.dispatch('orders/addProductToOrder', {product});
        } else {
          return this.$store.commit('orders/createOrder', {product})
        }
      }
    }
  };
</script>
