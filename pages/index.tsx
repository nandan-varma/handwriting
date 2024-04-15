import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { generatePDF } from '../utils/pdfUtils';
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/resizable"
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Preset = {
  fontSize: number;
  lineHeight: number;
  margin: number;
  gap: number;
};

const presets: Record<string, Preset> = {
  small: {
    fontSize: 12,
    lineHeight: 12,
    margin: 24,
    gap: 5,
  },
  medium: {
    fontSize: 14,
    lineHeight: 14,
    margin: 24,
    gap: 5,
  },
  large: {
    fontSize: 16,
    lineHeight: 16,
    margin: 24,
    gap: 5,
  },
};


const HandwrittenTextPage = () => {
  const [isClientReady, setIsClientReady] = useState<boolean>(false);
  const [preset, setPreset] = useState<string>('medium');
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
  const [lineHeight, setLineHeight] = useState<number>(14);
  const [margin, setMargin] = useState<number>(24);
  const [gap, setGap] = useState<number>(5);
  const [pdfInfo, setPdfInfo] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string>('#000000');
  const [viewControls, setViewControls] = useState<boolean>(false);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  const handleDownloadPDF = async () => {
    const pdfBytes = await generatePDF(text, fontSize, lineHeight, margin, gap, color);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'handwritten_text.pdf');
  };

  const handlePreviewPDF = async () => {
    const pdfBytes = await generatePDF(text, fontSize, lineHeight, margin, gap, color);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const docUrl = URL.createObjectURL(blob);
    setPdfInfo(docUrl);
    console.log(docUrl);
  }

  const handlePresetChange = (preset: string) => {
    setPreset(preset);
    setFontSize(presets[preset].fontSize);
    setLineHeight(presets[preset].lineHeight);
    setMargin(presets[preset].margin);
    setGap(presets[preset].gap);
  };
  if (!isClientReady) {
    return null;
  }

  return (
    <div>
      < title > HandWritten PDF</title >
      <div className="pt-10 px-5 flex flex-col sm:flex-row items-center gap-4 font-semibold justify-center">
        <h2>Preset</h2>
        <Select defaultValue={preset} onValueChange={(e) => { handlePresetChange(e) }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Preset" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(presets).map(([key, value]) => (
              <SelectItem value={key} key={key}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <h2>Advanced Controls</h2>
        <Switch checked={viewControls} onCheckedChange={(e) => { setViewControls(e) }} />
      </div>
      {viewControls &&
        <div className="pt-10 px-5 flex flex-col sm:flex-row items-center gap-4 font-semibold justify-center">
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
            onChange={(e) => { setColor(e.target.value); console.log(e.target.value) }}
            placeholder="Color"
          />
        </div>
      }
      <div className="pt-10 px-5 flex flex-col sm:flex-row items-center justify-center gap-4 font-semibold">
        <Button onClick={handleDownloadPDF}>Download PDF</Button>
        <Button onClick={handlePreviewPDF}>Preview PDF</Button>
      </div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className='p-4'>
          {pdfInfo ?
            <iframe title="PDF Preview" src={pdfInfo} className='h-full w-full border-4' />
            : <p className='text-center font-bold place-items-center'>No Preview Available</p>
          }
        </ResizablePanel>
        <ResizableHandle withHandle />

        <ResizablePanel className='p-2'>
          <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter your text"
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div >
  );
};

export default HandwrittenTextPage;
