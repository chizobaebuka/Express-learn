const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const logger = require('./middleware/logger');


const app = express();


// Init middleware
app.use(logger)

// handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Handling form submissions

// Homepage route
app.get('/', (req, res) => {
    res.render('index', {
        title: "MemberApp",
    })
})

// set a static folder
app.use(express.static(path.join(__dirname, 'public')))

// Members API routes
app.use('/api/members', require('./Routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))