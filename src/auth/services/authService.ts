import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { API_URL } from '../../common/constants';

class AuthService {
  public ACCESS_TOKEN_KEY = 'access_token';

  async setToken(token: string) {
    await AsyncStorage.setItem(this.ACCESS_TOKEN_KEY, token);

    axios.defaults.headers.common['X-Authorization'] = `Bearer ${token}`;

    // TODO: save into state
  }

  async removeToken() {
    await AsyncStorage.removeItem(this.ACCESS_TOKEN_KEY);

    axios.defaults.headers.common['X-Authorization'] = undefined;

    // TODO: remove from state
  }

  async getToken() {
    const token = await AsyncStorage.getItem(this.ACCESS_TOKEN_KEY);

    return token;
  }

  async login(email: string, password: string) {
    try {
      const response = await axios.post<{ token: string }>(
        `${API_URL}/api/v1/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
      );

      await this.setToken(response.data.token);

      return response.data;
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  }

  async logout() {
    await this.removeToken();
  }
}

export default new AuthService();
