import { Message } from 'node-nats-streaming'
import { Listener, OrderCancelledEvent, Subjects } from "@apollxx_tck/common"
import { queueGroupName } from "./queue-group-name"
import { Ticket } from '../../models/ticket'
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher'


export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
    queueGroupName: string = queueGroupName

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id)

        if (!ticket) {
            throw new Error('Ticket not found')
        }

        ticket.set({ orderId: undefined })
        await ticket.save()

        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            orderId: ticket.orderId,
            userdId: ticket.userId,
            price: ticket.price,
            title: ticket.title,
            version: ticket.version
        })

        msg.ack()
    }
}