
import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/actions/getReservations";

// Page for individual listings
interface IParams {
  listingId?: string;
}
// Server component cannot use hooks. 5:50
const ListingPage = async({params} : {params: IParams}) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <EmptyState/>
    )
  }
  return (
    <div>
      <ListingClient 
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}/>
    </div>
  )
}

export default ListingPage;