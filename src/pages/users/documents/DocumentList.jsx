import DocumentListItem from './DocumentListItem'

const DocumentList = ({ docs }) => {
    return (
        <div>
            {docs.map((doc) => (
                <DocumentListItem param={doc} key={doc.name} />
            ))}
        </div>
    )
}

export default DocumentList
