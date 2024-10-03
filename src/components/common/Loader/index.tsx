import styles from './Loader.module.css'

function Loader () {
  return (
    <div className={styles.loaderWrapper}>
      <span className={styles.loader} data-testid="loader">Load&nbsp;ng</span>
    </div>
  )
}

export default Loader
