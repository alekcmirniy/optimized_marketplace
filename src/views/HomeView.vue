<template>
    <div class="wrapper">
        <MainHeader :header="headerData"/>
        <section class = "home-slider-first">
            Слайдер для сегодняшней подборки
        </section>
        <!-- <DailyProduct /> -->
        <section class="home-slider-second">
            Слайдер лучших подборок
        </section>
    </div>
</template>
<script lang="ts">
import DailyProduct from '@/components/DailyProduct.vue';
import MainHeader from '@/components/MainHeader.vue';

export default {
    name: "HomeView",
    components: { MainHeader, DailyProduct },
    data() {
        return {
            headerData: {
                headerText: "Главная",
                searchRequired: true,
                notificationsRequired: true
            }
        }
    }
};

</script>

<style scoped lang="scss">
@use "sass:color";
</style>