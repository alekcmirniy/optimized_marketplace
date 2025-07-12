<template>
    <div class="wrapper">
        <MainHeader :header="headerData"/>
        <div class = "cart-container">
            <ul class="products-list">
                <li v-for="product of cartProducts" :key="product.id">
                    {{ product.id }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import MainHeader from "@/components/MainHeader.vue"
import { useCartStore } from "@/stores/CartStore";

export default {
    name: "CartView",
    components: { MainHeader },
    setup() {
        const cartStore = useCartStore();
        const cartProducts = cartStore.getProductsFromCart;
        const totalPrice = cartStore.fullPrice;
        return { cartProducts, totalPrice };
    },
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