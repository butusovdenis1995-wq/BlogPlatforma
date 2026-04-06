import { Spin } from "antd";
import styles from "./WrapperSpin.module.scss";

export default function WrapperSpin() {
  return (
    <div className={styles.wrapperSpin}>
      <Spin size="large"></Spin>
    </div>
  );
}
