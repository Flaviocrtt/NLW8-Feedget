import { Features } from '@headlessui/react/dist/utils/render'
import { useState } from 'react'
import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import otherImageUrl from '../../assets/other.svg'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep'
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'

export const feedbackTypes ={
    BUG:{
        title:'Problema',
        image:{
            source:bugImageUrl,
            alt:'imagem de uma mosca'
        }
    },
    IDEA:{
        title:'Idéia',
        image:{
            source:ideaImageUrl,
            alt:'imagem de uma lâmpada'
        }
    },
    OTHER: {
        title:'Outro',
        image:{
            source:otherImageUrl,
            alt:'imagem de uma nuvem de idéias'
        }
    },
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){

    const [feedbackSelected, setFeedbackSelected] = useState<FeedbackType|null>(null)

    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleFeedbackRestart(){
        setFeedbackSelected(null)
        setFeedbackSent(false)
    }

    return  (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
        <div className="flex flex-col items-center">
            {feedbackSent?(
                <FeedbackSuccessStep onFeedbackRestarRequest={handleFeedbackRestart}/>
            ):(<>
                {!feedbackSelected ? (
                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackSelected} /> 
                ):(
                <FeedbackContentStep 
                    feedbackType={feedbackSelected as FeedbackType}
                    onFeedbackRestartRequest={handleFeedbackRestart}
                    onFeedbackSent={() => setFeedbackSent(true)}/> 
                )}    
            </>)
            }
            <footer className='text-xs neutral-400'>
                Feito com ♡ por Flávio Ceratti
            </footer>
        </div>
    </div>
    )
}