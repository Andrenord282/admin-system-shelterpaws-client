import { FC, ReactNode, createContext, useContext } from 'react';
import { rootStore, RootStore } from '@/store';

const StoresContext = createContext<RootStore | null>(null);

type StoresProviderProps = {
    children: ReactNode;
};

export const StoresProvider: FC<StoresProviderProps> = ({ children }) => {
    return <StoresContext.Provider value={rootStore}>{children}</StoresContext.Provider>;
};

export const useStores = () => {
    const store = useContext(StoresContext);
    if (!store) {
        throw new Error('useStores must be used within a StoresProvider');
    }
    return store;
};
