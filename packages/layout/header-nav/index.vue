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
import { getBaseUrl } from '../util';

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
    width: {
      type: Number,
    },
    collapsedWidth: {
      type: Number,
    }
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
      const siderWith = collapsed ? props.collapsedWidth : props.width;
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
        // console.log(newValue);
        setWidth(newValue);
      }
    );

    // 头部选中
    const activeKey = ref("");
    const tabsChange = (puth: any, isClick = true) => { // 不是点击调用
      context.emit("switch", puth, isClick);
    };
    onMounted(() => {
      if (router.options.history.location === '/') {
        // if (menuList.length > 0) {
        //   activeKey.value = menuList[0].path;
        //   tabsChange(menuList[0].path, false);
        // }
        // 找到包含改 BaseUrl 的菜单显示
        for (let item of menuList) {
          if (item.path.includes(getBaseUrl(window.location.pathname))) {
              activeKey.value = item.path;
              tabsChange(item.path, false);
              break;
          }
        }
        //  console.log(window.location.pathname);
        return;
      }

    

      // 设置默认tab高亮
      for (let item of menuList) {
        if (window.location.pathname.includes(item.path)) { // 导航菜单地址
          activeKey.value = item.path;
          // context.emit("switch", item.path, false);
          tabsChange(item.path, false);
        }
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