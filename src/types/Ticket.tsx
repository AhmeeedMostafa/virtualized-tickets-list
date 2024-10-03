export enum TicketPriority {
  Low = 1,
  Mid = 2,
  High = 3,
  Critical = 4
}

export enum TicketStatus {
  Backlog = "backlog",
  Todo = "todo",
  InProgress = "in-progress",
  InReview = "in-review",
  Done = "done"
}

export type Ticket = {
  id: number,
  subject: string,
  priority: TicketPriority,
  status: TicketStatus,
  description: string,
}
