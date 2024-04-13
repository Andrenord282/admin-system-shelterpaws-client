import classNames from 'classnames';
import { FC, KeyboardEvent, MouseEvent } from 'react';
import '../style/PrimaryButton.scss';

export type PrimaryButtonProps = {
    text: string;
    className?: string;
    variant?: 'contained' | 'text';
    size?: 'small' | 'medium';
    fontWeight?: '400' | '700';
    textTransform?: 'uppercase' | 'lowercase';
    onClick?: (e?: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
};

const PrimaryButton: FC<PrimaryButtonProps> = ({
    variant = 'contained',
    size = 'medium',
    fontWeight = '400',
    textTransform = 'uppercase',
    text,
    onClick,
    className,
}) => {
    return (
        <button
            onClick={onClick}
            className={classNames(
                'primary-button',
                `primary-button--${variant}`,
                `primary-button--${size}`,
                `primary-button--${fontWeight}`,
                `primary-button--${textTransform}`,
                className
            )}
        >
            {text}
        </button>
    );
};

export { PrimaryButton };
