export default function LogDisplay({ logEntry, onClose }) {
    return (
        <div className="bg-body m-1 p-1 rounded">
            <div className="border-b-2 border-light flex">
                <div className="me-auto">
                    {logEntry.creature}
                </div>
                <button onClick={onClose}>X</button>
            </div>
            <div>{logEntry.type}:{logEntry.dice}:{logEntry.result}</div>
        </div>
    )
}