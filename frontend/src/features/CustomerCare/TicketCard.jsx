import React from "react";
import "./TicketCard.css";

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        {/* Ticket ID is moved to the top-left area in the image, but I'll keep it in the footer 
            for logical data grouping and modify the CSS to place it as needed. 
            However, to match the image, I'll place the ID/Priority in a new div in the description area */}
      </div>

      <p className="ticket-title-main">{ticket.title}</p>
      
      {/* Status is now the small tag in the top right of the title area */}
      <span
          className={`status ${ticket.status.replace(/\s+/g, "-").toLowerCase()}`}
        >
          {ticket.status}
      </span>
      
      <p className="ticket-description">{ticket.description}</p>

      <div className="ticket-id-priority">
        <span className="ticket-id">#{ticket.id}</span>
        <span className={`priority ${ticket.priority.toLowerCase()}`}>
          {ticket.priority} PRIORITY
        </span>
      </div>

      <div className="ticket-footer">
        <div className="footer-left">
          <span className="customer">{ticket.customer}</span>
        </div>
        <div className="footer-right">
          <span className="date-group">
            {/* Calendar icon is not a visible SVG in the screenshot, but I'll keep the date structure */}
            <span className="calendar-icon"></span>
            <span className="date-text">{ticket.createdAt}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;