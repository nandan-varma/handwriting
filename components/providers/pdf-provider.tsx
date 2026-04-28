'use client'
import { generatePDF } from '@/utils/pdf';
import React, { createContext, useContext, useState } from 'react';
import { ControlsContext } from './controls-provider';

interface PDFProviderValue {
  pdfInfo: string | undefined;
  setPdfInfo: (pdfInfo: string | undefined) => void;
  isGenerating: boolean;
  handlePreviewPDF?: () => void;
  handleDownloadPDF?: () => void;
}

export const PDFContext = createContext<PDFProviderValue>({
  pdfInfo: undefined,
  setPdfInfo: () => { },
  isGenerating: false,
  handlePreviewPDF: () => { },
  handleDownloadPDF: () => { },
});

export const PDFProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pdfInfo, setPdfInfo] = useState<string | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const { text, fontSize, lineHeight, margin, gap, color } = useContext(ControlsContext);

  const handlePreviewPDF = async () => {
    setIsGenerating(true);
    try {
      const pdfBytes = await generatePDF(text, fontSize, lineHeight, margin, gap, color);
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const docUrl = URL.createObjectURL(blob);
      setPdfInfo(docUrl);
    } finally {
      setIsGenerating(false);
    }
  }
  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const pdfBytes = await generatePDF(text, fontSize, lineHeight, margin, gap, color);
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'handwritten_text.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PDFContext.Provider value={{
      pdfInfo,
      setPdfInfo,
      isGenerating,
      handlePreviewPDF,
      handleDownloadPDF,
    }}>
      {children}
    </PDFContext.Provider>
  );
};