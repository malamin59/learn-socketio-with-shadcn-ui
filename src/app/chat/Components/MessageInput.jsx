"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
export default function MessageInput({ message, setMessage, sendMessage}) {
  return (
     <div className="flex mt-2 items-start space-x-2">
        <Textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1  min-h-[36px] max-h-32 resize-none"
        />
        <Button onClick={sendMessage}> send </Button>
      </div>
  )
}
