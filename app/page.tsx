'use client'
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation'; // Use usePathname
import Link from 'next/link';

// Assuming these components require dynamic imports
const DynamicLoginScreen = dynamic(() => import('./pages/open-screen'), { ssr: false });
const DynamicCreateAccount = dynamic(() => import('./create-account/page'), { ssr: false });
const DynamicSigninPage = dynamic(() => import('./signin/page'), { ssr: false });
const DynamicMapPage = dynamic(() => import('./map-page/page'), { ssr: false });
const DynamicLostPage = dynamic(() => import('./lost-page/page'), { ssr: false });
const DynamicFoundPage = dynamic(() => import('./found-page/page'), { ssr: false });
const DynamicProfileLost = dynamic(() => import('./profile-lost/[id]/page'), { ssr: false });

export default function Page() {
  const pathname = usePathname(); // Get the current path using usePathname

  switch (pathname) {
    case '/':
      return <DynamicLoginScreen />;
    case '/create-account':
      return <DynamicCreateAccount />;
    case '/signin':
      return <DynamicSigninPage />;
    case '/map-page':
      return <DynamicMapPage />;
    case '/lost-page':
      return <DynamicLostPage />;
    case '/found-page':
      return <DynamicFoundPage />;
    case '/profile-lost/[id]':
      return <DynamicProfileLost />;
    default:
      return <div>Page Not Found</div>;
  }
}
