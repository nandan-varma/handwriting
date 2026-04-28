'use client'
import { useContext } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { AdvancedControls } from "./advanced-controls";
import { presets } from "@/utils/defaults";
import { PDFContext } from "./providers/pdf-provider";
import { Button } from "./ui/button";
import { ControlsContext } from "./providers/controls-provider";
import { Download, Eye, SlidersHorizontal } from "lucide-react";

const items = Object.keys(presets).map((key) => ({ label: key, value: key }));

export function Controls() {
    const { handlePreviewPDF, handleDownloadPDF, isGenerating } = useContext(PDFContext);
    const { handlePresetChange } = useContext(ControlsContext);
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">Preset</span>
                <Select items={items} defaultValue={"medium"} onValueChange={(e) => { if (e) handlePresetChange(e) }}>
                    <SelectTrigger className="w-[140px] h-9">
                        <SelectValue placeholder="Select" />
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
            <div className="flex items-center gap-2">
                <AdvancedControls />
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handlePreviewPDF}
                    disabled={isGenerating}
                >
                    <Eye className="size-4 mr-1.5" />
                    Preview
                </Button>
                <Button 
                    variant="default" 
                    size="sm" 
                    onClick={handleDownloadPDF}
                    disabled={isGenerating}
                >
                    <Download className="size-4 mr-1.5" />
                    Download
                </Button>
            </div>
        </div>
    )
}