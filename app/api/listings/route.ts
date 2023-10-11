import prisma from "libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

//Route to create listing with Rent your home on Navbar.s
export async function POST (
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json();
    const {
        category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price,
        title,
        description
    } = body;
    // Object.keys(body).forEach((value:any)=>{
    //     if (!body[value]) {
    //         NextResponse.error();
    //     }
    // })
    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price,10),
            userId: currentUser.id
        }
    });
    return NextResponse.json(listing);
}
