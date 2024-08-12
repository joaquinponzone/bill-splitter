import { SplitBill } from "@/lib/types";
import React, { Fragment } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { OctagonAlert } from "lucide-react";

export default function SplitBills({
  results,
  people,
}: {
  results: SplitBill | null;
  people: string[];
}) {
  return (
    <>
      <Separator className="my-4" />
      <Card className="grid gap-3 justify-center p-0">
        <CardHeader>
          <CardTitle className="text-center">Ajustes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3">
            {Number(results?.totalAmountSpent) > 0 ? (
              results?.transactions.length ? (
                results?.transactions.map((transaction, index) => (
                  <Fragment
                    key={`${transaction.from}-${transaction.to}-${index}`}
                  >
                    <li
                      key={transaction.from + transaction.to + index}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="text-lg">{transaction.from}</span>
                      <span>⇨</span>
                      <Badge variant={"secondary"} className="text-base p-1">
                        {formatCurrency(Number(transaction.amount.toFixed(2)))}
                      </Badge>
                      <span>⇒</span>
                      <span className="text-lg">{transaction.to}</span>
                    </li>
                    {index !== results.transactions.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </Fragment>
                ))
              ) : (
                <div className="grid">
                  <p className="text-center text-neutral-500">
                    No hay ajustes por hacer
                  </p>
                  <Separator className="my-2" />
                  <div className="grid gap-2">
                    <p className="text-center text-neutral-500">
                      La cuenta esta equilibrada 😉
                    </p>
                  </div>
                </div>
              )
            ) : (
              <a href="#enter-person">
                <Button
                  variant={"link"}
                  className="text-neutral-500 hover:text-neutral-300 grid place-content-center gap-2"
                >
                  <div className="w-full flex justify-center">
                    <OctagonAlert size="36" className="text-blue-300/50" />
                  </div>
                  No hay datos para calcular, agregá personas y gastos
                </Button>
              </a>
            )}
          </ul>
        </CardContent>
        <CardFooter>
          <p className="text-center text-neutral-500"></p>
        </CardFooter>
      </Card>
    </>
  );
}
