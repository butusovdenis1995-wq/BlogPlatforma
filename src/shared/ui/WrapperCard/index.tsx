import styles from "./WrapperCard.module.scss";

interface WrapperCardProps {
  children: React.ReactNode;
  className: string;
  style?: React.CSSProperties;
}

export default function WrapperCard(props: WrapperCardProps) {
  const classes = `${styles.wrapperCard} ${props.className}`;
  return (
    <article className={classes} style={props.style}>
      {props.children}
    </article>
  );
}
