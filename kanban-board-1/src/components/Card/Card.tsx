import type { KanbanCard } from "../../types/kanban";
import { useKanban } from "../../context/KanbanContext";

type Props = {
  card: KanbanCard;
};

export function Card({ card }: Props) {
  const { updateCard, removeCard } = useKanban();

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setData("cardId", card.id);
  }

  function handleEdit() {
    const newTitle = prompt("Novo título", card.title);
    if (!newTitle) return;
    updateCard(card.id, newTitle);
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-zinc-800 p-2 rounded mb-2 flex justify-between items-center cursor-grab"
    >
      <span onDoubleClick={handleEdit}>
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
