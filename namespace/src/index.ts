namespace Home {
  class Header {
    constructor() {
      const header: HTMLDivElement = document.createElement('div')
      header.innerHTML = 'header'
      document.body.appendChild(header)
    }
  }
  
  class Content {
    constructor() {
      const header: HTMLDivElement = document.createElement('div')
      header.innerHTML = 'content'
      document.body.appendChild(header)
    }
  }
  
  class Footer {
    constructor() {
      const header: HTMLDivElement = document.createElement('div')
      header.innerHTML = 'Footer'
      document.body.appendChild(header)
    }
  }
  
  export class Page {
    constructor() {
      new Header()
      new Content()
      new Footer()
    }
  }
  
}