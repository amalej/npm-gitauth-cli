import chalk from "chalk";
import config from "../config";

function remove(username: string) {
  const userConfig = config.get(`users.${username}`);

  if (!userConfig) {
    console.log(
      `${chalk.yellow("[INFO]")} user ${chalk.bold(username)} not found`
    );
  } else {
    config.delete(`users.${username}`);
    console.log(
      `${chalk.green("[SUCCESS]")} removed user ${chalk.bold(username)}`
    );
  }
}

export default remove;
