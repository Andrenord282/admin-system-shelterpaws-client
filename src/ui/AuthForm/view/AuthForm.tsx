import classNames from 'classnames';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PrimaryButton } from '../../../ui';
import { PrimaryButtonProps } from '../../PrimaryButton/view/PrimaryButton';
import '../style/AuthForm.scss';

type AuthFormInputName = {
    [key: string]: string;
};

export type AuthFormInput = {
    name: string;
    label?: string;
    placeholder?: string;
    validate: {
        errorText?: string;
        required?: boolean | string;
    };
};

type AuthFormPorps = {
    className?: string;
    authFormListItem: AuthFormInput[];
    submitButton: Omit<PrimaryButtonProps, 'onClick'>;
};

const AuthForm: FC<AuthFormPorps> = ({ className, authFormListItem, submitButton }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthFormInputName>();

    const onSubmit: SubmitHandler<AuthFormInputName> = (data) => console.log(data);

    return (
        <form className={classNames(className, 'auth-from')} onSubmit={handleSubmit(onSubmit)}>
            {authFormListItem &&
                authFormListItem.length > 0 &&
                authFormListItem.map(({ name, label, validate, placeholder }) => {
                    console.log(errors[name]);
                    return (
                        <div key={name} className="auth-from__input-item">
                            <label id={name} className="auth-from__input-item-label">
                                {label}
                            </label>
                            <input
                                className="auth-from__input-item-input"
                                {...register(`${name}`, { ...validate })}
                                placeholder={placeholder}
                            />
                            {errors[name] && (
                                <span className="auth-from__input-item-error">{errors[name].message}</span>
                            )}
                        </div>
                    );
                })}
            <PrimaryButton size="small" {...submitButton} className="auth-from__button" />
        </form>
    );
};

export { AuthForm };
