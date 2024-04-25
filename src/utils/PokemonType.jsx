import "../scss/types.scss"

const firstType = (types) => {
    return types[0].type.name
}

const secondType = (types) => {
    return types[1].type.name
}

export const typeHandlerSpan = (types) => {
    if (types[1]) {
        return (
            <>
                <span className={firstType(types)}>{types[0].type.name}</span>
                <span className={secondType(types)}>{types[1].type.name}</span>
            </>
        )
    }
    return (
        <>
            <span className={firstType(types)}>{types[0].type.name}</span>
        </>
    )
}