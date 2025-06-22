<template>
    <div class="wrapper">
        <MainHeader :header="headerData"/>
        <p>Список товаров в корзине</p>
    </div>
</template>

<script lang="ts">
import MainHeader from "@/components/MainHeader.vue"
export default {
    name: "CartView",
    components: { MainHeader },
    data() {
        return {
            headerData: {
                headerText: "Корзина",
                searchRequired: false,
                notificationsRequired: true
            }
        }
    }
}

</script>

<style scoped lang="scss">

</style>