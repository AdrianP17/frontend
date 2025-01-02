import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { Task } from "@/types/Task";
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

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        const logout = useAuthStore.getState().logout;
        logout(); // Limpia el estado del auth store
        window.location.href = "/login"; // Redirige al login
      }
      return Promise.reject(error);
    }
  );

export default api

export const tasksApi = {
    getAll: () => api.get<any[]>('/tasks'),
    getById: (id: string) => api.get<Task>(`/tasks/${id}`),
    create: (title: string, description: string, userId: number, tags: string[]) => api.post('/tasks', {title, description, userId, tags}),
    update: (id: string, data: Partial<any>) => api.put<any>(`/tasks/${id}`, data),
    delete: (id: string) => api.delete(`/tasks/${id}`),
}