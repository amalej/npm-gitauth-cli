import chalk from "chalk";
import { execPromise, getGitHubUsernames } from "../utils";

async function status() {
  console.log(`${chalk.yellow("[INFO]")} running GitHub CLI`);

  const { stdout: ghAuthStatus } = await execPromise("gh auth status");
  const { stdout: gitConfigUserName } = await execPromise(
    "git config --get user.name"
  );
  const { stdout: gitConfigUserEmail } = await execPromise(
    "git config --get user.email"
  );

  const ghAuthUsers: string[] = getGitHubUsernames(ghAuthStatus) ?? [];

  console.log(`${chalk.green("[SUCCESS]")} Logging configs`);
  if (ghAuthUsers[0]) {
    console.log(`- github cli logged in: ${chalk.bold(ghAuthUsers[0])}`);
  } else {
    console.log(`- github cli not logged in.`);
  }

  console.log(
    `- git config user.name: ${chalk.bold(gitConfigUserName.trim())}`
  );

  console.log(
    `- git config user.email: ${chalk.bold(gitConfigUserEmail.trim())}`
  );
}

export default status;
