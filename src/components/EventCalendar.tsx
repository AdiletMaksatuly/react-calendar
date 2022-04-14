import { Calendar } from 'antd';
import { Moment } from 'moment';
import React, { FC } from 'react';
import IEvent from '../models/IEvent';
import { formatDate } from '../utils/date';

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
    function dateCellRender(value: Moment) {
        const formattedDate = formatDate(value.toDate());
        const currentDayEvents = props.events.filter((ev) => ev.date === formattedDate);
        return (
            <div>
                {currentDayEvents.map((ev, index) => {
                    return <div key={index}>{ev.description}</div>;
                })}
            </div>
        );
    }

    return <Calendar dateCellRender={dateCellRender} />;
};

export default EventCalendar;
