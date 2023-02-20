import type { LinksFunction } from '@remix-run/node'
import { Links, Outlet, Scripts } from '@remix-run/react'

import globalStylesUrl from './styles/global.css'

export const links: LinksFunction = () => {
    return [
        {
            rel: 'stylesheet',
            href: globalStylesUrl,
        },
    ]
}

export default function App() {
    return (
        <html>
            <head>
                <title>Remix Pokedex</title>
            </head>
            <body>
                <Links />
                <Outlet />
                <Scripts />
            </body>
        </html>
    )
}
