const API_URL = "http://localhost:9095/api";
// const API_URL = 'https://localhost:7175/api';

import { AddTask, GetTask, UpdateTask,TaskType } from "../Types/TaskInterface";

export const getTasks = async (): Promise<TaskType[]> => {
  try {
    const response = await fetch(`${API_URL}/TaskCli/GetTasks`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GetTask[] = await response.json();

   
    return data;
  } catch (error) {
    console.error("Error al consumir el servicio:", error);
    throw error;
  }
};

export const addTask = async (data: TaskType): Promise<TaskType | undefined > => {
  try {
    const response = await fetch(`${API_URL}/TaskCli/AddTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
      return undefined
    }

    const result:TaskType = await response.json();

    
    
    

    return result;
   
    
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
  }
};

export const updateTask = async (data: TaskType): Promise<TaskType | undefined> => {
  try {


    const response = await fetch(`${API_URL}/TaskCli/UpdateTask?id=${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      
      throw new Error("Error en la solicitud");
      return undefined
    }

    const result:TaskType = await response.json();
    
    console.log('Respuesta recibida:', result);

    return result;
   
    
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
  }
};

export const deleteTask = async (taskId: string): Promise<TaskType | undefined> => {
  try {
    const response = await fetch(`${API_URL}/TaskCli/DeleteTask?id=${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      // Si la respuesta no es exitosa, lanzamos un error
      throw new Error(`Error: ${response.statusText}`);
    }
    const result:TaskType = await response.json();

    return result;
    
  } catch (error) {
    console.error(`Hubo un problema eliminando el producto: ${(error as Error).message}`);
    return undefined;
  }
}
