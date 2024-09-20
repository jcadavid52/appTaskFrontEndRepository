const API_URL = 'http://localhost:9095/api'; 
// const API_URL = 'https://localhost:7175/api'; 

import { Task } from "../Types/TaskInterface";

export const getTasks = async (): Promise<Task[]> => {
    try {
        const response = await fetch(`${API_URL}/TaskCli/GetTasks`);

       
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Task[] = await response.json(); 

        console.log(data)
        return data;
    } catch (error) {
        console.error('Error al consumir el servicio:', error);
        throw error;
    }
};