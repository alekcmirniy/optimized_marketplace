<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />
        <p>Место для фильтров</p>
        <p>Место для каталога карточек-товаров</p>
    </div>
</template>

<script lang="ts">
import MainHeader from '@/components/MainHeader.vue';

export default {
    name: "StoreView",
    components: { MainHeader },
    data() {
        return {
            headerData: {
                headerText: "Каталог",
                searchRequired: true,
                notificationsRequired: true
            }
        }
    }
}

</script>

<style scoped lang="scss">

</style>