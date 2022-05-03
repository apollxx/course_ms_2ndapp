import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@apollxx_tck/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";


export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated
    queueGroupName = queueGroupName

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id)

        if (!ticket) {
            throw new Error('ticket not found')
        }

        ticket.set({ orderId: data.id });

        await ticket.save();
        new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userdId: ticket.userId,
            orderId: ticket.orderId,
            version: ticket.version
        });

        msg.ack()
    }
}