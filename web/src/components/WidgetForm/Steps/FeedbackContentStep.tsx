import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../services/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenShotButton } from "../ScreenShotButton";

interface FeedbackTypeStepProps{
 feedbackType: FeedbackType;
 onFeedbackRestartRequest: () => void;
 onFeedbackSent: () => void;
}

export function FeedbackContentStep({feedbackType, onFeedbackRestartRequest, onFeedbackSent}: FeedbackTypeStepProps){

    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState<string>('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    async function handleFeedbackSubmit(event: FormEvent){
        setIsSendingFeedback(true)
        event.preventDefault();
        
        await api.post("/feedbacks", {
            type: feedbackType,
            comment,
            screenshot
        })
        setIsSendingFeedback(false)
        onFeedbackSent();
    }

    const feedbackTypeInfo = feedbackTypes[feedbackType];
    return (<>
        <header>
            <button onClick={onFeedbackRestartRequest} type="button" className=" absolute top-5 left-5 text-zinc-400 hover:text-zinc-100">
                <ArrowLeft weight="bold" className="h-4 w-4"></ArrowLeft>
            </button>
            <span className='text-xl leading-6 flex items-center gap-2'>
                <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
                {feedbackTypeInfo.title}
            </span>
            <CloseButton/>
        </header>
        <form className="my-4 w-full">
            <textarea 
            onChange={event => setComment(event.target.value)}
            className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none " 
            placeholder="Conte o que está acontecendo" />
        </form>
        <footer className="flex gap-2 mt-2 w-full pb-4">
            <ScreenShotButton onScreenshotTook={setScreenshot} screenshot={screenshot}/>
            <button 
                disabled={comment.length===0 || isSendingFeedback}
                onClick={handleFeedbackSubmit}
                type="submit" 
                className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus: ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            >{isSendingFeedback? <Loading/> : "Enviar Feedback"}</button>
        </footer>
    </>)
}