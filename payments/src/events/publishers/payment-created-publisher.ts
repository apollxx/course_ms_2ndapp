import { Subjects, Publisher, PaymentCreatedEvent } from "@apollxx_tck/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}