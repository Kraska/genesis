import Hls from 'hls.js';
import { useLayoutEffect, useRef } from 'react';

type VideoProps = {
    id: string,
    src: string,
    autoPlay?: boolean,
    currentTime?: number,
    onPause?: (time: number) => void,
    [x:string]: any
}

// Deprecated
export const Video: React.FC<VideoProps> = 
({ id, src, autoPlay, onPause, currentTime, ...props }) => {

    src = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";
    const videoRef = useRef<HTMLVideoElement>(null);

    const play = () => {
        videoRef.current && videoRef.current.play();
    }

    const onStop = () => {
        console.log("onStop")
        onPause && 
        videoRef.current &&
        // videoRef.current.currentTime && 
        onPause(videoRef.current.currentTime)
    }

    // when change src
    useLayoutEffect(onStop, [id])

    if (videoRef.current) {

        if(Hls.isSupported()) {

            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef.current);

            autoPlay && hls.on(Hls.Events.MANIFEST_PARSED, play);

        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
           
            videoRef.current.src = src;
            
            autoPlay && videoRef.current.addEventListener('canplay',play);
        }

        videoRef.current.onloadedmetadata = function() {
            if (videoRef.current && currentTime) { 
                videoRef.current.currentTime = currentTime;
            }
        }

        videoRef.current.onpause = onStop
    }    

    return <video {...props} ref={videoRef} />
}