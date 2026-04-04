import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button(props: ButtonProps) {
  const classes = `${styles.buttonSample} ${props.className}`;
  return (
    <button onClick={props.onClick} className={classes}>
      {props.children}
    </button>
  );
}
