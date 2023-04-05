import axios, { AxiosError } from 'axios';

import { API_URL } from '../../../constants';
import { ActionType } from '../schemas/ActionSchema';

class ActionsService {
  async getAll(): Promise<ActionType[]> {
    try {
      const response = await axios.get<ActionType[]>(`${API_URL}/api/v1/actions`, {
        timeout: 5000,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });

      return response.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }

      throw new Error('Something went wrong. Please make sure you have a stable internet connection.');
    }
  }

  async create(action: ActionType): Promise<ActionType> {
    try {
      const response = await axios.post<ActionType>(`${API_URL}/api/v1/actions`, action, {
        timeout: 5000,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      });

      return response.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }

      throw new Error('Something went wrong. Please make sure you have a stable internet connection.');
    }
  }
}

export default new ActionsService();
