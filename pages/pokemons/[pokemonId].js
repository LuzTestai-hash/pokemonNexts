import style from './pokemonId.module.scss'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import pokemonService from '../../services/pokemons'

const PokemonId = (props) => {
  console.log(props)
  // const router = useRouter()
  // const id = router.query.pokemonId
  // const [loading, setLoading] = useState(true)
  // const [pokemon, setPokemon] = useState(null)
  // const [evolutions, setEvolutions] = useState(null)
  // const [moves, setMoves] = useState(false)
  /*   evolutions
    ? console.log('evolutions', evolutions.chain.evolves_to.species)
    : console.log('todavia no tengo nada', evolutions) */

  // useEffect(() => {
  //   const getPokemon = async () => {
  //     try {
  //       await pokemonService
  //         .getAllPokemons(id)
  //         .then((res) => setPokemon(res))
  //         .then(() => setLoading(false))
  //       await pokemonService.getPokemonsEvolutionsById(id).then((res) => setEvolutions(res))
  //     } catch (err) {
  //       console.log(err)
  //       setLoading(false)
  //     }
  //   }
  //   getPokemon()
  // }, [])

  return loading ? (
    <h1>loading</h1>
  ) : (
    <div className={style.containerProfile}>
      pepe
      {/* <img className={style.imgPokemon} src={pokemon.sprites.front_default} alt="image pokemon" />
      <h1 className={style.namePokemon}>{pokemon.name}</h1>
      <div className="row w-50">
        <div className={style.containerMoves}>
          <button
            className={style.btnPokemon}
            onClick={() => {
              setMoves(!moves)
            }}
          >
            Moves
          </button>
          {moves ? (
            <ul className={style.ulPokemons}>
              {pokemon.moves.map((move) => (
                <li key={move.move.name} className={style.liPokemon}>
                  {move.move.name}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className={style.containerMoves}>
          <button
            className={style.btnPokemon}
            onClick={() => {
              setMoves(!moves)
            }}
          >
            evolution
          </button>
        </div>
      </div> */}
    </div>
  )
}

export async function getStaticPaths() {
  const paths = new Array(1118).fill(null).map((_, index) => ({ params: { id: `${index + 1}` } }))

  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths,
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: false,
  }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const pokemon = await pokemonService.getAllPokemons(params.id).then((res) => res)

  const evolution = await pokemonService.getPokemonsEvolutionsById(params.id).then((res) => res)

  // Pass post data to the page via props
  return {
    props: { pokemon, evolution },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  }
}

export default PokemonId
