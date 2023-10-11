'use client';

import {Range} from 'react-date-range';
import Calendar from '../inputs/Calendar';
import { differenceInCalendarDays } from 'date-fns';
import Button from '../Button';

interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: ()=> void;
    disabled?: boolean;
    disabledDates: Date[]
}

const ListingReservation : React.FC<ListingReservationProps> = ({
    price,dateRange,totalPrice,onChangeDate,onSubmit,disabled,disabledDates}) => {
    
    
    // const dayCount = differenceInCalendarDays( // Ignores time difference when counting days
    //         dateRange.endDate,
    //         dateRange.startDate,
    //     );
  return (
    <div className="
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden">
        <div className="
            flex flex-row items-center gap-1 p-4">
            <div className="text-2xl font-semibold">
                S${price.toLocaleString('en-US')}
            </div>
            <div className="font-light text-neutral-600">
                
            </div>
        </div>
        <hr/>
        <Calendar 
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => onChangeDate(value.selection)}/>
        <hr/>
        <div className="p-4">
            <Button disabled={disabled} label="Reserve" onClick={onSubmit}/>
        </div>
        <div className="
            p-4
            flex
             flex-row
             items-center
             justify-between
             font-semibold
             text-lg">
            <div>
                Total for {2} days
            </div>
            <div>
                S$ {totalPrice.toLocaleString('en-US')}
            </div>
        </div>
    </div>
  );
}

export default ListingReservation;