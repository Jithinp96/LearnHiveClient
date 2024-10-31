import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const VideoCallRoom: React.FC = () => {
    const { studentInfo } = useSelector((state: RootState) => state.student);
    const { tutorInfo } = useSelector((state: RootState) => state.tutor);

    const roomId = useParams<{ id: string }>().id;

    const userInfo = studentInfo || tutorInfo;

    if (!roomId || !userInfo) {
        return <div>Loading or User not found...</div>;
    }

    const myMeeting = async (element: HTMLDivElement) => {
        const appID = 242548235;
        const serverSecret = "02f5564ae671e0b9977cb75fdf849538";

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            userInfo._id,
            userInfo.name
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `${window.location.origin}/room/${roomId}`,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
        });
    };

    return (
        <div
            ref={myMeeting}
            style={{ width: '100vw', height: '100vh' }}
        />
    );
};

export default VideoCallRoom;