import mongoose from 'mongoose';

const mongoDbConfig = () => {
  mongoose.Promise = global.Promise;
  const dbUrl = process.env.MONGO_DB_URL;
  mongoose.connect(dbUrl, { useNewUrlParser: true });

  const db = mongoose.connection;
  db.once('open', () => console.log('Connected to the database'));

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};

export default mongoDbConfig;
