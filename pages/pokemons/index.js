import ListPokemon from '../../components/ListPokemon/list-pokemon'
import pokemonService from '../../services/pokemons.js'
const ListPokemonsPage = ({ pokemonsAll, totalPagesPagination }) => {
  return <ListPokemon pokemonsAll={pokemonsAll} totalPagesPagination={totalPagesPagination} />
}

export const getStaticProps = async () => {
  const totalPagesPagination = []
  const pokemonsAll = []

  for (let i = 0; i < 20; i++) {
    await pokemonService.getAllPokemons(i + 1).then((res) => pokemonsAll.push(res))
  }

  const count = await pokemonService.getCountTotal().then((res) => res % 20)
  for (let i = 0; i < count; i++) {
    totalPagesPagination.push(i + 1)
  }

  return {
    props: { pokemonsAll, totalPagesPagination },
    revalidate: 10,
  }
}
export default ListPokemonsPage
