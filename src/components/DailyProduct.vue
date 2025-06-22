<template>
    <div class = "wrapper">
        <h2>Товар дня</h2>
        <main class="product-card">
            <img v-bind:src="product.productIcon" />
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BagIcon from "@/components/icons/bag.png"

export default defineComponent({
    name: "DailyProduct",
    data() {
        return {
            product: {
                productData: JSON,
                productIcon: BagIcon
            }
        }
    }
});
</script>

<style scoped lang="scss">
.wrapper {
    justify-content: center;
    width: 100%;
}
</style>