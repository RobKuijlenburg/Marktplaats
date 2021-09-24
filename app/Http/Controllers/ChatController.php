<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\ChatMessage;
use App\Models\ChatRoom;
use Illuminate\Support\Facades\Auth;
use App\Events\NewChatMessage;
use Carbon\Carbon;

class ChatController extends Controller
{
    public function rooms( Request $request ){
        return response()->json([
            'rooms' => ChatRoom::all()
        ]);
    }

    public function messages( Request $request, $roomId ){
        return response()->json([
            'messages' => ChatMessage::where('chat_room_id', $roomId)
            ->with('user')
            ->orderBy('created_at', 'DESC')
            ->get()
        ]);
    }

    public function newMessage( Request $request, $roomId ){
        $newMessage = new ChatMessage;
        $newMessage->user_id = Auth::id();
        $newMessage->chat_room_id = $roomId;
        $newMessage->message = $request->message;
        // dd($newMessage);
        $newMessage->save();

        broadcast(new NewChatMessage( $newMessage ))->toOthers();

        return $newMessage;
    }

    public function newRoom( Request $request ){
        $newRoom = $request;
        dd($newRoom);
        $newRoom->user_id = Auth::id();
        $newRoom->save();

        return $newRoom;
    }
}
