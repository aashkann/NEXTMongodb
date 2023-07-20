'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Cake {
  _id: string;
  name: string;
  date: string;
  hint: string;
}

async function fetchCakes(): Promise<{ cakes: Cake[] }> {
  const response = await fetch("http://localhost:3000/api/cakes", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cakes");
  }

  return response.json();
}

export default function CakeList() {
  const [cakes, setCakes] = useState<Cake[]>([]);

  useEffect(() => {
    async function getCakes() {
      try {
        const { cakes } = await fetchCakes();
        setCakes(cakes);
      } catch (error) {
        console.error(error);
      }
    }

    // Fetch cakes initially
    getCakes();

    // Poll for new cakes every 5 seconds
    const interval = setInterval(getCakes, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="w-full md:w-2/3 flex flex-col space-y-6 md:space-y-0 md:space-x-6 md:flex-row">
        <Table>
          <TableCaption>A list of cake bringers.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Hint</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cakes.map((cake) => (
              <TableRow key={cake._id}>
                <TableCell>{cake.name}</TableCell>
                <TableCell>{format(new Date(cake.date), "dd MMMM yyyy")}</TableCell>
                <TableCell>{cake.hint}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
