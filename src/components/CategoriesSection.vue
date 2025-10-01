<template>
    <div class="categories-wrapper">
        <span @click="$emit('categories-section-open')" class="categories" :title="currentCategories ? currentCategories : `Категории не выбраны`">
            Категории: {{ currentCategories ? currentCategories : "Все"}}
        </span>
        <button @click="$emit('reset-categories')" v-if="currentCategories">Сброс</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CategoriesSection",
    props: {
        currentCategories: {
            type: String
        }
    },
    emits: ["categories-section-open", "reset-categories"]
});
</script>

<style scoped lang="scss">
@use "sass:color";
@use '/src/assets/variables' as vars;
.categories-wrapper {
    max-width: 100%;
    margin: 10px 10px 20px 10px;
    color: vars.$body-color;
    display: flex;
    gap: 10px;
}
.categories {
    width: 100%;
    text-align: center;
    padding: 0 10px;
    min-height: 50px;
    line-height: 50px;
    display: inline-block;
    border-radius: 15px;
    background: vars.$background-gradient;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>