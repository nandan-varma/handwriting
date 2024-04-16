'use server'
import { ResizableHandle, ResizablePanelGroup, } from "@/components/ui/resizable"
import { PdfInput } from '@/components/pdf-input';
import { PdfPreview } from '@/components/pdf-preview';
import { Controls } from "@/components/controls";

const HandwrittenTextPage = () => {
  return (
    <div>
      <Controls />
      <ResizablePanelGroup direction="horizontal">
        <PdfPreview />
        <ResizableHandle withHandle />
        <PdfInput />
      </ResizablePanelGroup>
    </div >
  );
};

export default HandwrittenTextPage;
