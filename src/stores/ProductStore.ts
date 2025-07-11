import { defineStore } from "pinia";
import { productDatabase } from "@/backend/database";
export const useProductStore = defineStore("ProductStore", {
    state: () => { 
        return {
            productDatabase
        }
    }

    //getters

    //actions
});