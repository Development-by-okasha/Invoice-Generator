import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import InvoicePreview from "./InvoicePreview";
import { formFields } from "../utils/fields";
import ServiceTableForm from "./ServiceTableForm";
import { FileText, Building2, User, Phone, Settings } from "lucide-react";

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
    authorizedName: "",
    authorizedMobile: "",
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

  const [activeSection, setActiveSection] = useState("spo");

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

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

  const sections = [
    {
      id: "spo",
      title: "SPO Details",
      icon: FileText,
      color: "bg-blue-500",
      fields: spoDetails,
    },
    {
      id: "supplier",
      title: "Supplier Details",
      icon: Building2,
      color: "bg-green-500",
      fields: supplierDetails,
    },
    {
      id: "from",
      title: "Company Details",
      icon: Building2,
      color: "bg-purple-500",
      fields: fromDetails,
    },
    {
      id: "authorized",
      title: "Authorized Contact",
      icon: User,
      color: "bg-orange-500",
      fields: authorizedPerson,
    },
    {
      id: "services",
      title: "Services",
      icon: Settings,
      color: "bg-red-500",
      fields: [],
    },
  ];

  const calculateTotals = () => {
    const servicesTotal =
      form.services?.reduce((sum, s) => sum + (s.total || 0), 0) || 0;
    const vatAmount = servicesTotal * 0.15;
    const netAmount = servicesTotal + vatAmount;
    return { servicesTotal, vatAmount, netAmount };
  };

  const { servicesTotal, vatAmount, netAmount } = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Invoice Generator
              </h1>
              {/* <p className="text-gray-600 mt-1">
                Create professional invoices with ease
              </p> */}
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-lg px-4 py-2">
                Total: SAR {netAmount.toLocaleString()}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Form Section */}
          <div className=" w-full">
            {/* Navigation Pills */}
            <div className="flex flex-wrap gap-2 mb-8 p-4 bg-white rounded-xl shadow-lg">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                      activeSection === section.id
                        ? `${section.color} text-white shadow-lg transform scale-105`
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                    }`}
                  >
                    <IconComponent size={16} />
                    {section.title}
                  </button>
                );
              })}
            </div>

            {/* Form Cards */}
            <div className="space-y-6">
              {sections.map((section) => {
                const IconComponent = section.icon;

                if (activeSection !== section.id) return null;

                if (section.id === "services") {
                  return (
                    <Card
                      key={section.id}
                      className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden"
                    >
                      <CardHeader
                        className={`${section.color} text-white py-6`}
                      >
                        <CardTitle className="flex items-center gap-3 text-xl">
                          <div className="p-2 text-gray-800 bg-white bg-opacity-20 rounded-lg">
                            <IconComponent size={24} />
                          </div>
                          {section.title}
                          <Badge variant="secondary" className="ml-auto">
                            {form.services?.length || 0} items
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ServiceTableForm
                          services={form.services}
                          setServices={(services) =>
                            updateForm("services", services)
                          }
                        />
                      </CardContent>
                    </Card>
                  );
                }

                return (
                  <Card
                    key={section.id}
                    className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden"
                  >
                    <CardHeader className={`${section.color} text-white py-6`}>
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="p-2  text-gray-700 bg-opacity-20 rounded-lg">
                          <IconComponent size={24} />
                        </div>
                        {section.title}
                        <Badge variant="secondary" className="ml-auto">
                          {section.fields.length} fields
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.fields.map((field) => (
                          <div
                            key={field.name}
                            className={`space-y-3 ${
                              field.colSpan ? "md:col-span-2" : ""
                            }`}
                          >
                            <Label className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
                              {field.label}
                            </Label>
                            {field.type === "textarea" ? (
                              <Textarea
                                className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl p-4 text-gray-800 bg-gray-50 transition-all duration-200"
                                rows={4}
                                value={form[field.name] || ""}
                                onChange={(e) =>
                                  updateForm(field.name, e.target.value)
                                }
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                              />
                            ) : (
                              <Input
                                className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl p-4 text-gray-800 bg-gray-50 h-12 transition-all duration-200"
                                value={form[field.name] || ""}
                                onChange={(e) =>
                                  updateForm(field.name, e.target.value)
                                }
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Summary Card */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl border-0 rounded-2xl overflow-hidden mt-8">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Invoice Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid text-gray-800 grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white bg-opacity-20 rounded-xl p-4">
                    <p className="text-sm opacity-90">Services Total</p>
                    <p className="text-2xl font-bold">
                      SAR {servicesTotal.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-4">
                    <p className="text-sm opacity-90">VAT (15%)</p>
                    <p className="text-2xl font-bold">
                      SAR {vatAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-4">
                    <p className="text-sm opacity-90">Net Amount</p>
                    <p className="text-2xl font-bold">
                      SAR {netAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="w-full ">
            <div className="sticky top-8">
              <InvoicePreview form={form} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
