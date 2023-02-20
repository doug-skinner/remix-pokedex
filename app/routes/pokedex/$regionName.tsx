import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Pokedex from 'pokedex-promise-v2'
import BreadCrumbs from '~/components/BreadCrumbs'
import { convertToTitleCase } from '~/utils/strings'

export const loader = async ({ params }: LoaderArgs) => {
    const regionName = params.regionName as string

    const P = new Pokedex()
    const regionPokedex = await P.getPokedexByName(regionName)
    return json({ regionPokedex })
}

const PokedexRoute = () => {
    const data = useLoaderData<typeof loader>()

    const regionName = data.regionPokedex.name
    const regionDescription = data.regionPokedex.descriptions.find(
        (description) => description.language.name === 'en',
    )?.description
    const regionPokemon = data.regionPokedex.pokemon_entries.map(
        (pokemon) => pokemon.pokemon_species.name,
    )
    return (
        <>
            <BreadCrumbs
                crumbs={[
                    { name: 'Pokedex', href: '/' },
                    {
                        name: convertToTitleCase(regionName),
                        href: `/pokedex/${regionName}`,
                    },
                ]}
            />
            <div className="content">
                <h1>{convertToTitleCase(regionName)}</h1>
                <span>{regionDescription}</span>
                <ul>
                    {regionPokemon.map((pokemon) => (
                        <li key={pokemon}>
                            <a
                                href={`/pokedex/${regionName}/pokemon/${pokemon}`}
                            >
                                {convertToTitleCase(pokemon)}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default PokedexRoute
