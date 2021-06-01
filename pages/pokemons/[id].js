import style from './pokemonId.module.scss'
import { useState } from 'react'
import pokemonService from '../../services/pokemons'

const PokemonId = ({ pokemonProps, evolutionImg, imgPokemonEvolutionOfEvolution }) => {
  const [pokemon] = useState(pokemonProps)
  const [moves, setMoves] = useState(false)
  const [evolutionsShow, setEvolutionsShow] = useState(false)
  evolutionImg
    ? console.log('evolutions', evolutionImg)
    : console.log('todavia no tengo nada', evolutionImg)
  console.log('evolucion del pokemon evolucionado', imgPokemonEvolutionOfEvolution)
  return (
    <div className={style.containerProfile}>
      <img className={style.imgPokemon} src={pokemon.sprites.front_default} alt="image pokemon" />
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
              setEvolutionsShow(!evolutionsShow)
            }}
          >
            evolution
          </button>

          {evolutionsShow ? (
            <div>
              <img src={evolutionImg} alt="evolution pokemon" />
              <img src={imgPokemonEvolutionOfEvolution} alt="evolution of evolution" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = new Array(1118).fill(null).map((_, index) => ({ params: { id: `${index + 1}` } }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const pokemonProps = await pokemonService.getAllPokemons(params.id).then((res) => res)

  const evolution = await pokemonService.getPokemonsEvolutionsById(params.id).then((res) => res)

  const evolutionImg = await pokemonService
    .getAllPokemonsByName(evolution.chain.evolves_to[0].species.name)
    .then((res) => res.sprites.front_default)

  const imgPokemonEvolutionOfEvolution = await pokemonService
    .getPokemonsEvolutionsById(params.id)
    .then((res) =>
      pokemonService.getAllPokemonsByName(res.chain.evolves_to[0].evolves_to[0].species.name),
    )
    .then((res) => res.sprites.front_default)

  return {
    props: { pokemonProps, evolutionImg, imgPokemonEvolutionOfEvolution },
    revalidate: 1,
  }
}

export default PokemonId
