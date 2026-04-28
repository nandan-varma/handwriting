"use client";
import { FileText, Loader2 } from "lucide-react";
import { useContext } from "react";
import { PDFContext } from "./providers/pdf-provider";
import { ResizablePanel } from "./ui/resizable";

interface PdfPreviewProps {
  asPanel?: boolean;
}

export function PdfPreview({ asPanel = true }: PdfPreviewProps) {
  const { pdfInfo, isGenerating } = useContext(PDFContext);

  const content = (
    <div className="h-full flex flex-col p-2 md:p-3">
      {isGenerating ? (
        <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground p-4">
          <Loader2 className="h-10 w-10 animate-spin" />
          <p className="text-sm">Generating PDF...</p>
        </div>
      ) : pdfInfo ? (
        <iframe
          title="PDF Preview"
          src={pdfInfo}
          className="h-full w-full border rounded-lg shadow-sm"
        />
      ) : (
        <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground p-4">
          <FileText className="h-12 w-12 opacity-50" />
          <p className="font-medium">No Preview Available</p>
          <p className="text-sm">Click "Preview PDF" to generate</p>
        </div>
      )}
    </div>
  );

  if (!asPanel) return content;

  return (
    <ResizablePanel defaultSize="50%" minSize={20} className="min-w-0">
      {content}
    </ResizablePanel>
  );
}
