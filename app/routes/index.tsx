import type { LinksFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Pokedex from 'pokedex-promise-v2'
import BreadCrumbs from '~/components/BreadCrumbs'

import stylesUrl from '~/styles/index.css'

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: stylesUrl }]
}

export const loader = async () => {
    const P = new Pokedex()
    const result = await P.getRegionsList()
    return json(result)
}

const HomePage = () => {
    const data = useLoaderData<typeof loader>()
    return (
        <>
            <BreadCrumbs crumbs={[{ name: 'Pokedex', href: '/' }]} />
            <div className="content">
                <h1>Home</h1>
                <span>
                    This is my super awesome pokedex application built using
                    Remix! Please select a region below to get started.
                </span>
                <ul>
                    {data.results.map((region) => (
                        <li key={region.name}>
                            <a href={`/pokedex/${region.name}`}>
                                {region.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default HomePage
