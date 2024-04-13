import classNames from 'classnames';
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react';
import { BaseButton } from '@/ui';
import '../style/SwitchButtonList.scss';

type SwitchButtonListProps = {
    className?: string;
    buttons: { name: string; text: string }[];
    speedSwitch?: number;
    handleSwitchButtonName: (name: string) => void;
};

const SwitchButtonList: FC<SwitchButtonListProps> = ({
    className,
    buttons,
    speedSwitch = 200,
    handleSwitchButtonName,
}) => {

    const switchButtonRef = useRef<HTMLDivElement>(null);
    const [buttonPosition, setButtonPosition] = useState<number>(0);

    const cursorInlineStyle = useMemo(() => {
        const newInlineStyle: CSSProperties = {
            width: `${100 / buttons.length}%`,
            transform: `translateX(${100 * buttonPosition}%)`,
        };
        return newInlineStyle;
    }, [buttonPosition]);

    const handleTogglePosition = (index: number) => {
        setButtonPosition(index);
        handleSwitchButtonName(buttons[index].name);
    };

    useEffect(() => {
        if (speedSwitch === 200) return;
        switchButtonRef.current.style.setProperty('--cursor-duration', `${speedSwitch / 1000}s`);
        switchButtonRef.current.style.setProperty('--active-item-delay', `${speedSwitch / 1000}s`);
    }, []);

    return (
        <div ref={switchButtonRef} className={classNames(className, 'switch-button-list')}>
            <div className="switch-button-list__cursor" style={cursorInlineStyle}></div>
            {buttons &&
                buttons.length > 0 &&
                buttons.map(({ name, text }, index) => {
                    const className = classNames('switch-button-list__item', {
                        active: index === buttonPosition,
                    });

                    return (
                        <BaseButton
                            key={name}
                            text={text}
                            onClick={() => handleTogglePosition(index)}
                            className={className}
                        />
                    );
                })}
        </div>
    );
};

export { SwitchButtonList };
