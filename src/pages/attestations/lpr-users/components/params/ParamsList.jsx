import ParamsListItem from "./ParamsListItem"

const ParamsList = ({ params }) => {
    return <div>
        {params.map((param) => <ParamsListItem param={param} key={param.name}/>)}
    </div>
}

export default ParamsList
