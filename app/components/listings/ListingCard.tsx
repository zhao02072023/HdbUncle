'use client';

import useCountries from "@/hooks/useCountries";
import { SafeUser, SafeListing, SafeReservation } from "@/types";
import {Reservation} from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {format} from 'date-fns';
import Image from 'next/image';
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
};


const ListingCard : React.FC<ListingCardProps>= ({
    data, reservation, onAction, disabled,actionLabel,actionId = '',currentUser}) => {
    const router = useRouter();
    const {getByValue} = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]
    )
    
    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price])

    const reservationDate = useMemo(()=>{
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${(format(end, 'PP'))}`
    },[reservation])

    return (
    <div onClick={()=> router.push(`/listings/${data.id}`)} // Push to individual listings page.
        className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image 
                        fill
                        className="object-cover h-full w-full group-hover:scale-110 transition duration-200 ease-out"
                        alt='listing'
                        src={data.imageSrc}/>
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}/>
                    </div>
                </div>
                {/* LABEL */}
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        S${price.toLocaleString('en-US')}
                    </div>
                    {!reservation && (
                        <div className="font-light"></div>
                    )}
                    {onAction && actionLabel && (
                        <Button 
                            disabled={disabled}
                            small
                            label={actionLabel}
                            onClick={handleCancel}/>
                    )}
                </div>
            </div>
    </div>
  );
}

export default ListingCard;