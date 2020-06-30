<template>
  <div class="SearchBox">
    <q-input
      dark
      dense
      standout
      :value="textSearch"
      input-class="text-right"
      class="q-ml-md"
      style="width: 100%;"
    >
      <template v-slot:append>
        <q-icon v-if="textSearch === ''" name="search"/>
        <q-icon
          v-else
          name="clear"
          class="cursor-pointer"
          @click="textSearch = ''"
        />
      </template>
    </q-input>
  </div>
</template>

<script>

  export default {
    props: {
      textSearch: {
        type: String,
        default: ''
      }
    },
  };
</script>

<style scoped>
   .SearchBox {
     width: 100% !important;
     margin-right: 20px;
   }
</style>

