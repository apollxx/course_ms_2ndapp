import { Publisher, Subjects, ExpirationCompleteEvent } from "@apollxx_tck/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
} 