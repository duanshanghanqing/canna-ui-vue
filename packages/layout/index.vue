<template>
  <a-layout class="ingeek-layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible :width="width" :collapsedWidth="collapsedWidth">
      <div class="logo">
        <img :src="logoSmall" class="logo-small" v-if="collapsed" />
        <img :src="logoDark" class="logo-dark" v-else />
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        @select="menuSelect"
      >
        <template v-for="item in leftMenuList">
          <a-sub-menu
            v-if="item.children && item.children.length > 0"
            :key="item.path"
          >
            <template #title>
              <span>
                <component :is="item.icon"></component>
                <span>{{ item.name }}</span>
              </span>
            </template>
            <a-menu-item v-for="item in item.children" :key="item.path">{{
              item.name
            }}</a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="item.path">
            <component :is="item.icon"></component>
            <span>{{ item.name }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="ingeek-layout-header">
        <header-nav
          :collapsed="collapsed"
          :menuList="menuList"
          @switch="navSwitch"
          :width="width" 
          :collapsedWidth="collapsedWidth"
        >
          <!-- 左侧icon -->
          <template v-slot:left>
            <menu-unfold-outlined
              v-if="collapsed"
              class="icon"
              @click="() => (collapsed = !collapsed)"
            />
            <menu-fold-outlined
              v-else
              class="icon"
              @click="() => (collapsed = !collapsed)"
            />
            <redo-outlined class="icon" @click="refreshView" />
          </template>
          <!-- 右侧icon -->
          <template v-slot:right>
            <slot name="right"></slot>
          </template>
        </header-nav>
      </a-layout-header>

      <!-- 页面打开tab -->
      <layout-tab
        :width="winWidth"
        :menuList="menuList"
        ref="layoutTabRef"
        @change="layoutTabChange"
      />

      <!-- 视图 -->
      <div class="ingeek-layout-view" v-if="viewState">
        <slot></slot>
      </div>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { useRouter, useRoute } from "vue-router";
import * as icons from "@ant-design/icons-vue";
import { defineComponent, ref, watch } from "vue";
import HeaderNav from "./header-nav/index.vue";
import layoutTab from "./layout-tab/index.vue";
import { getBaseUrl, getPathUrl } from './util';

// 根据导航菜单获取左侧菜单
function getLeftMenuList(path: string, menuList: any[]) {
  let leftMenuList = [];
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].path === path && Array.isArray(menuList[i].children)) {
      leftMenuList = menuList[i].children;
      break;
    }
  }
  return leftMenuList;
}

// 根据路径找到对应的item
function getPathItem(path: string, menuList: any[]) {
  let pathItem;
  function toItem(list: any[]) {
    if (Array.isArray(list)) {
      for (let item of list) {
        if (item.path === path) {
          pathItem = item;
          break;
        } else {
          toItem(item.children);
        }
      }
    }
  }
  toItem(menuList);
  return pathItem;
}
// 根据当前路径找到对应的item，父元素
function getPathParentItem(path: string, menuList: any[]) {
  let pathParentItem: any;
  function toItem(list: any[], parentItem: any) {
    if (Array.isArray(list)) {
      for (let item of list) {
        if (item.path === path) {
          // console.log(item.path === path, parentItem);
          pathParentItem = parentItem;
          break;
        } else {
          toItem(item.children, item);
        }
      }
    }
  }
  toItem(menuList, null);
  return pathParentItem;
}

export default defineComponent({
  name: "canna-layout",
  components: {
    ...icons,
    HeaderNav,
    layoutTab,
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
    logoSmall: {
      type: String,
      default: "",
    },
    logoDark: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 250,
    },
    collapsedWidth: {
      type: Number,
      default: 80,
    }
  },
  setup(props: any) {
    const router = useRouter();
    const route = useRoute();
    const menuList: any[] = props.menuList;
    /*
      根据切换按钮，计算导航菜单宽度
    */
    const collapsed = ref<boolean>(false);
    const winWidth = ref<number>(props.width);
    watch(collapsed, (newValue) => {
      if (newValue) {
        winWidth.value = props.collapsedWidth;
      } else {
        winWidth.value = props.width;
      }
    });

    // 左菜单
    const leftMenuList = ref([]);
    // 默认选中
    const selectedKeys = ref<string[]>([""]);

    watch(
      () => route.path,
      (val) => {
        // console.log("监听到变化", val);
        selectedKeys.value = [val];
        // 获取当前路径父菜单
        const parentItem = getPathParentItem(val, menuList);
        if (parentItem) {
          // console.log(parentItem);
          openKeys.value = [parentItem.path];
        }
      }
    );
    // 默认打开
    const openKeys = ref<string[]>([""]);

    // tab 菜单
    const layoutTabRef = ref<any>(null);

    // 头部导航切换
    let _navPath = "";
    const navSwitch = (navPath: string, isClick: boolean) => {
      _navPath = navPath;
      // 点击切换taburl时，且 当前项目url 和 要打开BaseUrl不同，就刷新跳转
      if (isClick && getBaseUrl(navPath) !== getBaseUrl(window.location.pathname)) {
         window.location.href = navPath;
         return;
      }

      // 设置二级左菜单
      const _leftMenuList = getLeftMenuList(navPath, menuList);
      leftMenuList.value = _leftMenuList;

      // 没有二级左菜单,等于点击tab
      if (_leftMenuList.length === 0) {
        router.push(getPathUrl(navPath));
        layoutTabRef.value.push(navPath, null);
        return;
      }

      // 切换场景
      // 有二级左菜单
      if (_leftMenuList.length > 0) {
        const item = _leftMenuList[0];
        // 有子菜单
        if (Array.isArray(item.children) && item.children.length > 0) {
          const selectedItem = item.children[0];
          router.push(selectedItem.path);
          layoutTabRef.value.push(navPath, selectedItem);
        } else {
          router.push(item.puth);
          layoutTabRef.value.push(navPath , item);
        }
      }
    };

    // 菜单被选中
    const menuSelect = (e: any) => {
      router.push(e.key);
      layoutTabRef.value.push(
        _navPath,
        getPathItem(e.key, [...leftMenuList.value])
      );
    };

    // tab 切换
    const layoutTabChange = (path: string) => {
      router.push(path);
      selectedKeys.value = [path];
    };

    // 刷新视图
    const viewState = ref<boolean>(true);
    const refreshView = () => {
      viewState.value = false;
      setTimeout(() => {
        viewState.value = true;
      }, 100);
    };
    return {
      // 切换宽度
      collapsed,
      winWidth,
      // 导航切换
      navSwitch,

      // 页面打开tab
      activeKey: ref(""),

      // 左菜单
      leftMenuList,

      // 选中的菜单
      selectedKeys,
      // 默认打开的菜单
      openKeys,
      // 菜单被选中
      menuSelect,
      layoutTabRef,
      layoutTabChange,

      // 刷新视图
      viewState,
      refreshView,
    };
  },
});
</script>
<style lang="less">
@import "./index.less";
</style>
