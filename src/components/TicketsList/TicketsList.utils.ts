import styles from "./Tickets.module.css";
import { TicketPriority, TicketStatus } from "../../types/Ticket";

export const statusToClassName = {
  [TicketStatus.Backlog]: styles.backlogTicket,
  [TicketStatus.Todo]: styles.todoTicket,
  [TicketStatus.InProgress]: styles.inProgressTicket,
  [TicketStatus.InReview]: styles.inReviewTicket,
  [TicketStatus.Done]: styles.doneTicket,
};

export const priorityToSymbol = {
  [TicketPriority.Low]: "|",
  [TicketPriority.Mid]: "||",
  [TicketPriority.High]: "|||",
  [TicketPriority.Critical]: "||||",
};
