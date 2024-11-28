// import React from "react";
// import { useParams } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

// const VideoCallRoom: React.FC = () => {
//     const { studentInfo } = useSelector((state: RootState) => state.student);
//     const { tutorInfo } = useSelector((state: RootState) => state.tutor);

//     const roomId = useParams<{ id: string }>().id;

//     const userInfo = studentInfo || tutorInfo;

//     if (!roomId || !userInfo) {
//         return <div>Loading or User not found...</div>;
//     }

//     const myMeeting = async (element: HTMLDivElement) => {
//         const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
//         const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//             appID,
//             serverSecret,
//             roomId,
//             userInfo._id,
//             userInfo.name
//         );

//         const zp = ZegoUIKitPrebuilt.create(kitToken);

//         zp.joinRoom({
//             container: element,
//             sharedLinks: [
//                 {
//                     name: 'Copy Link',
//                     url: `${window.location.origin}/room/${roomId}`,
//                 },
//             ],
//             scenario: {
//                 mode: ZegoUIKitPrebuilt.OneONoneCall,
//             },
//         });
//     };

//     return (
//         <div
//             ref={myMeeting}
//             style={{ width: '100vw', height: '100vh' }}
//         />
//     );
// };

// export default VideoCallRoom;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { validateVideoCallAPI } from "@/api/communicationAPI/chatAPI";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../ui/Loader";

const VideoCallRoom: React.FC = () => {
    const { studentInfo } = useSelector((state: RootState) => state.student);
    const { tutorInfo } = useSelector((state: RootState) => state.tutor);
    const [accessGranted, setAccessGranted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { id: roomId } = useParams<{ id: string }>();
    const userInfo = studentInfo || tutorInfo;
    const userType = studentInfo ? 'student' : 'tutor';
    

    useEffect(() => {
        const validateAccess = async () => {
            if (!roomId || !userInfo) {
                const errorMessage = 'User or Room ID not found';
                toast.error(errorMessage);
                setError(errorMessage);
                return;
            }
            const userId = userInfo._id;
            try {
                const response = await validateVideoCallAPI(roomId, userId, userType)

                if (response.data.success) {
                    setAccessGranted(true);
                    toast.success('Access granted!');
                } else {
                    toast.error(response.data.message);
                    setError(response.data.message); 
                }
            } catch (err) {
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data?.message)
                  } else {
                    toast.error("Failed to validate video call access. Please try again!");
                  }
            }
        };

        if (roomId && userInfo) {
            validateAccess();
        }
    }, [roomId, userInfo, userType]);

    const myMeeting = async (element: HTMLDivElement) => {
        if (!accessGranted) return;

        if (!userInfo) {
            setError('User not found');
            return;
        }

        if (!roomId) {
            setError('roomId not found');
            return;
        }

        const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
        const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

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

    // if (error) {
    //     return <div>{error}</div>;
    // }

    if (!accessGranted) {
        return <Loader />;
    }

    return (
        <div
            ref={myMeeting}
            style={{ width: '100vw', height: '100vh' }}
        />
    );
};

export default VideoCallRoom;