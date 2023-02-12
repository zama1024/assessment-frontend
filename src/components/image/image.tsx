import styles from "./image.module.css";

type ImageProps = {
    options: {
        src: string;
        alt: string
    };
};

const Image = ({ options: {src, alt} }: ImageProps) => {
    return <img alt={alt} className={styles.img} src={src} />;
};

export default Image;
