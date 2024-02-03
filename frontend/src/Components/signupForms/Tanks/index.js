import style from './Tanks.module.css'

function Tanks({ data, updateFieldHandler }) {
    return (
        <div className={style.tanks}>
            <h2>Obrigado por se unir à nossa rede</h2>
            <h3>Clique em enviar para proseguir</h3>
            <input type="text" hidden />
        </div>
    )
}

export default Tanks
