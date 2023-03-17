import Hls from "hls.js";
import React, { RefObject } from "react";


type VideoPlayerProps = {
    src: string,
    autoPlay?: boolean,
    currentTime?: number,
    onPause?: (time: number) => void,
    [x:string]: any
}

export class VideoPlayer extends React.Component<VideoPlayerProps> {

    private videoRef: RefObject<HTMLVideoElement>;

    constructor( props: VideoPlayerProps ) {
        super(props);
        this.videoRef = React.createRef();
    }

    public getCurrentTime() {
        return this.videoRef.current?.currentTime
    }

    public switchPictureInPicture() {
        console.log('switchPictureInPicture')
        this.videoRef.current?.requestPictureInPicture()
        // this.videoRef.current?.enterpictureinpicture()   
    }

    public addListener(eventName: string, fn: () => void) {
        this.videoRef.current?.addEventListener(eventName, fn)
    }

    render() {

        let { src, autoPlay, currentTime, onPause, ...restProps } = this.props;
        // src = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

        const onStop = () => {
            onPause && 
            this.videoRef.current &&
            onPause(this.videoRef.current.currentTime)
        }

        const play = () => {
            if (this.videoRef.current) {
                this.videoRef.current.muted = true 
                this.videoRef.current.play();
            }
        }

        if (this.videoRef.current) {

            if(Hls.isSupported()) {

                const hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(this.videoRef.current);

                autoPlay && hls.on(Hls.Events.MANIFEST_PARSED, play);

            } else if (this.videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            
                this.videoRef.current.src = src;
                
                autoPlay && this.videoRef.current.addEventListener('canplay', play);
            }

            this.videoRef.current.onloadedmetadata = () => {
                if (this.videoRef.current && currentTime) { 
                    this.videoRef.current.currentTime = currentTime;
                }
            }

            this.videoRef.current.onpause = onStop
        }    

        return <video muted={true} {...restProps} ref={this.videoRef} />     
    }
}