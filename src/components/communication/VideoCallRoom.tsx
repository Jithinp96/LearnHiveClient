import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const VideoCallRoom = () => {
    const roomId = useParams();
    const id = roomId.id
    console.log("roomId: ", id);
    
    // if(!id) {
        
    // }
    const myMeeting = async (element: any) => {
        const appID = 242548235;
        const serverSecret = "02f5564ae671e0b9977cb75fdf849538";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID, 
            serverSecret, 
            id,  
            "TutorId",  
            "StudentId",
        );
        
         // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            sharedLinks: [
              {
                name: 'Copy Link',
                url:
                 window.location.protocol + '//' + 
                 window.location.host + window.location.pathname +
                  '?roomID=' +
                  id,
              },
            ],
            scenario: {
              mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
          });
    }
    
    return(
        <>
             <div
                // className="myCallContainer"
                ref={myMeeting}
                // style={{ width: '100vw', height: '100vh' }}
            />
        </>
    )
}

export default VideoCallRoom