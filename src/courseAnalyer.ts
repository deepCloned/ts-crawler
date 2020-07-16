import superagent from "superagent";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";

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

export interface Analyer {
  url: string;
  filePath: string;
  analyze: (filePath: string, htmlStr: string) => string;
}

/**
 * 优化使用单例模式
 * 如果已经被实例化了，就返回实例
 * 否则重新实例化，返回
 */
export class CourseAnalyer implements Analyer {
  public static instance: CourseAnalyer
  public secret = `x3b174jsx`;
  public url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  public filePath = path.resolve(__dirname, "../data/courseData.json");

  public static getInstance() {
    if (!CourseAnalyer.instance) {
      CourseAnalyer.instance = new CourseAnalyer()
    }
    return CourseAnalyer.instance
  }

  private readFile(filePath: string, fileData: courseData) {
    let courseData: finalResult = {};
    if (fs.existsSync(filePath)) {
      const res = fs.readFileSync(filePath, "utf8");
      if (res) {
        courseData = JSON.parse(res);
      }
      console.log('courseData is', courseData)
    }
    console.log('out courseData is', courseData)
    courseData[fileData.time] = fileData.data;
    return courseData;
  }

  private courseAnalysis(html: string) {
    const $ = cheerio.load(html);
    const courseList: course[] = [];
    const courses = $(".course-item");
    courses.map((index, element) => {
      let courseInfo = $(element).find(".course-desc");
      let title = courseInfo.eq(0).text();
      let count = parseInt(courseInfo.eq(1).text().split("：")[1]);
      courseList.push({ title, count });
    });
    return {
      time: Date.now(),
      data: courseList,
    };
  }

  public analyze(filePath: string, htmlStr: string) {
    const courseData = this.courseAnalysis(htmlStr);
    const courseStr = this.readFile(filePath, courseData);
    return JSON.stringify(courseStr);
  }
}
