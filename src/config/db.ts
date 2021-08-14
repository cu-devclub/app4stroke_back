import mongoose from 'mongoose';

const MONGOURI = `mongodb+srv://Tor4848:qfcavmiBiIAzLZvG@cluster0.xdrbs.mongodb.net/test`;
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
    });
    console.log('Connected to DB !!');
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
