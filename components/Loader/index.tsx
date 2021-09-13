import styles from './loader.module.css'

function Loader() {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader
