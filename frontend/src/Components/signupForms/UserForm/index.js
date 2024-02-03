import style from './UserForm.module.css'

function UserForm({ data, updateFieldHandler }) {
    return (
        <div>
            <div className={style.form_control}>
                <label htmlFor="name">Nome:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Digite seu nome"
                    required
                    value={data.name}
                    onChange={(e) => updateFieldHandler('name', e.target.value)}
                />
            </div>
            <div className={style.form_control}>
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Digite seu e-mail"
                    required
                    value={data.email}
                    onChange={(e) =>
                        updateFieldHandler('email', e.target.value)
                    }
                />
            </div>
            <div className={style.form_control}>
                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Digite seu e-mail"
                    required
                    value={data.password}
                    onChange={(e) =>
                        updateFieldHandler('password', e.target.value)
                    }
                />
            </div>
        </div>
    )
}

export default UserForm
