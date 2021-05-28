import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.css'
import Header from '../components/Header/header'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
