export const formFields = [
  // SPO Details
  { label: "SPO No.", name: "spoNumber", type: "input" },
  { label: "SPO Date", name: "spoDate", type: "input" },

  // From Details
  { label: "Company Name", name: "companyName", type: "input" },
  { label: "VAT #", name: "companyVatNumber", type: "input" }, // Renamed to avoid duplicate
  { label: "Project Code", name: "projectCode", type: "input" },
  { label: "Project Name", name: "projectName", type: "textarea" },
  { label: "Location", name: "location", type: "textarea" },
  { label: "Activity", name: "activity", type: "input" },
  { label: "Activity Type", name: "activity_type", type: "input" },
  { label: "C.C", name: "cc", type: "input" },
  { label: "Remarks", name: "remarks", type: "textarea", colSpan: true },

  // Supplier's Details
  { label: "Supplier Reference", name: "supplierRef", type: "input" },
  { label: "Supplier Name", name: "supplierName", type: "input" },
  { label: "VAT #", name: "vatNumber", type: "input" },
  { label: "CR #", name: "crNumber", type: "input" },
  { label: "FAX", name: "faxNumber", type: "input" },
  { label: "Contact Person", name: "contactPerson", type: "input" },
  { label: "Contact Phone", name: "contactPhone", type: "input" },

  // Authorized Person Contact
  { label: "Name", name: "authorizedName", type: "input" }, // Renamed for clarity
  { label: "Mobile #", name: "authorizedMobile", type: "input" }, // Renamed for clarity
];
