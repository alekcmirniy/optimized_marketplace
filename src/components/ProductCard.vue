<template>
    <div class="wrapper">
        <section>
            <img class="card-photo" v-bind:src="imagePath" />
        </section>
        <footer class="card-footer">
            <p class="category-model">{{ cardDescription[0] }}</p>
            <p class="brand">{{ cardDescription[1] }}</p>
            <p class="price">{{ cardDescription[2] }}</p>
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
    name: "ProductCard",
    props: {
        cardDescription: {
            type: Array,
            required: true
        },
        imagePath: {
            type: String,
            required: true
        }
    },
    data() {
        return {

        }
    },
    methods: {

    }
});

</script>

<style scoped lang="scss">
@use "sass:color";
@use '/src/assets/variables' as vars;
.wrapper {
    width: 45%;
    margin: 10px;
    overflow: hidden;
    border: solid 1px color.adjust(vars.$body-color, $blackness:50%);
    border-radius: 10px;
    background-color: color.adjust(vars.$body-color, $lightness:5%);
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
@media screen and (min-width: 769px) {
    .wrapper {
        max-width: 500px;
    }
}
.card-footer {
    width: 100%;
    padding: 0 3px;
    display: flex;
    gap: 4px;
    flex-direction: column;
}
.category-model {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    width: 100%;
    display: block;
}   
.brand {
    text-align:justify;
    word-break: break-word;
}
.price {
    font-weight: bold;
    color: rgb(155, 60, 60);
    text-align: center;
}
</style>