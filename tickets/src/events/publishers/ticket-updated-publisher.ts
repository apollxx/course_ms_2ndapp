import { Publisher, Subjects, TicketUpdateddEvent } from '@apollxx_tck/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdateddEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}