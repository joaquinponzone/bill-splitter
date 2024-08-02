"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { formatCurrency } from "@/lib/utils";

export default function BillsList({
  handleSyncBills,
}: {
  handleSyncBills: (bills: any[]) => void;
}) {
  const { toast } = useToast();
  const [bills, setBills] = useState<
    {
      person: string;
      amount: number;
      detail: string;
    }[]
  >([]);
  const [newBill, setNewBill] = useState<{
    person: string;
    amount: string;
    detail: string;
  }>({
    person: "",
    amount: "",
    detail: "",
  });

  // Use useEffect to safely access localStorage on the client side
  useEffect(() => {
    const billsStore = localStorage.getItem("bills");
    setBills(billsStore ? JSON.parse(billsStore) : []);
  }, []);

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

    // check if the newBill.person exists in the list
    const calidatePersonExists = bills.find(
      (bill) => bill.person === newBill.person
    );
    if (!calidatePersonExists) {
      toast({
        title: "Persona no encontrada!",
        description:
          "La persona que ingresaste no existe en la lista de gentes.",
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
      <form
        className="flex flex-col lg:flex-row gap-3 px-4"
        onSubmit={handleAddBill}
      >
        <Input
          placeholder="Persona"
          id="person"
          name="person"
          value={newBill.person}
          onChange={handleChangeInput}
        />
        <Input
          placeholder="Gasto"
          id="detail"
          name="detail"
          value={newBill.detail}
          onChange={handleChangeInput}
        />
        <Input
          placeholder="Monto"
          id="amount"
          name="amount"
          value={newBill.amount}
          onChange={handleChangeInput}
        />
        <Button className="gap-1 w-full lg:w-fit" type="submit">
          <p className="lg:hidden ">Agregar gasto</p>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </form>
      <CardContent className="grid gap-8">
        <div className="grid gap-2 p-2">
          <Table>
            <TableCaption>Listado de gastos a dividir.</TableCaption>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="w-[100px]">Persona</TableHead>
                <TableHead>Detalle</TableHead>
                <TableHead className="text-right">Monto</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill, index) => (
                <TableRow key={bill.person + index}>
                  <TableCell className="font-medium">{bill.person}</TableCell>
                  <TableCell>{bill.detail}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(bill.amount)}
                  </TableCell>
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
