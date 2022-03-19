
import styles from './home.module.css'

const Home = ({name, localizacao}) => {
  
  
  return (
    <div className={styles.conteiner}>
        <h2 className={styles.title}>{name}</h2>
        <p>Localização: {localizacao}</p>
    </div>
  )
}

export default Home