const ParamsListItem = ({ param }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div
                style={{
                    width: '300px',
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '24px',
                    letterSpacing: '0.005em',
                    textAlign: 'left',
                }}
            >
                {param.name}
            </div>
            <div>{param.value}</div>
        </div>
    )
}
export default ParamsListItem
