import React, { useState } from "react";
import ticketsData from "./tickets.json";
import TicketCard from "./TicketCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CustomerService.css";

import inProgressImage from "./img/vector1.png";
import resolvedImage from "./img/vector1.png";

const CustomerService = () => {
  const [tickets, setTickets] = useState(ticketsData);
  const [inProgress, setInProgress] = useState([]);
  const [resolved, setResolved] = useState([]);

  const [showAllTickets, setShowAllTickets] = useState(false);
  const MAX_VISIBLE_TICKETS = 10;

  const [showAllInProgress, setShowAllInProgress] = useState(false);
  const MAX_VISIBLE_IN_PROGRESS = 5;

  const [showAllResolved, setShowAllResolved] = useState(false);
  const MAX_VISIBLE_RESOLVED = 5;

  const handleAddToTask = (ticket) => {
    if (!inProgress.find((t) => t.id === ticket.id)) {
      const updatedTicket = { ...ticket, status: "In-Progress" };
      setInProgress([...inProgress, updatedTicket]);

      const updatedTicketsList = tickets.map((t) =>
        t.id === ticket.id ? { ...t, status: "In-Progress" } : t
      );
      setTickets(updatedTicketsList);
      toast.info(`Ticket "${ticket.title}" moved to In-Progress`);
    }
  };

  const handleComplete = (ticket) => {
    setInProgress(inProgress.filter((t) => t.id !== ticket.id));
    setTickets(tickets.filter((t) => t.id !== ticket.id));
    const resolvedTicket = { ...ticket, status: "Resolved" };
    setResolved([...resolved, resolvedTicket]);
    toast.success(`Ticket "${ticket.title}" resolved`);
  };

  const displayedTickets = showAllTickets
    ? tickets
    : tickets.slice(0, MAX_VISIBLE_TICKETS);
  const shouldShowToggleButton = tickets.length > MAX_VISIBLE_TICKETS;

  const displayedInProgress = showAllInProgress
    ? inProgress
    : inProgress.slice(0, MAX_VISIBLE_IN_PROGRESS);

  const displayedResolved = showAllResolved
    ? resolved
    : resolved.slice(0, MAX_VISIBLE_RESOLVED);

  const noTicketsAvailable = tickets.length === 0;
  const noTasksInProgress = inProgress.length === 0;
  const noResolvedTasks = resolved.length === 0;

  return (
    <main className="main-section">
      <div className="banner">
        <div
          className="stat purple"
          style={{
            backgroundImage: `url(${inProgressImage}), linear-gradient(135deg, #8a3ffc, #6a1b9a)`,
          }}
        >
          <h2>In-Progress</h2>
          <p>{inProgress.length}</p>
        </div>
        <div
          className="stat green"
          style={{
            backgroundImage: `url(${resolvedImage}), linear-gradient(135deg, #2ecc71, #27ae60)`,
          }}
        >
          <h2>Resolved</h2>
          <p>{resolved.length}</p>
        </div>
      </div>
      {/* --- */}
      <div className="content">
        <div className="tickets">
          <h3 className="tickets-title">Customer Tickets</h3>

          {noTicketsAvailable ? (
            <p className="no-tickets-message">
              Smooth sailing. No outstanding customer issues at the moment.
            </p>
          ) : (
            <>
              <div className="tickets-grid">
                {displayedTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => handleAddToTask(ticket)}
                    className="ticket-card-container"
                  >
                    <TicketCard ticket={ticket} />
                  </div>
                ))}
              </div>

              {shouldShowToggleButton && (
                <button
                  className={
                    showAllTickets
                      ? "toggle-tickets-btn hide-btn"
                      : "toggle-tickets-btn view-all-btn"
                  }
                  onClick={() => setShowAllTickets(!showAllTickets)}
                >
                  {showAllTickets ? "Hide" : "View All"}
                </button>
              )}
            </>
          )}
        </div>
        {/* --- */}
        <div className="task-status">
          <h3>Task Status</h3>

          {noTasksInProgress ? (
            <p className="task-empty-message">
              Select a ticket to add to Task Status
            </p>
          ) : (
            <>
              {displayedInProgress.map((ticket) => (
                <div key={ticket.id} className="task-card">
                  <p className="task-title-text">{ticket.title}</p>
                  <button
                    className="complete-btn"
                    onClick={() => handleComplete(ticket)}
                  >
                    Complete
                  </button>
                </div>
              ))}

              {inProgress.length > MAX_VISIBLE_IN_PROGRESS && (
                <button
                  className={
                    showAllInProgress
                      ? "toggle-tickets-btn hide-btn"
                      : "toggle-tickets-btn view-all-btn"
                  }
                  onClick={() => setShowAllInProgress(!showAllInProgress)}
                >
                  {showAllInProgress ? "Hide" : "View All"}
                </button>
              )}
            </>
          )}

          <div className="resolved-section">
            <h3>Resolved Task</h3>

            {noResolvedTasks ? (
              <p className="resolved-empty-message">No resolved tasks yet.</p>
            ) : (
              <>
                {displayedResolved.map((ticket) => (
                  <p key={ticket.id} className="resolved-item">
                    {ticket.title}
                  </p>
                ))}

                {resolved.length > MAX_VISIBLE_RESOLVED && (
                  <button
                    className={
                      showAllResolved
                        ? "toggle-tickets-btn hide-btn"
                        : "toggle-tickets-btn view-all-btn"
                    }
                    onClick={() => setShowAllResolved(!showAllResolved)}
                  >
                    {showAllResolved ? "Hide" : "View All"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-center" autoClose={2000} />
    </main>
  );
};

export default CustomerService;