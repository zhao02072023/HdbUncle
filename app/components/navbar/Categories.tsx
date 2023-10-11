'use client';

import {usePathname, useSearchParams} from "next/navigation";
import Container from "../Container"
import CategoryBox from "./CategoryBox";
import {TbBeach, TbTrees, TbShoppingCart, TbBuildingPavilion, TbBuildingMosque, TbBuildingHospital,TbPhotoHeart
         } from 'react-icons/tb';
import {MdOutlineVilla, MdOutlineEmojiTransportation, MdOutlineSchool } from 'react-icons/md';
import { IoFastFoodOutline } from 'react-icons/io5';
import {PiParkDuotone, PiKey, PiChurch} from 'react-icons/pi';
import {GiModernCity} from 'react-icons/gi';
import {CgTrees} from 'react-icons/cg';

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    // Hide this categoty bar if not on main page.
    const isMainPage = pathname === '/'
    if (!isMainPage) {
        return null;
    }

    return (
    <Container>
        <div className="
            pt-4
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto">
                {categories.map((item)=>(
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label} // 
                        icon={item.icon}
                    />
                ))}
        </div>
    </Container>

  )
}

export const categories = [
    
    {
        label: 'New',
        icon: PiKey,
        description: 'This property is brand new and luxurious!'
        },
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to beach!'
        },
    {
        label: 'Design',
        icon: MdOutlineVilla,
        description: 'This property has a modern design!'
        },
    {
        label: 'Amazing view',
        icon: TbPhotoHeart,
        description: 'This property has an amazing view!'
        },
    {
        label: 'Skyscrapper',
        icon: GiModernCity,
        description: 'This property is a skyscrapper!'
        }, 
    {
        label: 'Greenery',
        icon: CgTrees,
        description: 'This property is has lots of greenery!'
        },
    {
        label: 'Schools',
        icon: MdOutlineSchool,
        description: 'This property is close to good schools!'
    },
    {
        label: 'Mosque',
        icon: TbBuildingMosque,
        description: 'This property is close to a Mosque!'
        },
    {
        label: 'Temple',
        icon: TbBuildingPavilion,
        description: 'This property is close to a temple!'
        },
    {
        label: 'Church',
        icon: PiChurch,
        description: 'This property is close to a church!'
        },
    {
        label: 'Hospital',
        icon: TbBuildingHospital,
        description: 'This property is close to a hospital!'
        },
    
    {
        label: 'Parks',
        icon: PiParkDuotone,
        description: 'This property is close to parks!'
        },
    {
        label: 'Shopping',
        icon: TbShoppingCart,
        description: 'This property is close to shopping!'
        },
    {
        label: 'Food',
        icon: IoFastFoodOutline,
        description: 'This property is close to famous food!'
        },
]

export default Categories