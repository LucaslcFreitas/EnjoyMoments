import style from './SignupForms.module.css'

function Tanks({ data, updateFieldHandler }) {
    return (
        <div className={style.tanks}>
            <h1>Obrigado por se unir à nossa rede</h1>
            <h3>Clique em enviar para proseguir</h3>
            <input type="text" hidden />
        </div>
    )
}

export default Tanks
