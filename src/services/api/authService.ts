import { AxiosError, AxiosResponse } from 'axios';
import { shelterAdmin } from '../clients';

export type SignUpData = {
    'user-name': string;
    'user-email': string;
    'user-password': string;
};

export type SignInData = {
    'user-email': string;
    'user-password': string;
};

export type AuthorizedUser = {
    userID: string;
    userName: string;
    userEmail: string;
    accessToken: string;
};

export type ErrorFieldName = 'user-name' | 'user-password' | 'general-error';

export type AuthorisationUserErrorLog = {
    type: string;
    name: ErrorFieldName;
    message: string;
};

export type AuthorisationUserError = {
    errorName: string;
    message: string;
    errorLogList: AuthorisationUserErrorLog[];
};

class AuthService {
    signUp = async (signUpData: SignUpData): Promise<AxiosResponse<AuthorizedUser | AuthorisationUserError>> => {
        try {
            const response = await shelterAdmin.post('auth/sign-up', signUpData, {
                withCredentials: true,
            });
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response;
            }
        }
    };

    signIn = async (signInData: SignInData): Promise<AxiosResponse<AuthorizedUser | AuthorisationUserError>> => {
        try {
            const response = await shelterAdmin.post('auth/sign-in', signInData, {
                withCredentials: true,
            });
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response;
            }
        }
    };

    signOut = async () => {
        try {
            const response = await shelterAdmin.get('auth/sign-out', {
                withCredentials: true,
            });
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response;
            }
        }
    };

    refresh = async (): Promise<AxiosResponse<AuthorizedUser | AuthorisationUserError>> => {
        try {
            const response = await shelterAdmin.get('auth/refresh', {
                withCredentials: true,
            });
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response;
            }
        }
    };
}

const authService = new AuthService();

export { authService };
