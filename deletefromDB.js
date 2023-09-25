const mongoose = require('mongoose');
const Blog = require('./models/blog'); // Import your Blog model

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://yashAgarwal:@1234@4321Ts@cluster0.fealpwv.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the criteria for deletion (e.g., by title or _id)
const deletionCriteria = { title: 'Harry Potter and the Chamber of Secrets' };

// Use Mongoose to find and delete the blogs that match the criteria
Blog.deleteMany(deletionCriteria, (err) => {
  if (err) {
    console.error('Error deleting blogs:', err);
  } else {
    console.log('Blogs deleted successfully.');
  }
  // Close the MongoDB connection
  mongoose.connection.close();
});
