<template>
  <div class="customers">
    <q-card style="min-width: 350px">
      <q-card-section class="q-mb-lg bg-primary text-white">
        <div class="text-h6">Khách hàng</div>
      </q-card-section>

      <form @submit.prevent="onSubmit" class="q-ml-md q-mr-md">
        <q-card-section class="q-pt-none">
          <q-input
            dense
            autofocus
            :value="customerName"
            @input="$emit('update:customerName', $event)"
            ref="customerName"
            :rules="[val => (val && val.length > 0) || 'Nhập tên người nhận']"
          >
            <template v-slot:prepend>
              <q-icon name="person"/>
            </template>
          </q-input>

          <q-input
            dense
            :value="customerPhone"
            @input="$emit('update:customerPhone', $event)"
            ref="customerPhone"
            :rules="[
            val =>
              (val.length > 9 && val.length < 12) || 'Nhập đúng số điện thoại'
          ]"
          >
            <template v-slot:prepend>
              <q-icon name="phone"/>
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Huỷ" v-close-popup/>
          <q-btn flat label="Hoàn tất" type="submit" class="bg-blue-1"/>
        </q-card-actions>
      </form>
    </q-card>
  </div>
</template>

<script>

  export default {
    props: {
      customerName: {
        type: String,
      },
      customerPhone: {
        type: String
      }
    },
    methods: {
      onSubmit() {
        this.$refs.customerName.validate();
        this.$refs.customerPhone.validate();
        if (!this.$refs.customerName.hasError && !this.$refs.customerPhone.hasError) {
          this.addCustomer();
          this.$emit('close');
        }
      },
      addCustomer() {
        const customer = {
          customerName: this.customerName,
          customerPhone: this.customerPhone,
        };
        this.$store.commit('orders/addCustomerOrder', {customer})
      }
    }
  };
</script>
