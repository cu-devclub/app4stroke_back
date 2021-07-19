import { Request, Response } from 'express';

export default {
  getHealthStatus: (req: Request, res: Response): void => {
    res.status(200).send('Server is currently fine');
  },
};
