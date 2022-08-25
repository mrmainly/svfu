import ParamsListItem from './ParamsListItem'

const ParamsList = ({ params }) => {
    return (
        <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {params.map((param) => (
                <ParamsListItem param={param} key={param.name} />
            ))}
        </div>
    )
}

export default ParamsList
