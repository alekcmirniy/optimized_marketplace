<template>
    <div class="modal-wrapper">
        <div class="modal-content">
            <form>
                <p class="types">Основные</p>
                <ul class="categories-list">
                    <li v-for="(mainCategory, idx) of mainCategories" :key="idx">
                        <label>
                            <input type="checkbox" v-model="selectedMain" :value="mainCategory" name="mainCategory">{{ mainCategory }}
                        </label>
                    </li>
                </ul>
                <p class="types">Дополнительные</p>
                <ul class="categories-list">
                    <li v-for="(otherCategory, idx) of otherCategories" :key="idx">
                        <label>
                            <input type="checkbox" v-model="selectedOthers" :value="otherCategory" name="otherCategory">{{ otherCategory }}
                        </label>
                    </li>
                </ul>
            </form>
            <button @click="$emit('use-filters', selectedOptions)" :disabled="!selectedOptions" class="modal-button">Применить</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { closeByButton } from '@/utils/reusable_functions';
import { mainCategoriesStructure } from '@/backend/database';
import { otherCategoriesStructure } from '@/backend/database';
export default defineComponent({
    name: "CategoriesModal",
    data() {
        return {
            selectedMain: [],
            selectedOthers: [],
            selectedOptions: this.selectedMain,
            mainCategories: mainCategoriesStructure as Set<string>,
            otherCategories: otherCategoriesStructure as Set<string>
        }
    },
    methods: {
        handleKeyDown(event: KeyboardEvent): void {
            closeByButton(event, this.$emit);
        }
    },
    mounted() {
        setTimeout(() => {
            document.addEventListener("keydown", this.handleKeyDown);
        }, 0);
    },
    unmounted() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }
});
</script>

<style scoped lang = "scss">
@use '/src/assets/variables' as vars;
@use "sass:color";
.modal-wrapper {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow: scroll;
}
.modal-content {
    width: 90%;
    background-color: vars.$card-color;
    border: solid 1px vars.$supporting-golden;
    border-radius: 20px;
    padding: 20px 25px;
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    animation: fadeIn 0.3s ease-in;
}
.types {
    padding: 10px 0;
    text-align: center;
    font-size: 28px;
    border: solid 1px vars.$supporting-golden-lighten;
    color: vars.$card-color;
    background-color: vars.$supporting-golden-lighten;
    border-radius: 24px;
}
.categories-list {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: max-content;
    max-width: 100%;
}
.categories-list li {
    width: fit-content;
    flex-grow: 1;
}
@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}
form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    border: solid 1px vars.$supporting-golden;
    border-radius: 15px;
    background-color: vars.$body-color;
    color: vars.$supporting-golden-lighten;
    cursor: pointer;
    transition: background 0.2s ease;
    font-size: 16px;

    &:has(input:checked) {
        background: color.adjust(vars.$supporting-golden, $lightness:5%);
        color: vars.$card-color;
    }

    input[type="radio"] {
        accent-color: vars.$supporting-golden;
    }
}
</style>