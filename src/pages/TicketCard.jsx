import React from "react";
import "./../assets/css/TicketCard.css";

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h4>{ticket.title}</h4>
        <span
          className={`status ${ticket.status.replace(/\s+/g, "-").toLowerCase()}`}
        >
          {ticket.status}
        </span>
      </div>

      <p className="ticket-description">{ticket.description}</p>

      <div className="ticket-footer">
        <div className="footer-left">
          <span className="ticket-id">#{ticket.id}</span>
          <span className={`priority ${ticket.priority.toLowerCase()}`}>
            {ticket.priority} PRIORITY
          </span>
        </div>
        <div className="footer-right">
          <span className="customer">{ticket.customer}</span>
          <span className="date-group">
            <span className="calendar-icon"></span>
            <span className="date-text">{ticket.createdAt}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;