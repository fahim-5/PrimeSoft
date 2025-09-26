const express = require('express');
// Assuming the controller file is located at '../controllers/ticketController'
const ticketController = require('../controllers/ticketController');

// =================================================================
// ROUTER FOR /api/v1/tickets
// =================================================================

const router = express.Router();

// Routes handling operations on the entire collection of tickets
// GET /api/v1/tickets: Get all tickets
// POST /api/v1/tickets: Create a new ticket
router
  .route('/')
  .get(ticketController.getAllTickets)
  .post(ticketController.createTicket);

// Routes handling operations on a single ticket identified by its ID
// GET /api/v1/tickets/:id: Get a specific ticket
// PATCH /api/v1/tickets/:id: Update a specific ticket
// DELETE /api/v1/tickets/:id: Delete a specific ticket
router
  .route('/:id')
  .get(ticketController.getTicket)
  .patch(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

module.exports = router;
