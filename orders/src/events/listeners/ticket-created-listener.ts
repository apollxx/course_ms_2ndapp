import { Message } from "node-nats-streaming"
import { Subjects, Listener, TicketCreatedEvent } from "@apollxx_tck/common"
import { Ticket } from "../../models/ticket"
import { queuGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName: string = queuGroupName;

    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        const { id, title, price } = data
        const ticket = Ticket.build({
            id, title, price
        })
        await ticket.save()

        msg.ack();
    }
}