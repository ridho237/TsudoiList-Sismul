require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const user = require('./routes/user');
const anime = require('./routes/anime');

const corsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true,
	optionsSuccessStatus: 200,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello from Node API Server Updated');
});

app.use('/', user);
app.use('/anime', anime);

async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log(`✅ Connected to MongoDB`);
	} catch (error) {
		console.error('❌ MongoDB Connection Error:', error.message);
		process.exit(1);
	}
}

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
