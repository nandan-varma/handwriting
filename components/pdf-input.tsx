"use client";
import { useContext } from "react";
import { ControlsContext } from "./providers/controls-provider";
import { ResizablePanel } from "./ui/resizable";
import { Textarea } from "./ui/textarea";

interface PdfInputProps {
  asPanel?: boolean;
}

export function PdfInput({ asPanel = true }: PdfInputProps) {
  const { text, setText } = useContext(ControlsContext);

  const content = (
    <div className="h-full flex flex-col p-2 md:p-3 min-h-0">
      <div className="flex-1 min-h-0 w-full resize-none rounded-lg border bg-background shadow-sm p-3 md:p-4 overflow-hidden flex flex-col">
        <Textarea
          className="flex-1 min-h-0 w-full resize-none border-0 bg-transparent p-0 text-base outline-none placeholder:text-muted-foreground"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
        />
      </div>
    </div>
  );

  if (!asPanel) return content;

  return (
    <ResizablePanel defaultSize="50%" minSize={20} className="min-w-0">
      {content}
    </ResizablePanel>
  );
}
