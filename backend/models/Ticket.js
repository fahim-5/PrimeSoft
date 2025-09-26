const mongoose = require('mongoose');

// Define the schema for the Ticket model
const TicketSchema = new mongoose.Schema(
  {
    // The 'id' field from your data is redundant as MongoDB uses '_id' by default.
    // It's excluded here.

    title: {
      type: String,
      required: [true, 'A ticket must have a title'],
      trim: true,
      maxlength: [100, 'A ticket title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'A ticket must have a description'],
    },
    customer: {
      type: String,
      required: [true, 'A ticket must be associated with a customer name'],
      trim: true,
    },
    priority: {
      type: String,
      required: true,
      // Restrict the priority to a set of allowed values for data consistency
      enum: {
        values: ['LOW', 'MEDIUM', 'HIGH'],
        message: 'Priority must be LOW, MEDIUM, or HIGH',
      },
      default: 'MEDIUM',
    },
    status: {
      type: String,
      required: true,
      // Restrict the status to common ticket lifecycle stages
      enum: {
        values: ['Open', 'In Progress', 'Awaiting Customer', 'Resolved', 'Closed'],
        message: 'Status must be Open, In Progress, Awaiting Customer, Resolved, or Closed',
      },
      default: 'Open',
    },
    // The original 'createdAt' field is handled by Mongoose's timestamps,
    // but we can add a 'dateReported' field if needed for the original date from the JSON.
    dateReported: {
        type: Date,
        // The original JSON had string dates; we convert them to Date objects
        // and make this field optional, as Mongoose's 'createdAt' will be the source of truth.
    }
  },
  // Mongoose will automatically add 'createdAt' and 'updatedAt' fields
  // with a 'Date' type, logging when the document was created and last updated.
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Include virtual properties when converting to JSON
    toObject: { virtuals: true }, // Include virtual properties when converting to objects
  }
);

// Create a Mongoose model named 'Ticket' based on the schema
const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;