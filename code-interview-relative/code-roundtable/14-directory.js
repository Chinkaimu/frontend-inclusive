/**
 * 实现函数，参数为目录的路径。然后打印出类似命令行上的 tree 命令的效果。（可用node fs，如果fs操作不熟悉，可以自己声明变* 量保存目录的结构数据，然后将该变量输出）
 */
const fs = require('fs')
const path = require('path')

const directoryLabel = '├── '
const hierarchyLabel = '│   '

// 改写返回 promise
function readDir (dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err)
      }
      resolve(files)
    })
  })
}

// TODO: 注意需要输入的是完整路径
function isDirectory (path) {
  return new Promise((resolve, reject) => {
    // 回调函数返回状态
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err)
      }
      resolve(stats.isDirectory())
    })
  })
}

// 递归，deep 表示层次
async function printDirectory (dir, deep = '') {
  // 获取目录下的文件及子目录
  const files = await readDir(dir)

  // 将文件或者目录打印，并且递归打印子目录
  for (const file of files) {
    // 层次 + 目录标记 + 文件名/目录名
    console.log(deep + directoryLabel + file)

    // 补全路径
    const childDir = path.resolve(dir, file)
    // 确认是不是子目录，如果是需要打印子目录下内容
    const aDirectory = await isDirectory(childDir)
    if (aDirectory) {
      // TODO: deep 要加深一层
      await printDirectory(childDir, deep + hierarchyLabel)
    }
  }
}

function printAllDirectory (dir) {
  console.log(directoryLabel + path.basename(dir))
  // 第二层，一个 hierarchyLabel 标记
  printDirectory(dir, hierarchyLabel)
}
printAllDirectory('/Users/chinkaimu/code/frontend-zero/code-html')
