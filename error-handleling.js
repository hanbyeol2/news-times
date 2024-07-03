let weight = 25;
try{
    //쏘스코드를 쓴다
    //에러발생ㄴ하면
    if(weight < 30){
        throw new Error("에러메세지")
    }
}catch(error){
    //에러잡아줌
    console.log(error.message);
}