// export default (fn, timeDelay = 500) => {
//   let time = 0;
//   return (...args) => {
//     let date = +new Date();
//     console.log(date - time)
//     if(date - time > timeDelay){
//         fn.apply(this,args)
//         time = date
//     }
//   };
// };

export default (fn, timeDelay = 500) => {
  let time = 0;
  return (...args) => {
    let date = +new Date();
    if (date - time > timeDelay) {
      setTimeout(() => {
        fn.apply(this, args);
        time = date;
      }, timeDelay);
    }
  };
};
