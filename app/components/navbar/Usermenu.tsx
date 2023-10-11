'use client';
import { SafeUser } from '@/types';
import {useState, useCallback, useEffect, useRef} from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import Avatar from 'components/Avatar';
import MenuItem from 'components/navbar/MenuItem';
import useRegisterModal from 'hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import {signOut} from 'next-auth/react';
import { BiGlobe } from "react-icons/bi";
import useRentModal from '@/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu : React.FC<UserMenuProps> = ({currentUser}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(()=> {
        setIsOpen((value) => !value);
    },[]);

    // Close UserMenu onClick outside container.
    let userMenuRef = useRef<HTMLDivElement>(null);
    useEffect(()=> {
        let handler = (event : MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    });

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);
    
    return (
    <div className="relative" ref={userMenuRef}>
        <div className="
        flex
        flex-row
        items-center
        gap-3">
            <div onClick={onRent}
                className="
                hidden
                md:block
                text-sm
                font-semibold
                py-3
                px-4
                rounded-full
                bg-white
                hover:shadow-md
                transition
                cursor-pointer">
                    Rent your home
            </div>
            <div className="
                rounded-full
                border-0 p-2
                hover: shadow-md
                transition
                cursor-pointer
                ">
                <BiGlobe size={24}/>
            </div>
            
            {/* <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === 'dark'? (<DarkModeOutlined sx={{fontSize:"25px"}}/>) :(<LightModeOutlined sx={{fontSize:"25px"}}/>)}
            </IconButton>
            <IconButton>
                <LanguageOutlined/>
            </IconButton> */}
            <div onClick={toggleOpen}
                className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition">
                <AiOutlineMenu onClick={()=> {}}/>
                <div className="
                    hidden md:block">
                    <Avatar user={currentUser?.image}/>
                </div>
            </div>
        </div>
        {isOpen && (
            <div className="
                absolute
                rounded
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm">
                <div className="
                    flex
                    flex-col
                    cursor-pointer">
                    {currentUser ? (
                        <>
                        <MenuItem onClick = {()=>router.push("/favourites")} label="My favourites"/>
                        <MenuItem onClick = {()=>router.push("/reservations")} label="My reservations"/>
                        <MenuItem onClick = {()=>router.push("/trips")} label="My trips"/>
                        <MenuItem onClick = {rentModal.onOpen} label="Rent your home"/>
                        <hr/>
                        <MenuItem onClick = {()=> signOut()} label="Logout"/>
                        </>
                    ) : (
                        <>
                        <MenuItem onClick = {registerModal.onOpen} label="Sign up"/>
                        <MenuItem onClick = {(loginModal.onOpen)} label="Log in"/>
                        </>
                    )}
                        
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu;