import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InvoicePreview from "./InvoicePreview";
import { formFields } from "../utils/fields";
import ServiceTableForm from "./ServiceTableForm";

export default function InvoiceForm() {
  const [form, setForm] = useState({
    spoNumber: "SPO04468",
    spoDate: "14/07/2025",
    ro: "ASTRA CONSTRUCTION COMPANY LTD.",
    supplierRef: "TRS1164",
    supplierName: "FARHAN ABDULLAH MUSLIM ALBALWI GENEI",
    vatNumber: "311254535700003",
    crNumber: "3555102180",
    contactPerson: "Mr. Anwar Khan",
    contactPhone: "054 260 6560",
    projectCode: "10134",
    projectName: "SECONDARY INFRASTRUCTURE PACKAGE FOR TRIPLE BAY",
    location: "TRIPLE BAY - MARINA PRECINCT",
    activity: "15",
    activity_type: "Mechanical",
    cc: "15-003-2002 T&C HVAC SYSTEM",
    remarks: "SRV NO:11261",
    faxNumber: "SRV NO:11261",

    // ✅ Correct field names
    authorizedName: "",
    authorizedMobile: "",

    // ✅ New services table
    services: [
      {
        serial: 1,
        serviceCode: "04-06-015",
        description: "SWEET WATER",
        qty: 150,
        unit: "TRIP",
        unitPrice: 800,
        total: 120000,
      },
      {
        serial: 2,
        serviceCode: "04-06-015",
        description: "SWEET WATER",
        qty: 50,
        unit: "TRIP",
        unitPrice: 1300,
        total: 65000,
      },
      {
        serial: 3,
        serviceCode: "04-06-005",
        description: "SEWAGE WATER",
        qty: 150,
        unit: "TRIP",
        unitPrice: 700,
        total: 105000,
      },
      {
        serial: 4,
        serviceCode: "04-06-005",
        description: "SEWAGE WATER",
        qty: 200,
        unit: "DAY",
        unitPrice: 1250,
        total: 250000,
      },
      {
        serial: 5,
        serviceCode: "04-06-005",
        description: "SEWAGE WATER",
        qty: 15,
        unit: "TRIP",
        unitPrice: 13500,
        total: 202500,
      },
      {
        serial: 6,
        serviceCode: "04-06-002",
        description: "SITE CLEANING AND NECTURIAL SERVICES",
        qty: 50,
        unit: "TRIP",
        unitPrice: 900,
        total: 45000,
      },
      {
        serial: 7,
        serviceCode: "04-06-015",
        description: "SWEET WATER",
        qty: 300,
        unit: "HOUR",
        unitPrice: 60,
        total: 18000,
      },
    ],
  });

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Group fields by sections
  const spoDetails = formFields.filter((field) =>
    ["spoNumber", "spoDate"].includes(field.name)
  );
  const fromDetails = formFields.filter((field) =>
    [
      "companyName",
      "vatNumber",
      "projectCode",
      "projectName",
      "location",
      "activity",
      "activity_type",
      "cc",
      "remarks",
    ].includes(field.name)
  );
  const supplierDetails = formFields.filter((field) =>
    [
      "supplierRef",
      "supplierName",
      "vatNumber",
      "crNumber",
      "faxNumber",
      "contactPerson",
      "contactPhone",
    ].includes(field.name)
  );
  const authorizedPerson = formFields.filter((field) =>
    ["authorizedName", "authorizedMobile"].includes(field.name)
  );

  return (
    <div className="min-h-screen bg-zinc-900 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Form Section */}
        <div className="flex justify-center">
          <div className="space-y-6">
            {/* SPO Details */}
            <Card className="w-full bg-zinc-800 text-white">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  SPO Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {spoDetails.map((field) => (
                    <div
                      key={field.name}
                      className={field.colSpan ? "md:col-span-2" : ""}
                    >
                      <Label className="text-zinc-300 mb-2 block">
                        {field.label}
                      </Label>
                      {field.type === "textarea" ? (
                        <Textarea
                          className="bg-zinc-700 text-white border-zinc-600 focus:ring-2 focus:ring-blue-500"
                          value={form[field.name]}
                          onChange={(e) =>
                            updateForm(field.name, e.target.value)
                          }
                        />
                      ) : (
                        <Input
                          className="bg-zinc-700 text-white border-zinc-600 focus:ring-2 focus:ring-blue-500"
                          value={form[field.name]}
                          onChange={(e) =>
                            updateForm(field.name, e.target.value)
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Supplier's Details */}
            <Card className="w-full bg-zinc-800 text-white">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  Supplier's Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {supplierDetails.map((field) => (
                    <div
                      key={field.name}
                      className={field.colSpan ? "md:col-span-2" : ""}
                    >
                      <Label className="text-zinc-300 mb-2 block">
                        {field.label}
                      </Label>
                      {field.type === "textarea" ? (
                        <Textarea
                          className="bg-zinc-700 text-white border-zinc-600 focus:ring-2 focus:ring-blue-500"
                          value={form[field.name]}
                          onChange={(e) =>
                            updateForm(field.name, e.target.value)
                          }
                        />
                      ) : (
                        <Input
                          className="bg-zinc-700 text-white border-zinc-600 focus:ring-2 focus:ring-blue-500"
                          value={form[field.name]}
                          onChange={(e) =>
                            updateForm(field.name, e.target.value)
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* From Details */}
            <Card className="w-full bg-zinc-800 text-white">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  From Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fromDetails.map((field) => (
                    <div
                      key={field.name}
                      className={field.colSpan ? "md:col-span-2" : ""}
                    >
                      <Label className="text-zinc-300 mb-2 block">
                        {field.label}
                      </Label>
                      {field.type === "textarea" ? (
                        <Textarea
                          className="bg-zinc-700 text-white border-zinc-600 focus:ring-2 focus:ring-blue-500"
                          value={form[field.name]}
                          onChange={(e) =>
                            updateForm(field.name, e.target.value)
                          }
                        />
                      ) : (
                        <Input
                          className="bg-zinc-700 text-white border-zinc-600 focus:ring-2 focus:ring-blue-500"
                          value={form[field.name]}
                          onChange={(e) =>
                            updateForm(field.name, e.target.value)
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Authorized Person Contact */}
            <Card className="w-full bg-zinc-800 text-white">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  Authorized Person Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {authorizedPerson.map((field) => (
                    <div
                      key={field.name}
                      className={field.colSpan ? "md:col-span-2" : ""}
                    >
                      <Label className="text-zinc-300 mb-2 block">
                        {field.label}
                      </Label>
                      {field.type === "textarea" ? (
                        <Textarea
                          className="bg-zinc-700 text-white border-zinc-600 focus:ring-2 focus:ring-blue-500"
                          value={form[field.name]}
                          onChange={(e) =>
                            updateForm(field.name, e.target.value)
                          }
                        />
                      ) : (
                        <Input
                          className="bg-zinc-700 text-white border-zinc-600 focus:ring-2 focus:ring-blue-500"
                          value={form[field.name]}
                          onChange={(e) =>
                            updateForm(field.name, e.target.value)
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Service Table */}
            <Card className="w-full bg-zinc-800 text-white">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  Service Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ServiceTableForm
                  services={form.services}
                  setServices={(services) => updateForm("services", services)}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Live Preview */}
        <div className="flex justify-center">
          <InvoicePreview form={form} />
        </div>
      </div>
    </div>
  );
}
