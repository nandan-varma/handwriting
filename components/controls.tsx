"use client";
import { presets } from "@/utils/defaults";
import { Download, Eye } from "lucide-react";
import { useContext } from "react";
import { AdvancedControls } from "./advanced-controls";
import { ControlsContext } from "./providers/controls-provider";
import { PDFContext } from "./providers/pdf-provider";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const items = Object.keys(presets).map((key) => ({ label: key, value: key }));

export function Controls() {
  const { handlePreviewPDF, handleDownloadPDF, isGenerating } =
    useContext(PDFContext);
  const { handlePresetChange } = useContext(ControlsContext);
  return (
    <div className="relative z-20 border-b bg-card/80 shadow-sm backdrop-blur-sm">
      <div className="flex flex-row gap-2 items-center md:justify-between px-3 py-2 md:px-4 md:py-3 md:gap-3 flex-wrap">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <span className="text-xs md:text-sm font-medium text-muted-foreground font-heading whitespace-nowrap">
            Preset
          </span>
          <Select
            items={items}
            defaultValue={"medium"}
            onValueChange={(e) => {
              if (e) handlePresetChange(e);
            }}
          >
            <SelectTrigger className="w-[120px] md:w-[140px] h-8 md:h-9 rounded-md">
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
        <div className="flex items-center gap-2 md:gap-2 ml-auto">
          <AdvancedControls />
          <Button
            variant="outline"
            size="sm"
            title="Preview PDF"
            onClick={handlePreviewPDF}
            disabled={isGenerating}
            className="h-8 md:h-9 px-2 md:px-4"
          >
            <Eye className="size-4" />
            <span className="hidden md:inline md:ml-1.5">Preview</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            title="Download PDF"
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="h-8 md:h-9 px-2 md:px-4"
          >
            <Download className="size-4" />
            <span className="hidden md:inline md:ml-1.5">Download</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
