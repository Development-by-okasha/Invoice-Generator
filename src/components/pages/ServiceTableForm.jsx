import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ServiceTableForm({ services, setServices }) {
  const handleChange = (index, key, value) => {
    const updated = [...services];
    updated[index][key] = value;
    if (key === "qty" || key === "unitPrice") {
      const qty = parseFloat(updated[index].qty) || 0;
      const unitPrice = parseFloat(updated[index].unitPrice) || 0;
      updated[index].total = qty * unitPrice;
    }
    setServices(updated);
  };

  const addRow = () => {
    setServices([
      ...services,
      {
        serial: services.length + 1,
        serviceCode: "",
        serviceDescription: "",
        description: "",
        qty: 0,
        unit: "",
        unitPrice: 0,
        total: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = services
      .filter((_, i) => i !== index)
      .map((item, i) => ({
        ...item,
        serial: i + 1,
      }));
    setServices(updated);
  };

  return (
    <Card className="w-full bg-zinc-800 text-white">
      <CardHeader>
        <CardTitle className="text-white text-lg">Service Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left bg-zinc-700">
                <th className="px-2 py-1">#</th>
                <th className="px-2 py-1">Service Code</th>
                <th className="px-2 py-1">Service Description</th>
                <th className="px-2 py-1">Qty</th>
                <th className="px-2 py-1">Unit</th>
                <th className="px-2 py-1">Unit Price</th>
                <th className="px-2 py-1">Total</th>
                <th className="px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {services.map((row, index) => (
                <React.Fragment key={index}>
                  <tr className="border-t border-zinc-600  ">
                    <td className="px-2 py-1">{row.serial}</td>
                    <td className="px-2 py-1">
                      <Input
                        className="bg-zinc-700 text-white"
                        value={row.serviceCode}
                        onChange={(e) =>
                          handleChange(index, "serviceCode", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-1">
                      <Input
                        className="bg-zinc-700 text-white"
                        value={row.serviceDescription}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "serviceDescription",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="px-2 py-1">
                      <Input
                        type="number"
                        className="bg-zinc-700 text-white"
                        value={row.qty}
                        onChange={(e) =>
                          handleChange(index, "qty", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-1">
                      <Input
                        className="bg-zinc-700 text-white"
                        value={row.unit}
                        onChange={(e) =>
                          handleChange(index, "unit", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-1">
                      <Input
                        type="number"
                        className="bg-zinc-700 text-white"
                        value={row.unitPrice}
                        onChange={(e) =>
                          handleChange(index, "unitPrice", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-1">{row.total.toLocaleString()}</td>
                    <td className="px-2 py-1">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeRow(index)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-t border-zinc-600">
                    <td colSpan="8" className="px-2 py-1">
                      <Input
                        className="bg-zinc-700 text-white w-full"
                        value={row.description}
                        onChange={(e) =>
                          handleChange(index, "description", e.target.value)
                        }
                        placeholder="Enter description"
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pt-4">
          <Button onClick={addRow}>+ Add Row</Button>
        </div>
      </CardContent>
    </Card>
  );
}
