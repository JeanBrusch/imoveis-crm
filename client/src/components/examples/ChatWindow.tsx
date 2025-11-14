import { ChatWindow } from '../ChatWindow'
import realtorAvatar from '@assets/generated_images/Professional_realtor_portrait_d3a2320f.png'

export default function ChatWindowExample() {
  const mockMessages = [
    {
      id: '1',
      text: 'Hello! I saw your listing for the Modern Luxury Villa. Is it still available?',
      sender: 'client' as const,
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      text: 'Yes, it is! Would you like to schedule a viewing?',
      sender: 'realtor' as const,
      timestamp: new Date(Date.now() - 240000)
    }
  ]

  return (
    <ChatWindow
      isOpen={true}
      onClose={() => console.log('Chat closed')}
      realtorName="Sarah Johnson"
      realtorAvatar={realtorAvatar}
      realtorOnline={true}
      messages={mockMessages}
      onSendMessage={(msg) => console.log('Message sent:', msg)}
    />
  )
}
