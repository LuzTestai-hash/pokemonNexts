// import { Container, Navbar } from 'react-bootstrap'
import Link from 'next/link'
import style from './header.module.scss'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Header() {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies()
  const token = cookies.token
  const router = useRouter()
  const [linkHome, setLinkHome] = useState('')

  function logOut() {
    removeCookie('token')
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

export default Header
