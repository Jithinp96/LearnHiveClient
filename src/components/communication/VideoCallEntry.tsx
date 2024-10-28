import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Camera } from 'lucide-react';

const VideoCallEntry = () => {
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();
    
    const handleJoinRoom = useCallback(() => {
        if (roomId.trim()) {
            navigate(`/room/${roomId}`)
            console.log('Joining room:', roomId);
        }
    },[navigate, roomId])

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
        handleJoinRoom();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                        <Camera className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Join Video Call</CardTitle>
                    <CardDescription>Enter a room ID to join an existing call or create a new one</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Enter room ID"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button 
                        onClick={handleJoinRoom} 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={!roomId.trim()}
                    >
                        Join Room
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default VideoCallEntry;