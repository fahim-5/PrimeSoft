import React, { useState, useEffect, useMemo, useCallback } from "react";
import TicketCard from "./TicketCard";
import { ToastContainer, toast } from "react-toastify";
import "./CustomerService.css";

// Assuming vector1.png is the decorative element from the image.
import vectorImage from "./img/vector1.png"; 

// =================================================================
// API Configuration
// =================================================================
// Adjust port if your backend runs elsewhere
const API_BASE_URL = "http://localhost:5000/api/v1/tickets";

// Helper function to normalize status for comparison (lowercase and trim)
const normalizeStatus = (status) => (status ? status.toLowerCase().trim() : '');


const CustomerService = () => {
  // State now holds ALL tickets fetched from the backend
  const [allTickets, setAllTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // =================================================================
  // API Fetching Logic
  // =================================================================

  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      
      // The API response is structured as: { status: 'success', data: { tickets: [...] } }
      setAllTickets(data.data.tickets || []);
      toast.info("Tickets loaded successfully!");
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error(`Failed to load tickets: ${error.message}`);
      setAllTickets([]); // Clear data on failure
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch tickets on initial component mount
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);


  // =================================================================
  // Derived State (Filtered Lists)
  // We use useMemo to optimize filtering only when allTickets changes
  // NOW USING normalizeStatus() FOR ROBUSTNESS
  // =================================================================

  const openTickets = useMemo(() => 
    allTickets.filter(t => {
        const status = normalizeStatus(t.status);
        // Expecting lowercase status values from API: 'open' or 'awaiting customer'
        // This list will also include 'in progress' tickets because the main column
        // in the image displays all customer tickets, regardless of status, *except* resolved ones.
        // However, based on the original code logic, I'll keep it as open/awaiting.
        return status === "open" || status === "awaiting customer";
    })
  , [allTickets]);

  const inProgressTickets = useMemo(() => 
    allTickets.filter(t => 
      // Expecting lowercase status values from API: 'in progress'
      normalizeStatus(t.status) === "in progress"
    )
  , [allTickets]);
  
  const resolvedTickets = useMemo(() => 
    allTickets.filter(t => {
        const status = normalizeStatus(t.status);
        // Expecting lowercase status values from API: 'resolved' or 'closed'
        return status === "resolved" || status === "closed";
    })
  , [allTickets]);


  // =================================================================
  // API Update Logic
  // =================================================================

  const updateTicketStatus = async (ticketId, newStatus, successMessage) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        // The API backend should handle this case-insensitively, 
        // but we send the normalized string for consistency.
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update ticket status (${response.status})`);
      }

      // Re-fetch all tickets to get the single source of truth updated state
      await fetchTickets(); 
      toast.success(successMessage);

    } catch (error) {
      console.error("Error updating ticket status:", error);
      toast.error(`Failed to update ticket: ${error.message}`);
    }
  };


  const handleAddToTask = (ticket) => {
    // Check if it's already in progress based on the current derived list
    if (inProgressTickets.some((t) => t._id === ticket._id)) {
      toast.warn(`Ticket "${ticket.title}" is already In-Progress.`);
      return;
    }
    
    // --- FIX: Send lowercase status for consistency with filtering ---
    // Use the correct Mongoose ID (_id) for the API call
    updateTicketStatus(
      ticket._id, 
      "in progress", // Sending normalized value
      `Ticket "${ticket.title}" moved to In-Progress`
    );
  };

  const handleComplete = (ticket) => {
    // --- FIX: Send lowercase status for consistency with filtering ---
    // Use the correct Mongoose ID (_id) for the API call
    updateTicketStatus(
      ticket._id, 
      "resolved", // Sending normalized value
      `Ticket "${ticket.title}" resolved`
    );
  };

  // =================================================================
  // UI Display Variables
  // Note: We use the derived lists for the calculations below
  // =================================================================

  const MAX_VISIBLE_TICKETS = 10;
  const [showAllTickets, setShowAllTickets] = useState(false);
  // Renamed 'Customer Tickets' to 'Open Tickets' for clarity in the stat banner
  const displayedTickets = showAllTickets 
    ? openTickets 
    : openTickets.slice(0, MAX_VISIBLE_TICKETS); 
  const shouldShowToggleButton = openTickets.length > MAX_VISIBLE_TICKETS;
  
  
  const MAX_VISIBLE_IN_PROGRESS = 5;
  const [showAllInProgress, setShowAllInProgress] = useState(false);
  const displayedInProgress = showAllInProgress
    ? inProgressTickets
    : inProgressTickets.slice(0, MAX_VISIBLE_IN_PROGRESS);

  const MAX_VISIBLE_RESOLVED = 5;
  const [showAllResolved, setShowAllResolved] = useState(false);
  const displayedResolved = showAllResolved
    ? resolvedTickets
    : resolvedTickets.slice(0, MAX_VISIBLE_RESOLVED);


  const noTicketsAvailable = openTickets.length === 0;
  const noTasksInProgress = inProgressTickets.length === 0;
  const noResolvedTasks = resolvedTickets.length === 0;

  // Use a loading overlay while fetching
  if (isLoading && allTickets.length === 0) {
    return (
      <main className="main-section loading-overlay">
        <h3 className="text-center">Loading tickets from the server...</h3>
        <p className="text-center">Please ensure your backend is running at {API_BASE_URL}</p>
      </main>
    );
  }


  return (
    <main className="main-section">
      {/* Banner now has three columns to better match the image's structure */}
      <div className="banner">
        <div 
          className="stat purple open-stat"
          style={{
            backgroundImage: `url(${vectorImage}), linear-gradient(135deg, #7b3aed, #5e16b3)`,
          }}
        >
          {/* We'll put the count here and the title in the main content for the 'Customer Tickets' column */}
          <p>{openTickets.length}</p>
        </div>
        <div
          className="stat purple in-progress-stat"
          style={{
            backgroundImage: `url(${vectorImage}), linear-gradient(135deg, #7b3aed, #5e16b3)`,
          }}
        >
          <h2>In-Progress</h2>
          <p>{inProgressTickets.length}</p>
        </div>
        <div
          className="stat green resolved-stat"
          style={{
            backgroundImage: `url(${vectorImage}), linear-gradient(135deg, #2ecc71, #27ae60)`,
          }}
        >
          <h2>Resolved</h2>
          <p>{resolvedTickets.length}</p>
        </div>
      </div>
      {/* --- */}
      <div className="content">
        <div className="tickets">
          {/* Title to match the image's "Customer Tickets" */}
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
                    // Use MongoDB's _id for the key
                    key={ticket._id} 
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
        <div className="task-status-container">
          <div className="task-status">
            {/* Title to match the image's "Task Status" */}
            <h3 className="task-status-title">Task Status</h3>

            {noTasksInProgress ? (
              <p className="task-empty-message">
                Select an open ticket to add to Task Status
              </p>
            ) : (
              <>
                {displayedInProgress.map((ticket) => (
                  <div key={ticket._id} className="task-card">
                    <p className="task-title-text">{ticket.title}</p>
                    <button
                      className="complete-btn"
                      onClick={() => handleComplete(ticket)}
                    >
                      Complete
                    </button>
                  </div>
                ))}

                {inProgressTickets.length > MAX_VISIBLE_IN_PROGRESS && (
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
          </div>
          <div className="resolved-section">
            {/* Resolved tasks are now a list within the right column, as per image */}
            <h3 className="resolved-task-title">Resolved Task</h3>

            {noResolvedTasks ? (
              <p className="resolved-empty-message">No resolved tasks yet.</p>
            ) : (
              <>
                {displayedResolved.map((ticket) => (
                  <p key={ticket._id} className="resolved-item">
                    {ticket.title}
                  </p>
                ))}

                {resolvedTickets.length > MAX_VISIBLE_RESOLVED && (
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
                {/* The image shows a small link at the bottom of the resolved list */}
                <div className="resolved-footer-link">
                    <span className="footer-link-text">Login Issues - Can't Access Account</span>
                </div>
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