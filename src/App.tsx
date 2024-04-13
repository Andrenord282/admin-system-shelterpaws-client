import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoresProvider } from './context';
import { BaseLayout } from './layouts';
import { AuthPage, HomePage } from './pages';
import { AuthRefresh } from './components';

import './assets/style/index.scss';

const App = () => {
    return (
        <StoresProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<BaseLayout />}>
                        <Route element={<AuthRefresh />}>
                            <Route index element={<HomePage />} />
                        </Route>
                        <Route path="/auth" element={<AuthPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </StoresProvider>
    );
};

export { App };
