import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
const api = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
    headers: {
        'Content-Type': "application/json"
    }
}) 

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token // Token con zustand
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
export default api

export const tasksApi = {
    getAll: () => api.get<any[]>('/tasks'),
    getById: (id: string) => api.get<any>(`/tasks/${id}`),
    create: (title: string, description: string, userId: string, tasks: string[]) => api.post('/tasks', {title, description, userId, tasks}),
    update: (id: string, data: Partial<any>) => api.put<any>(`/tasks/${id}`, data),
    delete: (id: string) => api.delete(`/tasks/${id}`),
}