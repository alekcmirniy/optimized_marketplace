<template>
    <div class="screen-wrapper">
        <img src="../components/icons/Loading.gif" alt="Загрузка..." fetchpriority="high" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        disableBodyScroll(): void {
            const bodyStyles = document.body.style;
            bodyStyles.setProperty("overflow", "hidden");
        },
        enableBodyScroll(): void {
            const bodyStyles = document.body.style;
            bodyStyles.setProperty("overflow", "auto");
        }
    },
    mounted() {
        this.disableBodyScroll();
    },
    unmounted() {
        this.enableBodyScroll();
    }
})
</script>

<style scoped lang="scss">
.screen-wrapper {
    inset: 0;
    background: rgb(10, 1, 1, 0.3);
    position: fixed;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 140px;
    }
}
</style>