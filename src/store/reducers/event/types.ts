import IEvent from '../../../models/IEvent';
import { IUser } from '../../../models/IUser';

export interface EventState {
    guests: IUser[];
    events: IEvent[];
}

export enum EventActionEnum {
    SET_EVENTS = 'SET_EVENTS',
    SET_GUESTS = 'SET_GUESTS',
}

export interface SetEventsAction {
    type: EventActionEnum.SET_EVENTS;
    payload: IEvent[];
}

export interface SetGuestsAction {
    type: EventActionEnum.SET_GUESTS;
    payload: IUser[];
}

export type EventAction = SetEventsAction | SetGuestsAction;
