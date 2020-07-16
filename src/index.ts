import superagent from 'superagent';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

interface course {
  title: string;
  count: number;
}

interface courseData {
  time: number;
  data: course[];
}

interface finalResult {
  [propName: number]: course[]
}

class Crawler {
  private secret = `x3b174jsx`
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
  private filePath = path.resolve(__dirname, '../data/courseData.json')

  constructor () {
    this.initSpider()
  }

  private async initSpider() {
    const html = await this.getRawHtml(this.url)
    const courseData = this.courseAnalysis(html)
    const data = this.readFile(this.filePath, courseData)
    console.log('data is', JSON.stringify(data))
    this.writeFile(this.filePath, JSON.stringify(data))
  }

  private writeFile(filePath: string, fileStr: string) {
    try {
      fs.writeFileSync(filePath, fileStr)
    } catch (err) {
      console.log('err is', err)
    }
  }

  private readFile(filePath: string, fileData: courseData) {
    let courseData: finalResult = {}
    if (fs.existsSync(filePath)) {
      const res = fs.readFileSync(filePath, 'utf8')
      if (res) {
        courseData = JSON.parse(res)
      }
    }
    courseData[fileData.time] = fileData.data
    return courseData
  }

  private courseAnalysis(html: string) {
    const $ = cheerio.load(html)
    const courseList: course[] = []
    const courses = $('.course-item')
    courses.map((index, element) => {
      let courseInfo = $(element).find('.course-desc')
      let title = courseInfo.eq(0).text()
      let count = parseInt(courseInfo.eq(1).text().split('：')[1])
      courseList.push({title, count})
    })
    return {
      time: Date.now(),
      data: courseList
    }
  }

  private async getRawHtml(url: string) {
    const res = await superagent.get(url)
    return res.text
  }
}

const crawler = new Crawler()
