<template>
  <div>
    <template v-if="getLoading">
      <div class="q-pa-md">
        <div class="absolute-center">
          <q-circular-progress
            indeterminate
            size="50px"
            :thickness="0.22"
            color="lime"
            track-color="grey-3"
            class="q-ma-md"
          />
          <p> Loading...</p>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="q-pa-md">
        <div class="row justify-between absolute-center">
          <q-card dark flat bordered class="my-card items-center">
            <q-card-section>
              <div class="text-h6">Trạng thái thanh toán</div>
            </q-card-section>
            <q-separator dark inset/>

            <q-card-section class="col items-center">
              <q-avatar
                class="row justify-center icon-status"
                color="primary"
                text-color="white"
                :icon="getStatusInvoice === 1 ? 'thumb_up' : 'thumb_down'"/>
              <div>
                <p class="q-mt-sm"> {{getInfoInvoice}} </p>
                <q-btn
                  :to="{name: RouterHome}"
                  flat
                  style="background:rgba(251, 251, 251, 0.18); color: #f0fffc"
                  label="Tiếp tục order"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

    </template>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {RouterName} from "../router";

  export default {
    name: "PageInvoice",
    computed: {
      ...mapGetters('invoices', ['getStatusInvoice', 'getLoading', 'getInfoInvoice']),
    },

    methods: {
      ...mapActions('invoices', ['fetchStatusInvoice', 'setLoading']),
    },

    data() {
      const RouterHome = RouterName.HOME;
      return {
        RouterHome,
      }
    },

    async mounted() {
      console.log('getStatusInvoice: ', this.getStatusInvoice);
      if (this.getStatusInvoice === null) {
        // set loading screen
        this.isLoading = true;
        const appTransId = this.$route.query['apptransid'];

        if (appTransId === undefined) {
          await this.$router.push({name: RouterName.HOME})
        } else {
          setTimeout(() => {
            this.fetchStatusInvoice(appTransId);
            this.setLoading(false);
          }, 3000);
        }
      }
    }
  }
</script>

<style scoped>
  .my-card {
    text-align: center;
    background-color: #4caf50;
    width: 100%;
    max-width: 560px;
  }

  .icon-status {
    margin: 0 auto;
  }
</style>
