import axios from "axios";

class MyReuqest {
  constructor(baseURL,timeout){
    this.instance = axios.create({
      baseURL,
      timeout
    })
  }

}

export default new  MyReuqest()