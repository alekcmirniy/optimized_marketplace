<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />
        <p>Иконка профиля и данные</p>
        <p>Место для своих заказов</p>
        <p>Слайдер подборки персональных интересов</p>
        <div v-if="productStore.isLoading">Загрузка...</div>
        <div v-else-if="productStore.error">Ошибка: {{ productStore.error }}</div>
        <template v-else> 
            <div> {{ productStore.productsCount }} </div>
            <div> {{ productStore.products }} </div>
        </template>
    </div>
</template>

<script lang="ts">
import MainHeader from '@/components/MainHeader.vue';
import { useProductStore } from '@/stores/ProductStore';

export default {
    name: "ProfileView",
    components: { MainHeader },
    data() {
        return {
            headerData: {
                headerText: "Профиль",
                searchRequired: false,
                notificationsRequired: true
            },
            productStore: useProductStore()
        }
    },
    mounted() {
        this.productStore.fetchProducts();
    }
}

</script>

<style scoped lang="scss">

</style>