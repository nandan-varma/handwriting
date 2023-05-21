import { useState } from 'react';
import { saveAs } from 'file-saver';
import { generatePDF } from '../utils/pdfUtils'; // Assuming you have a separate file for the generatePDF function

const HandwrittenTextPage = () => {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleDownloadPDF = async () => {
    const pdfBytes = await generatePDF(text);

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'handwritten_text.pdf');
  };

  return (
    <div>
      <title>HandWritten PDF</title>
      <textarea value={text} onChange={handleTextChange} placeholder="Enter your text" />
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
};

export default HandwrittenTextPage;
