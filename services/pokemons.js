import { api } from './api'

const pokemonService = {}

pokemonService.getAllPokemons = function (id) {
  return api
    .get(`/pokemon/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}
pokemonService.getAllPokemonsByName = function (name) {
  return api
    .get(`/pokemon/${name}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}
pokemonService.getCountTotal = function () {
  return api
    .get(`/pokemon`)
    .then((res) => res.data.count)
    .catch((err) => {
      throw err
    })
}

pokemonService.getPokemonPagination = function (offSet, limit) {
  return api
    .get(`/pokemon?limit=${limit}&offset=${offSet}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

pokemonService.getPokemonsEvolutionsById = (id) => {
  return api
    .get(`/evolution-chain/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

export default pokemonService
