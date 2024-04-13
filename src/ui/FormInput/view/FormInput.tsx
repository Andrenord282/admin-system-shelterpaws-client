import classNames from 'classnames';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { FC, InputHTMLAttributes } from 'react';
import { Text } from '@/ui';
import '../style/FormInput.scss';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
    label: string;
    name: string;
    register: UseFormRegister<any>;
    validation: any;
    error?: FieldError;
};

const FormInput: FC<FormInputProps> = ({
    className,
    label,
    name,
    placeholder,
    register,
    validation,
    error,
    ...props
}) => {
    return (
        <div className={classNames(className, 'form-input')}>
            {label && (
                <Text tag="span" view="p-xxs" className="form-input__label">
                    {label}
                </Text>
            )}
            <input
                placeholder={placeholder}
                {...register(name, validation)}
                {...props}
                className={classNames('form-input__field', {
                    error: error,
                })}
            />
            {error && error?.message && (
                <Text tag="span" view="p-xxs" className="form-input__error-text">
                    {error?.message}
                </Text>
            )}
        </div>
    );
};

export { FormInput };
