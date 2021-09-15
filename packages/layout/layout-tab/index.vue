<template>
  <div class="ingeek-layout-tab">
    <div
      class="layout-tab-box"
      :style="{ width: `calc(100vw - 40px - ${width}px)` }"
    >
      <a-tabs
        v-model:activeKey="activeKey"
        hide-add
        type="editable-card"
        size="small"
        :tabBarGutter="5"
        :animated="false"
        @change="tabChange"
        @edit="onEdit"
      >
        <a-tab-pane
          v-for="(item, index) of tabs"
          :key="item.path"
          :tab="item.name"
          :closable="index !== 0"
        />
      </a-tabs>
    </div>
    <div class="tab-action">
      <!-- <down-outlined /> -->
      <a-dropdown placement="bottomRight">
        <div class="tab-action-icon"><down-outlined /></div>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="clone('left')">
              <ArrowLeftOutlined />关闭左侧
            </a-menu-item>
            <a-menu-item @click="clone('right')">
              <ArrowRightOutlined />关闭右侧
            </a-menu-item>
            <a-menu-item @click="clone('other')">
              <CloseOutlined />关闭其他
            </a-menu-item>
            <a-menu-item @click="clone('all')">
              <CloseCircleOutlined />关闭全部
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import * as icons from "@ant-design/icons-vue";
import { storageGet, storageSet } from "../util";
import { useRoute } from "vue-router";

function navPathStorInit(menuList: any[]) {
  if (!storageGet("layoutTabs")) {
    const layoutTabs: any = {};
    menuList.forEach((element: any) => {
      layoutTabs[element.path] = [];
    });
    storageSet("layoutTabs", layoutTabs);
  }
}

function getNavPathStor(navPath: string) {
  let _tabs: any[] = [];
  const layoutTabs: any = storageGet("layoutTabs");
  if (Array.isArray(layoutTabs[navPath])) {
    _tabs = layoutTabs[navPath];
  } else {
    layoutTabs[navPath] = [];
    storageSet("layoutTabs", layoutTabs);
  }
  return _tabs;
}

function upDateNavPathStor(navPath: string, value: any[]) {
  const layoutTabs: any = storageGet("layoutTabs");
  layoutTabs[navPath] = value;
  storageSet("layoutTabs", layoutTabs);
}

export default defineComponent({
  components: {
    ...icons,
  },
  props: {
    width: {
      type: Number,
      default: 200,
    },
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ["change"],
  setup(props: any, context) {
    const route = useRoute();
    const tabs = ref<any[]>([]);
    const activeKey = ref<string>("");
    watch(
      () => route.path,
      (val) => {
        // console.log("监听到变化", val);
        activeKey.value = val;
      }
    );

    // 初始化tab存储结构
    const { menuList } = props;
    navPathStorInit(menuList);

    let _navPath = "";
    // 初始化，点击菜单都会调用
    const push = (navPath: string, item: any) => {
      _navPath = navPath;
      // 没有二级菜单，就没有tab
      if (!item) {
        tabs.value = [];
        return;
      }
      // 读缓存
      let _tabs: any[] = getNavPathStor(navPath);

      // 遍历缓存
      const res = _tabs.find((element) => {
        if (element.path === item.path) {
          return item;
        }
      });

      // 不存在，更新缓存
      if (!res) {
        _tabs = [..._tabs, item];
        upDateNavPathStor(navPath, _tabs);
      }

      tabs.value = _tabs;
    };

    const tabChange = (key: string) => {
      // console.log(key);
      context.emit("change", key);
    };

    // 点击 tab 上的删除图标
    const onEdit = (key: string) => {
      let _tabs: any[] = getNavPathStor(_navPath);

      // 执行删除掉当前点击的元素
      const deleteTab = () => {
        const new_tabs = _tabs.filter((item) => {
          if (item.path !== key) {
            return item;
          }
        });
        // 更新视图
        tabs.value = new_tabs;
        // 更新缓存
        upDateNavPathStor(_navPath, new_tabs);
      };

      // 删除元素不是当前显示tab
      if (key !== activeKey.value) {
        deleteTab();
        return;
      }

      // 删除元素是当前显示tab
      // 提前找到删除后要显示的元素
      let index = -1; // 得到删除元素的索引
      for (let i = 0; i < _tabs.length; i++) {
        if (_tabs[i].path === key) {
          index = i;
          break;
        }
      }
      let next: any;
      // 说明删除元素的后面还有
      if (index < _tabs.length - 1) {
        next = _tabs[index + 1];
      }
      // 说明删除元素已经是最后一个元素
      if (index === _tabs.length - 1) {
        next = _tabs[index - 1];
      }

      // tab切换到next
      activeKey.value = next.path;
      tabChange(next.path);
      // 执行删除
      deleteTab();
    };

    // 点击右侧下来菜单删除
    const clone = (action: string) => {
      let _tabs: any[] = getNavPathStor(_navPath);
      if (_tabs.length === 0) {
        return;
      }

      let index = -1; // 得到当前显示的索引
      for (let i = 0; i < _tabs.length; i++) {
        if (_tabs[i].path === activeKey.value) {
          index = i;
          break;
        }
      }
      // 分组
      let leftItemPaths: string[] = [];
      let rightItemPaths: string[] = [];
      // let i = 1 是因为最左侧的不能删
      for (let i = 1; i < _tabs.length; i++) {
        if (i < index) {
          leftItemPaths.push(_tabs[i].path);
        }
        if (i > index) {
          rightItemPaths.push(_tabs[i].path);
        }
      }

      let new_tabs = [];
      // 删除左侧
      if (action === "left") {
        new_tabs = _tabs.filter((item) => {
          if (!leftItemPaths.includes(item.path)) {
            return item;
          }
        });
      }
      // 关闭右边
      if (action === "right") {
        new_tabs = _tabs.filter((item) => {
          if (!rightItemPaths.includes(item.path)) {
            return item;
          }
        });
      }

      // 关闭其他 = 左侧 + 右侧
      if (action === "other") {
        new_tabs = _tabs.filter((item) => {
          if (![...leftItemPaths, ...rightItemPaths].includes(item.path)) {
            return item;
          }
        });
      }
      // 关闭全部 = 左侧 + 当前 + 右侧
      if (action === "all") {
        const firstTab = _tabs[0];
        new_tabs = [firstTab];
        activeKey.value = firstTab.path;
        tabChange(firstTab.path);
      }
      // 更新缓存
      upDateNavPathStor(_navPath, new_tabs);
      // 更新视图
      tabs.value = new_tabs;
    };

    return {
      tabs,
      activeKey,
      push,
      tabChange,
      onEdit,
      clone,
    };
  },
});
</script>