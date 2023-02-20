import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Pokedex from 'pokedex-promise-v2'
import BreadCrumbs from '~/components/BreadCrumbs'
import { convertToTitleCase } from '~/utils/strings'

export const loader = async ({ params }: LoaderArgs) => {
    const pokemonName = params.pokemonName as string
    const regionName = params.regionName as string

    const P = new Pokedex()
    const pokemonSpecies = await P.getPokemonSpeciesByName(pokemonName)
    const pokemon = await P.getPokemonByName(pokemonName)
    return json({ pokemon, pokemonSpecies, regionName })
}

const PokemonRoute = () => {
    const data = useLoaderData<typeof loader>()

    const pokemonName = convertToTitleCase(data.pokemon.name)
    const pokemonDescription = data.pokemonSpecies.flavor_text_entries.find(
        (description) => description.language.name === 'en',
    )?.flavor_text
    const pokemonImage = data.pokemon.sprites.front_default as string
    const pokemonTypes = data.pokemon.types.map((type) =>
        convertToTitleCase(type.type.name),
    )
    const pokemonHeight = data.pokemon.height
    const pokemonWeight = data.pokemon.weight
    return (
        <>
            <BreadCrumbs
                crumbs={[
                    { name: 'Pokedex', href: '/' },
                    {
                        name: convertToTitleCase(data.regionName),
                        href: `/pokedex/${data.regionName}`,
                    },
                    { name: pokemonName, href: '' },
                ]}
            />
            <div className="content">
                <img src={pokemonImage} />
                <h1>{pokemonName}</h1>
                <p>{pokemonDescription}</p>
                <p>Height: {pokemonHeight} decimetres</p>
                <p>Weight: {pokemonWeight} hectograms</p>
                <p>Types: {pokemonTypes.join(', ')}</p>
            </div>
        </>
    )
}

export default PokemonRoute
