'use client';

import {useRouter} from "next/navigation";
import { SafeUser } from '@/types';
import Container from "../Container";
import Searchbar from "./Searchbar";
import UserMenu from "./Usermenu";
import Categories from "./Categories";

interface NavbarProps {
    currentUser?: SafeUser | null;
};

const Navbar : React.FC<NavbarProps> = ({currentUser}) => {
    const router = useRouter();
    // console.log({currentUser})
    return (
      <div className="fixed w-full bg-white z-10 shadow-sm">
          <div className="py-4 border-b-[1px]">
              <Container>
                  <div className="
                  flex
                  flex-row
                  items-center
                  justify-between
                  gap-3
                  md:gap-0">
                      {/* LOGO */}
                      <div onClick = {() =>router.push('/')}
                        className="flex items-center">
                        <svg className="
                        hidden
                        md:block
                        cursor-pointer transition duration-200"
                        width="40"
                        height="40"
                        viewBox="0 0 256 276"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid">
                        <path
                        d="M238 223.1a41 41 0 01-46 35c-7-.8-13.8-3-21-7.1-10-5.5-19.8-14-31.4-26.8 18.2-22.3 29.2-42.7 33.4-61 1.9-8.5 2.2-16.2 1.3-23.4a44.7 44.7 0 00-7.4-18.7 46.5 46.5 0 00-38.9-19.6c-16 0-30.3 7.4-38.9 19.6a44.8 44.8 0 00-7.4 18.7 57.3 57.3 0 001.3 23.5c4.2 18.2 15.5 38.9 33.4 61.2A123.8 123.8 0 0185 251.3c-7.2 4.1-14.1 6.3-21 7.1a41 41 0 01-46-35c-.9-6.9-.3-13.8 2.4-21.5.9-2.8 2.2-5.5 3.6-8.8l6.4-13.8.2-.6c19-41 39.5-83 60.7-123.8l.8-1.7 6.7-12.7c2.2-4.4 4.6-8.5 7.7-12a28.8 28.8 0 0144.1 0c3 3.5 5.5 7.6 7.7 12 2.2 4.2 4.4 8.6 6.7 12.7l.8 1.7c21 41 41.4 83 60.4 124.1v.3c2.2 4.4 4.1 9.4 6.3 13.8 1.4 3.3 2.8 6 3.6 8.8 2.2 7.2 3 14 2 21.2zm-110-13c-14.9-18.7-24.6-36.3-27.9-51.2a44.5 44.5 0 01-.8-16.9c.6-4.4 2.2-8.2 4.4-11.5 5.3-7.5 14-12.2 24.3-12.2 10.2 0 19.3 4.4 24.3 12.2 2.2 3.3 3.8 7.1 4.4 11.5.8 5 .5 10.8-.8 16.9-3.4 14.6-13 32.2-27.9 51.3zm124.4-14.3l-4.2-10-6.3-14-.3-.2c-19-41.4-39.4-83.3-61-124.7l-.8-1.7c-2.2-4.1-4.4-8.5-6.6-13-2.7-4.9-5.5-10.1-9.9-15.1a44.5 44.5 0 00-35-17.1C114.5 0 102 6 93 16.6a95 95 0 00-10 15.1l-6.6 13-.8 1.6c-21.2 41.4-42 83.3-61 124.7l-.2.6-6.4 14c-1.4 3-2.7 6.4-4.1 10a58.6 58.6 0 0062 79.4 72.8 72.8 0 0027.6-9.4c11.3-6.3 22-15.4 34.2-28.7a144.9 144.9 0 0034.2 28.7 72.9 72.9 0 0034.8 10 58.5 58.5 0 0058.2-50.2 52.1 52.1 0 00-2.5-29.6z"
                        fill="currentColor"
                        />
                        </svg>
                        <span className="font-semibold text-lg ml-2.5 cursor-pointer transition duration-200">HDBUNCLE</span>
                      </div>
                      {/* MIDDLE */}
                      <Searchbar/>
                      {/* RIGHT */}
                      <UserMenu currentUser= {currentUser}/>
                  </div>
              </Container>
          </div>
          <Categories />
      </div>
    )
  }
  
  export default Navbar;