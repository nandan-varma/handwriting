'use client'
import { useContext, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { AdvancedControls } from "./advanced-controls";
import { presets } from "@/utils/defaults";
import { PDFContext } from "./providers/pdf-provider";
import { Button } from "./ui/button";
import { ControlsContext } from "./providers/controls-provider";

export function Controls() {
    const [viewControls, setViewControls] = useState<boolean>(false);
    const { handlePreviewPDF, handleDownloadPDF } = useContext(PDFContext);
    const { handlePresetChange } = useContext(ControlsContext);
    return (
        <>
            <div className="pt-10 px-5 flex flex-col sm:flex-row items-center gap-4 font-semibold justify-center">
                <h2>Preset</h2>
                <Select defaultValue={"medium"} onValueChange={(e) => { handlePresetChange && handlePresetChange(e) }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Preset" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(presets).map(([key, value]) => (
                            <SelectItem value={key} key={key}>
                                {key}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <h2>Advanced Controls</h2>
                <Switch checked={viewControls} onCheckedChange={(e) => { setViewControls(e) }} />
            </div>
            {viewControls &&
                <AdvancedControls />
            }
            <div className="pt-10 px-5 flex flex-col sm:flex-row items-center justify-center gap-4 font-semibold">
                <Button onClick={handleDownloadPDF}>Download PDF</Button>
                <Button onClick={handlePreviewPDF}>Preview PDF</Button>
            </div>
        </>
    )
}