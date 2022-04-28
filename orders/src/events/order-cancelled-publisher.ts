import { OrderCancelledEvent, Publisher, Subjects } from "@apollxx_tck/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}