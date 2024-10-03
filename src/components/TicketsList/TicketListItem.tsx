import { Ticket, TicketPriority } from "../../types/Ticket"
import styles from './Tickets.module.css'
import { priorityToSymbol, statusToClassName } from "./TicketsList.utils";

type MyProps = { item: Ticket, height: number, index: number }

function TicketListItem ({ item: ticket, height, index } : MyProps) {
  if (!ticket) { return null; }

  const { subject, priority, status, description} = ticket

  const priorityClassName = [styles.ticketPriority, `${styles[`ticketPriority${priority}`]}`].join(' ')
  const statusClassName = [styles.ticketStatus, statusToClassName[status]].join(' ')

  return (
    <div className={styles.ticketListItem} style={{ height }} data-testid={index + 1}>
      <div className={styles.ticketInfoBlock}>
        <div className={styles.ticketTitleWithPriority}>
          <span
              className={priorityClassName}
              title={`${TicketPriority[priority]} priority`}
            >
              {priorityToSymbol[priority]}
          </span>
          <h3>{subject}</h3>
        </div>
        <span className={statusClassName}>{status}</span>
      </div>
      <p>{description}</p>
    </div>
  )
}

export default TicketListItem

