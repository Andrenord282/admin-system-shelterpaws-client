import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes, ChangeEventHandler, ReactNode } from 'react';
import '../style/BaseInput.scss';

export type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
    className?: string;
    value: string;
    onChange: (value: string) => void;
    afterSlot?: ReactNode;
};

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
    ({ className, value, placeholder, onChange, afterSlot, ...props }, ref) => {
        const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
            const value = e.target.value;
            onChange(value);
        };

        return (
            <div className={classNames(className, 'input-item')}>
                <input
                    ref={ref}
                    type="text"
                    className="input-item__field"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    {...props}
                />
                {afterSlot && <span className="input-item__icon">{afterSlot}</span>}
            </div>
        );
    }
);

export { BaseInput };
