# gitauth-cli

A CLI to make it easier to change git configs using the GitHub CLI. This tool allows you to quickly switch between different GitHub accounts and automatically update your local git configuration to match.

## Prerequisites

-   [Node.js](https://nodejs.org/)
-   [GitHub CLI](https://cli.github.com/)
-   You must be logged into your desired GitHub accounts using `gh auth login`.

## Installation

```sh
npm install -g gitauth-cli
```

## Commands

The base command for this tool is `gitauth`.

### `use <username>`

Switches the active GitHub CLI user and updates the global git `user.name` and `user.email` to match. If it's the first time you're using this account with `gitauth-cli`, it will prompt you to enter the associated email address, which it will then store for future use.

**Usage:**

```sh
gitauth use <username>
```

**Example:**

```sh
gitauth use my-work-account
```

### `status`

Displays the currently active GitHub CLI user, as well as the global `user.name` and `user.email` from your git configuration.

**Usage:**

```sh
gitauth status
```

### `update <username>`

Updates the email address stored for a specific user. If the user being updated is the currently active git user, it will also ask if you want to update your global git configuration.

**Usage:**

```sh
gitauth update <username>
```

**Example:**

```sh
gitauth update my-work-account
```

### `remove <username>`

Removes a user's configuration (the stored email) from `gitauth-cli`. This does **not** log the user out from the GitHub CLI.

**Usage:**

```sh
gitauth remove <username>
```

**Example:**

```sh
gitauth remove my-old-account
```

### `printconfig`

Prints all the configurations stored by `gitauth-cli`, showing which emails are associated with which usernames.

**Usage:**

```sh
gitauth printconfig
```