import { useDroppable } from "@dnd-kit/core";
import React, { ReactNode } from "react";
interface ColumnProps {
  id: string;
  title: string;
  status: string;
  children: ReactNode;
}

export function Row({ id, status,children }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        padding: "8px",
        margin: "8px 0",
        borderRadius: "4px",
        cursor: "move",
        minHeight: "30px",
        backgroundColor: status === "notStarted" ? "white":"lightgrey",
      }}
    >
      {children}
    </div>
  );
}
