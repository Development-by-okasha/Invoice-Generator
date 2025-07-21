import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";
import InvoiceForm from "./components/pages/InvoiceForm";

function App() {
  return (
    <>
      <div className="">
        <InvoiceForm />
      </div>
    </>
  );
}

export default App;
