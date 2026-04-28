'use client'
import { useContext } from "react";
import { ResizablePanel } from "./ui/resizable";
import { Textarea } from "./ui/textarea";
import { DefaultText } from "@/utils/defaults";
import { ControlsContext } from "./providers/controls-provider";

interface PdfInputProps {
    asPanel?: boolean;
}

export function PdfInput({ asPanel = true }: PdfInputProps) {
    const { text, setText } = useContext(ControlsContext);
    
    const content = (
        <div className="h-full flex flex-col p-2">
            <Textarea
                className="flex-1 min-h-0 w-full resize-none"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Enter text here..."
            />
        </div>
    );

    if (!asPanel) return content;

    return (
        <ResizablePanel defaultSize="50%" minSize={20} className="min-w-0">
            {content}
        </ResizablePanel>
    )
}