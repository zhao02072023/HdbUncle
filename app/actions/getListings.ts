
import prisma from 'libs/prismadb';

export default async function getListing() {
    try {
        const listings = await prisma?.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch(error:any) {
        throw new Error(error);
    }
};

// No need to create api route...?