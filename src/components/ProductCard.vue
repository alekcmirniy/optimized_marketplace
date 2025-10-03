<template>
    <div class="card-wrapper" v-if="product">
        <router-link :to="`/product/${product.slug}`">
            <section>
                <img class="card-photo" :src="product.images[0].image" :alt="'Фотография товара'" loading="lazy"/>             <!-- в последствии будет только isPreview изобр.-->
            </section>
            <footer class="card-footer">
                <div class="category-model">
                    <p>{{ product.name }}</p>
                </div>
                <p class="brand">{{ product.brand}}</p>
                <p class="price">{{ formattedPrice}} руб.</p>
            </footer>
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ProductType } from "@/types/interfaces";
import { getFormattedPrice } from "@/utils/reusable_functions";

export default defineComponent ({
    name: "ProductCard",
    props: {
        product: {
            type: Object as PropType<ProductType>,
            required: true
        }
    },
    computed: {
        formattedPrice() {
            if (this.product)
                return getFormattedPrice(this.product.price);
        }
    }
});

</script>

<style scoped lang="scss">
@use "sass:color";
@use '/src/assets/variables' as vars;
.card-wrapper {
    width: 100%;

    overflow: hidden;
    border-radius: 15px;
    background-color: white;
    padding-bottom: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    background: vars.$card-background;
    color: vars.$supporting-golden-lighten;
}
section {
    width: 100%;
    display: flex;
    overflow: hidden;
}
.card-photo {
    max-height: 100%;
    object-fit: contain;
    max-width: 100%;
}
.card-footer {
    width: 100%;
    padding: 0 3px;
    display: flex;
    gap: 4px;
    flex-direction: column;
    font-family: "Playfair Display", serif;
}
.category-model {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    p {
        text-align:center;
        word-break: break-word;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
.brand {
    font-style: italic;
    text-align:center;
    word-break: break-word;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.price {
    text-align:center;
    word-break: break-word;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 800;
    letter-spacing: 1px;
    color: #e2c48f;
}
</style>