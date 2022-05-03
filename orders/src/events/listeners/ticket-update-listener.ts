import { Message } from "node-nats-streaming"
import { Subjects, Listener, TicketUpdateddEvent } from "@apollxx_tck/common"
import { Ticket } from "../../models/ticket"
import { queuGroupName } from "./queue-group-name"

export class TicketUpdatedListener extends Listener<TicketUpdateddEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated
    queueGroupName: string = queuGroupName

    async onMessage(data: TicketUpdateddEvent['data'], msg: Message) {
        const ticket = await Ticket.findByEvent(data)

        if (!ticket) {
            throw new Error('Ticket not found')
        }

        const { title, price } = data
        ticket.set({ title, price })
        await ticket.save();

        msg.ack()
    }
}