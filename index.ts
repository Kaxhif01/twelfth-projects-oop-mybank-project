#! /usr/bin/env node


import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.redBright("=").repeat(50));
console.log(chalk.magenta.italic.bold("\n\tWelcome to 'Kaxh' OOP Mybank Project\n"));
console.log(chalk.redBright("=").repeat(50));




// Bank Account interface

interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  checkBalance(): void;
}

// Bank Account class
class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;

  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  // Debit money
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(chalk.magentaBright.italic(`\n \tWithdrawal of $${chalk.red(amount)} successful.\n`));
      console.log(chalk.magentaBright(`Your remaining balance is: $${chalk.red(this.balance)}`));
    } else {
      console.log(chalk.red("\tInsufficient balance!"));
    }
  }

  //Credit money
  deposit(amount: number): void {
    if (amount >= 100) {
      amount -= 1;
    }
    this.balance += amount;
    console.log(chalk.greenBright(`Deposit of $${chalk.red(amount)} successfulluy.`));
    console.log(chalk.cyanBright(`Your remaining balance is: $${chalk.red(this.balance)}`));
    console.log(chalk.redBright.bold(`\n \tRemainder! Your 1$ deducted from your every deposit of more than 99$\n`));
    
  }

  // Check balance
  checkBalance(): void {
    console.log(chalk.magenta.bold.italic(`\n \tYour Current balance is: $${chalk.red(this.balance)}\n`));
  }
}

// customer class
class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}

// create bank accounts

const accounts: BankAccount[] = [
  new BankAccount(1001, 500),
  new BankAccount(1002, 1000),
  new BankAccount(1003, 2000),
];

// Create Customer

const customers: Customer[] = [
  new Customer("Kaxhif", "Qamar", "Male", 22, 3331234567, accounts[0]),
  new Customer("Wasif", "Qamar", "Male", 24, 3231234567, accounts[1]),
  new Customer("Syeda", "Arooj", "Female", 20, 3131234567, accounts[2]),
];

// function to intereact with bak acc

async function service() {
  do {
    const accountNumberinput = await inquirer.prompt([
      {
        name: "accountNumber",
        type: "number",
        message: chalk.green( "\nEnter your account number:\n"),
      },
    ]);

    const customer = customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumberinput.accountNumber
    );
    if (customer) {
      console.log(chalk.yellowBright(`\n \tWelcome, ${chalk.cyanBright.italic.bold(customer.firstName)} ${chalk.cyanBright.italic.bold(customer.lastName)}!\n`));
      const ans = await inquirer.prompt([
        {
          name: "select",
          type: "list",
          message:chalk.green( "Select an Operation"),
          choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
        },
      ]);

      switch (ans.select) {
        case "Deposit":
          const depositAmount = await inquirer.prompt([
            {
              name: "amount",
              type: "number",
              message: chalk.yellow("\nEnter the amount to deposit\n"),
            },
          ]);
          customer.account.deposit(depositAmount.amount);
          break;

        case "Withdraw":
          const withdrawAmount = await inquirer.prompt([
            {
              name: "amount",
              type: "number",
              message: chalk.yellowBright("\nEnter the amount to withdraw\n"),
            },
          ]);
          customer.account.withdraw(withdrawAmount.amount);
          break;

        case "Check Balance":
          customer.account.checkBalance();
          break;

        case "Exit":
          console.log(chalk.magentaBright("\nExisting bank account......"));
          console.log(chalk.redBright.italic(" \tThankyou for using our bank services.\n"));
          console.log(chalk.bgYellowBright.bold("\tHave a great day!"));
          return;
      }
    } else {
        console.log(chalk.redBright.bold.italic("\n \tInvalid account number. Please Enter valid account number.\n"));
        
    }
  } while (true);
}

service();
