import React from "react";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <>
      <Separator className="my-4 w-1/2" />
      <footer className="p-4 text-center text-sm text-gray-500">
        <p>
          Hecho con ♥️ por{" "}
          <a
            href="https://github.com/joaquinponzone"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            @joaquinponzone
          </a>
        </p>
      </footer>
    </>
  );
}
