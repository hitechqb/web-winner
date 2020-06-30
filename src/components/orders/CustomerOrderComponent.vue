<template>
  <div class="customer-order-component">
    <q-item-label
      header
      class="title-cart color-title"
    >KHÁCH HÀNG
    </q-item-label>
    <q-list padding>
      <q-item>
        <q-item-section side>
          <q-icon name="person" color="green"/>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1" class="color-title">{{customer.customerName}} - {{customer.customerPhone}}
          </q-item-label>
          <q-item-label caption>VNG Campus - Tân Thuận Đông - Hồ Chí Minh</q-item-label>
        </q-item-section>

      </q-item>

    </q-list>

  </div>
</template>

<script>
  export default {
    name: "CustomerOrderComponent",
    props: {
      customer: {
        type: Object,
        default: null
      }
    }
  }
</script>

<style scoped>
  .customer-order-component {
    margin-bottom: 20px;
    box-shadow: 1px 8px 10px 0px rgb(217, 235, 249);
    background-color: #edf7ff;
  }

  .title-cart {
    font-weight: 500;
    text-transform: uppercase;

  }

  .color-title {
    color: darkgreen !important;
  }
</style>
