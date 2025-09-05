<template>
    <div class="image-wrapper">
        <img class="logo-image" src="/src/logo.png" alt="Логотип сайта" />
    </div>
    <div class="wrapper">
        <div class="header-wrapper">
            <p class="header-current-page">{{ header.headerText }}</p>
        </div>
        <aside class = "header-aside">
            <img v-show="header.searchRequired" :src="iconPaths.SearchIcon" alt="Поиск - иконка" class="header-icons"/>
            <img v-show="header.notificationsRequired" :src="iconPaths.NotificationsIcon" alt="Уведомления - иконка" class="header-icons"/>
        </aside>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchIcon from "@/components/icons/Search.png";
import NotificationsIcon from "@/components/icons/Notifications.png";

export default defineComponent({
    name: "MainHeader",
    props: {
            header: {
                type: Object,
                required: true
            }
        },
    data() {
        return {
            iconPaths: {
                SearchIcon,
                NotificationsIcon
            }
        }
    }
});

</script>

<style scoped lang="scss">
@use '/src/assets/variables' as vars;
@use "sass:color";
.wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    align-items: center;
    margin: 20px 5px 0 5px;
}
.header-wrapper {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 30px;
}
.image-wrapper {
    background-color: color.adjust(vars.$body-color, $lightness:10%);
    max-height: 10vh;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}
.logo-image {
    height: 23vh;
    width: auto;
}
.header-current-page {
    font-size: 30px;
    font-weight: 500;
    color: vars.$supporting-golden;
    align-self: flex-start;
}
.header-aside {
    display: flex;
    gap: 12px;
}
.header-icons {
    padding: 6px;
    max-width: 5.5vh;
    border: 1px solid #d6b65c;
    border-radius: 12px;
    background-color: transparent;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
</style>