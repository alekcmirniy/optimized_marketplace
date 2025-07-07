<template>
    <div class="modal-wrapper">
        <div class="modal-content" ref="modalRef">
            <form>
                <p class="types">Основные</p>
                <ul class="categories-list">
                    <li v-for="(mainCategory, idx) of mainCategories" :key="idx">
                        <label>
                            <input type="checkbox" v-model="selectedOptions[0]" :value="mainCategory" name="mainCategory">{{ mainCategory }}
                        </label>
                    </li>
                </ul>
                <p class="types">Дополнительные</p>
                <ul class="categories-list">
                    <li v-for="(otherCategory, idx) of otherCategories" :key="idx">
                        <label>
                            <input type="checkbox" v-model="selectedOptions[1]" :value="otherCategory" name="otherCategory">{{ otherCategory }}
                        </label>
                    </li>
                </ul>
            </form>
            <button @click="$emit('use-categories', selectedOptions)" :disabled="!selectedOptions[0].length && !selectedOptions[1].length">Применить</button>
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
            selectedOptions: [[], []] as Array<Array<string>>,
            mainCategories: mainCategoriesStructure as Set<string>,
            otherCategories: otherCategoriesStructure as Set<string>
        }
    },
    methods: {
        closeModal(event: MouseEvent): void {
            const modal = this.$refs.modalRef as HTMLElement || undefined;
            if (modal && !modal.contains(event.target as Node))
                this.$emit('close');
        },
        handleKeyDown(event: KeyboardEvent): void {
            closeByButton(event, this.$emit);
        }
    },
    mounted() {
        setTimeout(() => {
            document.addEventListener("click", this.closeModal);
            document.addEventListener("keydown", this.handleKeyDown);
            document.body.style.setProperty('overflow-y','hidden');
        }, 0);
    },
    unmounted() {
        document.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener("keydown", this.handleKeyDown);
        document.body.style.removeProperty('overflow-y');

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
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    z-index: 1000;
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
    margin: 5px 0;
    padding: 10px 0;
    text-align: center;
    font-size: 28px;
    color: vars.$card-color;
    background-color: vars.$supporting-golden;
    border-radius: 24px;
}
.categories-list {
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    overflow:scroll;
    max-width: 100%;
    max-height: 33vh;
}
.categories-list li {
    width: fit-content;
    margin: 5px;
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
        scale: 1.02;
    }

    input[type="checkbox"] {
        display: flex;
        appearance: none;
        position: relative;
        width: 10px;
        height: 10px;
        background: vars.$supporting-golden;
        box-shadow: inset 0 0 5px rgb(0 0 0 / 0.2);
        border-radius: 100%;

        transition: 0.2s ease;
        &:checked {
            background: vars.$body-color;
        }
    }
}
</style>