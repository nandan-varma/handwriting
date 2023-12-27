import { useState } from 'react';
import { saveAs } from 'file-saver';
import { generatePDF } from '../utils/pdfUtils';
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"


const HandwrittenTextPage = () => {
  const [text, setText] = useState(`Title: The Wacky World of Dummy Data: An Epic Tale of Randomness

  Once upon a time, in the mystical land of Dataville, there existed a peculiar realm known as Dummylandia. It was a place where numbers danced, letters sang, and chaos reigned supreme. Welcome to the wacky world of dummy data, where randomness knows no bounds!
  
  In this whimsical land, data scientists and programmers roamed freely, armed with their magical keyboards and mischievous algorithms. They had a peculiar task: to create a project that required mountains of nonsensical information. Thus, they conjured up a cornucopia of dummy data, giving birth to a world filled with quirky characters and absurd scenarios.
  
  First, let us meet the illustrious Sir Random Digit, a noble knight whose sole purpose was to generate numbers that made absolutely no sense. Armed with a mighty dice and a mathematical imagination, he created zip codes like "98765" for places that didn't exist and phone numbers like "867-5309" that were perpetually engaged.
  
  Meanwhile, the mischievous Fairy of Letters, known as Lady Lorem Ipsum, took delight in arranging random sequences of characters that baffled even the most seasoned linguists. She gave birth to names like "John Doe" and "Jane Smith," whose origins remained a mystery to this day. With her enchanting powers, she could conjure up sentences like "Lorem ipsum dolor sit amet" that held no meaning but looked oh-so-important.
  
  But the true heart and soul of Dummylandia resided in the whimsical realm of Imaginary Events. Here, the event planner, Dr. Serendipity, had the task of creating timelines that defied all logic. He concocted appointments where a person would simultaneously attend a "meeting with aliens" and "breakfast with unicorns" – all while time-traveling through a "wormhole commute."
  
  In this land of absurdity, the inhabitants reveled in the chaos. They celebrated birthdays on February 30th, wore mismatched socks on purpose, and communicated in a language called "Nonsense-ese" that only they could understand. The weather forecast predicted rainbows with a 100% chance of laughter, and every clock displayed the time as "Now o'clock" to signify the perpetual present.
  
  But amid the madness, a curious thing happened. The project that required all this ludicrous data became a resounding success! People marveled at the randomness and unpredictability of Dummylandia, finding joy in its nonsensical existence. They realized that sometimes, a touch of whimsy and a sprinkle of silliness can make the world a brighter place.
  
  And so, the legend of Dummylandia lived on, reminding us all to embrace the unexpected and find laughter in the absurd. Next time you encounter a spreadsheet filled with random numbers or encounter gibberish in your code, remember the wacky world of dummy data and the laughter it brought to Dataville. After all, life is too short to take everything seriously – sometimes, a bit of silliness is just what the programmer ordered!
  
  The end. Or is it just the beginning of a whole new adventure in the land of dummy data?`);
  const [fontSize, setFontSize] = useState<number>(14);
  const [lineHeight, setLineHeight] = useState<number>(28);
  const [margin, setMargin] = useState<number>(40);
  const [pdfInfo, setPdfInfo] = useState<string | undefined>(undefined);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(event.target.value));
  };

  const handleLineHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLineHeight(parseInt(event.target.value));
  };

  const handleMarginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMargin(parseInt(event.target.value));
  };

  const handleDownloadPDF = async () => {
    const pdfBytes = await generatePDF(text, fontSize, lineHeight, margin);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'handwritten_text.pdf');
  };

  const handlePreviewPDF = async () => {
    const pdfBytes = await generatePDF(text, fontSize, lineHeight, margin);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const docUrl = URL.createObjectURL(blob);
    setPdfInfo(docUrl);
    console.log(docUrl);
  }

  return (
    <div>
      <title>HandWritten PDF</title>
      <div className='min-h-screen'>
        <div className="p-10 flex flex-col sm:flex-row items-center gap-4">
          <h2>Font Size</h2>
          <Input
            type="number"
            value={fontSize}
            onChange={handleFontSizeChange}
            placeholder="Font size"
          />
          <h2>Line Height</h2>
          <Input
            type="number"
            value={lineHeight}
            onChange={handleLineHeightChange}
            placeholder="Line height"
          />
          <h2>Margin</h2>
          <Input
            type="number"
            value={margin}
            onChange={handleMarginChange}
            placeholder="Margin"
          />
          <Button onClick={handleDownloadPDF}>Download PDF</Button>
          <Button onClick={handlePreviewPDF}>Preview PDF</Button>
        </div>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className='p-4'>
            {pdfInfo ?
              <iframe title="PDF Preview" src={pdfInfo} className='h-full w-full' />
              : <p className='text-center font-bold place-items-center'>No Preview Available</p>
            }
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel className='p-2'>
            <Textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Enter your text"
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

    </div>
  );
};

export default HandwrittenTextPage;
