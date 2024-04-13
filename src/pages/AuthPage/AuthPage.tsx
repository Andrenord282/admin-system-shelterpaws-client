import { FC, useState } from 'react';
import { SwitchButtonList } from '@/ui';
import { AuthSignUp, AuthSignIn } from '@/components';
import './AuthPage.scss';

export type AuthFormName = 'sign-in' | 'sign-up';

const authFormList = {
    'sign-in': (className: string) => <AuthSignIn className={className} />,
    'sign-up': (className: string) => <AuthSignUp className={className} />,
};

const authButtonList: { name: AuthFormName; text: string }[] = [
    { name: 'sign-in', text: 'sign-in' },
    { name: 'sign-up', text: 'sign-up' },
];

const AuthPage: FC = () => {
    const [currentFormName, setCurrentFormName] = useState<AuthFormName>('sign-in');

    return (
        <main className="auth-page section">
            <div className="auth-page__container container">
                <div className="auth-page__content">
                    <div className="auth-page__form">
                        <SwitchButtonList
                            buttons={authButtonList}
                            handleSwitchButtonName={(name) => {
                                setCurrentFormName(name as AuthFormName);
                            }}
                            className="auth-page__form-switcher"
                        />
                        {authFormList[currentFormName]('auth-page__form-body')}
                    </div>
                </div>
            </div>
        </main>
    );
};

export { AuthPage };
