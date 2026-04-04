import styles from "./WrappperForm.module.scss";

interface FormProps {
  children: React.ReactNode;
  className?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}
export default function Form(props: FormProps) {
  const classes = `${styles.wrapperCard} ${props.className}`;
  return (
    <form className={classes} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
}
