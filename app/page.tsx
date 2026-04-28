"use client";
import { Controls } from "@/components/controls";
import { PdfInput } from "@/components/pdf-input";
import { PdfPreview } from "@/components/pdf-preview";
import {
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function HandwrittenTextPage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Controls />
      <div className="flex-1 min-h-0">
        <div className="h-full md:hidden flex flex-col">
          <div className="flex-1 min-h-0 border-b-2 border-border">
            <PdfInput asPanel={false} />
          </div>
          <div className="flex-1 min-h-0">
            <PdfPreview asPanel={false} />
          </div>
        </div>
        <ResizablePanelGroup
          orientation="horizontal"
          className="h-full hidden md:flex"
        >
          <PdfPreview asPanel={true} />
          <ResizableHandle withHandle />
          <PdfInput asPanel={true} />
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
