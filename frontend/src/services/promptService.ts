import axios from 'axios';

const API_URL = 'http://localhost:3001/api/prompts';

export const createPrompt = async (data: any) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error: any) {
        console.error('Error al crear el prompt:', error.message);
        throw new Error(error.message);
    }
};