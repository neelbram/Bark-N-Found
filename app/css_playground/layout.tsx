import { Noto_Sans_Hebrew, Noto_Serif_Hebrew } from 'next/font/google';
import type { ReactNode } from 'react';
import styles from './page.module.css'
import '@/globals.css';

const noto_sans = Noto_Sans_Hebrew({
  weight: ['500', '900'],
  subsets: ['hebrew'],
  fallback: ['system-ui', 'arial'],
  variable: '--font-noto-sans',
});

const noto_serif = Noto_Serif_Hebrew({
  weight: ['500', '900'],
  subsets: ['hebrew'],
  fallback: ['system-ui', 'arial'],
  variable: '--font-noto-serif',
});

const fontClassName = `${noto_sans.variable} ${noto_serif.variable}`

interface Props {
  children: ReactNode[]
}

export default function Layout({ children }: Props) {
  return (
    <div dir="ltr" id="mainCSS" className={fontClassName}>
    <div className="containerCSS fullheight">
      {children}
    </div>
  </div>
  )
}
