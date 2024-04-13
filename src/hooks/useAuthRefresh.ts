import { useState } from 'react';
import { AuthorizedUser, authService, ResponseErrorCode } from '@/services/api';
import { useStores } from '@/context';

type StateRefresh = 'init' | 'loading' | 'fail' | 'success';

type UseAuthRefreshState = {
    stateRefresh: StateRefresh;
    refresh: () => void;
};

const useAuthRefresh = (): UseAuthRefreshState => {
    const [stateRefresh, setStateRefresh] = useState<StateRefresh>('init');
    const { userStore } = useStores();

    const refresh = async () => {
        setStateRefresh('loading');
        const { status, data } = await authService.refresh();
        if (status === ResponseErrorCode.BadRequest) {
            setStateRefresh('fail');
        }

        if (status === ResponseErrorCode.Success) {
            const AuthorizedUser = data as AuthorizedUser;
            setStateRefresh('success');
            userStore.setUser(AuthorizedUser);
        }
    };

    return {
        stateRefresh,
        refresh,
    };
};

export { useAuthRefresh };
