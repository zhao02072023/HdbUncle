import prisma from "libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
    listingId?: string;
}

export async function POST (
    //Method => cannot declare default
    request: Request,
    {params} : { params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;
    if (!listingId || typeof listingId !== 'string') {
        throw new Error("invalid ID");
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])];

    favouriteIds.push(listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds : favouriteIds
        }
    });
    return NextResponse.json(user);
};


export async function DELETE(
    //Method
    request: Request,
    { params } : { params: IParams}
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])];

    favouriteIds = favouriteIds.filter((id) => id !== listingId);
    
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds : favouriteIds
        }
    });
    return NextResponse.json(user);

} 