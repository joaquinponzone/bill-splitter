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
import { Bill } from "@/lib/types";

export default function BillsList({
  people,
  handleSyncBills,
}: {
  people: string[];
  handleSyncBills: (bills: any[]) => void;
}) {
  const { toast } = useToast();
  const [bills, setBills] = useState<Bill[]>([]);
  const [newBill, setNewBill] = useState<Bill>({
    person: "",
    amount: null,
    detail: "",
  });

  useEffect(() => {
    const billsStore = localStorage.getItem("bills");
    setBills(billsStore ? JSON.parse(billsStore) : []);
  }, []);

  const handleAddBill = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      newBill.person === "" ||
      newBill.amount === null ||
      Number(newBill.amount) <= 0 ||
      newBill.detail === ""
    ) {
      toast({
        title: "Faltan datos!",
        description: "Completa todos los campos para cargar un nuevo gasto.",
        variant: "destructive",
      });
      return;
    }

    const validatePersonExist = people.find(
      (person) => person === newBill.person
    );
    if (!validatePersonExist) {
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

    setNewBill({
      person: "",
      amount: null,
      detail: "",
    });
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
    <Card className="border-none md:border md:rounded-lg w-full">
      <CardHeader>
        <CardTitle>Gastos</CardTitle>
      </CardHeader>
      <form
        className="flex flex-col xl:flex-row gap-3 px-4"
        onSubmit={handleAddBill}
      >
        <Input
          placeholder="Persona"
          id="person"
          name="person"
          value={newBill.person}
          onChange={handleChangeInput}
          list="people"
        />
        {/* autocomplete for persona input base on the gentes list */}
        <datalist id="people">
          {people.map((person) => (
            <option key={person} value={person} />
          ))}
        </datalist>
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
          value={Number(newBill.amount)}
          onChange={handleChangeInput}
        />
        <Button className="gap-1 w-full xl:w-fit" type="submit">
          <p className="xl:hidden ">Agregar gasto</p>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </form>
      <CardContent className="grid gap-8 py-4 xl:py-2">
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
              <TableRow key={bill.person + index} className="font-mono">
                <TableCell className="font-bold text-green-500">
                  {bill.person}
                </TableCell>
                <TableCell className="font-light">{bill.detail}</TableCell>
                <TableCell className="font-bold text-right">
                  {formatCurrency(Number(bill.amount))}
                </TableCell>
                <TableCell className="text-right pr-0">
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
      </CardContent>
    </Card>
  );
}
