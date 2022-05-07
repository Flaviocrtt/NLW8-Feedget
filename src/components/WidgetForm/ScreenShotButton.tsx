import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps{
    onScreenshotTook: (screenshot: string|null) => void;
    screenshot: string|null
}

export function ScreenShotButton({onScreenshotTook, screenshot} : ScreenshotButtonProps){

    const [isTakingScreenShot, setIsTakingScreenShot] = useState(false);

    async function handleGetScreenShot(){
        setIsTakingScreenShot(true)
        const canvas = await html2canvas(document.querySelector('html')!);
        const base64 = canvas.toDataURL('image/png');
        onScreenshotTook(base64);
        setIsTakingScreenShot(false)
    }
    return (screenshot) ?
    <button type="button"
    onClick={() => onScreenshotTook(null)}
    className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end hover:text-zinc-100 transition-colors"
    style={{
        backgroundImage: `url(${screenshot})`,
        backgroundPosition: 'rightBottom',
        backgroundSize: 180
    }}
    >

        <Trash weight="fill"></Trash>
    </button>
    :(<button 
        onClick={handleGetScreenShot} 
        type="button" 
        className="p-2 bg-brand-500 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus: ring-offset-zinc-900 focus:ring-brand-500">
        {isTakingScreenShot? <Loading/>: <Camera className="h-6 w-6"/>}
    </button>)
}