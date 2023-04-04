import Hls from "hls.js";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";


type VideoPlayerProps = {
    src: string,
    autoPlay?: boolean,
    title?: string,
    currentTime?: number,
    onUpdateTime?: (time: number) => void,
    [x:string]: any
}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {

    let { src, autoPlay, title, currentTime, onUpdateTime, ...restProps } = props;
    // src = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";
    
    const videoRef = useRef<HTMLVideoElement>(null)
    
    const intervalID = useRef<NodeJS.Timer|null>(null)

    const updateTime = () => {
        intervalID.current && 
        clearInterval(intervalID.current)
        
        intervalID.current = setInterval(() => {
            videoRef.current &&
            onUpdateTime &&
            onUpdateTime(videoRef.current.currentTime)
        }, 3000);
    }

    useEffect(()=> {
        // onUnmount
        return () => {intervalID.current && clearInterval(intervalID.current)}
    }, [])

    const play = () => {
        if (videoRef.current) {
            videoRef.current.muted = true 
            videoRef.current.play();
        }
    }

    if(Hls.isSupported()) {

        let hls = new Hls(); 
        // let hls = new Hls({debug: console});
        hls.recoverMediaError()
        hls.loadSource(src);

        /* 
        IMPORTANT!
        Becouse of Allow CORS plagin, sometimes media didn't attached 
        So we have to attach it after MANIFEST_PARSED event,
        and play video after MEDIA_ATTACHED event
        */
        autoPlay && hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoRef.current && 
            hls.attachMedia(videoRef.current);
        });

        hls.on(Hls.Events.MEDIA_ATTACHED, play);  
        
    } else if (
        videoRef.current && 
        videoRef.current.canPlayType('application/vnd.apple.mpegurl')
    ) {
    
        videoRef.current.src = src;                
        autoPlay && videoRef.current.addEventListener('canplay', play);
    }

    videoRef.current && 
    (videoRef.current.onloadedmetadata = () => {
        if (videoRef.current && currentTime) { 
            videoRef.current.currentTime = currentTime;
        }
    })

    onUpdateTime && updateTime()

    return <>
        <video {...restProps} ref={videoRef} />
        {/* <Preloader videoRef={videoRef} /> */}
        {title && 
            <div className="d-flex justify-content-between">
                <h4>{title}</h4> 
                <PIPBtn videoRef={videoRef} />
            </div>
        }
    </>     
}

// type PreloaderProps = {
//     videoRef: RefObject<HTMLVideoElement>
// }
// const Preloader: React.FC<PreloaderProps> = ({ videoRef }) => {

//     const [disabled, setDisabled] = useState<boolean>(false)

//     useEffect(() => {
//         const disabled = videoRef.current && videoRef.current.isConnected
//         setDisabled(!!disabled) 

//     }, [videoRef.current, videoRef.current?.isConnected])

//     return <div 
//         className={disabled ? "d-none" : ""} 
//         style={{position: "absolute", 
//             top: "50%", 
//             left: "40%", 
//             display: "flex" ,
//             alignItems: "center",
//             justifyContent: "center",
//         }}
//     >
//         <Container className="text-white" >Loading...</Container>
//     </div>
// }

type PIPBtnProps = {
    videoRef: RefObject<HTMLVideoElement>,
}
const PIPBtn: React.FC<PIPBtnProps> = ({ videoRef }) => {

    const initTitle = "Go to picture in picture"
    const [ disabled, setDisabled ] = useState(false)
    const [ title, setTitle ] = useState(initTitle) 

    useEffect(() => {

        if (videoRef.current) {
            videoRef.current.onenterpictureinpicture = () => {
                setDisabled(true)
                setTitle("Now in picture in picture")
            }
        
            videoRef.current.onleavepictureinpicture = () => {
                setDisabled(false)
                setTitle(initTitle)
            }
        }

    }, [])

    return <Button 
        variant="outline-secondary"
        onClick={() => {videoRef.current?.requestPictureInPicture()}}
        disabled={disabled}
        >
        {title}
    </Button>
}
