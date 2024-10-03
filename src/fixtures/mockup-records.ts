import { Ticket, TicketPriority, TicketStatus } from "../types/Ticket";

const subjects = [
  "Concrete Pouring Schedule",
  "Steel Beam Installation",
  "Site Safety Review",
  "Foundation Excavation",
  "Roofing Installation",
  "Electrical Wiring",
  "Plumbing Setup",
  "Landscaping Plans",
  "Surveying Land",
  "Final Inspection",
];
const subjectsCount = subjects.length;

const statuses: TicketStatus[] = [
  TicketStatus.Backlog,
  TicketStatus.Todo,
  TicketStatus.InProgress,
  TicketStatus.InReview,
  TicketStatus.Done,
];
const statusesCount = statuses.length;

const priorities: TicketPriority[] = [1, 2, 3, 4];
const prioritiesCount = priorities.length;

const randomize = (count = 1) => Math.floor(Math.random() * count);

const randomTickets: Ticket[] = Array.from({ length: 50000 }, (_, index) => {
  const id = index + 1;
  const subject = `${subjects[randomize(subjectsCount)]} #${id}`;
  const descriptionPart = `This is a description for ${subject}.`;
  const description = Array.from({ length: 3 }).fill(descriptionPart).join(" ");

  return {
    id,
    subject,
    priority: priorities[randomize(prioritiesCount)],
    status: statuses[randomize(statusesCount)],
    description,
  };
});

export default randomTickets;
