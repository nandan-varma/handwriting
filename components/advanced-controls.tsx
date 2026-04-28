"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SlidersHorizontal } from "lucide-react";
import { useContext } from "react";
import { ControlsContext } from "./providers/controls-provider";
import { Input } from "./ui/input";

export function AdvancedControls() {
  const {
    fontSize,
    setFontSize,
    lineHeight,
    setLineHeight,
    margin,
    setMargin,
    gap,
    setGap,
    color,
    setColor,
  } = useContext(ControlsContext);
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" size="icon-sm" title="Settings">
            <SlidersHorizontal className="size-4" />
          </Button>
        }
      />
      <PopoverContent className="w-[calc(100vw-1rem)] sm:w-72 p-3 sm:p-4" align="end">
        <PopoverHeader>
          <PopoverTitle className="text-sm">Text Settings</PopoverTitle>
        </PopoverHeader>
        <div className="grid gap-4 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="fontSize" className="text-xs">
              Font Size
            </Label>
            <Input
              id="fontSize"
              className="h-9 sm:h-8"
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number.parseInt(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lineHeight" className="text-xs">
              Line Height
            </Label>
            <Input
              id="lineHeight"
              className="h-9 sm:h-8"
              type="number"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number.parseInt(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="margin" className="text-xs">
              Margin
            </Label>
            <Input
              id="margin"
              className="h-9 sm:h-8"
              type="number"
              value={margin}
              onChange={(e) => setMargin(Number.parseInt(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gap" className="text-xs">
              Letter Gap
            </Label>
            <Input
              id="gap"
              className="h-9 sm:h-8"
              type="number"
              value={gap}
              onChange={(e) => setGap(Number.parseInt(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color" className="text-xs">
              Color
            </Label>
            <Input
              id="color"
              className="h-9 sm:h-8 p-1 cursor-pointer"
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
