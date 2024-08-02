"use client";

import { PlusIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function PeopleList({
  handleSyncPeople,
}: {
  handleSyncPeople: (people: string[]) => void;
}) {
  const { toast } = useToast();

  const [people, setPeople] = useState<string[]>([]);
  const [newPerson, setNewPerson] = useState<string>("");

  // Use useEffect to safely access localStorage on the client side
  useEffect(() => {
    const peopleStore = localStorage.getItem("people");
    setPeople(peopleStore ? JSON.parse(peopleStore) : []);
  }, []);

  function handleAddPerson(event: React.FormEvent) {
    event.preventDefault();
    const personAlreadyExists = people.find((person) => person == newPerson);
    if (personAlreadyExists) {
      return toast({
        title: "Ya cargaste ese nombre !",
        description:
          "Los nombres no pueden repetirse, usa apodos de ser necesario.",
        variant: "destructive",
      });
    } else {
      const newList = [...people, newPerson];
      setPeople(newList);
      handleSyncPeople(newList);
      setNewPerson("");
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewPerson(event.target.value);
  }

  function removePerson(person: string) {
    const newList = people.filter((p) => p !== person);
    setPeople(newList);
    handleSyncPeople(newList);
    localStorage.setItem("people", JSON.stringify(newList));
  }

  return (
    <Card className="xl:col-span-2 w-full max-w-[25%]">
      <CardHeader className="flex flex-row items-center">
        <CardTitle>Gentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <form className="flex gap-3" onSubmit={handleAddPerson}>
            <Input
              placeholder="Nombre"
              id="name"
              name="name"
              value={newPerson}
              onChange={handleInputChange} // Update the input value on change
            />
            <Button className="gap-1" type="submit">
              Agregar persona
              <PlusIcon className="h-4 w-4" />
            </Button>
          </form>
          <Table>
            <TableCaption>Lista de gente para repartir</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">📋</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {people.map((person) => (
                <TableRow key={person}>
                  <TableCell>
                    <div className="font-medium">{person}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <form onSubmit={() => removePerson(person)}>
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
