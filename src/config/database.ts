import mongoose from 'mongoose';

const MONGOURI = `mongodb+srv://root:CuSHn5mIEKu1apvd@cluster0.ab6gl.mongodb.net/test`;
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
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
