import { useState } from 'react'
import style from './auth-form.module.scss'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import authService from '../../services/auth'

export default function AuthForm() {
  //     “email”: “eve.holt@reqres.in”,
  //     “password”: “cityslicka”
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [errorMessage, setErrorMessage] = useState([{ email: '' }, { password: '' }])
  const router = useRouter()
  const token = cookie.get('token')

  if (token) {
    router.push('/pokemons')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await authService
      .authenticate(email, password)
      .then((res) => authService.setToken(res.token))
      .catch(() => {
        setError(true)
      })
  }

  const validationEmail = (data) => {
    setEmail(data)
    if (!data.includes('@') || data.length < 4) {
      setErrorMessage([
        { email: 'El mail no es correcto.' },
        { password: `${errorMessage[1].password}` },
      ])
      setEnabled(false)
    } else {
      setEnabled(true)
      setErrorMessage([{ email: '' }, { password: `${errorMessage[1].password}` }])
    }
  }

  const validationPassword = (data) => {
    setPassword(data)
    if (data.length === 0) {
      setErrorMessage([{ email: `${errorMessage[0].email}` }, { password: 'Es requerida.' }])
      setEnabled(false)
    } else {
      setEnabled(true)
      setErrorMessage([{ email: `${errorMessage[0].email}` }, { password: '' }])
    }
  }

  return error ? (
    <div className={style.containerError}>
      <h1 className={style.textError}>¡Upss.. no son correctos los datos!</h1>
      <button className={style.btnSubmit} onClick={() => setError(false)}>
        Volver a login
      </button>
    </div>
  ) : (
    <div className="container justify-content-center align-items-center">
      <div className={style.containerLogin}>
        <h1 className={style.title}>Login</h1>
        <input
          type="text"
          className={`form-control ${style.inputLogin}`}
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={email}
          onChange={(e) => validationEmail(e.target.value)}
          required
        />
        {errorMessage[0].email.length > 1 ? (
          <p className={style.btnMessageError}>{errorMessage[0].email}</p>
        ) : null}

        <input
          type="password"
          className={`form-control ${style.inputLogin}`}
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          value={password}
          onChange={(e) => validationPassword(e.target.value)}
          required
        />
        {errorMessage[1].password.length > 1 ? (
          <p className={style.btnMessageError}>{errorMessage[1].password}</p>
        ) : null}
        <button
          onClick={(e) => handleSubmit(e)}
          className={style.btnSubmit}
          type="submit"
          disabled={!enabled}
        >
          Iniciar sección
        </button>
      </div>
    </div>
  )
}
