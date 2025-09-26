const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Ticket = require('./models/Ticket'); // Adjust path if needed, assuming relative to project root

// Load environment variables from .env file (assuming it's in the same directory)
dotenv.config({ path: './.env' });

// --- MONGODB CONNECTION SETUP ---
// NOTE: Ensure your .env file has a MONGO_URI variable set
const DB = process.env.MONGO_URI; 

if (!DB) {
    console.error("FATAL ERROR: MONGO_URI is not set in environment variables. Cannot connect to database.");
    process.exit(1);
}

mongoose
  .connect(DB, {
    // These options are now deprecated in recent Mongoose versions, 
    // but kept for compatibility if using an older version.
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err => {
    console.error('DB connection error:', err.message);
    // Log the attempted URI (without credentials) for debugging
    console.error('Attempted connection to:', DB.substring(0, DB.indexOf('@')) + "@..." + DB.substring(DB.lastIndexOf('/'))); 
    process.exit(1);
  });

// --- SAMPLE DATA (4 original + 25 new = 29 total) ---
const tickets = [
    // --- Original 4 Tickets ---
    {
        title: 'Network latency issues during peak hours',
        description: 'Users are reporting significant slowdowns and dropped connections between 10 AM and 2 PM every day.',
        customer: 'Acme Corp',
        priority: 'HIGH',
        status: 'Open',
        dateReported: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    },
    {
        title: 'Password reset link not arriving',
        description: 'New users are unable to complete registration because the password reset/verification email is not being received.',
        customer: 'Beta Systems',
        priority: 'MEDIUM',
        status: 'Open',
        dateReported: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
        title: 'Update database schema for new reporting feature',
        description: 'The reporting team needs two new fields added to the main transaction collection to support new financial reports.',
        customer: 'Internal - Data Team',
        priority: 'LOW',
        status: 'In Progress',
        dateReported: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
        title: 'Billing dashboard showing incorrect totals',
        description: 'A few customers have contacted support claiming the totals on their monthly billing dashboard are wrong.',
        customer: 'Gamma Inc',
        priority: 'HIGH',
        status: 'Resolved',
        dateReported: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
    },
    // --- 25 New Tickets ---
    {
        title: 'Application crash on startup for Mac OS users',
        description: 'The latest application update causes a segmentation fault immediately upon launch on all Mac OS devices.',
        customer: 'Delta Solutions',
        priority: 'HIGH',
        status: 'Open',
        dateReported: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
        title: 'Feature request: Dark mode toggle implementation',
        description: 'Customers are requesting an accessibility feature to switch the UI to a dark color scheme.',
        customer: 'Various Customers',
        priority: 'LOW',
        status: 'Open',
        dateReported: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) // 25 days ago
    },
    {
        title: 'Export to CSV failing with large datasets',
        description: 'When trying to export a transaction list over 5,000 records, the process times out.',
        customer: 'Epsilon Tech',
        priority: 'HIGH',
        status: 'In Progress',
        dateReported: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    },
    {
        title: 'Documentation error on API endpoint v2',
        description: 'The documentation for the GET /users/{id} endpoint incorrectly lists parameter names.',
        customer: 'Internal - Developer Team',
        priority: 'LOW',
        status: 'Resolved',
        dateReported: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
    },
    {
        title: 'Missing payment history for Q1 reports',
        description: 'Historical payment data from January to March is missing from the billing database after the recent migration.',
        customer: 'Zeta Finance',
        priority: 'HIGH',
        status: 'Awaiting Customer',
        dateReported: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) // 12 days ago
    },
    {
        title: 'Server timeout error during file upload',
        description: 'Files over 50MB consistently result in a 504 Gateway Timeout error.',
        customer: 'Eta Services',
        priority: 'MEDIUM',
        status: 'Open',
        dateReported: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // 6 days ago
    },
    {
        title: 'UI alignment issue on mobile devices',
        description: 'The main navigation bar overlaps the content when viewed on screens smaller than 768px.',
        customer: 'Iota Agency',
        priority: 'MEDIUM',
        status: 'In Progress',
        dateReported: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
        title: 'Add new staff member to security group',
        description: 'Need to provision access for a new employee, Alex Johnson, to the AWS security group.',
        customer: 'Internal - HR',
        priority: 'LOW',
        status: 'Closed',
        dateReported: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) // 15 days ago
    },
    {
        title: 'Automated weekly reports are failing',
        description: 'The scheduled cron job for the "Weekly Performance Summary" report has failed for the last two weeks.',
        customer: 'Kappa Solutions',
        priority: 'HIGH',
        status: 'Open',
        dateReported: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
        title: 'Incorrect tax calculation in checkout',
        description: 'Customers in California are being charged an incorrect sales tax rate.',
        customer: 'Lambda Retail',
        priority: 'HIGH',
        status: 'In Progress',
        dateReported: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) // 8 days ago
    },
    {
        title: 'Typo in "Forgot Password" email template',
        description: 'The word "received" is misspelled in the email sent for password reset requests.',
        customer: 'Mu Labs',
        priority: 'LOW',
        status: 'Resolved',
        dateReported: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000) // 11 days ago
    },
    {
        title: 'User registration form not submitting',
        description: 'The "Sign Up" button on the registration page is unresponsive when clicked.',
        customer: 'Nu Technologies',
        priority: 'HIGH',
        status: 'Open',
        dateReported: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000) // 12 hours ago
    },
    {
        title: 'Request to increase storage quota',
        description: 'Customer needs their file storage limit increased from 1TB to 2TB for a new project launch.',
        customer: 'Xi Corp',
        priority: 'MEDIUM',
        status: 'Awaiting Customer',
        dateReported: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
    },
    {
        title: 'API gateway caching invalid responses',
        description: 'The API is intermittently returning old data, suggesting an aggressive caching policy on the gateway.',
        customer: 'Omicron Systems',
        priority: 'MEDIUM',
        status: 'In Progress',
        dateReported: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
    },
    {
        title: 'Dashboard widget data loading slowly',
        description: 'The main summary statistics widget takes over 5 seconds to populate after login.',
        customer: 'Pi Ventures',
        priority: 'MEDIUM',
        status: 'Open',
        dateReported: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
        title: 'Implement two-factor authentication (2FA)',
        description: 'Security requirement to add TOTP-based 2FA for all user logins.',
        customer: 'Internal - Security Team',
        priority: 'LOW',
        status: 'In Progress',
        dateReported: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) // 20 days ago
    },
    {
        title: 'Search results show duplicate entries',
        description: 'When searching for specific user accounts, the result set frequently contains the same entry two or three times.',
        customer: 'Rho Solutions',
        priority: 'MEDIUM',
        status: 'Resolved',
        dateReported: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000) // 9 days ago
    },
    {
        title: 'Missing image assets on public landing page',
        description: 'Four placeholder images are showing broken links on the main product landing page.',
        customer: 'Sigma Marketing',
        priority: 'HIGH',
        status: 'Open',
        dateReported: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
        title: 'Need training session on new deployment tools',
        description: 'The DevOps team requires a full training session on the new continuous integration pipeline setup.',
        customer: 'Internal - Ops Team',
        priority: 'LOW',
        status: 'Awaiting Customer',
        dateReported: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000) // 18 days ago
    },
    {
        title: 'User profile editing screen freezing',
        description: 'When attempting to save changes to the user profile, the entire application freezes for about 30 seconds.',
        customer: 'Tau Systems',
        priority: 'MEDIUM',
        status: 'Closed',
        dateReported: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000) // 13 days ago
    },
    {
        title: 'Database connection pooling issue (too many connections)',
        description: 'During high load, the database reports maxed-out connection pool, causing service interruptions.',
        customer: 'Upsilon Corp',
        priority: 'HIGH',
        status: 'In Progress',
        dateReported: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    },
    {
        title: 'Request: Allow drag-and-drop reordering of tasks',
        description: 'Users would like to be able to drag tasks in the list to manually change their display order.',
        customer: 'Phi Group',
        priority: 'LOW',
        status: 'Open',
        dateReported: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000) // 22 days ago
    },
    {
        title: 'Incorrect date formatting in audit logs',
        description: 'Audit logs are displaying dates in UTC format instead of the user\'s local timezone.',
        customer: 'Chi Consult',
        priority: 'MEDIUM',
        status: 'Resolved',
        dateReported: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    },
    {
        title: 'Cannot delete files from old project archives',
        description: 'Attempting to delete files from archives older than 6 months results in a permission denied error.',
        customer: 'Psi Industries',
        priority: 'HIGH',
        status: 'Awaiting Customer',
        dateReported: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000) // 16 days ago
    },
    {
        title: 'Client-side form validation failing intermittently',
        description: 'On Chrome browser, the client-side validation for the contact form is sometimes skipped, leading to malformed data.',
        customer: 'Omega Solutions',
        priority: 'MEDIUM',
        status: 'Open',
        dateReported: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
        title: 'Need database backup rotation schedule review',
        description: 'Internal request to review and update the current 7-day database backup rotation policy for compliance.',
        customer: 'Internal - Compliance',
        priority: 'LOW',
        status: 'Closed',
        dateReported: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
    }
];

// --- IMPORT DATA FUNCTION ---
const importData = async () => {
  try {
    // Use insertMany for better performance
    await Ticket.insertMany(tickets); 
    console.log('Sample data successfully loaded!');
    console.log(`Added ${tickets.length} tickets to the database.`);
  } catch (err) {
    console.error('Error importing data:', err);
  }
  process.exit();
};

// --- DELETE ALL DATA FUNCTION ---
const deleteData = async () => {
  try {
    await Ticket.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.error('Error deleting data:', err);
  }
  process.exit();
};

// Run the corresponding function based on command-line argument
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
    console.log('Usage: node seed.js --import | --delete');
    process.exit();
}
