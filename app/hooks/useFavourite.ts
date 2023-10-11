import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { SafeUser } from '@/types';
import useLoginModal from './useLoginModal';


interface IUseFavourite {
    listingId: string;
    currentUser?: SafeUser | null;
};

const useFavourite = ({
    listingId,
    currentUser
}: IUseFavourite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavourited = useMemo(()=>{
        const list = currentUser?.favouriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);
    // Function to toggle favourite button on/off
    const toggleFavourite = useCallback(async (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        event.stopPropagation();
        // Open loginModal if user is not signed when favouriting
        if (!currentUser) {
            return loginModal.onOpen();
        }

        // Delete favourite tag if already favourited. Else, add favourite tag.
        try {
            let request;

            if (hasFavourited) {
                request = () => axios.delete(`/api/favourites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favourites/${listingId}`);
            }
            
            await request();
            router.refresh();
            toast.success('Success');
        } catch (error) {
            toast.error('Something went wrong!');
        }
    },[currentUser, hasFavourited, listingId, loginModal, router]);

    return {
        hasFavourited,
        toggleFavourite
    }
};

export default useFavourite;