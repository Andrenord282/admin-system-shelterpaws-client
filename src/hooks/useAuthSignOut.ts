import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ResponseErrorCode, authService } from '@/services/api';
import { useStores } from '@/context';

type StateSignOut = 'init' | 'loading' | 'fail' | 'success';

type UseAuthSignInState = {
    stateSignOut: StateSignOut;
    signOut: () => void;
};

const useAuthSignOut = (): UseAuthSignInState => {
    const { userStore } = useStores();
    const [stateSignOut, setStateSignOut] = useState<StateSignOut>('init');
    const navigate = useNavigate();

    const signOut = async () => {
        const { status } = await authService.signOut();
        if (status === ResponseErrorCode.Success) {
            userStore.clearUser();
            navigate('/auth');
        }
    };

    return {
        stateSignOut,
        signOut,
    };
};

export { useAuthSignOut };
