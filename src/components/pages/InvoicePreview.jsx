import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formFields } from "../utils/fields";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import logoUrl from "../../../public/apple-touch-icon.png";

export default function InvoicePreview({ form }) {
  const sections = {
    "SPO Details": formFields.filter((field) =>
      ["spoNumber", "spoDate"].includes(field.name)
    ),
    "From Details": formFields.filter((field) =>
      [
        "companyName",
        "companyVatNumber",
        "projectCode",
        "projectName",
        "location",
        "activity",
        "activity_type",
        "cc",
        "remarks",
      ].includes(field.name)
    ),
    "Supplier Details": formFields.filter((field) =>
      [
        "supplierRef",
        "supplierName",
        "vatNumber",
        "crNumber",
        "faxNumber",
        "contactPerson",
        "contactPhone",
      ].includes(field.name)
    ),
    "Project Details": formFields.filter((field) =>
      [
        "ro",
        "projectCode",
        "projectName",
        "location",
        "activity",
        "activity_type",
        "cc",
        "remarks",
      ].includes(field.name)
    ),
    "Authorized Person Contact": formFields.filter((field) =>
      ["authorizedName", "authorizedMobile"].includes(field.name)
    ),
  };

  const generatePDF = async () => {
    const element = document.getElementById("invoice-preview");
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      allowTaint: true,
      foreignObjectRendering: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width / 4;
    const imgHeight = canvas.height / 4;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;
    const xOffset = (pdfWidth - scaledWidth) / 2;
    const yOffset = (pdfHeight - scaledHeight) / 2;

    pdf.addImage(
      imgData,
      "PNG",
      xOffset,
      yOffset,
      scaledWidth,
      scaledHeight,
      "",
      "FAST"
    );

    pdf.save(`invoice_${form.spoNumber || "preview"}.pdf`);
  };

  return (
    <div className="flex justify-center bg-slate-100 min-h-screen py-10 px-4">
      <Card className="bg-white shadow-2xl rounded-xl w-full max-w-6xl">
        <CardHeader className="flex justify-between items-center bg-blue-50 border-b border-blue-200 rounded-t-xl p-6">
          <CardTitle className="text-2xl font-bold text-blue-900 tracking-wide">
            🧾 Invoice / الفاتورة
          </CardTitle>
          <Button
            onClick={generatePDF}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 px-6 rounded-md shadow-md"
          >
            Generate PDF
          </Button>
        </CardHeader>

        <CardContent
          id="invoice-preview"
          className="p-8 text-sm space-y-10 text-gray-800"
        >
          {/* Logo */}
          {logoUrl && (
            <div className="flex justify-center mb-4">
              <img
                src={logoUrl}
                alt="Company Logo"
                className="h-20 object-contain"
              />
            </div>
          )}

          {/* Top Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Supplier Info */}
            <SectionCard title="DRAFT COPY / نسخة أولية">
              <Row label="SPO NO. / رقم الطلب" value={form.spoNumber} bold />
              <Row label="SPO DATE / تاريخ الطلب" value={form.spoDate} bold />
              <SectionHeader
                label="Supplier Ref. No / Date"
                ar="رقم / تاريخ مرجع المورد"
              />
              <SectionHeader label="Supplier's Details" ar="تفاصيل المورد" />
              <Row label="TRS#" value={form.trs || "TRS1164"} />
              <Row
                label="Supplier Name / اسم المورد"
                value={form.supplierName || "Farhan Abdullah Muslim AlbAlwi"}
                isSupplierName
              />
              <Row
                label="VAT / الرقم الضريبي"
                value={form.vat || "311254535700003"}
              />
              <Row label="CR / السجل التجاري" value={form.cr || "3555102180"} />
              <Row
                label="Contact / جهة الاتصال"
                value={form.contact || "Mr. Anwar Khan"}
              />
              <Row label="Tel / الهاتف" value={form.tel || "054 260 6560"} />
              <SectionHeader
                label="Authorized Contact"
                ar="جهة الاتصال المخولة"
              />
              <Row label="Name / الاسم" value={form.authorizedName || "N/A"} />
              <Row
                label="Mobile# / الجوال"
                value={form.authorizedMobile || "N/A"}
              />
            </SectionCard>

            {/* Project Info */}
            <SectionCard title="R0">
              <SectionHeader label="From" ar="من" />
              <Row
                label="Company / الشركة"
                value={form.company || "Astra Construction Company Ltd."}
              />
              <Row
                label="VAT / الرقم الضريبي"
                value={form.companyVat || "300056054710003"}
              />
              <Row
                label="CR / السجل التجاري"
                value={form.companyCr || "3550005809"}
              />
              <SectionHeader label="Project" ar="المشروع" />
              <Row
                label="Name / الاسم"
                value={form.project || "Secondary Infrastructure Package"}
              />
              <SectionHeader label="Location" ar="الموقع" />
              <Row value={form.location || "Triple Bay - Marina Precinct"} />
              <SectionHeader label="Activity" ar="النشاط" />
              <Row
                value={`${form.activity || "15"} / ${
                  form.activity_type || "Mechanical"
                }`}
              />
              <SectionHeader label="C.C" ar="رمز التكلفة" />
              <Row value={form.cc || "15-003-2002"} />
              <SectionHeader label="Remarks" ar="ملاحظات" />
              <Row value={form.remarks || "SRV NO:11261"} />
            </SectionCard>
          </div>

          {/* Service Table */}
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <div className="bg-gray-800 text-white px-4 py-2 font-semibold text-base tracking-wide">
              Service Details / تفاصيل الخدمة
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-t text-sm text-center">
                <thead className="bg-gray-200 font-semibold">
                  <tr>
                    <th className="px-3 py-2 border">#</th>
                    <th className="px-3 py-2 border">
                      Service Code / كود الخدمة
                    </th>
                    <th className="px-3 py-2 border">Description / الوصف</th>
                    <th className="px-3 py-2 border">Qty / الكمية</th>
                    <th className="px-3 py-2 border">Unit / الوحدة</th>
                    <th className="px-3 py-2 border">
                      Unit Price / سعر الوحدة
                    </th>
                    <th className="px-3 py-2 border">Total / الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  {form.services?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr className="even:bg-blue-50 font-medium">
                        <td className="px-2 py-2 border">{item.serial}</td>
                        <td className="px-2 py-2 border">{item.serviceCode}</td>
                        <td className="px-2 py-2 border text-left">
                          {item.serviceDescription}
                        </td>
                        <td className="px-2 py-2 border">{item.qty}</td>
                        <td className="px-2 py-2 border">{item.unit}</td>
                        <td className="px-2 py-2 border">
                          {item.unitPrice?.toLocaleString()}
                        </td>
                        <td className="px-2 py-2 border">
                          {item.total?.toLocaleString()}
                        </td>
                      </tr>
                      {item.description && (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-4 py-2 border  text-gray-600 text-left"
                          >
                            {item.description}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end p-6 border-t bg-gray-100">
              <div className="w-full max-w-md space-y-2 text-sm text-gray-800">
                <div className="flex justify-between font-semibold">
                  <span>Services Total / إجمالي الخدمات:</span>
                  <span>
                    {form.services
                      ?.reduce((sum, s) => sum + s.total, 0)
                      ?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>VAT / الضريبة:</span>
                  <span>{form?.vatAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-blue-900 border-t pt-2">
                  <span>Net Amount / المبلغ الصافي:</span>
                  <span>{form?.netAmount?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="bg-gray-800 text-white px-4 py-2 font-semibold text-sm">
        {title}
      </div>
      <div className="p-4 space-y-2 text-sm">{children}</div>
    </div>
  );
}

function Row({ label, value, bold = false, isSupplierName = false }) {
  return (
    <div className="flex justify-between  items-start">
      <span
        className={bold ? "font-semibold text-xs" : "text-xs font-semibold"}
      >
        {label}
      </span>
      <span
        className={`text-xs text-right text-gray-800 ${
          isSupplierName ? "w-full max-w-[220px] break-words" : "w-1/2"
        }`}
      >
        {value || "N/A"}
      </span>
    </div>
  );
}

function SectionHeader({ label, ar }) {
  return (
    <div className="mt-4 bg-gray-200 px-2 py-1 text-xs font-bold rounded flex justify-between">
      <span>{label}</span>
      <span className="text-right">{ar}</span>
    </div>
  );
}
