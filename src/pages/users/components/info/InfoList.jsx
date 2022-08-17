import InfoListItem from "./InfoListItem"

const InfoList = ({params}) => {
    return (
        <>
            {params.map((param) => (
                <InfoListItem param={param} key={param.name} />
            ))}
        </>
    )
}

export default InfoList
