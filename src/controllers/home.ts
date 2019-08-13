import { Request, Response } from "express";
export let getUsages = (req: Request, res: Response) => {
    res.send(`
    <h1>Usages</h1>
    <p>Please refer to my <a href="https://github.com/htq287/node-server-starter" target="blank">Github Repo</a> for details.</p>
  `);
};