import prisma from "libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
    reservationId?: string;
};

export async function DELETE (
    request: Request,
    { params } : { params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }
    
    const {reservationId} = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id}, // Creator reservation
                { listing: { userId: currentUser.id}} // Creator of listing.
            ]
        }
    })
    return NextResponse.json(reservation);
}