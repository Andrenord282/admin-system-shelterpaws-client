import classNames from 'classnames';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BaseButton, FormInput } from '@/ui';
import '../style/AuthSignIn.scss';
import { useAuthSignIn } from '@/hooks/useAuthSignIn';

type AuthSignInProps = {
    className: string;
};

type AuthFormInputName = {
    'user-email': string;
    'user-password': string;
};

const AuthSignIn: FC<AuthSignInProps> = ({ className }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<AuthFormInputName>();
    const { signIn } = useAuthSignIn();

    const onSubmit: SubmitHandler<AuthFormInputName> = (data) => {
        signIn(data, setError);
    };

    const formValidate = {
        'user-email': {
            required: 'required field',
        },
        'user-password': {
            required: 'required field',
        },
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classNames(className, 'auth-sign-in')}>
            <div className="auth-sign-in__item-list">
                <FormInput
                    name="user-email"
                    register={register}
                    validation={formValidate['user-email']}
                    error={errors && errors['user-email']}
                    type="email"
                    label="Enter your email"
                    placeholder="your email"
                    className="auth-sign-in__item"
                />
                <FormInput
                    name="user-password"
                    register={register}
                    validation={formValidate['user-password']}
                    error={errors['user-password']}
                    label="Enter your password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="your password"
                    className="auth-sign-in__item"
                />
            </div>
            <div className="auth-sign-in__navigate-list">
                <BaseButton text="Enter" />
            </div>
        </form>
    );
};

export { AuthSignIn };
