import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components';
import './BaseLayout.scss';

const BaseLayout: FC = () => {
    return (
        <div className="base-layout">
            <Header />
            <Outlet />
        </div>
    );
};

export { BaseLayout };
