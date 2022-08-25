const DocumentListItem = ({ param }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div
                style={{
                    width: '300px',
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '24px',
                    letterSpacing: '0.005em',
                    textAlign: 'left',
                }}
            >
                {param.name}
            </div>
            <p>
                <a href={param.url}>{param.fileName}</a>
                {param.description && (
                    <span style={{ marginLeft: '10px', color: '#343434' }}>
                        {param.description}
                    </span>
                )}
            </p>
        </div>
    )
}

export default DocumentListItem
