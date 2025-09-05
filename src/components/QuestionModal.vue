<template>
    <teleport to="body">
        <div class="modal-wrapper">
            <div class="modal-content" ref="modalRef">
            {{ modalPrompt }}
                <div class="btns">
                    <button v-if="action" @click="$emit(action)">Да</button>
                    <button @click="$emit('cancel')">Отмена</button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { closeByButton } from "@/utils/reusable_functions";
import { defineComponent } from "vue";

export default defineComponent({
    name: "QuestionModal",
    props: {
        content: {
            type: String,
            required: true,
            default: ""
        },
    },
    data() {
        return {
            controller: null as AbortController | null
        }
    },
    computed: {
        modalPrompt() {
            let message = "";
            if (this.content === 'clear')
                message = "Вы действительно хотите очистить корзину?"
            else if (this.content === 'deleteLastProduct')
                message = "Удалить последний экземпляр товара из корзины?"
            else if (this.content === 'resetCategories')
                message = "Сбросить категории?"
            else if (this.content === 'resetFilters')
                message = "Сбросить фильтры?"
            return message;
        },
        action() {
            if (this.content === 'clear') 
                return 'confirm-clear';
            else if (this.content === 'deleteLastProduct')
                return 'delete-last-product';
            else if (this.content === 'resetCategories')
                return 'confirm-reset-categories';
            else if (this.content === 'resetFilters')
                return 'confirm-reset-filters';
        }
    },
    methods: {
        handleKeyDown(event: KeyboardEvent): void {
            closeByButton(event, this.$emit as (event: string, ...args: any[]) => void);
        },
        closeModal(event: Event): void {
            const modal = this.$refs.modalRef as HTMLElement || undefined;
            if (modal && !modal.contains(event.target as Node)) 
                this.$emit("close");
        }
    },
    emits: ["close", "confirm-clear", "delete-last-product", "confirm-reset-categories", "confirm-reset-filters", "cancel"],
    mounted() {
        setTimeout(() => {
            this.controller = new AbortController();
            document.addEventListener("click", this.closeModal, { signal: this.controller.signal });
            document.addEventListener("keydown", this.handleKeyDown, {signal: this.controller.signal });
            document.body.style.setProperty("overflow-y", "hidden");
        }, 0);
    },
    unmounted() {
        if (this.controller)
            this.controller.abort();
        else {
            document.removeEventListener("click", this.closeModal);
            document.removeEventListener("keydown", this.handleKeyDown);
        }
        document.body.style.removeProperty("overflow-y");
    }
})

</script>

<style scoped lang="scss">
@use '@/assets/_variables.scss' as vars;
.modal-wrapper {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    text-align: center;
    padding-top: 10px;
    font-size: 1.4rem;
    backdrop-filter: blur(8px);
    background: rgba(0,0,0,0.6);
    z-index: 10;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.modal-content {
    width: 90%;
    background: vars.$card-color;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);

    border: solid 1px vars.$supporting-golden;
    position: relative;
    animation: slideFromLeft 0.3s ease-out;
}
@keyframes slideFromLeft {
    from { 
        transform: translateX(-100vw); 
        opacity: 0;
    }
    to { 
        transform: translateX(0);
        opacity: 1;
    }
}
.btns {
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
    gap: 40px;
}
</style>