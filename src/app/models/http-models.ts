export type UserStatus = "ENABLED" | "DISABLED" | "LOCKED";

export interface UserDetails {
  username: string;
  status: UserStatus;
  roles: string[];
}

export interface NewCertResponse {
  serial_number: string;
  cert: string;
  private_key: string;
}

export type CertStatus = "ENABLED" | "DISABLED" | "REVOKED" | "LOCKED"

export interface CertDetails {
  serialNumber: string;
  owner: string;
  issuedTimestamp: number;
  expiredTimestamp: number;
  status: CertStatus;
}
