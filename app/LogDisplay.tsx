import React from "react";
import LogEntry from "./logEntry";

interface LogDisplayProps {
    logEntry: LogEntry
    onClose: () => void
}

export default function LogDisplay({ logEntry, onClose }: LogDisplayProps) {
    return (
        <div className="bg-body m-1 p-1 border rounded">
            <label className="border-b-2 border-light flex">
                <div className="me-auto">
                    {logEntry.creature}
                </div>
                <button onClick={onClose}>X</button>
            </label>
            <div>{logEntry.type}:{logEntry.dice}:{logEntry.result}</div>
        </div>
    )
}