<template>
    <teleport to="body">
        <div class="modal-wrapper">
            <div class="modal-content" ref="modalRef">
                <form>
                    <label><input type="radio" value="price" v-model="selectedOption" name="filter"/>По возрастанию цены</label>
                    <label><input type="radio" value="-price" v-model="selectedOption" name="filter" />По убыванию цены</label>
                    <label><input type="radio" value="created_at" v-model="selectedOption" name="filter"/>Сначала новые</label>
                    <label><input type="radio" value="-rating" v-model="selectedOption" name="filter"/>Высокий рейтинг</label>
                    <label><input type="radio" value="-views" v-model="selectedOption" name="filter"/>Популярные</label>
                </form>
                <button @click="$emit('use-filters', selectedOption)" :disabled="!selectedOption" class="modal-button">Применить</button>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { closeByButton } from "@/utils/reusable_functions";

export default defineComponent({
    name: "FilterModal",
    data() {
        return {
            selectedOption: ""
        }
    },
    methods: {
        closeModal(event: MouseEvent): void {
            const modal = this.$refs.modalRef as HTMLElement | undefined;
            if (modal && !modal.contains(event.target as Node))
                this.$emit('close');
        },
        handleKeyDown(event: KeyboardEvent): void {
            closeByButton(event, this.$emit as (event: string, ...args: any[]) => void);
        }
    },
    emits: ["use-filters", "close"],
    mounted() {
        setTimeout(() => {
            document.addEventListener("click", this.closeModal);
            document.addEventListener("keydown", this.handleKeyDown);
            document.body.style.setProperty("overflow-y", "hidden");
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
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.modal-content {
    background-color: vars.$card-background;
    border: solid 1px vars.$supporting-golden;
    border-radius: 20px;
    padding: 20px 25px;
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
    width: 90%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    animation: fadeIn 0.3s ease-in;
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
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s ease;
    font-size: 20px;

    &:has(input:checked) {
        background: color.adjust(vars.$supporting-golden, $lightness:5%);
        color: vars.$card-background;
    }

    input[type="radio"] {
        accent-color: vars.$supporting-golden;
    }
}
</style>