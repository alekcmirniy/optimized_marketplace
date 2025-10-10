<template>
    <div class="screen-wrapper">
        <img src="../components/icons/Loading.gif" alt="Загрузка..." fetchpriority="high" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
                //ее надо растянуть по всему экрану и сделать непрозрачной??
        }
    }
})
</script>

<style scoped lang="scss">
.screen-wrapper {
    background: white;
    img {
        z-index: 1;
    }
}


</style>