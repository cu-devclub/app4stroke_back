import { Router } from "express";

const router = Router();

router.get('/predictScore/:a', (req,res)=>{
  res.send(req.params)
});

export default router;