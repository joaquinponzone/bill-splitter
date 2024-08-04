"use client";

import BillsList from "@/components/bills-list";
import Footer from "@/components/footer";
import PeopleList from "@/components/people-list";
import { ResetSheet } from "@/components/reset-sheet";
import { splitBill } from "@/lib/actions";
import { Bill, DataToSplit, SplitBill } from "@/lib/types";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TotalBills from "@/components/total-bills";
import SplitBills from "@/components/split-bills";

export default function Home() {
  const [dataToSplit, setDataToSplit] = useState<DataToSplit>({
    people: [],
    bills: [],
  });
  const [results, setResults] = useState<null | SplitBill>(null);

  function handleSyncPeople(people: string[]) {
    setDataToSplit((prev: DataToSplit) => ({ ...prev, people }));

    // Store in local storage
    window.localStorage.setItem("people", JSON.stringify(people));
  }

  function handleSyncBills(bills: Bill[]) {
    setDataToSplit((prev: DataToSplit) => ({ ...prev, bills }));

    // Store in local storage
    window.localStorage.setItem("bills", JSON.stringify(bills));
  }

  function handleResetState() {
    setDataToSplit({ people: [], bills: [] });

    // Clear local storage
    window.localStorage.removeItem("people");
    window.localStorage.removeItem("bills");
    window.location.reload();
  }

  async function handleSplit(payload: DataToSplit) {
    const results = await splitBill(payload);
    setResults(results);
  }

  useEffect(() => {
    const peopleStore = window.localStorage.getItem("people");
    const billsStore = window.localStorage.getItem("bills");

    setDataToSplit({
      people: peopleStore ? JSON.parse(peopleStore) : [],
      bills: billsStore ? JSON.parse(billsStore) : [],
    });
  }, []);

  useEffect(() => {
    handleSplit(dataToSplit);
  }, [dataToSplit]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 md:p-12 3xl:p-24">
      <section className="flex flex-col lg:flex-row flex-grow w-full md:gap-2">
        <PeopleList handleSyncPeople={handleSyncPeople} />
        <BillsList
          people={dataToSplit.people}
          handleSyncBills={handleSyncBills}
        />
        <Card className="w-full lg:max-w-[33%]">
          <CardHeader className="flex flex-row items-center">
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent>
            <TotalBills data={dataToSplit} />
            <SplitBills results={results} people={dataToSplit.people} />
          </CardContent>

          <CardFooter></CardFooter>
        </Card>
      </section>
      <section className="p-4">
        <ResetSheet handleResetState={handleResetState} />
      </section>
      <Footer />
    </main>
  );
}
