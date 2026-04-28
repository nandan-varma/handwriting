'use client'
import { useContext } from "react";
import { Input } from "./ui/input";
import { ControlsContext } from "./providers/controls-provider";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"

export function AdvancedControls() {
    const { fontSize, setFontSize, lineHeight, setLineHeight, margin, setMargin, gap, setGap, color, setColor } = useContext(ControlsContext);
    return (
        <>
            <Popover>
                <PopoverTrigger render={<Button variant="outline">Open Controls</Button>} />
                <PopoverContent className="w-60">
                    <PopoverHeader>
                        <PopoverTitle>Advanced Controls</PopoverTitle>
                    </PopoverHeader>
                    <div className="grid gap-2 content-center">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="fontSize">Font Size</Label>
                            <Input
                                id="fontSize"
                                className="col-span-2 h-8 w-20"
                                type="number"
                                value={fontSize}
                                onChange={e => setFontSize(parseInt(e.target.value))}
                                placeholder="Font size"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="lineHeight">Line Height</Label>
                            <Input
                                id="lineHeight"
                                className="col-span-2 h-8 w-20"
                                type="number"
                                value={lineHeight}
                                onChange={e => setLineHeight(parseInt(e.target.value))}
                                placeholder="Line height"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="margin">Margin</Label>
                            <Input
                                id="margin"
                                className="col-span-2 h-8 w-20"
                                type="number"
                                value={margin}
                                onChange={e => setMargin(parseInt(e.target.value))}
                                placeholder="Margin"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="gap">Letter Gap</Label>
                            <Input
                                id="gap"
                                className="col-span-2 h-8 w-20"
                                type="number"
                                value={gap}
                                onChange={e => setGap(parseInt(e.target.value))}
                                placeholder="Gap"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="color">Color</Label>
                            <Input
                                id="color"
                                className="col-span-2 h-8 w-20"
                                type="color"
                                value={color}
                                onChange={(e) => { setColor(e.target.value) }}
                                placeholder="Color"
                            />
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}