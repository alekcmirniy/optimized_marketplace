<template>
    <teleport to="body">
        <div class="modal-wrapper">
            <div class="modal-content" ref="modalRef">
                <form>
                    <p class="types">Типы</p>
                    <transition-group name="categories" tag="ul" class="categories-list">
                        <li v-for="(typeName, idx) in typeNames" :key="idx" class="type">
                            <label>
                                <input type="checkbox" v-model="selectedOptions.types" @change="handleTypeCheckboxChange" :value="typeName" name="mainCategory">{{ typeName }}
                            </label>
                            <ul v-if="checkTypeSelected(typeName)" class="categories-list">
                                <li v-for="(subtype, idx) in getSubtypesForType(typeName)" :key="idx">
                                    <label class="sublabels">
                                        <input type="checkbox"
                                        :checked="isSubtypeSelected(typeName, subtype)"
                                        :value="subtype"
                                        @change="toggleSubtype(typeName, subtype)"
                                        name="mainCategory">{{ subtype }}
                                    </label>
                                </li>
                            </ul>
                        </li>
                    </transition-group>
                    <p class="types">Бренды</p>
                    <ul class="categories-list">
                        <li v-for="(brandName, idx) in brandNames" :key="idx">
                            <label>
                                <input type="checkbox" v-model="selectedOptions.brands" :value="brandName" name="otherCategory">{{ brandName }}
                            </label>
                        </li>
                    </ul>
                </form>
                <button @click="$emit('use-categories', selectedOptions)" :disabled="isEmptySelected">Применить</button>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { closeByButton } from "@/utils/reusable_functions";
import { useProductStore } from "@/stores/ProductStore";
import type { Brand, Category, SelectedCategories } from "@/types/interfaces";

export default defineComponent({
    name: "CategoriesModal",
    data() {
        return {
            selectedOptions: { types: [], brands: [], subtypes: {} } as SelectedCategories,
            types: [] as Array<Category>,
            brands: [] as Array<Brand>
        }
    },
    methods: {
        getSubtypesForType(typeName: string): Array<string> {
            const category = this.types.find(c => c.name === typeName);
            return category ? category.subtypes.map(st => st.name) : [];
        },
        checkSelectedSubtypeArraysEmpty(): boolean {
            return this.allSubtypeArrays.every((st) => st.length === 0);
        },
        checkTypeSelected(typeName: string): boolean {
            return this.selectedOptions.types.includes(typeName);
        },
        clearSubtypesForType(typeName: string): void {
            if (this.selectedOptions.subtypes[typeName])
                this.selectedOptions.subtypes[typeName].length = 0;
        },
        closeModal(event: MouseEvent): void {
            const modal = this.$refs.modalRef as HTMLElement | undefined;
            if (modal && !modal.contains(event.target as Node))
                this.$emit('close');
        },
        handleKeyDown(event: KeyboardEvent): void {
            closeByButton(event, this.$emit as (event: string, ...args: any[]) => void);
        },
        handleTypeCheckboxChange(event: Event): void {
            const checkboxValue = (event.target as HTMLInputElement | undefined)?.value;
            if (checkboxValue && !this.checkTypeSelected(checkboxValue)) {
                this.clearSubtypesForType(checkboxValue);
            }
        },
        toggleSubtype(typeName: string, subtype: string): void {
            if (!this.selectedOptions.subtypes[typeName]) 
                this.selectedOptions.subtypes[typeName] = [];

            const foundSubtypes = this.selectedOptions.subtypes[typeName];
            const idx = foundSubtypes.indexOf(subtype);

            if (idx === -1)
                foundSubtypes.push(subtype);
            else
                foundSubtypes.splice(idx, 1);
        },
        isSubtypeSelected(typeName: string, subtype: string): boolean {
            return this.selectedOptions.subtypes[typeName]?.includes(subtype) ?? false;
        }
    },
    computed: {
        allSubtypeArrays(): Array<Array<string>> {
            return Object.values(this.selectedOptions.subtypes);
        },
        typeNames(): Array<string> {
            return this.types.map(type => type.name);
        },
        brandNames(): Array<string> {
            return this.brands.map(brand => brand.name);
        },
        isEmptySelected(): boolean {
            return this.selectedOptions.brands.length === 0
            && this.checkSelectedSubtypeArraysEmpty()
            && this.selectedOptions.types.length === 0;
        }
    },
    emits: ["use-categories", "close"],
    beforeMount() {
        const productStore = useProductStore();
        this.types = productStore.orderingsAndSortings.types;
        this.brands = productStore.orderingsAndSortings.brands;
    },
    mounted() {
        setTimeout(() => {
            document.addEventListener("click", this.closeModal);
            document.addEventListener("keydown", this.handleKeyDown);
            document.body.style.setProperty("overflow-y","hidden");
        }, 0);
    },
    unmounted() {
        document.removeEventListener("click", this.closeModal);
        document.removeEventListener("keydown", this.handleKeyDown);
        document.body.style.removeProperty("overflow-y");
    }
});
</script>

<style scoped lang = "scss">
@use '/src/assets/variables' as vars;
@use "sass:color";
.modal-wrapper {
    backdrop-filter: blur(8px);
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
    background-color: vars.$card-background;
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
    color: black;
    background-color: vars.$supporting-golden;
    border-radius: 24px;
}
.type {
    overflow: hidden;
    &:has(input:checked) {
        background: color.adjust(vars.$supporting-golden, $lightness:5%);
        border-radius: 12px;
        label {
            border: 0;
        }
    }
}
.sublabels:has(input:checked) {
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
.categories-list {
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    max-width: 100%;
    max-height: 33vh;
}
.categories-list li {
    width: 100%;
    margin: 5px;
    flex-grow: 1;
    &:not(.type) {
        width: fit-content;
    }
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
    transition: all 0.1s ease;
    font-size: 16px;
    max-width: 100%;

    &:has(input:checked) {
        background: color.adjust(vars.$supporting-golden, $lightness:5%);
        color: black;
    }

    input[type="checkbox"] {
        display: flex;
        appearance: none;
        position: relative;
        width: 10px;
        height: 10px;
        background: vars.$background-gradient-active;
        box-shadow: inset 0 0 5px rgb(0 0 0 / 0.2);
        border-radius: 100%;

        transition: 0.2s ease;
        &:checked {
            background: vars.$body-color;
        }
    }
}
.categories-move {
    transition: all 0.2s ease;
}
</style>