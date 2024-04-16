'use client'
import { generatePDF } from '@/utils/pdf';
import React, { createContext, useContext, useState } from 'react';
import { saveAs } from 'file-saver';
import { ControlsContext } from './controls-provider';

interface PDFProviderValue {
  pdfInfo: string | undefined;
  setPdfInfo: (pdfInfo: string | undefined) => void;
  handlePreviewPDF?: () => void;
  handleDownloadPDF?: () => void;
}

export const PDFContext = createContext<PDFProviderValue>({
  pdfInfo: undefined,
  setPdfInfo: () => { },
  handlePreviewPDF: () => { },
  handleDownloadPDF: () => { },
});

export const PDFProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pdfInfo, setPdfInfo] = useState<string | undefined>(undefined);
  const { text, fontSize, lineHeight, margin, gap, color } = useContext(ControlsContext);

  const handlePreviewPDF = async () => {
    const pdfBytes = await generatePDF(text, fontSize, lineHeight, margin, gap, color);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const docUrl = URL.createObjectURL(blob);
    setPdfInfo(docUrl);
    // console.log(docUrl);
  }
  const handleDownloadPDF = async () => {
    const pdfBytes = await generatePDF(text, fontSize, lineHeight, margin, gap, color);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'handwritten_text.pdf');
  };

  return (
    <PDFContext.Provider value={{
      pdfInfo,
      setPdfInfo,
      handlePreviewPDF,
      handleDownloadPDF,
    }}>
      {children}
    </PDFContext.Provider>
  );
};