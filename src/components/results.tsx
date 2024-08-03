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
import SplitBills from "./split-bills";

export default function Results({
  data,
}: {
  data: {
    people: string[];
    bills: Bill[];
  };
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
    <Card className="w-full lg:max-w-[33%]">
      <CardHeader className="flex flex-row items-center">
        <CardTitle>Resultados</CardTitle>
      </CardHeader>
      <CardContent>
        <TotalBills data={data} />
        {results ? <Separator className="my-4" /> : null}
        {results ? <SplitBills results={results} /> : null}
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
}
