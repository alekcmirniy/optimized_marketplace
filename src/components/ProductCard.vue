<template>
    <div class="card-wrapper">
        <router-link :to="`/product/${productId}`">
            <section>
                <img class="card-photo" :src="imagePath"/>
            </section>
            <footer class="card-footer">
                <p class="category-model">{{ cardDescription[0] }}</p>
                <p class="brand">{{ cardDescription[1] }}</p>
                <p class="price">{{ cardDescription[2] }}</p>
            </footer>
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
    name: "ProductCard",
    props: {
        productId: {
            type: Number,
            required: true,
        },
        cardDescription: {
            type: Array,
            required: true
        },
        imagePath: {
            type: String,
            required: true
        }
    },
});

</script>

<style scoped lang="scss">
@use "sass:color";
@use '/src/assets/variables' as vars;
.card-wrapper {
    width: 100%;
    margin: 12px 0 0 10px;
    overflow: hidden;
    border-radius: 15px;
    background-color: white;
    padding: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    background: vars.$card-color;
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
    font-family: "Fira Sans", sans-serif;
}
.category-model {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.brand {
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
    font-size: 16px;   
}
</style>