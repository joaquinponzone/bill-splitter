"use client";

import { PlusIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
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
    <Card className="w-full xl:max-w-[25%] 2xl:max-w-[30%]">
      <CardHeader className="flex flex-row items-center">
        <CardTitle>Gentes</CardTitle>
      </CardHeader>
      <form
        className="flex flex-col xl:flex-row gap-3 px-4"
        onSubmit={handleAddPerson}
      >
        <Input
          placeholder="Agrega nueva gente"
          id="enter-person"
          name="name"
          value={newPerson}
          onChange={handleInputChange}
        />
        <Button className="gap-1 w-full xl:w-fit" type="submit">
          <p className="xl:hidden ">Agregar</p>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </form>
      <CardContent className="grid gap-8 py-4 xl:py-2">
        <Table>
          <TableCaption>Lista de gente para dividir</TableCaption>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[100px]">📋</TableHead> */}
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
      </CardContent>
    </Card>
  );
}
