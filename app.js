require('dotenv').config();
const express = require('express');
const port = process.env.PORT;
const db = require('./databases/db')
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());


//frontend part
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

// api path back-end
const userRoutes = require('./Routes/userRoutes');
const roleRoutes = require('./Routes/roleRoutes');
const companyRoutes = require('./Routes/companyRoutes');
const jobRoutes = require('./Routes/jobRoutes');
const frontendRoutes = require('./Routes/frontend/frontendRoutes');
const jobApplicationRoutes = require('./Routes/jobapplicationRoutes');
const contactRoutes = require('./Routes/contactRoutes');
// 
app.use('/api/user', userRoutes);
app.use('/api/frontend', frontendRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/jobApplication', jobApplicationRoutes);
app.use('/api/contact', contactRoutes);
// front-end part
app.use('/', frontendRoutes);



app.get('/', (req, res) => {
    res.redirect('/login');
})


app.listen (port, () => {
    console.log(`Server is running on port ${port}`);
    db.connect();
})