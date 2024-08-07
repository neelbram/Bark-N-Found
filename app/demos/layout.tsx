import WebsiteScreen from '@/app/components/website-screen';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode[];
}

export default function Layout({ children }: Props) {
  return (
    <WebsiteScreen>
      {children}
    </WebsiteScreen>
  )
}
