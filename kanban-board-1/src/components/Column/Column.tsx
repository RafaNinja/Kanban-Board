import type { KanbanColumn } from "../../types/kanban";
import { useKanban } from "../../context/KanbanContext";
import { Card } from "../Card/Card";

type Props = {
    column: KanbanColumn;
};

export function Column({ column }: Props) {
    const { cards, addCard } = useKanban();

    const columnCards = cards.filter(
    card => card.columnId === column.id
    );

    function handleAddCard() {
    const title = prompt("Título do card");
    if (!title) return;
    addCard(title, column.id);
    }

    return (
    <div className="bg-zinc-900 p-4 rounded w-64">
        <h2 className="text-lg mb-4">{column.title}</h2>

        <div className="mb-4">
        {columnCards.map(card => (
            <Card key={card.id} card={card} />
        ))}
        </div>

        <button
        onClick={handleAddCard}
        className="text-sm text-zinc-400 hover:text-white"
        >
        + Adicionar card
        </button>
    </div>
    );
}
