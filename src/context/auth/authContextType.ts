import { VnLocalizedStrings } from "@/src/utils/localizedStrings/vietnam";
import { ENGLocalizedStrings } from "@/src/utils/localizedStrings/english";
import { UserModel } from "@/src/api/features/login/models/UserModel";
import { LoginResponseModel } from "@/src/api/features/login/models/LoginModel";

export interface AuthContextType {
  onLogin: (user: LoginResponseModel) => void;
  onUpdateProfile: (user: UserModel) => void;
  onLogout: () => void;
  localStrings: typeof VnLocalizedStrings | typeof ENGLocalizedStrings; 
  changeLanguage: () => void;
  language: "vi" | "en";
  setLanguage: (lng: "vi" | "en") => void;
  user: UserModel | null;
  isAuthenticated: boolean;
  isLoginUser: (userId: string) => boolean;
  checkAuthLoading: boolean;
}