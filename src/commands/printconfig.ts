import config from "../config";

function printconfig() {
  console.log(JSON.stringify(config.all, null, 2));
}

export default printconfig;
