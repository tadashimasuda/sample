import React, { useState } from "react";
import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";

import { Column } from "./Column";
import { Task } from "./Task";
import { Row } from "./Row";

type Task = {
  name: string;
  status: string;
  rowLevel: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      name: "ハリー",
      status: "todo",
      rowLevel: "A",
    },
    {
      name: "ロン",
      status: "todo",
      rowLevel: "B",
    },
    {
      name: "ハーマイオニー",
      status: "todo",
      rowLevel: "C",
    },
    {
      name: "ダンブルドア",
      status: "notStarted",
      rowLevel: "A",
    },
    {
      name: "ヴォルデモート",
      status: "notStarted",
      rowLevel: "B",
    },
    {
      name: "スネイプ",
      status: "notStarted",
      rowLevel: "C",
    },
    {
      name: "ハグリッド",
      status: "inProgress",
      rowLevel: "A",
    },
    {
      name: "シリウス",
      status: "inProgress",
      rowLevel: "B",
    },
    {
      name: "ドビー",
      status: "inProgress",
      rowLevel: "C",
    },
    {
      name: "マクゴナガル",
      status: "done",
      rowLevel: "A",
    },
  ]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log(over?.id);
    if (active.id !== over?.id && over?.id) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.name === active.id) {
            const [newStatus, newRowLevel] = (over.id as string).split("-");
            return {
              ...task,
              status: newStatus,
              rowLevel: newStatus === "notStarted" ? "A" : newRowLevel,
            };
          }
          return task;
        }),
      );
    }
  }

  const rowLabels = ["A", "B", "C"];
  const columns = [
    { id: "notStarted", title: "Not Started", singleRow: true },
    { id: "todo", title: "To Do", singleRow: false },
    { id: "inProgress", title: "In Progress", singleRow: false },
    { id: "done", title: "Done", singleRow: false },
  ];

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {columns.map((column) => (
          <Column key={column.id} id={column.id} title={column.title}>
            {column.singleRow ? (
              <Row
                status={column.id}
                key={`${column.id}-A`}
                id={`${column.id}-A`}
                title={column.title}
              >
                {tasks
                  .filter((task) => task.status === column.id)
                  .map((task, idx) => (
                    <Task key={task.name} id={task.name} status={task.status}>
                      <div>{task.name}</div>
                      <div>{"rank" + (idx + 1)}</div>
                    </Task>
                  ))}
              </Row>
            ) : (
              rowLabels.map((rowLabel) => (
                <Row
                  status={column.id}
                  key={`${column.id}-${rowLabel}`}
                  id={`${column.id}-${rowLabel}`}
                  title={column.title}
                >
                  {tasks
                    .filter(
                      (task) =>
                        task.status === column.id && task.rowLevel === rowLabel,
                    )
                    .map((task, idx) => (
                      <Task key={task.name} id={task.name} status={task.status}>
                        <div>{task.name}</div>
                        <div>{"rank" + (idx + 1)}</div>
                      </Task>
                    ))}
                </Row>
              ))
            )}
          </Column>
        ))}
      </div>
    </DndContext>
  );
}

export default App;