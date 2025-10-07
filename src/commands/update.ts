import inquirer from "inquirer";
import config from "../config";
import chalk from "chalk";
import { execPromise, validateEmail } from "../utils";

async function update(username: string) {
  const { emailInput: accountEmail } = await inquirer.prompt([
    {
      name: "emailInput",
      message: "please enter the email for this account:",
      type: "input",
      validate: validateEmail,
    },
  ]);

  config.set(`users.${username}`, {
    email: accountEmail,
  });

  console.log(
    `${chalk.green("[SUCCESS]")} updated stored config for ${chalk.bold(
      username
    )}`
  );

  const { stdout: gitConfigUserName } = await execPromise(
    "git config get user.name"
  );

  if (gitConfigUserName.trim() === username) {
    const { shouldUpdateGitConfig } = await inquirer.prompt([
      {
        name: "shouldUpdateGitConfig",
        message: "update git config?",
        type: "confirm",
      },
    ]);

    if (shouldUpdateGitConfig) {
      console.log(`${chalk.yellow("[INFO]")} setting git configs`);
      await execPromise(`git config --global user.name "${username}"`);
      console.log(
        `${chalk.green("[SUCCESS]")} git user.name set to ${username}`
      );
      await execPromise(`git config --global user.email "${accountEmail}"`);
      console.log(
        `${chalk.green("[SUCCESS]")} git user.email set to ${accountEmail}.`
      );
    } else {
      console.log(`${chalk.yellow("[INFO]")} git config not updated`);
    }
  }
}

export default update;
