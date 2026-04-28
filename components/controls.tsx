'use client'
import { useContext } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { AdvancedControls } from "./advanced-controls";
import { presets } from "@/utils/defaults";
import { PDFContext } from "./providers/pdf-provider";
import { Button } from "./ui/button";
import { ControlsContext } from "./providers/controls-provider";

const items = Object.keys(presets).map((key) => ({ label: key, value: key }));

export function Controls() {
    const { handlePreviewPDF, handleDownloadPDF } = useContext(PDFContext);
    const { handlePresetChange } = useContext(ControlsContext);
    return (
        <>
            <div className="pt-10 flex items-center gap-2 font-semibold justify-center">
                <h2>Preset</h2>
                <Select items={items} defaultValue={"medium"} onValueChange={(e) => { handlePresetChange(e) }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Preset" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Presets</SelectLabel>
                            {items.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="py-5 px-5 flex flex-row items-center justify-center gap-4 font-semibold">
                <AdvancedControls />
                <Button variant={"outline"} onClick={handleDownloadPDF}>Download PDF</Button>
                <Button variant={"outline"} onClick={handlePreviewPDF}>Preview PDF</Button>
            </div>
        </>
    )
}