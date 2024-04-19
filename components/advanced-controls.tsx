'use client'
import { useContext } from "react";
import { Input } from "./ui/input";
import { ControlsContext } from "./providers/controls-provider";

export function AdvancedControls() {
    const { fontSize, setFontSize, lineHeight, setLineHeight, margin, setMargin, gap, setGap, color, setColor } = useContext(ControlsContext);
    return (
        <>
            <div className="pt-5 flex flex-row items-center gap-4 font-semibold justify-center">
                <h2>Font Size</h2>
                <Input
                    className='min-w-20'
                    type="number"
                    value={fontSize}
                    onChange={e => setFontSize(parseInt(e.target.value))}
                    placeholder="Font size"
                />
                <h2>Line Height</h2>
                <Input
                    className='min-w-20'
                    type="number"
                    value={lineHeight}
                    onChange={e => setLineHeight(parseInt(e.target.value))}
                    placeholder="Line height"
                />
                <h2>Margin</h2>
                <Input
                    className='min-w-20'
                    type="number"
                    value={margin}
                    onChange={e => setMargin(parseInt(e.target.value))}
                    placeholder="Margin"
                />
                <h2>Letter Gap</h2>
                <Input
                    className='min-w-20'
                    type="number"
                    value={gap}
                    onChange={e => setGap(parseInt(e.target.value))}
                    placeholder="Gap"
                />
                <h2>Color</h2>
                <Input
                    className='min-w-20'
                    type="color"
                    value={color}
                    onChange={(e) => { setColor(e.target.value) }}
                    placeholder="Color"
                />
            </div>
        </>
    )
}