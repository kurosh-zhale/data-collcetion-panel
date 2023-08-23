export interface UserProfile {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  organization?: string;
  gender?: 0 | 1 | 2;
  phone?: number;
}
