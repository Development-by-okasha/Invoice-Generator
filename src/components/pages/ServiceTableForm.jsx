import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Calculator, Package, DollarSign } from "lucide-react";

export default function ServiceTableForm({ services, setServices }) {
  const [expandedRows, setExpandedRows] = useState(new Set());

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

    // Remove from expanded rows if it was expanded
    const newExpanded = new Set(expandedRows);
    newExpanded.delete(index);
    setExpandedRows(newExpanded);
  };

  const toggleRowExpansion = (index) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const calculateTotals = () => {
    const subtotal = services.reduce(
      (sum, service) => sum + (service.total || 0),
      0
    );
    const vat = subtotal * 0.15;
    const total = subtotal + vat;
    return { subtotal, vat, total };
  };

  const { subtotal, vat, total } = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Services List */}
      <div className="space-y-4">
        {services.map((row, index) => (
          <Card
            key={index}
            className="bg-white border-2 border-gray-100 hover:border-blue-200 mx-4 transition-all duration-200 rounded-2xl overflow-hidden"
          >
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 py-4 ">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    {row.serial}
                  </Badge>
                  <div>
                    <CardTitle className="text-lg text-gray-800">
                      {row.serviceDescription || "New Service"}
                    </CardTitle>
                    {row.serviceCode && (
                      <p className="text-sm text-gray-500 mt-1">
                        Code: {row.serviceCode}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    SAR {(row.total || 0).toLocaleString()}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRowExpansion(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {expandedRows.has(index) ? "Collapse" : "Expand"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRow(index)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {expandedRows.has(index) && (
              <CardContent className="p-6 space-y-6">
                {/* First Row - Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Package size={16} />
                      Service Code
                    </Label>
                    <Input
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl p-3"
                      value={row.serviceCode}
                      onChange={(e) =>
                        handleChange(index, "serviceCode", e.target.value)
                      }
                      placeholder="e.g., 04-06-015"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Service Description
                    </Label>
                    <Input
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl p-3"
                      value={row.serviceDescription}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "serviceDescription",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Sweet Water Supply"
                    />
                  </div>
                </div>

                {/* Second Row - Quantity and Pricing */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Quantity
                    </Label>
                    <Input
                      type="number"
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl p-3"
                      value={row.qty}
                      onChange={(e) =>
                        handleChange(index, "qty", e.target.value)
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Unit
                    </Label>
                    <Input
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl p-3"
                      value={row.unit}
                      onChange={(e) =>
                        handleChange(index, "unit", e.target.value)
                      }
                      placeholder="e.g., TRIP, HOUR"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <DollarSign size={16} />
                      Unit Price
                    </Label>
                    <Input
                      type="number"
                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl p-3"
                      value={row.unitPrice}
                      onChange={(e) =>
                        handleChange(index, "unitPrice", e.target.value)
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Calculator size={16} />
                      Total
                    </Label>
                    <div className="p-3 bg-gray-100 rounded-xl font-bold text-lg text-green-700">
                      SAR {(row.total || 0).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Third Row - Description */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    Additional Description (Optional)
                  </Label>
                  <Textarea
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-xl p-3"
                    rows={3}
                    value={row.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    placeholder="Any additional notes or specifications..."
                  />
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Add New Service Button */}
      <div className="flex justify-center">
        <Button
          onClick={addRow}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          size="lg"
        >
          <Plus size={20} className="mr-2" />
          Add New Service
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl overflow-hidden shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <Calculator size={24} />
            Services Summary
            <Badge variant="secondary" className="ml-auto">
              {services.length} services
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 text-gray-800 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Subtotal</p>
              <p className="text-2xl font-bold">
                SAR {subtotal.toLocaleString()}
              </p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">VAT (15%)</p>
              <p className="text-2xl font-bold">SAR {vat.toLocaleString()}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4">
              <p className="text-sm opacity-90 mb-1">Total Amount</p>
              <p className="text-2xl font-bold">SAR {total.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
