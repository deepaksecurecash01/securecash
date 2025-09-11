// /zod/SiteInfoFormSchema.js - UPDATED FOR UNIFIED HANDLING
import { z } from 'zod';

// Individual step schemas (unchanged)
export const BusinessInfoSchema = z.object({
  BusinessName: z.string().min(1, "Business name is required"),
  Address: z.string().min(1, "Address is required"),
  Suburb: z.string().min(1, "Suburb is required"),
  State: z.string().min(1, "Please select a state").refine(val => val !== "select", "Please select a state"),
  Postcode: z.string().min(1, "Postcode is required")
});

export const ContactInfoSchema = z.object({
  Contact: z.string().min(1, "Contact person is required"),
  Position: z.string().min(1, "Position is required"),
  Phone: z.string().min(1, "Phone number is required"),
  Email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  Accounts: z.string().min(1, "Accounts email is required").email("Please enter a valid email address")
});

export const ServiceInfoSchema = z.object({
  Services: z.array(z.string()).min(1, "Please select at least one service"),
  Dates: z
    .date({
      required_error: "Service start date is required",
      invalid_type_error: "Service start date is required",
    })
    .refine((date) =>
    {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, {
      message: "Service start date must be today or in the future",
    }),
  Schedule: z.array(z.string()).min(1, "Please select at least one schedule option"),
  Bank: z.string().min(1, "Bank name is required")
});

export const RiskAssessmentSchema = z.object({
  Amount: z.string().min(1, "Please select an amount range"),
  Parking: z.array(z.string()).min(1, "Please select at least one parking option"),
  Security: z.array(z.string()).min(1, "Please select at least one security feature"),
  External: z.array(z.string()).optional(),
  Internal: z.array(z.string()).optional()
});

// UPDATED: Unified schema structure for production
export const UNIFIED_SITE_INFO_SCHEMA = {
  business: BusinessInfoSchema,
  contact: ContactInfoSchema,
  service: ServiceInfoSchema,
  // NEW: Add risk as a proper step (even though it's handled differently in UI)
  risk: RiskAssessmentSchema
};

// Complete schema for final validation
export const COMPLETE_SITE_INFO_SCHEMA = BusinessInfoSchema
  .merge(ContactInfoSchema)
  .merge(ServiceInfoSchema)
  .merge(RiskAssessmentSchema);

// Multi-step schemas (for backward compatibility)
export const SITE_INFO_SCHEMAS = UNIFIED_SITE_INFO_SCHEMA;

// Unified default values
export const UNIFIED_DEFAULT_VALUES = {
  // Business Info
  Type: "Regular Service",
  BusinessName: "",
  Address: "",
  Suburb: "",
  State: "",
  Postcode: "",

  // Contact Info
  Contact: "",
  Position: "",
  Phone: "",
  Email: "",
  Accounts: "",

  // Service Info
  Services: [],
  Dates: "",
  Schedule: [],
  Bank: "",

  // Risk Assessment
  Amount: "",
  Parking: [],
  Security: [],
  External: [],
  Internal: []
};

// Default values (for backward compatibility)
export const SITE_INFO_DEFAULT_VALUES = UNIFIED_DEFAULT_VALUES;

// Field configurations remain the same...
export const BUSINESS_INFO_FIELDS = [
  {
    name: "BusinessName",
    type: "text",
    label: "What is the business name of this location?",
    placeholder: "e.g. Joes Supermarket"
  },
  {
    name: "Address",
    type: "text",
    label: "What is the number & street for this location?",
    placeholder: "e.g. 49 Commercial Road"
  },
  {
    name: "Suburb",
    type: "text",
    label: "What is the suburb for this location?",
    placeholder: "e.g. Port Adelaide"
  },
  {
    name: "State",
    type: "select",
    label: "What state is this location in?",
    options: [
      { value: "select", label: "Please Select" },
      { value: "VIC", label: "Victoria" },
      { value: "NSW", label: "New South Wales" },
      { value: "QLD", label: "Queensland" },
      { value: "WA", label: "Western Australia" },
      { value: "SA", label: "South Australia" },
      { value: "TAS", label: "Tasmania" },
      { value: "ACT", label: "Australian Capital Territory" },
      { value: "NT", label: "Northern Territory" },
      { value: "NZ", label: "New Zealand" }
    ]
  },
  {
    name: "Postcode",
    type: "text",
    label: "Postcode",
    placeholder: "e.g. 5015"
  }
];

export const CONTACT_INFO_FIELDS = [
  {
    name: "Contact",
    type: "text",
    label: "Who will be the main contact person at this location?",
    placeholder: "e.g. Usually the Manager or Supervisor"
  },
  {
    name: "Position",
    type: "text",
    label: "What is their position or role at this location?",
    placeholder: "e.g. Manager, Finance Officer, etc"
  },
  {
    name: "Phone",
    type: "tel",
    label: "What is their best contact number?",
    placeholder: "Mobile telephone preferred if available"
  },
  {
    name: "Email",
    type: "email",
    label: "What is the email address at this location?",
    placeholder: "Our service procedures & registers will be sent to this address"
  },
  {
    name: "Accounts",
    type: "email",
    label: "Email address to send accounts?",
    placeholder: "Our invoice will be sent to this email address for this location."
  }
];

export const SERVICE_INFO_FIELDS = [
  {
    name: "Services",
    type: "checkbox-group",
    label: "What services do you require at this location?",
    variant: "horizontal",
    options: [
      { label: "Banking", value: "Banking Courier Service" },
      { label: "Change", value: "Change Order Service" }
    ]
  },
  {
    name: "Dates",
    type: "date",
    label: "What date would you like to commence this service?"
  },
  {
    name: "Schedule",
    type: "checkbox-group",
    label: "Please tick both your preferred schedule days and frequency of service.",
    variant: "site-grid",
    options: [
      { label: "Monday", value: "Monday" },
      { label: "Tuesday", value: "Tuesday" },
      { label: "Wednesday", value: "Wednesday" },
      { label: "Thursday", value: "Thursday" },
      { label: "Friday", value: "Friday" },
      { label: "Saturday", value: "Saturday" },
      { label: "Sunday", value: "Sunday" },
      { label: "Weekly", value: "Weekly" },
      { label: "Fortnightly", value: "Fortnightly" },
      { label: "Monthly", value: "Monthly" },
      { label: "Ad hoc", value: "Ad Hoc" }
    ],
  },
  {
    name: "Bank",
    type: "text",
    label: "Which bank does this location use?",
    placeholder: "Eg. Commonwealth Bank"
  }
];

export const RISK_ASSESSMENT_FIELDS = [
  {
    name: "Amount",
    type: "select",
    label: "What is the average amount of cash that we might be expected to collect or deliver at this location?",
    options: [
      { value: "", label: "Select Amount:" },
      { value: "$100 to $500", label: "$100 to $500" },
      { value: "$500 to $1,000", label: "$500 to $1,000" },
      { value: "$1,000 to 5,000", label: "$1,000 to 5,000" },
      { value: "$5,000 to $10,000", label: "$5,000 to $10,000" },
      { value: "$10,000 to $20,000", label: "$10,000 to $20,000" },
      { value: "$20,000 to $25,000", label: "$20,000 to $25,000" },
      { value: "$25,000 to $50,000", label: "$25,000 to $50,000" },
      { value: "$50,000 to $100,000", label: "$50,000 to $100,000" },
      { value: "$100,000+", label: "$100,000 Plus" }
    ],
    footnote: "E.g., If the collection is around $6,000, the average collection amount would be $5,000 to $10,000."
  },
  {
    name: "Parking",
    type: "checkbox-group",
    label: "What are the parking recommendations for location?",
    variant: "grid",
    options: [
      { value: "* There is on street parking available.", label: "There is on street parking available." },
      { value: "* You will need to pay for parking.", label: "You will need to pay for parking." },
      { value: "* There are loading zones on the street.", label: "There are loading zones on the street." },
      { value: "* There is off street parking available.", label: "There is off street parking available." },
      { value: "* You are able to park onsite.", label: "You are able to park onsite." }
    ],
    footnote: "Please tick what is applicable at this location."
  },
  {
    name: "Security",
    type: "checkbox-group",
    label: "Are any of these security features at this location?",
    variant: "grid",
    options: [
      { value: "* We have a dedicated cash office.", label: "We have a dedicated cash office." },
      { value: "* We have an enclosed room.", label: "We have an enclosed room." },
      { value: "* We have a hold up alarm.", label: "We have a hold up alarm." },
      { value: "* There are CCTV cameras onsite.", label: "There are CCTV cameras onsite." },
      { value: "* We have security guards onsite.", label: "We have security guards onsite." },
      { value: "* We have reliable staff backup onsite.", label: "We have reliable staff backup onsite." },
      { value: "* We use door intercoms to let people in.", label: "We use door intercoms to let people in." },
      { value: "* We have swipe cards or pin codes on public entrances.", label: "We have swipe cards or pin codes on public entrances." }
    ],
    footnote: "Please tick what is applicable at this location."
  },
  {
    name: "External",
    type: "checkbox-group",
    label: "What potential EXTERNAL hazards are at this location?",
    variant: "grid",
    options: [
      { value: "* There are areas that an offender could hide.", label: "There are areas that an offender could hide." },
      { value: "* There is poor lighting at this site.", label: "There is poor lighting at this site." },
      { value: "* The public has free access to this site.", label: "The public has free access to this site." },
      { value: "* You will have to wait to be let in.", label: "You will have to wait to be let in." },
      { value: "* There are obstacles like plant or machinery at this site.", label: "There are obstacles like plant or machinery at this site." },
      { value: "* You will have to walk through via a car park.", label: "You will have to walk through via a car park." },
      { value: "* There are hazards on the approach route.", label: "There are hazards on the approach route." },
      { value: "* The entrance to the site is not easily visible.", label: "The entrance to the site is not easily visible." }
    ],
    footnote: "Please tick what is applicable at this location."
  },
  {
    name: "Internal",
    type: "checkbox-group",
    label: "What potential INTERNAL hazards are at this location?",
    variant: "grid",
    options: [
      { value: "* You will have to wait to be let into the room.", label: "You will have to wait to be let into the room." },
      { value: "* There are fire doors onsite.", label: "There are fire doors onsite." },
      { value: "* You will have to go up/down a lift.", label: "You will have to go up/down a lift." },
      { value: "* You will have to go up/down flights of stairs.", label: "You will have to go up/down flights of stairs." },
      { value: "* You will have to go up/down escalators.", label: "You will have to go up/down escalators." },
      { value: "* There are areas where an offender could hide.", label: "There are areas where an offender could hide." },
      { value: "* You will have to go through doorways.", label: "You will have to go through doorways." },
      { value: "* There are steps.", label: "There are steps." },
      { value: "* There are passageways.", label: "There are passageways." },
      { value: "* There are slippery floors.", label: "There are slippery floors." },
      { value: "* There are obstacles like stock or merchandise.", label: "There are obstacles like stock or merchandise." }
    ],
    footnote: "Please tick what is applicable at this location."
  }
];

export default {
  UNIFIED_SITE_INFO_SCHEMA,
  COMPLETE_SITE_INFO_SCHEMA,
  UNIFIED_DEFAULT_VALUES,
  BUSINESS_INFO_FIELDS,
  CONTACT_INFO_FIELDS,
  SERVICE_INFO_FIELDS,
  RISK_ASSESSMENT_FIELDS
};