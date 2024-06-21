// src/services/potterheadService.ts
import axios from 'axios';
import { Character } from '../../Interfaces/Interfaces';

const API_URL = 'https://potterhead-api.vercel.app/api/characters';



export const getCharacters = async (): Promise<Character[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};

