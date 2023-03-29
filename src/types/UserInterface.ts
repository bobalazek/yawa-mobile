export interface UserInterface {
  id: string;
  email: string;
  newEmail: string | null;
  firstName: string;
  avatarUrl: string | null;
  timezone: string;
  measurementSystem: string;
  birthday: string;
}
