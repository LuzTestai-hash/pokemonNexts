import Link from 'next/link'
import style from './header.module.scss'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import authService from '../../services/auth'

export default function Header() {
  const router = useRouter()
  const [linkHome, setLinkHome] = useState('')
  const token = cookie.get('token')

  function logOut() {
    authService.removeToken()
    router.push('/login')
  }
  useEffect(() => {
    token ? setLinkHome('/pokemons') : router.push('/')
  }, [])

  return (
    <div className={style.navbarBg}>
      <div className={style.title}>
        <Link href={linkHome}>Pokemon</Link>
      </div>
      <div className="d-flex justify-content-end w-100">
        {token ? (
          <button className={style.btnLogOut} onClick={logOut}>
            LogOut
          </button>
        ) : null}
      </div>
    </div>
  )
}
