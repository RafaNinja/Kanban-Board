import { createContext, useContext, useEffect, useState } from "react";
import type { KanbanCard } from "../types/kanban";

type KanbanContextType = {
cards: KanbanCard[];
addCard: (title: string, columnId: string) => void;
updateCard: (id: string, title: string) => void;
removeCard: (id: string) => void;
moveCard: (cardId: string, columnId: string) => void;
};

const KanbanContext = createContext<KanbanContextType | null>(null);
const STORAGE_KEY = "@kanban:cards";

export function KanbanProvider({ children }: { children: React.ReactNode }) {
    const [cards, setCards] = useState<KanbanCard[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
});

    useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}, [cards]);

    function addCard(title: string, columnId: string) {
    setCards(prev => [
    ...prev,
    { id: crypto.randomUUID(), title, columnId },
    ]);
}

    function updateCard(id: string, title: string) {
    setCards(prev =>
    prev.map(card =>
    card.id === id ? { ...card, title } : card
    )
    );
}

    function removeCard(id: string) {
    setCards(prev => prev.filter(card => card.id !== id));
}

function moveCard(cardId: string, columnId: string) {
    setCards(prev =>
    prev.map(card =>
    card.id === cardId
        ? { ...card, columnId }
        : card
    )
    );
}


    return (
    <KanbanContext.Provider
    value={{ cards, addCard, updateCard, removeCard, moveCard }}
    >
    {children}
    </KanbanContext.Provider>
    );
}

export function useKanban() {
    const context = useContext(KanbanContext);
    if (!context) {
    throw new Error("useKanban must be used within KanbanProvider");
    }
    return context;
}
