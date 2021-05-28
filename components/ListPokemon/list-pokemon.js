import { useEffect, useState } from 'react'
import style from './list-pokemon.module.scss'
import Link from 'next/link'
import pokemonService from '../../services/pokemons.js'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const ListPokemon = ({ pokemonsAll, totalPagesPagination }) => {
  const router = useRouter()
  const [totalPages] = useState(totalPagesPagination)
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])
  const [filterPokemons, setFilterPokemons] = useState([])
  const [offSet, setOffSet] = useState(0)
  const [search, setSearch] = useState(null)
  const limit = 20
  const [cookies] = useCookies()
  const token = cookies.token

  useEffect(() => {
    const filterPokemons = pokemons.filter((pokemon) => pokemon.name.includes(search))
    setFilterPokemons(filterPokemons)
  }, [search])

  useEffect(() => {
    if (!token) {
      router.push('/')
    }
    if (!pokemonsAll) {
      setLoading(true)
    } else {
      setPokemons(pokemonsAll)
      setFilterPokemons(pokemonsAll)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const getPokemonsPage = async () => {
      try {
        setLoading(true)
        const pokemonsPagination = []
        for (let i = 0; i < limit; i++) {
          await pokemonService
            .getAllPokemons(offSet + i + 1)
            .then((res) => pokemonsPagination.push(res))
        }
        setPokemons(pokemonsPagination)
        setFilterPokemons(pokemonsPagination)

        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    getPokemonsPage()
  }, [offSet])

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  return loading ? (
    <div className={style.containerLoading}>
      <div className="spinner-grow" role="status" />
    </div>
  ) : (
    <div className="container">
      <form className="d-flex m-5 form-inline">
        <input
          onChange={onChangeSearch}
          id="search"
          className={`form-control mr-sm-2 ${style.formControl} `}
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>

      <div className="row">
        {filterPokemons.map((pokemon, index) => (
          <div className="col-3 mb-5" key={index}>
            <Link href={`/pokemons/${pokemon.id}`}>
              <div className={`card ${style.card}`}>
                <img
                  className={`card-img-top ${style.backgroundImage}`}
                  src={pokemon.sprites.front_default}
                  alt="Card image cap"
                />
                <div className={`card-body ${style.cardBody}`}>
                  <p className="card-title">{pokemon.name}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {totalPages.map((page, index) => {
              return (
                <li key={index} className="page-item">
                  <a
                    onClick={() => setOffSet(index * limit)}
                    className={`page-link ${style.pageLink} ${
                      offSet / limit === index ? style.active : null
                    }`}
                    href="#"
                  >
                    {page}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default ListPokemon
