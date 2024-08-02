"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default function TotalBills({ data }: { data: any }) {
  const total = data.bills.reduce(
    (acc: number, bill: any) => acc + Number(bill.amount),
    0
  );

  const totalPerPerson = data.people.length && total / data.people.length;

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total</CardDescription>
          <CardTitle className="text-4xl">${formatCurrency(total)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            <span className="font-bold text-neutral-300">
              ${formatCurrency(totalPerPerson)}
            </span>{" "}
            por persona
          </div>
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader className="pb-2">
          <CardDescription>Per person</CardDescription>
          <CardTitle className="text-4xl">
            ${formatCurrency(totalPerPerson)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">Cuota parte</div>
        </CardContent>
      </Card> */}
    </div>
  );
}
