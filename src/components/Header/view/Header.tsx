import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStores } from '@/context';
import { BaseButton, Text } from '@/ui';
import { useAuthSignOut } from '@/hooks/useAuthSignOut';
import '../style/Header.scss';

const Header: FC = observer(() => {
    const { userName } = useStores().userStore;
    const { signOut } = useAuthSignOut();

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__content">
                    <Link className="header__title title title--header" to={'/'}>
                        Admin system of Shelterpaws
                    </Link>
                    {userName && (
                        <div className="header__info">
                            <Text>{userName}</Text>
                            <BaseButton text="Sign out" onClick={signOut} />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
});

export { Header };
