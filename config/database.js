const mongoose = require('mongoose');


const connectdb = async () => {
    await mongoose.connect('mongodb+srv://dnyx-career:rudhresh@cluster0.oowgc8l.mongodb.net/devtinder'
    );
};

connectdb()
    .then(() => {   
        console.log('Database connected successfully');
    }
    ).catch((err) => {
        console.error('Database connection failed:', err);
    }   
);