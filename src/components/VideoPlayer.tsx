import Hls from "hls.js";
import React, { RefObject } from "react";


type VideoPlayerProps = {
    src: string,
    autoPlay?: boolean,
    currentTime?: number,
    onUpdateTime?: (time: number) => void,
    [x:string]: any
}

export class VideoPlayer extends React.Component<VideoPlayerProps> {

    private videoRef: RefObject<HTMLVideoElement>;
    private intervalID: NodeJS.Timer | null = null;

    constructor( props: VideoPlayerProps ) {
        super(props);
        this.videoRef = React.createRef();
    }

    public switchPictureInPicture() {
        // console.log('switchPictureInPicture')
        this.videoRef.current?.requestPictureInPicture()
        // this.videoRef.current?.enterpictureinpicture()   
    }

    public addListener(eventName: string, fn: () => void) {
        this.videoRef.current?.addEventListener(eventName, fn)
    }

    private updateTime() {
        if (!this.intervalID) {
            this.intervalID = setInterval(() => {
                this.videoRef.current &&
                this.props.onUpdateTime &&
                this.props.onUpdateTime(this.videoRef.current.currentTime)
            }, 3000);
        }
    }

    componentWillUnmount() {
        this.intervalID && clearInterval(this.intervalID);
    }

    render() {

        let { src, autoPlay, currentTime, onUpdateTime, ...restProps } = this.props;
        // src = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

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

            this.props.onUpdateTime && this.updateTime()
        }    

        return <video {...restProps} ref={this.videoRef} />     
    }
}

// type PreloaderProps = {
//     disabled?: boolean
// }
// const Preloader: React.FC<PreloaderProps> = ({ disabled }) => {
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