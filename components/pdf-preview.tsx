'use client'
import { ResizablePanel } from "./ui/resizable";
import { useContext, useMemo, useState } from "react";
import { PDFContext } from "./providers/pdf-provider";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Button } from "./ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

export function PdfPreview() {
    const { pdfInfo } = useContext(PDFContext);
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        console.log(numPages);
        setNumPages(numPages);
    }

    return (
        <>
            <ResizablePanel defaultSize={50} className='p-4'>
                {/* <div className="overflow-scroll h-80">
                    {pdfInfo !== undefined ?
                        <>
                            <Document
                                file={{ url: pdfInfo }}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                <Page pageNumber={pageNumber} />
                            </Document>
                            <Button onClick={() => { setPageNumber((PrevPage) => { return (PrevPage + 1) % numPages }) }}>Next page</Button>
                        </>
                        : <p className='text-center font-bold place-items-center'>No Preview Available</p>
                    }
                </div> */}
                {pdfInfo !== undefined ?
                    <iframe title="PDF Preview" src={pdfInfo} className='h-full w-full border-4' />
                    : 
                    <div className="flex flex-col">
                    <p className='text-center font-bold place-items-center'>No Preview Available</p>
                    <p className='text-center font-bold place-items-center'>Try clicking Preview</p>
                    </div>
                }
            </ResizablePanel>
        </>
    )
}