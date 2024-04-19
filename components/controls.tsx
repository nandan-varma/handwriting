'use client'
import { useContext, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { AdvancedControls } from "./advanced-controls";
import { presets } from "@/utils/defaults";
import { PDFContext } from "./providers/pdf-provider";
import { Button } from "./ui/button";
import { ControlsContext } from "./providers/controls-provider";

export function Controls() {
    const { handlePreviewPDF, handleDownloadPDF } = useContext(PDFContext);
    const { handlePresetChange } = useContext(ControlsContext);
    return (
        <>
            <div className="pt-10 flex items-center gap-2 font-semibold justify-center">
                <h2>Preset</h2>
                <Select defaultValue={"medium"} onValueChange={(e) => { handlePresetChange(e) }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Preset" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Presets</SelectLabel>
                            {Object.entries(presets).map(([key, value]) => (
                                <SelectItem value={key} key={key}>
                                    {key}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="pt-10 px-5 flex flex-row items-center justify-center gap-4 font-semibold">
                <AdvancedControls />
                <Button onClick={handleDownloadPDF}>Download PDF</Button>
                <Button onClick={handlePreviewPDF}>Preview PDF</Button>
            </div>
        </>
    )
}