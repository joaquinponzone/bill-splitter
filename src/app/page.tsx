"use client";

import BillsList from "@/components/bills-list";
import Footer from "@/components/footer";
import PeopleList from "@/components/people-list";
import Results from "@/components/results";
import { Button } from "@/components/ui/button";
import { Bill, DataToSplit } from "@/lib/types";
import { useState, useEffect } from "react";

export default function Home() {
  const [dataToSplit, setDataToSplit] = useState<DataToSplit>({
    people: [],
    bills: [],
  });

  // Use useEffect to safely access localStorage on the client side
  useEffect(() => {
    const peopleStore = window.localStorage.getItem("people");
    const billsStore = window.localStorage.getItem("bills");

    setDataToSplit({
      people: peopleStore ? JSON.parse(peopleStore) : [],
      bills: billsStore ? JSON.parse(billsStore) : [],
    });
  }, []);

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
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 md:p-12 3xl:p-24">
      <section className="flex flex-col lg:flex-row flex-grow w-full gap-2">
        <PeopleList handleSyncPeople={handleSyncPeople} />
        <BillsList
          people={dataToSplit.people}
          handleSyncBills={handleSyncBills}
        />
        <Results data={dataToSplit} handleResetState={handleResetState} />
      </section>
      <section className="p-4">
        <Button
          size={"lg"}
          className="w-full"
          onClick={handleResetState}
          variant={"secondary"}
        >
          Reiniciar cuenta 🗑️
        </Button>
      </section>
      <Footer />
    </main>
  );
}
