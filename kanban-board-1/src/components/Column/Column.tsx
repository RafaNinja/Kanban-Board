import type { KanbanColumn } from "../../types/kanban";
import { useKanban } from "../../context/KanbanContext";
import { Card } from "../Card/Card";

type Props = {
    column: KanbanColumn;
};

export function Column({ column }: Props) {
    const { cards, addCard, moveCard } = useKanban();

    const columnCards = cards.filter(
    card => card.columnId === column.id
    );

    function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    moveCard(cardId, column.id);
}

    return (
    <div
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        className="bg-zinc-900 p-4 rounded w-64"
    >
    <h2 className="text-lg mb-4">{column.title}</h2>

    <div className="mb-4 min-h-[40px]">
        {columnCards.map(card => (
        <Card key={card.id} card={card} />
        ))}
    </div>

    <button
        onClick={() => {
            const title = prompt("Título do card");
            if (title) addCard(title, column.id);
        }}
        className="text-sm text-zinc-400 hover:text-white"
        >
        + Adicionar card
        </button>
    </div>
    );
}
