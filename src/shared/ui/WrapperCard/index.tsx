import styles from "./WrapperCard.module.scss";

interface WrapperCardProps {
  children: React.ReactNode;
  className: string;
}

export default function WrapperCard(props: WrapperCardProps) {
  const classes = `${styles.wrapperCard} ${props.className}`;
  return <article className={classes}>{props.children}</article>;
}
