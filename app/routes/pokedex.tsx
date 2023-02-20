import { Outlet } from '@remix-run/react'

const Pokedex = () => {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Pokedex
