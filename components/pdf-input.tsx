'use client'
import { useContext } from "react";
import { ResizablePanel } from "./ui/resizable";
import { Textarea } from "./ui/textarea";
import { PDFContext } from "./providers/pdf-provider";
import { DefaultText } from "@/utils/defaults";

export function PdfInput() {
    const { text, setText } = useContext(PDFContext);
    return (
        <>
            <ResizablePanel className='p-2'>
                <Textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder={DefaultText}
                />
            </ResizablePanel>
        </>
    )
}