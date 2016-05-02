async function test() {
  return new Promise(function (resolve){
    setTimeout(resolve, 2000);
  });
}

async function test2() {
  console.log(1);
  await test();
  console.log(2);
}

test2();
