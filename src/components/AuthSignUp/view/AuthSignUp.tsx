import classNames from 'classnames';
import { FC } from 'react';
import { useAuthSignUp } from '@/hooks/useAuthSignUp';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BaseButton, FormInput } from '@/ui';
import '../style/AuthSignUp.scss';

type AuthSignUpProps = {
    className?: string;
};

type AuthFormInputName = {
    'user-email': string;
    'user-name': string;
    'user-password': string;
    'confirm-password': string;
};

const AuthSignUp: FC<AuthSignUpProps> = ({ className }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
    } = useForm<AuthFormInputName>();
    const { signUp } = useAuthSignUp();

    const onSubmit: SubmitHandler<AuthFormInputName> = (data) => {
        delete data['confirm-password'];
        signUp(data, setError);
    };

    const formValidate = {
        'user-email': {
            required: 'required field',
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'not valid mail',
            },
        },
        'user-name': {
            required: 'required field',
            pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'use the symbols: A-Z, a-z, 0-9',
            },
            minLength: {
                value: 3,
                message: 'user name must be at least 3 characters long',
            },
        },
        'user-password': {
            required: 'required field',
            validate: {
                minLength: (value: string) => value.length >= 6 || 'password must be at least 6 characters long',
                latinOnly: (value: string) => /^[A-Za-z0-9]+$/.test(value) || 'use the symbols: A-Z, a-z, 0-9',
            },
        },
        'confirm-password': {
            required: 'required field',
            validate: {
                matchPassword: (value: string) => value === watch('user-password') || 'passwords don`t match',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classNames(className, 'auth-sign-up')}>
            <div className="auth-sign-up__item-list">
                <FormInput
                    name="user-email"
                    register={register}
                    validation={formValidate['user-email']}
                    error={errors && errors['user-email']}
                    type="email"
                    label="Enter your email"
                    placeholder="your email"
                    className="auth-sign-up__item"
                />
                <FormInput
                    name="user-name"
                    register={register}
                    validation={formValidate['user-name']}
                    error={errors && errors['user-name']}
                    type="text"
                    label="Enter your name"
                    placeholder="your name"
                    className="auth-sign-up__item"
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
                    className="auth-sign-up__item"
                />
                <FormInput
                    name="confirm-password"
                    register={register}
                    validation={formValidate['confirm-password']}
                    error={errors['confirm-password']}
                    label="Repeat your password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="repeat password"
                    className="auth-sign-up__item"
                />
            </div>
            <div className="auth-sign-up__navigate-list">
                <BaseButton text="Registration" />
            </div>
        </form>
    );
};

export { AuthSignUp };
