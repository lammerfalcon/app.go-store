import {useApi} from "../api";
import type {Product} from "@/types/Product";

export function useTodoApi() {
    async function getTodos() {
        return await useApi<{entities: Product[]}>(`/products`, {
            method: 'GET',
        })
    }
    return {
        getTodos
    }
}
