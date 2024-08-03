import { SplitBill } from "@/lib/types";
import React, { Fragment } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "./ui/separator";

export default function SplitBills({ results }: { results: SplitBill | null }) {
  return (
    <Card className="grid gap-3 justify-center p-0">
      <CardHeader>
        <CardTitle className="text-center">Ajustes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3">
          {results?.transactions.map((transaction, index) => (
            <Fragment key={`${transaction.from}-${transaction.to}-${index}`}>
              <li
                key={transaction.from + transaction.to + index}
                className="flex items-center justify-between gap-2"
              >
                <Badge variant={"outline"} className="text-lg">
                  {transaction.from}
                </Badge>
                <span>👉</span>
                <Badge variant={"outline"} className="text-lg">
                  {transaction.to}
                </Badge>
                <span>💸</span>
                <Badge variant={"secondary"} className="text-lg">
                  {formatCurrency(Number(transaction.amount.toFixed(2)))}
                </Badge>
              </li>
              {index !== results.transactions.length - 1 && (
                <Separator className="my-2" />
              )}
            </Fragment>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
