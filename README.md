# ts-crawler

## 安装依赖

* ts-node
* typescript
* superagent -- 可在 node 端发送 ajax 请求
* cheerio -- 像使用 jquery 那样选择 dom 元素

## typescript 配置文件  tsconfig.json

在项目下执行 tsc 命令，默认会编译根目录下的所有 .ts 文件

/*通过 tsc xxx.ts 这样的命令执行编译不会使用 tsconfig.json 里面的配置项*/

可通过 files includes excludes 指定编译某些文件或反向选择

如何指定打包某个目录下的文件 以及如何指定打包过后文件存储的位置
如何编译 js 文件，如何检测 js 代码规范