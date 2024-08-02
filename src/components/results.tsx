"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bill, SplitBill } from "@/lib/types";
import TotalBills from "./total-bills";
import { Button } from "./ui/button";
import { splitBill } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function Results({
  data,
  handleResetState,
}: {
  data: {
    people: string[];
    bills: Bill[];
  };
  handleResetState: () => void;
}) {
  const [results, setResults] = useState<null | SplitBill>(null);

  async function handleSplit() {
    const results = await splitBill(data);
    setResults(results);
  }

  useEffect(() => {
    handleSplit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.bills, data.people]);

  return (
    <Card className="xl:col-span-2 w-full max-w-[30%]">
      <CardHeader className="flex flex-row items-center">
        <CardTitle>Resultados</CardTitle>
      </CardHeader>
      <CardContent>
        <TotalBills data={data} />
        <Separator className="my-4" />
        <section className="grid gap-4 w-full">
          {/* <Button size={"lg"} className="w-full" onClick={handleSplit}>
            Split
          </Button> */}

          {results && (
            <Card className="grid gap-3 w-full justify-center">
              <CardHeader>
                <CardTitle className="text-center">Ajustes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3">
                  {results.transactions.map((transaction, index) => (
                    <>
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
                          $
                          {formatCurrency(
                            Number(transaction.amount.toFixed(2))
                          )}
                        </Badge>
                      </li>
                      {index !== results.transactions.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </section>
      </CardContent>

      <CardFooter>
        <Button size={"lg"} className="w-full" onClick={handleResetState}>
          Reiniciar cuenta 🗑️
        </Button>
      </CardFooter>
    </Card>
  );
}
