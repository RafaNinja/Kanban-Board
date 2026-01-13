import { Column } from "../Column/Column";
import type { KanbanColumn } from "../../types/kanban";

const columns: KanbanColumn[] = [
    { id: "todo", title: "To Do" },
    { id: "doing", title: "Doing" },
    { id: "done", title: "Done" },
];

export function Board() {
    return (
    <div className="flex gap-4">
        {columns.map(column => (
        <Column key={column.id} column={column} />
        ))}
    </div>
    );
}
