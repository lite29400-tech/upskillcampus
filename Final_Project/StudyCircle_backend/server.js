const express = require('express');
const app = express();

// Packages
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// Models
const Category = require('./models/Category');

// DB & Cloudinary
const { connectDB } = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');

// Routes
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const paymentRoutes = require('./routes/payments');
const courseRoutes = require('./routes/course');

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}));

const PORT = process.env.PORT || 10000; // Render pe 10000 better hota hai

// Default Categories Function
const createDefaultCategories = async () => {
    try {
        const categories = [
            { name: "Development", description: "Web, Mobile, Programming" },
            { name: "Business", description: "Finance, Marketing, Entrepreneurship" },
            { name: "Design", description: "UI/UX, Graphic Design, 3D" },
            { name: "Marketing", description: "Digital Marketing, SEO, Ads" },
            { name: "Personal Development", description: "Productivity, Communication" },
            { name: "Health & Fitness", description: "Yoga, Gym, Nutrition" },
            { name: "Music", description: "Guitar, Piano, Singing" },
            { name: "Photography", description: "DSLR, Editing, Videography" }
        ];

        for (let cat of categories) {
            const existing = await Category.findOne({ name: cat.name });
            if (!existing) {
                await Category.create(cat);
                console.log(`Category added: ${cat.name}`);
            }
        }
        console.log("All default categories ready!");
    } catch (error) {
        console.log("Error creating default categories:", error.message);
    }
};

// Server Start with Proper Error Handling
app.listen(PORT, async () => {
    console.log(`Server Started on PORT ${PORT}`);

    try {
        await connectDB();                  // DB connect hone ka wait
        console.log("MongoDB connected successfully");

        cloudinaryConnect();
        console.log("Cloudinary connected successfully");

        await createDefaultCategories();    // Ispe bhi await laga diya
    } catch (err) {
        console.log("CRITICAL ERROR - Server stopped:", err.message);
        process.exit(1); // Agar DB nahi connect hua toh server band kar de
    }
});

// Routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/course', courseRoutes);

// Home Route
app.get('/', (req, res) => {
    res.send(`
        <div style="text-align:center; padding:100px; font-family:Arial;">
            <h1>Study Circle Backend is LIVE!</h1>
            <p>MongoDB + Cloudinary Connected</p>
            <p>Everything is working perfectly!</p>
        </div>
    `);
});

module.exports = app;
