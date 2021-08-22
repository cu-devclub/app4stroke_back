import httpError from '../errorHandler/httpError/httpError';
import frontData, { front } from '../models/frontData';

export interface insertFrontResult {
  success: Boolean;
  data: Object;
}

const insertFront = async (
  author: string,
  data: front,
  imgPath: Array<string>,
): Promise<insertFrontResult | any> => {
  try {
    const count = await countFront();
    if (count instanceof Error) {
      throw count;
    }
    return {
      success: true,
      data: await new frontData({
        ...data,
        author: author,
        imgPath: imgPath,
        testID: count + 1,
      }).save(),
    };
  } catch (e: any) {
    return httpError(500, `DB: Can't insert ${e.toString()}`);
  }
};

const countFront = async () => {
  try {
    return await frontData.countDocuments();
  } catch (e: any) {
    return httpError(500, `DB: Can't count ${e.toString()}`);
  }
};

const findFront = async (testID: number) => {
  try {
    return await frontData.find({ testID: testID });
  } catch (e: any) {
    return httpError(500, `DB: Can't Find ${e.toString()}`);
  }
};

export { insertFront, countFront, findFront };

const test = async () => {
  console.log(await findFront(1));
};

// test();
