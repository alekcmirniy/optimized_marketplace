<template>
    <div class="image-wrapper">
        <img class="logo-image" src="/src/logo.png" alt="Логотип сайта" />
    </div>
    <div class="wrapper">
        <div class="header-wrapper">
            <p class="header-current-page">{{ header.headerText }}</p>
        </div>
        <aside class = "header-aside">
            <img v-show="header.searchRequired" :src="iconPaths.SearchIcon" class="header-icons search-icon"/>
            <img v-show="header.notificationsRequired" :src="iconPaths.NotificationsIcon" class="header-icons notification-icon"/>
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
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    align-items: center;
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
    margin-left: 5px;
    font-size: 30px;
    font-weight: 500;
    color: vars.$supporting-golden;
    align-self: flex-start;
}
.header-aside {
    display: flex;
    gap: 10px;
}
.header-icons {
    padding: 8px;
    max-width: 5.5vh;
    border-radius: 8px;
    background-color: vars.$supporting-golden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
</style>