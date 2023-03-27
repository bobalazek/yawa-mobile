import axios from 'axios';

import { API_URL, AUTHORIZATION_HEADER_NAME } from '../../../constants';

class SettingsService {
  async updateProfile(accessToken: string, email: string, firstName: string): Promise<string> {
    try {
      const response = await axios.post<{ message: string }>(
        `${API_URL}/api/v1/settings/update-profile`,
        {
          email,
          firstName,
        },
        {
          timeout: 5000,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            [AUTHORIZATION_HEADER_NAME]: accessToken,
          },
        }
      );

      return response.data.message;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }

      throw new Error('Something went wrong. Please make sure you have a stable internet connection.');
    }
  }

  async changePassword(
    accessToken: string,
    currentPassword: string,
    newPassword: string,
    newPasswordConfirm: string
  ): Promise<string> {
    try {
      const response = await axios.post<{ token: string }>(
        `${API_URL}/api/v1/settings/change-password`,
        {
          currentPassword,
          newPassword,
          newPasswordConfirm,
        },
        {
          timeout: 5000,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            [AUTHORIZATION_HEADER_NAME]: accessToken,
          },
        }
      );

      return response.data.token;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.data?.error) {
        throw new Error(err.response.data.error);
      }

      throw new Error('Something went wrong. Please make sure you have a stable internet connection.');
    }
  }
}

export default new SettingsService();
