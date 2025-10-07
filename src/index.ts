#!/usr/bin/env node

import { program } from "commander";
import use from "./commands/use";
import remove from "./commands/remove";
import update from "./commands/update";
import status from "./commands/status";
import printconfig from "./commands/printconfig";

program
  .command("use")
  .description("Switch to an account")
  .argument("username <string>", "account to use")
  .action(use);

program
  .command("remove")
  .description("Remove an account")
  .argument("username <string>", "account to remove")
  .action(remove);

program
  .command("update")
  .description("Update an account config")
  .argument("username <string>", "account to remove")
  .action(update);

program.command("status").description("Get status").action(status);

program
  .command("printconfig")
  .description("Prints all configs stored")
  .action(printconfig);

program.parse();
