import mongoose from 'mongoose';

const InitiateMongoServer = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB !!');
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default InitiateMongoServer;
