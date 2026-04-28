'use client'
import { useContext } from "react";
import { Input } from "./ui/input";
import { ControlsContext } from "./providers/controls-provider";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SlidersHorizontal } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"

export function AdvancedControls() {
    const { fontSize, setFontSize, lineHeight, setLineHeight, margin, setMargin, gap, setGap, color, setColor } = useContext(ControlsContext);
    return (
        <Popover>
            <PopoverTrigger render={<Button variant="outline" size="sm">
                <SlidersHorizontal className="size-4 mr-1.5" />
                Settings
            </Button>} />
            <PopoverContent className="w-72" align="end">
                <PopoverHeader>
                    <PopoverTitle className="text-sm">Text Settings</PopoverTitle>
                </PopoverHeader>
                <div className="grid gap-3 mt-3">
                    <div className="grid grid-cols-3 items-center gap-3">
                        <Label htmlFor="fontSize" className="text-xs">Font Size</Label>
                        <Input
                            id="fontSize"
                            className="col-span-2 h-8"
                            type="number"
                            value={fontSize}
                            onChange={e => setFontSize(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-3">
                        <Label htmlFor="lineHeight" className="text-xs">Line Height</Label>
                        <Input
                            id="lineHeight"
                            className="col-span-2 h-8"
                            type="number"
                            value={lineHeight}
                            onChange={e => setLineHeight(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-3">
                        <Label htmlFor="margin" className="text-xs">Margin</Label>
                        <Input
                            id="margin"
                            className="col-span-2 h-8"
                            type="number"
                            value={margin}
                            onChange={e => setMargin(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-3">
                        <Label htmlFor="gap" className="text-xs">Letter Gap</Label>
                        <Input
                            id="gap"
                            className="col-span-2 h-8"
                            type="number"
                            value={gap}
                            onChange={e => setGap(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-3">
                        <Label htmlFor="color" className="text-xs">Color</Label>
                        <Input
                            id="color"
                            className="col-span-2 h-8 p-1 cursor-pointer"
                            type="color"
                            value={color}
                            onChange={(e) => { setColor(e.target.value) }}
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}