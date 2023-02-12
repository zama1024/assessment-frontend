import styles from "./button.module.css";
import show from '../../icons/show.svg'
import hide from '../../icons/hide.svg'
import location from '../../icons/location.svg'

type ButtonProps = {
    options: {
        text: string;
        variable: string;
        value: string;
    };
    updateState: (a: string, b: string) => void;
};

const Button = ({ options: { variable, value, text }, updateState }: ButtonProps) => {
    const iconMapping: any = {
        show: show,
        hide: hide
    }

    return (
        <div onClick={() => updateState(variable, value)} className={styles.button} data-testid={text}>   
            <span>{text}</span>
            <img className={styles.icon} src={iconMapping[value] || location} alt="Missing source" />
        </div>
    );
};

export default Button;
