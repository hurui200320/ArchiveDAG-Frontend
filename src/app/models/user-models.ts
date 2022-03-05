export type UserStatus = "ENABLED" | "DISABLED" | "LOCKED";

export interface UserDetails {
  username: string;
  status: UserStatus;
  roles: string[];
}
