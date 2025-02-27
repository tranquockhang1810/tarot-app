export interface UserModel {
  id?: string;
  name?: string;
  phone?: string;
  status?: boolean;
  birthDate?: Date
  gender?: "male" | "female";
  type?: "phone" | "facebook";
  avatar?: string;
  point?: number;
}