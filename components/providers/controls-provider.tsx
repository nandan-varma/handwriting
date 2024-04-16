'use client'
import { DefaultText, presets } from '@/utils/defaults';
import { Preset } from '@/utils/types';
import React, { createContext, useState } from 'react';

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
  setFontSize: () => { },
  lineHeight: 14,
  setLineHeight: () => { },
  margin: 24,
  setMargin: () => { },
  gap: 5,
  setGap: () => { },
  color: '#000000',
  setColor: () => { },
  preset: presets.medium,
  setPreset: () => { },
  text: '',
  setText: () => { },
  handlePresetChange: () => { },
});

export const ControlsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [text, setText] = useState<string>(DefaultText);
  const [preset, setPreset] = useState<Preset>(presets.medium);
  const [fontSize, setFontSize] = useState<number>(14);
  const [lineHeight, setLineHeight] = useState<number>(14);
  const [margin, setMargin] = useState<number>(24);
  const [gap, setGap] = useState<number>(5);
  const [color, setColor] = useState<string>('#000000');

  const handlePresetChange = (preset: string) => {
    const presetObj = presets[preset];
    setPreset(presetObj);
    setFontSize(presetObj.fontSize);
    setLineHeight(presetObj.lineHeight);
    setMargin(presetObj.margin);
    setGap(presetObj.gap);
  }

  return (
    <ControlsContext.Provider value={{
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
      handlePresetChange
    }}>
      {children}
    </ControlsContext.Provider>
  );
};