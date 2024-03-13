import {useApi} from "../api";

export function useTodoApi() {
    async function getTodos(id: string) {
        return await useApi(`/todos/${id}`, {
            method: 'GET',
        })
    }
    return {
        getTodos
    }
}
