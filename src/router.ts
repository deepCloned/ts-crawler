import { Router, Request, Response } from "express";

import { Crawler } from "./index";
import { CourseAnalyer } from "./courseAnalyer";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const inputStr: string = `
    <html>
      <body>
        <form method="post" action="/getData">
          <input type="password" name="password" />
          <button>提交</button>
        </form>
      </body>
    </html>
  `;
  res.send(inputStr);
});

router.post("/getData", (req: Request, res: Response) => {
  const { password } = req.body;
  console.log(password);
  return;
  const courseAnalyer = CourseAnalyer.getInstance();
  new Crawler(courseAnalyer);
  res.send("Get data successfully !");
});

export { router };
