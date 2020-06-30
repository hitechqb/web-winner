<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="padding-top: 20px;padding-bottom: 20px;">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <search-box
          :text-search="textSearch"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Navigation
        </q-item-label>
        <Navigator
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  import Navigator from '../components/Navigator';
  import SearchBox from "../components/shared/SearchBox/SearchBox";
  import {RouterName} from "../router";

  export default {
    name: 'MainLayout',
    components: {
      Navigator,
      SearchBox
    },

    data() {
      return {
        textSearch: '',
        leftDrawerOpen: false,
        essentialLinks: [
          {
            title: 'Products',
            caption: 'Danh sách sản phẩm',
            icon: 'tag',
            link: RouterName.HOME
          },
          {
            title: 'Order',
            caption: 'Đơn Hàng',
            icon: 'shopping_cart',
            link: RouterName.ORDER
          },
          {
            title: 'Setting',
            caption: 'Cài đặt',
            icon: 'settings',
            link: RouterName.DEMO
          },
          {
            title: 'Document',
            caption: 'Tài liệu',
            icon: 'library_books',
            link: RouterName.DOCS
          }
        ]
      };
    }
  };
</script>
