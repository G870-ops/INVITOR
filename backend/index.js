// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/auth.js');
// const inviteRoutes = require('./routes/invites.js');
// const bookingRoutes = require('./routes/booking.js');


// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// //Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/invites', inviteRoutes);
// app.use('/api/bookings', bookingRoutes);




// //connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
// .then(async ()=>{
//     console.log('connected to MongoDB');
//     try {
//         await mongoose.connection.db.collection('users').dropIndex('email_1');
//         console.log('Old email_1 index dropped successfully.');
//     } catch (err) {
//         console.log('Note: could not drop old email index or it does not exist:', err.message);
//     }
// })
// .catch((error)=>{
//     console.error('Error connecting to MongoDB:', error);
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     // Corrected: Changed single quotes to backticks so ${PORT} evaluates dynamically
//     console.log(`backend is running on port ${PORT}`); 
// });







const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./routes/auth.js');
const inviteRoutes = require('./routes/invites.js');
const bookingRoutes = require('./routes/booking.js');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/invites', inviteRoutes);
app.use('/api/bookings', bookingRoutes);

// Serve React build
const frontendPath = path.join(__dirname, '../frontend/dist');

app.use(express.static(frontendPath));

// React Router support
// app.get('*', (req, res) => {
//     res.sendFile(path.join(frontendPath, 'index.html'));
// });
app.use((req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        try {
            await mongoose.connection.db.collection('users').dropIndex('email_1');
            console.log('Old email_1 index dropped successfully.');
        } catch (err) {
            console.log('Note: could not drop old email index or it does not exist:', err.message);
        }

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });