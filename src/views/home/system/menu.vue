<template>
    <div>menu</div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
    setup() {
        onMounted(() => {
            console.log(new Date().getTime());
        });
    },
})
</script>
