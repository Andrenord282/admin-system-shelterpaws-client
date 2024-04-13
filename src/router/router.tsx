import { createBrowserRouter } from 'react-router-dom';
import { BaseLayout } from '@/layouts';
import { AuthPage, HomePage } from '@/pages';


const router = createBrowserRouter([
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/auth',
                element: <AuthPage />,
            },
        ],
    },
]);

export { router };
