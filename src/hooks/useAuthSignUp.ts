import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { authService, SignUpData, AuthorizedUser, AuthorisationUserError, ResponseErrorCode } from '@/services/api';
import { useStores } from '@/context';

type StateSignUp = 'init' | 'loading' | 'fail' | 'success';

type SignUp = (data: SignUpData, setError: UseFormSetError<any>) => void;

type UseAuthSignUpState = {
    stateSignUp: StateSignUp;
    signUp: SignUp;
};

const useAuthSignUp = (): UseAuthSignUpState => {
    const { userStore } = useStores();
    const [stateSignUp, setStateSignUp] = useState<StateSignUp>('init');
    const navigate = useNavigate();

    const signUp: SignUp = async (signUpData, setError) => {
        const { status, data } = await authService.signUp(signUpData);
        if (status === ResponseErrorCode.BadRequest) {
            const { errorLogList } = data as AuthorisationUserError;
            errorLogList.forEach(({ name, type, message }) => {
                setError(name, {
                    type,
                    message,
                });
            });
            setStateSignUp('fail');
        }

        if (status === ResponseErrorCode.Success) {
            const AuthorizedUser = data as AuthorizedUser;
            userStore.setUser(AuthorizedUser);
            navigate('/');
        }
    };

    return {
        stateSignUp,
        signUp,
    };
};

export { useAuthSignUp };
