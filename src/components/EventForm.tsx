import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { Moment } from 'moment';
import React, { FC, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import IEvent from '../models/IEvent';
import { IUser } from '../models/IUser';
import { formatDate } from '../utils/date';
import { rules } from '../utils/rules';

interface EventFormProps {
    guests: IUser[];
    submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        guest: '',
        date: '',
        description: '',
    } as IEvent);
    const { user } = useTypedSelector((state) => state.auth);

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({ ...event, date: formatDate(date.toDate()) });
        }
    };

    const submit = () => {
        props.submit({ ...event, author: user.username });
    };

    return (
        <Form onFinish={submit}>
            <Form.Item
                label="Description of an event"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                />
            </Form.Item>
            <Form.Item
                label="Date of an event"
                name="date"
                rules={[rules.required(), rules.isDateAfter("Can't create event to past day")]}
            >
                <DatePicker onChange={(data) => selectDate(data)} />
            </Form.Item>
            <Form.Item label="Guest of an event" name="guests" rules={[rules.required()]}>
                <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
                    {props.guests.map((guest) => (
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default EventForm;
