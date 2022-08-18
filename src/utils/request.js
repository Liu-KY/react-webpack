
function desc(C) {
  return C
}

// es6装饰器语法
@desc
class Dog {
  run () {
    console.log('---你正在奔跑')
  }
}

export default Dog
