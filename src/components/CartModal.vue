<template>
    <teleport to='body'>
        <div class="modal-wrapper">
            <div class="modal-content" ref="modalRef">
            {{ modalPrompt }}
                <div class="btns">
                    <button @click="$emit('clear-cart')" class="cart-modal-btn">Да</button>
                    <button @click="$emit('cancel')" class="cart-modal-btn">Отмена</button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { closeByButton } from '@/utils/reusable_functions';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "CartModal",
    props: {
        content: {
            type: String,
            required: true,
            default: ""
        }
    },
    computed: {
        modalPrompt() {
            let message = "";
            if (this.content === 'clear')
                message = "Вы действительно хотите очистить корзину?"
            else if (this.content === 'deleteProduct')
                message = "Удалить последний экземпляр товара из корзины?"
            return message;
        }
    },
    methods: {
        handleKeyDown(event: KeyboardEvent): void {
            closeByButton(event, this.$emit as (event: string, ...args: any[]) => void);
        },
        closeModal(event: Event): void {
            const modal = this.$refs.modalRef as HTMLElement || undefined;
            if (modal && !modal.contains(event.target as Node)) 
                this.$emit('close');
        }
    },
    emits: ['close', 'clear-cart', 'cancel'],
    mounted() {
        setTimeout(() => {
            document.addEventListener("click", this.closeModal);
            document.addEventListener("keydown", this.handleKeyDown);
            document.body.style.setProperty('overflow-y','hidden');
        }, 0);
    },
    unmounted() {
        document.removeEventListener("click", this.closeModal);
        document.removeEventListener("keydown", this.handleKeyDown);
        document.body.style.removeProperty('overflow-y');
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