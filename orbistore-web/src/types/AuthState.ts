import { User } from "./User";

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
