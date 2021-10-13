<template>
  <canna-layout
    :menuList="menuList"
    logoSmall="https://cdn.ingeek.com/aladdin/logo-small.png"
    logoDark="https://cdn.ingeek.com/aladdin/logo-dark.png"
  >
    <template v-slot:right>
      <div style="height: 100%; padding: 0 20px">
        <a-avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />leo
      </div>
    </template>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </canna-layout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import menuList from "./menuList";
export default defineComponent({
  setup() {
    return {
      menuList,
    };
  },
});
</script>
