const Ticket = require('../models/Ticket');
const ApiError = require('../utils/ApiError');

// Helper function to wrap controller logic for async error handling
const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

// =================================================================
// CRUD OPERATIONS FOR TICKETS
// =================================================================

// GET /api/v1/tickets - Get all tickets
exports.getAllTickets = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: tickets.length,
    data: {
      tickets,
    },
  });
});

// GET /api/v1/tickets/:id - Get a single ticket by ID
exports.getTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return next(new ApiError(`No ticket found with ID ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      ticket,
    },
  });
});

// POST /api/v1/tickets - Create a new ticket
exports.createTicket = catchAsync(async (req, res, next) => {
  const newTicket = await Ticket.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      ticket: newTicket,
    },
  });
});

// PATCH /api/v1/tickets/:id - Update a ticket
exports.updateTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the updated document
    runValidators: true, // Run schema validators on update
  });

  if (!ticket) {
    return next(new ApiError(`No ticket found with ID ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      ticket,
    },
  });
});

// DELETE /api/v1/tickets/:id - Delete a ticket
exports.deleteTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByIdAndDelete(req.params.id);

  if (!ticket) {
    return next(new ApiError(`No ticket found with ID ${req.params.id}`, 404));
  }

  // 204 No Content is standard for successful deletion
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
