import { useStores } from '@/context';
import { useAuthRefresh } from '@/hooks/useAuthRefresh';
import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthRefresh: FC = () => {
    const { authorized } = useStores().userStore;
    const { stateRefresh, refresh } = useAuthRefresh();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authorized) {
            refresh();
        }
    }, [authorized]);

    useEffect(() => {
        if (stateRefresh === 'fail') {
            navigate('/auth');
        }
    }, [stateRefresh]);

    if (stateRefresh === 'loading') {
        return <p>loading...</p>;
    }

    if (authorized) {
        return <Outlet />;
    }

    return null;
};

export { AuthRefresh };
