<template>
    <div v-if="product">
        <ProductCard class = "product" :productId="product.id" :cardDescription="product.getCardDescription()" :imagePath="product.imagePath"/>
    </div>
    <div v-else>
        <p>Товар не найден</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { productDatabase } from '@/backend/database';
import { Product } from '@/backend/database'
export default defineComponent({
    name: "ProductView",
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    components: { ProductCard },
    data() {
        return {
            product: null as Product | null
        }
    },
    mounted() {
        const founded = productDatabase.find((product) => (this.id === product.id)) as Product;
        this.product = founded || null;
    }
});

</script>

<style scoped lang="scss">
.product {
    margin: 0;
}
</style>