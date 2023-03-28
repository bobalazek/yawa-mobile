import axios from 'axios';

import { API_URL } from '../../../constants';

class SettingsService {
  async updateProfile(email: string, firstName: string): Promise<string> {
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

  async changePassword(currentPassword: string, newPassword: string, newPasswordConfirm: string): Promise<string> {
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

  async resendNewEmailConfirmationEmail(): Promise<string> {
    try {
      const response = await axios.post<{ message: string }>(
        `${API_URL}/api/v1/settings/resend-new-email-confirmation-email`,
        {},
        {
          timeout: 5000,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
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

  async cancelNewEmail(): Promise<string> {
    try {
      const response = await axios.post<{ message: string }>(
        `${API_URL}/api/v1/settings/cancel-new-email`,
        {},
        {
          timeout: 5000,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
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
}

export default new SettingsService();
