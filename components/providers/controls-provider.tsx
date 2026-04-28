"use client";
import { DefaultText, presets } from "@/utils/defaults";
import type { Preset } from "@/utils/types";
import type React from "react";
import { createContext, useState } from "react";

const defaultPreset: Preset = presets.small ??
  presets.medium ?? { fontSize: 14, lineHeight: 14, margin: 24, gap: 5 };

interface ControlsValue {
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  lineHeight: number;
  setLineHeight: (lineHeight: number) => void;
  margin: number;
  setMargin: (margin: number) => void;
  gap: number;
  setGap: (gap: number) => void;
  color: string;
  setColor: (color: string) => void;
  preset: Preset;
  setPreset: (preset: Preset) => void;
  text: string;
  setText: (text: string) => void;
  handlePresetChange: (preset: string) => void;
}

export const ControlsContext = createContext<ControlsValue>({
  fontSize: 14,
  setFontSize: () => {},
  lineHeight: 14,
  setLineHeight: () => {},
  margin: 24,
  setMargin: () => {},
  gap: 5,
  setGap: () => {},
  color: "#000000",
  setColor: () => {},
  preset: defaultPreset,
  setPreset: () => {},
  text: "",
  setText: () => {},
  handlePresetChange: () => {},
});

export const ControlsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [text, setText] = useState<string>(DefaultText);
  const [preset, setPreset] = useState<Preset>(defaultPreset);
  const [fontSize, setFontSize] = useState<number>(14);
  const [lineHeight, setLineHeight] = useState<number>(14);
  const [margin, setMargin] = useState<number>(24);
  const [gap, setGap] = useState<number>(5);
  const [color, setColor] = useState<string>("#000000");

  const handlePresetChange = (presetName: string) => {
    const presetObj = presets[presetName];
    if (presetObj) {
      setPreset(presetObj);
      setFontSize(presetObj.fontSize);
      setLineHeight(presetObj.lineHeight);
      setMargin(presetObj.margin);
      setGap(presetObj.gap);
    }
  };

  return (
    <ControlsContext.Provider
      value={{
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
        preset,
        setPreset,
        text,
        setText,
        handlePresetChange,
      }}
    >
      {children}
    </ControlsContext.Provider>
  );
};
