type Props = {
    crumbs: {
        name: string
        href: string
    }[]
}

const BreadCrumbs = ({ crumbs }: Props) => {
    return (
        <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1
                    return (
                        <li
                            key={crumb.href}
                            className={`breadcrumb-item ${
                                isLast ? 'active' : ''
                            }`}
                            aria-current={isLast ? 'page' : undefined}
                        >
                            {isLast ? (
                                crumb.name
                            ) : (
                                <>
                                    <a href={crumb.href}>{crumb.name}</a>
                                    <span>{'->'}</span>
                                </>
                            )}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default BreadCrumbs
