'use client'
import { useContext } from "react";
import { ResizablePanel } from "./ui/resizable";
import { Textarea } from "./ui/textarea";
import { DefaultText } from "@/utils/defaults";
import { ControlsContext } from "./providers/controls-provider";

export function PdfInput() {
    const { text, setText } = useContext(ControlsContext);
    return (
        <>
            <ResizablePanel defaultSize={50} className='p-2'>
                <Textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder={DefaultText}
                />
            </ResizablePanel>
        </>
    )
}