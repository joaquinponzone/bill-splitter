"use client";
import BillsList from "@/components/bills-list";
import PeopleList from "@/components/people-list";
import Results from "@/components/results";
import { Button } from "@/components/ui/button";
import { Bill, DataToSplit } from "@/lib/types";
import { useState } from "react";

export default function Home() {
  const peopleStore = localStorage.getItem("people");
  const billsStore = localStorage.getItem("bills");

  const [dataToSplit, setDataToSplit] = useState<DataToSplit>({
    people: peopleStore ? JSON.parse(peopleStore) : [],
    bills: billsStore ? JSON.parse(billsStore) : [],
  });

  function handleSyncPeople(people: string[]) {
    setDataToSplit((prev: DataToSplit) => ({ ...prev, people }));

    // store in local storage
    localStorage.setItem("people", JSON.stringify(people));
  }

  function handleSyncBills(bills: Bill[]) {
    setDataToSplit((prev: DataToSplit) => ({ ...prev, bills }));

    // store in local storage
    localStorage.setItem("bills", JSON.stringify(bills));
  }

  function handleResetState() {
    setDataToSplit({ people: [], bills: [] });

    // clear local storage
    localStorage.removeItem("people");
    localStorage.removeItem("bills");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 md:p-12 xl:p-24">
      <section className="flex flex-col md:flex-row flex-grow w-full gap-2">
        <PeopleList handleSyncPeople={handleSyncPeople} />
        <BillsList handleSyncBills={handleSyncBills} />
        <Results data={dataToSplit} handleResetState={handleResetState} />
      </section>
    </main>
  );
}
