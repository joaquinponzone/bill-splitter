"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { PlusIcon, XIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";

export default function BillsList({
  handleSyncBills,
}: {
  handleSyncBills: (bills: any[]) => void;
}) {
  const { toast } = useToast();
  const billsStore = localStorage.getItem("bills");
  const [bills, setBills] = useState<
    {
      person: string;
      amount: number;
      detail: string;
    }[]
  >([...(billsStore ? JSON.parse(billsStore) : [])]);
  const [newBill, setNewBill] = useState<{
    person: string;
    amount: string;
    detail: string;
  }>({
    person: "",
    amount: "",
    detail: "",
  });

  const handleAddBill = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      newBill.person === "" ||
      newBill.amount === "" ||
      Number(newBill.amount) <= 0 ||
      newBill.detail === ""
    ) {
      toast({
        title: "Faltan datos!",
        description: "Completa los tres campos para cargar un nuevo gasto.",
        variant: "destructive",
      });
      return;
    }
    const payload = {
      person: newBill.person,
      amount: Number(newBill.amount),
      detail: newBill.detail,
    };
    const newList = [...bills, payload];

    setBills(newList);
    handleSyncBills(newList);
  };

  function removeBill(bill: any) {
    const newList = bills.filter((b) => b !== bill);
    setBills(newList);
    handleSyncBills(newList);
    localStorage.setItem("bills", JSON.stringify(newList));
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBill({
      ...newBill,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gastos</CardTitle>
      </CardHeader>
      <form className="grid grid-cols-4 gap-3 px-4" onSubmit={handleAddBill}>
        <Input
          placeholder="Persona"
          id="person"
          name="person"
          value={newBill.person}
          onChange={handleChangeInput}
          className="flex-1"
        />
        <Input
          placeholder="Gasto"
          id="detail"
          name="detail"
          value={newBill.detail}
          onChange={handleChangeInput}
          className="flex-1"
        />
        <Input
          placeholder="Monto"
          id="amount"
          name="amount"
          value={newBill.amount}
          onChange={handleChangeInput}
          className="flex-2"
        />
        <Button className="ml-auto gap-1 w-full flex-2" type="submit">
          Agregar gasto
          <PlusIcon className="h-4 w-4" />
        </Button>
      </form>
      <CardContent className="grid gap-8">
        <div className="grid gap-2 p-2">
          <Table>
            <TableCaption>Listado de gastos a dividir.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Persona</TableHead>
                <TableHead>Detalle</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill, index) => (
                <TableRow key={bill.person + index}>
                  <TableCell className="font-medium">{bill.person}</TableCell>
                  <TableCell>{bill.detail}</TableCell>
                  <TableCell className="text-right">{bill.amount}</TableCell>
                  <TableCell className="text-right">
                    <form onSubmit={() => removeBill(bill)}>
                      <Button
                        variant={"outline"}
                        size="icon"
                        className="gap-1 hover:text-red-500"
                        type="submit"
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
