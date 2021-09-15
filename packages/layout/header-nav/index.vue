<template>
  <div class="ingeek-header-nav">
    <div>
      <slot name="left"></slot>
    </div>
    <div
      class="nav-tab"
      ref="navRef"
      :style="{ width: `calc(100vw - ${width}px)` }"
    >
      <a-tabs
        v-model:activeKey="activeKey"
        :animated="false"
        size="large"
        @change="tabsChange"
      >
        <a-tab-pane
          :key="item.path"
          :tab="item.name"
          v-for="item in menuList"
        />
      </a-tabs>
    </div>
    <div ref="sysRef" class="sysComponent">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, onMounted, ref, watch } from "vue";
import { menuOpenWidth, menuCloseWidth } from "../const";

export default defineComponent({
  name: "header-nav",
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ["switch"],
  setup(props: any, context) {
    const { menuList } = props;
    const router = useRouter();

    const iconRef = ref<null>(null);
    const sysRef: any = ref(null);
    const width = ref<number>(0);

    const setWidth = (collapsed: boolean) => {
      // 菜单 + 左icon + 右区域
      const siderWith = collapsed ? menuCloseWidth : menuOpenWidth;
      const iconWidth = 68;
      width.value = siderWith + iconWidth + sysRef.value.offsetWidth;
    };

    // 初始化根据开关设置样式
    onMounted(() => {
      setWidth(props.collapsed);
    });
    watch(
      () => props.collapsed,
      (newValue) => {
        console.log(newValue);
        setWidth(newValue);
      }
    );

    // 头部选中
    const activeKey = ref("");
    const isHighlight = () => {
      for (let item of menuList) {
        if (router.options.history.location.includes(item.path)) {
          return item.path;
        }
      }
      return "";
    };
    const tabsChange = (puth: any) => {
      context.emit("switch", puth, false);
    };
    onMounted(() => {
      let puth = isHighlight();
      // 用户访问 "" 根路径，默认一个重定向打开
      if (puth === "") {
          if (menuList.length > 0) {
            activeKey.value = menuList[0].path;
            tabsChange(menuList[0].path);
          }
      } else {
        activeKey.value = puth;
        context.emit("switch", puth, true);
      }
    });

    return {
      iconRef,
      sysRef,
      width,
      activeKey,
      tabsChange,
    };
  },
});
</script>