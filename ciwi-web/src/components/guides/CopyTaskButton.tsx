"use client";

import {useState} from "react";

export function CopyTaskButton({prompt}: {prompt: string}) {
  const [status, setStatus] = useState("");

  async function copyTask() {
    try {
      await navigator.clipboard.writeText(prompt);
      setStatus("Task copied. Paste it into Spark after connecting your store.");
    } catch {
      setStatus("Copy is unavailable. Select and copy the task text above.");
    }
  }

  return <div className="space-y-2">
    <button type="button" className="ui-btn ui-btn--secondary" onClick={copyTask}>Copy task</button>
    <p role="status" className="text-sm text-slate-600">{status}</p>
  </div>;
}
