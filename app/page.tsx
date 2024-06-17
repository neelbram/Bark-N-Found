import LoginScreen from '@/app/pages/open-screen';
import CreateAccount from '@/app/pages/create-account';
import { COURSE_WELCOME_TEXT } from '@/lib/config';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>   
        {/* <LoginScreen></LoginScreen> */}
        <CreateAccount></CreateAccount>
    </div>
  )
}
