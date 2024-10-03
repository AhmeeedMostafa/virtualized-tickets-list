import { useEffect, useState } from "react";

import mockupRecords from '../../fixtures/mockup-records'
import { Ticket } from "../../types/Ticket";
import VirtualList from "../common/VirtualList";
import TicketListItem from "./TicketListItem";
import styles from './Tickets.module.css'
import Loader from "../common/Loader";

function TicketsList ({ initialTicketIndex = 0 }) {
  const [isLoading, setIsLoading] = useState(true)
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    setTimeout(() => {
      setTickets(mockupRecords)
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (tickets.length === 0) {
    return <div>No tickets are there anymore, good job 🙌🏽</div>
  }

  return (
    <div className={styles.ticketsList}>
      <VirtualList keyProp="id" items={tickets} ListItem={TicketListItem} itemHeight={80} initialIndex={initialTicketIndex} />
    </div>
  )
}

export default TicketsList
