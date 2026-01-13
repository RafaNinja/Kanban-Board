import type { KanbanCard } from "../../types/kanban";
import { useKanban } from "../../context/KanbanContext";

type Props = {
  card: KanbanCard;
};

export function Card({ card }: Props) {
  const { updateCard, removeCard } = useKanban();

  function handleEdit() {
    const newTitle = prompt("Novo título", card.title);
    if (!newTitle) return;
    updateCard(card.id, newTitle);
  }

  return (
    <div className="bg-zinc-800 p-2 rounded mb-2 flex justify-between items-center">
      <span onDoubleClick={handleEdit} className="cursor-pointer">
        {card.title}
      </span>

      <button
        onClick={() => removeCard(card.id)}
        className="text-red-400 hover:text-red-600 text-sm"
      >
        ✕
      </button>
    </div>
  );
}

