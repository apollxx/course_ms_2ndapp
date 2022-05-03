import { OrderCreatedEvent, Publisher, Subjects } from "@apollxx_tck/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}