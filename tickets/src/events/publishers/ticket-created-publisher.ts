import { Publisher, Subjects, TicketCreatedEvent } from '@apollxx_tck/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}