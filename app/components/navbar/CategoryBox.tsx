'use client';

import { IconType } from "react-icons"
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback} from "react";
import querystring from "query-string"

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;
}

const CategoryBox : React.FC<CategoryBoxProps> = ({icon: Icon, label, selected}) => {
    const router = useRouter();
    const params = useSearchParams();

    // Logic for clicking on categorybox
    const handleClick = useCallback(()=> {
        let currentQuery = {}
        // Parse params into an object
        if (params) {
            currentQuery = querystring.parse(params.toString());
        }
        // Spread currentQuery and add new category inside
        const updatedQuery : any = {
            ...currentQuery,
            category: label
        }
        // Check if category had already been selected and deselect if so.
        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        const url = querystring.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true});

        router.push(url);
    }, [label, params, router]) // Dependencies

    return (
    <div onClick={handleClick} 
        className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover: text-neutral-800
        transition
        cursor-pointer
        ${selected ? `border-b-neutral-800` : 'border-transparent'}
        ${selected ? `text-neutral-800` : 'text-neutral-500'}
        `}>
            <Icon size={26} />
            <div className="font-medium text-sm">
                {label}
            </div>
    </div>
  )
}

export default CategoryBox