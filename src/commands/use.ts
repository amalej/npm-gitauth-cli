import inquirer from "inquirer";
import config from "../config";
import { execPromise, getGitHubUsernames, validateEmail } from "../utils";
import chalk from "chalk";

async function use(username: string) {
  console.log(
    `${chalk.yellow("[INFO]")} fetching active GitHub account status`
  );
  const { stdout: ghAuthStatus } = await execPromise("gh auth status");

  const ghAuthUsers: string[] = getGitHubUsernames(ghAuthStatus) ?? [];

  if (!ghAuthUsers.includes(username)) {
    const userList = ghAuthUsers.map((item) => `- ${item}`).join("\n");
    console.log(
      `${chalk.red("[ERROR]")} gh command does not have the user ${chalk.bold(
        username
      )} logged in.
log in using ${chalk.bold("gh auth login")} or use a different account.
available accounts are:
${userList}`
    );
    return;
  }

  const userConfig = config.get(`users.${username}`);
  let accountEmail: string | null = userConfig?.email ?? null;
  if (userConfig === undefined) {
    console.log(`${chalk.yellow("[INFO]")} no email found`);
    const { emailInput } = await inquirer.prompt([
      {
        name: "emailInput",
        message: "please enter the email for this account:",
        type: "input",
        validate: validateEmail,
      },
    ]);
    accountEmail = emailInput;

    if (accountEmail) {
      config.set(`users.${username}`, {
        email: accountEmail,
      });
      console.log(
        `${chalk.yellow("[INFO]")} saved stored config for ${chalk.bold(
          username
        )}`
      );
    }
  }

  console.log(`${chalk.yellow("[INFO]")} running GitHub CLI`);
  await execPromise(`gh auth switch --user ${username}`);
  console.log(
    `${chalk.green("[SUCCESS]")} switched GitHub CLI user to ${username}.`
  );

  console.log(`${chalk.yellow("[INFO]")} setting git configs`);
  await execPromise(`git config --global user.name "${username}"`);
  console.log(`${chalk.green("[SUCCESS]")} git user.name set to ${username}`);
  await execPromise(`git config --global user.email "${accountEmail}"`);
  console.log(
    `${chalk.green("[SUCCESS]")} git user.email set to ${accountEmail}.`
  );
}

export default use;
