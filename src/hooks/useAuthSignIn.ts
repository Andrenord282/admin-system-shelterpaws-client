import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { authService, SignInData, AuthorizedUser, AuthorisationUserError, ResponseErrorCode } from '@/services/api';
import { useStores } from '@/context';

type StateSignIn = 'init' | 'loading' | 'fail' | 'success';

type SignIn = (data: SignInData, setError: UseFormSetError<any>) => void;

type UseAuthSignInState = {
    stateSignIn: StateSignIn;
    signIn: SignIn;
};

const useAuthSignIn = (): UseAuthSignInState => {
    const { userStore } = useStores();
    const [stateSignIn, setStateSignIn] = useState<StateSignIn>('init');
    const navigate = useNavigate();

    const signIn: SignIn = async (signInData, setError) => {
        const { status, data } = await authService.signIn(signInData);
        if (status === ResponseErrorCode.BadRequest) {
            const { errorLogList } = data as AuthorisationUserError;
            errorLogList.forEach(({ name, type, message }) => {
                setError(name, {
                    type,
                    message,
                });
            });
            setStateSignIn('fail');
        }

        if (status === ResponseErrorCode.Success) {
            const AuthorizedUser = data as AuthorizedUser;
            userStore.setUser(AuthorizedUser);
            navigate('/');
        }
    };

    return {
        stateSignIn,
        signIn,
    };
};

export { useAuthSignIn };
