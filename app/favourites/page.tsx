import getCurrentUser from "@/actions/getCurrentUser";
import getFavouriteListings from "@/actions/getFavouriteListings";
import EmptyState from "@/components/EmptyState";
import FavouriteClient from "./FavouriteClient";


const FavouritePage = async () => {
    const listings = await getFavouriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <EmptyState title="No favourites found" subtitle="Looks like you don't have any favourite listings."/>
        )
    }

    return (
        <FavouriteClient 
            listings={listings}
            currentUser={currentUser}
            />
    )
}

export default FavouritePage;