import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'QueueLess | Your time. Your turn.',description:'Plan a government-office visit with virtual tokens and protected arrival windows. Gujarati, Hindi and English.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="gu"><body>{children}</body></html>}
