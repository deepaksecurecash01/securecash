// Validation helpers for form submissions
export const validateAustracForm = (formData) =>
{
    // Add validation logic here if needed
    // For now, returning true to maintain exact same functionality
    return true;
};

// Generic form data sanitizer
export const sanitizeFormData = (formData) =>
{
    // Add sanitization logic here if needed
    // For now, returning data as-is to maintain exact same functionality
    return formData;
};

// Validate email format
export const validateEmail = (email) =>
{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Check honeypot field (bot detection)
export const isBot = (botField) =>
{
    return botField && botField.length > 0;
};

// Validate department
export const validateDepartment = (department) =>
{
    const validDepartments = ['customers', 'sales', 'operations'];
    return validDepartments.includes(department);
};

// Validate contact form required fields
export const validateContactForm = (formData) =>
{
    const errors = [];

    if (!formData.Department) errors.push("Department is required");
    if (!formData.FullName) errors.push("Full Name is required");
    if (!formData.Email) errors.push("Email is required");
    if (!formData.Message) errors.push("Message is required");

    // Validate email format if provided
    if (formData.Email && !validateEmail(formData.Email)) {
        errors.push("Invalid email format");
    }

    // Validate department if provided
    if (formData.Department && !validateDepartment(formData.Department)) {
        errors.push("Invalid department");
    }

    // Validate callback fields if callback is requested
    if (formData.ChkCallBack === 'Yes, please.') {
        if (!formData.CallbackDate) errors.push("Callback date is required");
        if (!formData.CallbackTime) errors.push("Callback time is required");
        if (!formData.CallbackState) errors.push("Callback state is required");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};


// Sanitize form data
export const sanitizeQuoteFormData = (formData) =>
{
    const sanitized = { ...formData };

    // Ensure FormID has default value
    if (!sanitized.FormID) {
        sanitized.FormID = "quote";
    }

    // Trim string fields
    const stringFields = [
        "Name",
        "Organisation",
        "Phone",
        "Email",
        "Address",
        "Locations",
        "Referrer",
        "BankingAmount",
        "BankingBank",
        "BankingComments",
        "BankingDays",
        "BankingFrequency",
        "ChangeCoinsAmount",
        "ChangeComments",
        "ChangeDays",
        "ChangeFrequency",
        "ChangeNotesAmount",
    ];

    stringFields.forEach((field) =>
    {
        if (typeof sanitized[field] === "string") {
            sanitized[field] = sanitized[field].trim();
        }
    });

    return sanitized;
};
// Validation helper for Quote form
export const validateQuoteFormData = (formData) =>
{
    const errors = [];

    // Required fields validation
    const requiredFields = {
        Name: "Name is required",
        Organisation: "Organisation is required",
        Phone: "Phone number is required",
        Email: "Email is required",
        Address: "Address is required",
        Locations: "Locations is required",
        Referrer: "Referrer information is required",
    };

    // Check required fields
    Object.entries(requiredFields).forEach(([field, message]) =>
    {
        const value = formData[field];

        if (
            !value ||
            (typeof value === "string" && value.trim() === "") ||
            (Array.isArray(value) && value.length === 0)
        ) {
            errors.push({ field, message });
        }
    });

    return errors;
};

// Validation helper
export const validateFormData = (formData) => {
  const errors = [];

  // Required fields validation
  const requiredFields = {
    BusinessName: "Business name is required",
    Address: "Address is required",
    Suburb: "Suburb is required",
    State: "State is required",
    Postcode: "Postcode is required",
    Contact: "Contact person is required",
    Position: "Position is required",
    Phone: "Phone number is required",
    Email: "Email is required",
    Accounts: "Accounts email is required",
    Services: "At least one service must be selected",
    Dates: "Start date is required",
    Bank: "Bank information is required",
    Amount: "Amount range is required",
  };

  // Check required fields
  Object.entries(requiredFields).forEach(([field, message]) => {
    const value = formData[field];

    if (
      !value ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0)
    ) {
      errors.push({ field, message });
    }
  });

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.Email && !emailRegex.test(formData.Email)) {
    errors.push({ field: "Email", message: "Invalid email format" });
  }
  if (formData.Accounts && !emailRegex.test(formData.Accounts)) {
    errors.push({
      field: "Accounts",
      message: "Invalid accounts email format",
    });
  }

  // State validation
  const validStates = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"];
  if (formData.State && !validStates.includes(formData.State)) {
    errors.push({ field: "State", message: "Invalid state selection" });
  }

  // Amount validation
  const validAmounts = [
    "$100 to $500",
    "$500 to $1,000",
    "$1,000 to 5,000",
    "$5,000 to $10,000",
    "$10,000 to $20,000",
    "$20,000 to $25,000",
    "$25,000 to $50,000",
    "$50,000 to $100,000",
    "$100,000+",
  ];
  if (formData.Amount && !validAmounts.includes(formData.Amount)) {
    errors.push({ field: "Amount", message: "Invalid amount range" });
  }

  return errors;
};

// Sanitize form data
export const sanitizeSiteFormData = (formData) => {
  const sanitized = { ...formData };

  // Ensure Type has default value
  if (!sanitized.Type) {
    sanitized.Type = "Regular Service";
  }

  // Ensure array fields are arrays
  const arrayFields = [
    "Services",
    "Schedule",
    "Parking",
    "Security",
    "External",
    "Internal",
  ];
  arrayFields.forEach((field) => {
    if (!Array.isArray(sanitized[field])) {
      sanitized[field] = sanitized[field] ? [sanitized[field]] : [];
    }
  });

  // Trim string fields
  const stringFields = [
    "BusinessName",
    "Address",
    "Suburb",
    "State",
    "Postcode",
    "Contact",
    "Position",
    "Phone",
    "Email",
    "Accounts",
    "Dates",
    "Bank",
    "Amount",
  ];
  stringFields.forEach((field) => {
    if (typeof sanitized[field] === "string") {
      sanitized[field] = sanitized[field].trim();
    }
  });

  return sanitized;
};