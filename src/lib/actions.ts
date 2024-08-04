"use server";

import { DataToSplit } from "./types";

export async function splitBill(data: DataToSplit) {
  const { people: members, bills: expenses } = data;
  if (members.length === 0) return null;
  if (expenses.length === 0) return null;
  // Calculate total expenses for each member
  const totalExpenses: { [key: string]: number } = {};
  expenses.forEach((expense) => {
    if (!totalExpenses[expense.person]) {
      totalExpenses[expense.person] = 0;
    }
    totalExpenses[expense.person] += Number(expense.amount);
  });

  // Calculate the total amount spent and the equal share for each member
  const totalAmountSpent = Object.values(totalExpenses).reduce(
    (sum, amount) => sum + amount,
    0
  );
  const equalShare = totalAmountSpent / members.length;

  // Calculate how much each person must give or receive
  const balances: { [key: string]: number } = {};
  members.forEach((member) => {
    const memberExpenses = totalExpenses[member] || 0;
    balances[member] = memberExpenses - equalShare;
  });

  // Calculate the transactions needed to balance the expenses
  const transactions = [];

  // Sort members by balance
  const sortedMembers = Object.keys(balances).sort(
    (a, b) => balances[a] - balances[b]
  );

  let i = 0;
  let j = sortedMembers.length - 1;

  while (i < j) {
    const payer = sortedMembers[i];
    const receiver = sortedMembers[j];
    const amount = Math.min(-balances[payer], balances[receiver]);

    if (amount > 0) {
      transactions.push({ from: payer, to: receiver, amount });
      balances[payer] += amount;
      balances[receiver] -= amount;
    }

    if (balances[payer] === 0) i++;
    if (balances[receiver] === 0) j--;
  }

  return { transactions, totalAmountSpent, equalShare };
}
