<template>
    <div class="wrapper">
        <MainHeader :header="headerData" />
        <p>Иконка профиля и данные</p>
        <p>Место для своих заказов</p>
        <p>Слайдер подборки персональных интересов</p>
    </div>
</template>

<script lang="ts">
import MainHeader from '@/components/MainHeader.vue';

export default {
    name: "ProfileView",
    components: { MainHeader },
    data() {
        return {
            headerData: {
                headerText: "Профиль",
                searchRequired: false,
                notificationsRequired: true
            }
        }
    }
}
</script>

<style scoped lang="scss">

</style>