import superagent from "superagent";
import fs from "fs";

import { Analyer, CourseAnalyer } from "./courseAnalyer";

interface course {
  title: string;
  count: number;
}

interface courseData {
  time: number;
  data: course[];
}

interface finalResult {
  [propName: number]: course[];
}

/* 常规模式 */
class Crawler {
  constructor(private analyer: Analyer) {
    this.initSpider();
  }

  private async initSpider() {
    const html = await this.getRawHtml(this.analyer.url);
    const data = this.analyer.analyze(this.analyer.filePath, html);
    console.log('data is', data)
    this.writeFile(this.analyer.filePath, data);
  }

  private writeFile(filePath: string, fileStr: string) {
    try {
      fs.writeFileSync(filePath, fileStr);
    } catch (err) {
      console.log("err is", err);
    }
  }

  private async getRawHtml(url: string) {
    const res = await superagent.get(url);
    return res.text;
  }
}

const courseAnalyer = CourseAnalyer.getInstance();
const crawler = new Crawler(courseAnalyer);
