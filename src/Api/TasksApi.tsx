const API_URL = "http://localhost:9095/api";
// const API_URL = 'https://localhost:7175/api';

import { AddTask, GetTask, UpdateTask } from "../Types/TaskInterface";

export const getTasks = async (): Promise<GetTask[]> => {
  try {
    const response = await fetch(`${API_URL}/TaskCli/GetTasks`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GetTask[] = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al consumir el servicio:", error);
    throw error;
  }
};

export const addTask = async (data: AddTask): Promise<AddTask | undefined > => {
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

    const result:AddTask = await response.json();

    
    
    console.log('Respuesta recibida:', result);

    return result;
   
    
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
  }
};

export const updateTask = async (data: UpdateTask,id:string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/TaskCli/UpdateTask?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const result:AddTask = await response.json();
    
    console.log('Respuesta recibida:', result);
   
    
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
  }
};
