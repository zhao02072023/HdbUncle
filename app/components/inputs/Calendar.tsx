'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface CalendarProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[]
}

const Calendar : React.FC<CalendarProps> = ({
    value, onChange, disabledDates
}) => {

    const options = {   
    }
  return (
    <DateRange
        rangeColors = {["#262626"]}
        ranges = {[value]}
        date = {new Date()}
        direction = "vertical"
        showDateDisplay = {false}
        minDate = {new Date()}
        onChange={onChange}
        disabledDates={disabledDates}/>
  )
}

export default Calendar;