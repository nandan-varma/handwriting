"use client";
import { generatePDF } from "@/utils/pdf";
import type React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ControlsContext } from "./controls-provider";

interface PDFProviderValue {
  pdfInfo: string | undefined;
  isGenerating: boolean;
  handlePreviewPDF?: () => void;
  handleDownloadPDF?: () => void;
}

export const PDFContext = createContext<PDFProviderValue>({
  pdfInfo: undefined,
  isGenerating: false,
  handlePreviewPDF: () => {},
  handleDownloadPDF: () => {},
});

function createSeed(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

export const PDFProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pdfInfo, setPdfInfo] = useState<string | undefined>(undefined);
  const [previewBytes, setPreviewBytes] = useState<Uint8Array | undefined>(
    undefined,
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [seed, setSeed] = useState<string>(() => createSeed());
  const generationIdRef = useRef(0);
  const { text, fontSize, lineHeight, margin, gap, color } =
    useContext(ControlsContext);

  useEffect(() => {
    let isActive = true;
    const generationId = generationIdRef.current + 1;
    generationIdRef.current = generationId;

    const updatePreview = async () => {
      setIsGenerating(true);

      try {
        const pdfBytes = await generatePDF(
          text,
          fontSize,
          lineHeight,
          margin,
          gap,
          color,
          seed,
        );

        if (!isActive || generationIdRef.current !== generationId) {
          return;
        }

        const blob = new Blob([pdfBytes], {
          type: "application/pdf",
        });
        const docUrl = URL.createObjectURL(blob);
        setPreviewBytes(pdfBytes);
        setPdfInfo(docUrl);
      } finally {
        if (isActive && generationIdRef.current === generationId) {
          setIsGenerating(false);
        }
      }
    };

    const timeoutId = window.setTimeout(() => {
      void updatePreview();
    }, 250);

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
    };
  }, [text, fontSize, lineHeight, margin, gap, color, seed]);

  useEffect(() => {
    return () => {
      if (pdfInfo) {
        URL.revokeObjectURL(pdfInfo);
      }
    };
  }, [pdfInfo]);

  const handlePreviewPDF = () => {
    setSeed(createSeed());
  };

  const handleDownloadPDF = async () => {
    const bytes =
      previewBytes ??
      (await generatePDF(text, fontSize, lineHeight, margin, gap, color, seed));

    const blob = new Blob([bytes], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "handwritten_text.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PDFContext.Provider
      value={{
        pdfInfo,
        isGenerating,
        handlePreviewPDF,
        handleDownloadPDF,
      }}
    >
      {children}
    </PDFContext.Provider>
  );
};
