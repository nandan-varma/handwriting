import { useState } from 'react';
import { saveAs } from 'file-saver';
import { generatePDF } from '../utils/pdfUtils';

const HandwrittenTextPage = () => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [lineHeight, setLineHeight] = useState(48);
  const [margin, setMargin] = useState(50);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleLineHeightChange = (event) => {
    setLineHeight(event.target.value);
  };

  const handleMarginChange = (event) => {
    setMargin(event.target.value);
  };

  const handleDownloadPDF = async () => {
    const pdfBytes = await generatePDF(text, fontSize, lineHeight, margin);

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'handwritten_text.pdf');
  };

  return (
    <div>
      <title>HandWritten PDF</title>
      <textarea className='text-area' value={text} onChange={handleTextChange} placeholder="Enter your text" />
      <h2>Font Size</h2>
      <input type="number" value={fontSize} onChange={handleFontSizeChange} placeholder="Font size" />
      <h2>Line Height</h2>
      <input type="number" value={lineHeight} onChange={handleLineHeightChange} placeholder="Line height" />
      <h2>Margin</h2>
      <input type="number" value={margin} onChange={handleMarginChange} placeholder="Margin" />
      <br></br><br></br>
      <button className='fancy-button' onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
};

export default HandwrittenTextPage;
