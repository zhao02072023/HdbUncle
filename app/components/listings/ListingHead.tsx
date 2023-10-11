'use client';

import { SafeUser } from "@/types";
import useCountries from "@/hooks/useCountries";
import ModalHeader from "../ModalHeader";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead : React.FC<ListingHeadProps>= ({
    title, imageSrc, locationValue, id, currentUser}) => {
        const {getByValue} = useCountries();
        const location = getByValue(locationValue);

  return (
    <>
        <ModalHeader title={title} subtitle={`${location?.region}, ${location?.label}`}/>
        <div className="
            w-full
            h-[60vh]
            overflow-hidden
            rounded-xl
            relative">
            <Image src={imageSrc} alt="Image" className="object-cover w-full" fill/>
            <div className="absolute top-5 right-5">
                <HeartButton listingId={id} currentUser={currentUser}/>
            </div>
        </div>
    </>
    
  )
}

export default ListingHead;