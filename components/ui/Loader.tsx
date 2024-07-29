import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className={styles["three-body"]}>
        <div className={styles["three-body__dot"]}></div>
        <div className={styles["three-body__dot"]}></div>
        <div className={styles["three-body__dot"]}></div>
      </div>
    </div>
  );
};

export default Loader;
