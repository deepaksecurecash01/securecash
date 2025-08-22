

// Enhanced ABN InputField Component
const ABNInputField = ({
  label,
  name,
  placeholder,
  Icon,
  register,
  errors,
  currentErrorField,
  setCurrentErrorField,
  setValue,
  abnValue,
  abnRef
}) =>
{
  const hasError = errors[name] && currentErrorField === name;
  const [isFocused, setIsFocused] = useState(false);

  // ABN input handler to limit to 11 digits and format
  const handleABNChange = (e) =>
  {
    const value = e.target.value;
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');

    // Limit to 11 digits
    const limitedDigits = digitsOnly.slice(0, 11);

    // Format with spaces for display (XX XXX XXX XXX)
    let formattedValue = limitedDigits;
    if (limitedDigits.length > 2) {
      formattedValue = limitedDigits.slice(0, 2) + ' ' + limitedDigits.slice(2);
    }
    if (limitedDigits.length > 5) {
      formattedValue = limitedDigits.slice(0, 2) + ' ' + limitedDigits.slice(2, 5) + ' ' + limitedDigits.slice(5);
    }
    if (limitedDigits.length > 8) {
      formattedValue = limitedDigits.slice(0, 2) + ' ' + limitedDigits.slice(2, 5) + ' ' + limitedDigits.slice(5, 8) + ' ' + limitedDigits.slice(8);
    }

    setValue("ABN", formattedValue, { shouldValidate: true });
  };

  return (
    <div className="relative">
      <label className="text-white text-base inline-block mt-4 mb-2 w-full text-left">
        {label}
      </label>
      <div className="relative w-full flex items-center bg-white rounded-[2px] border">
        <input
          className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
            }`}
          type="text"
          name={name}
          ref={abnRef}
          value={abnValue || ""}
          onChange={handleABNChange}
          onFocus={() =>
          {
            setCurrentErrorField(name);
            setIsFocused(true);
          }}
          onBlur={() =>
          {
            setCurrentErrorField(null);
            setIsFocused(false);
          }}
          placeholder={placeholder}
          maxLength={14}
          autoComplete="new-password"
          required
        />
        <Icon
          className={`min-w-[50px] text-[18px] text-[#999] ${hasError
            ? "text-red-500"
            : isFocused
              ? "text-primary"
              : "text-[#999]"
            }`}
        />
        {errors[name] && (
          <WarningPopup
            error={errors[name]?.message}
            isFirstError={currentErrorField === name}
          />
        )}
      </div>
    </div>
  );
};

// Enhanced Zod schema for AUSTRAC form validation
const AUSTRACFormSchema = z.object({
  Organisation: z
    .string()
    .nonempty("Organisation name is required.")
    .min(2, "Organisation name must be at least 2 characters long."),
  ABN: z
    .string()
    .nonempty("ABN number is required.")
    .regex(/^[0-9\s]+$/, "ABN must contain only digits and spaces.")
    .refine((abn) =>
    {
      // Remove spaces and check if it's 11 digits
      const cleanABN = abn.replace(/\s/g, '');
      return cleanABN.length === 11;
    }, {
      message: "ABN must be exactly 11 digits.",
    }),
  Website: z
    .string()
    .nonempty("Website is required.").url("Please enter a valid URL."),
  OrganisationEmail: z
    .string()
    .nonempty("Email is required.")
    .email("Please enter a valid email address."),
  OrganisationType: z
    .string()
    .nonempty("Organisation type is required."),
  Address: z
    .string()
    .nonempty("Address is required.")
    .min(5, "Address must be at least 5 characters long."),
  State: z
    .string()
    .nonempty("State is required."),
  Personnel: z
    .string()
    .nonempty("Personnel information is required.")
    .min(10, "Please provide detailed personnel information."),
  BotField: z.string().max(0, "Bot detected!"), // honeypot field must be empty
});

// Focus utility function
const focusInput = (ref) =>
{
  if (ref && ref.current) {
    ref.current.focus();
  }
};

const AUSTRACForm = ({ className }) =>
{
  const [currentErrorField, setCurrentErrorField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  // Create refs for focus management
  const organisationRef = useRef(null);
  const abnRef = useRef(null);
  const websiteRef = useRef(null);
  const emailRef = useRef(null);
  const organisationTypeRef = useRef(null);
  const addressRef = useRef(null);
  const stateRef = useRef(null);
  const personnelRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AUSTRACFormSchema),
  });

  const abnValue = watch("ABN");

  // Focus management effect
  useEffect(() =>
  {
    if (errors && Object.keys(errors).length > 0) {
      const errorField = Object.keys(errors)[0]; // Get the first error field
      setCurrentErrorField(errorField);

      const focusMap = {
        Organisation: organisationRef,
        ABN: abnRef,
        Website: websiteRef,
        OrganisationEmail: emailRef,
        OrganisationType: organisationTypeRef,
        Address: addressRef,
        State: stateRef,
        Personnel: personnelRef,
      };

      const refToFocus = focusMap[errorField];
      if (refToFocus) {
        focusInput(refToFocus);
      } else {
        console.warn(`Unhandled error field: ${errorField}`);
      }
    } else {
      setCurrentErrorField(null);
    }
  }, [errors]);

  const inputFields = [
    {
      label: "What is your organisation's name?",
      name: "Organisation",
      placeholder: "e.g. Smith Holdings Pty Ltd or South Park Primary School",
      Icon: FaBuilding,
      errorMessage: "Please enter your organisations full name.",
      ref: organisationRef,
    },
    {
      label: "What is the organisation's main website?",
      name: "Website",
      placeholder: "e.g. https://www.smithholdings.com.au",
      Icon: FaGlobe,
      errorMessage: "Please enter your organisation's main website.",
      ref: websiteRef,
    },
    {
      label: "What is the organisation's main email address?",
      name: "OrganisationEmail",
      type: "email",
      placeholder: "e.g. admin@smithholdings.com.au",
      Icon: FaEnvelope,
      errorMessage: "Please enter your organisation's main email address.",
      ref: emailRef,
    },
    {
      label: "What is the address of the head office?",
      name: "Address",
      placeholder: "e.g. 38 Main South Road Blacktown QLD 6987",
      Icon: FaHome,
      errorMessage: "Please enter the address of your head office.",
      ref: addressRef,
    },
  ];

  const organisationTypeOptions = [
    { value: "", label: "Please Select" },
    { value: "Individual (Sole Trader)", label: "Individual (Sole Trader)" },
    { value: "Trustees & Beneficiaries", label: "Trustees & Beneficiaries" },
    { value: "Domestic Pty Ltd or Ltd Company", label: "Domestic Pty Ltd or Ltd Company" },
    { value: "Registered Foreign Company", label: "Registered Foreign Company" },
    { value: "Foreign Company Not Registered in Australia", label: "Foreign Company Not Registered in Australia" },
    { value: "Partners & Partnerships", label: "Partners & Partnerships" },
    { value: "Associations", label: "Associations" },
    { value: "Registered Co-Operatives", label: "Registered Co-Operatives" },
    { value: "Government Body", label: "Government Body" },
    { value: "School or Education Institute", label: "School or Education Institute" },
    { value: "Church or Religious Organisation", label: "Church or Religious Organisation" },
  ];

  const stateOptions = [
    { value: "", label: "Please Select" },
    { value: "NSW", label: "New South Wales" },
    { value: "VIC", label: "Victoria" },
    { value: "QLD", label: "Queensland" },
    { value: "WA", label: "Western Australia" },
    { value: "SA", label: "South Australia" },
    { value: "TAS", label: "Tasmania" },
    { value: "ACT", label: "Australian Capital Territory" },
    { value: "NT", label: "Northern Territory" },
    { value: "NZ", label: "New Zealand" },
  ];

  // Function to get device information
  const getDeviceInfo = () =>
  {
    const userAgent = navigator.userAgent;

    // Parse browser and version
    let browserInfo = 'Unknown';
    let browserVersion = '';

    if (/Chrome\/([0-9.]+)/.test(userAgent)) {
      const match = userAgent.match(/Chrome\/([0-9.]+)/);
      browserInfo = 'Chrome';
      browserVersion = match[1];
    } else if (/Firefox\/([0-9.]+)/.test(userAgent)) {
      const match = userAgent.match(/Firefox\/([0-9.]+)/);
      browserInfo = 'Firefox';
      browserVersion = match[1];
    } else if (/Version\/([0-9.]+).*Safari/.test(userAgent)) {
      const match = userAgent.match(/Version\/([0-9.]+)/);
      browserInfo = 'Safari';
      browserVersion = match[1];
    } else if (/Edge\/([0-9.]+)/.test(userAgent)) {
      const match = userAgent.match(/Edge\/([0-9.]+)/);
      browserInfo = 'Edge';
      browserVersion = match[1];
    }

    // Parse OS information
    let osInfo = 'Unknown';
    if (/Windows NT ([0-9._]+)/.test(userAgent)) {
      const match = userAgent.match(/Windows NT ([0-9._]+)/);
      osInfo = `Windows NT ${match[1]}`;
    } else if (/Mac OS X ([0-9._]+)/.test(userAgent)) {
      const match = userAgent.match(/Mac OS X ([0-9._]+)/);
      osInfo = `Mac OS X ${match[1].replace(/_/g, '.')}`;
    } else if (/Android ([0-9.]+)/.test(userAgent)) {
      const match = userAgent.match(/Android ([0-9.]+)/);
      osInfo = `Android ${match[1]}`;
    } else if (/OS ([0-9._]+)/.test(userAgent) && /iPhone|iPad/.test(userAgent)) {
      const match = userAgent.match(/OS ([0-9._]+)/);
      osInfo = `iOS ${match[1].replace(/_/g, '.')}`;
    } else if (/Linux/.test(userAgent)) {
      osInfo = 'Linux';
    }

    return {
      fullUserAgent: userAgent,
    };
  };

  // Function to get IP address
  const getIPAddress = async () =>
  {
    try {
      // Try multiple IP services for reliability
      const ipServices = [
        'https://api.ipify.org?format=json',
        'https://ipapi.co/json/',
        'https://api.ip.sb/jsonip',
      ];

      for (const service of ipServices) {
        try {
          const response = await fetch(service);
          const data = await response.json();

          // Different services return IP in different formats
          if (data.ip) return data.ip;
          if (data.query) return data.query;

        } catch (error) {
          console.log(`IP service ${service} failed:`, error);
          continue;
        }
      }

      return 'Unable to detect';
    } catch (error) {
      console.error('Error fetching IP:', error);
      return 'Unable to detect';
    }
  };

  const handleFormSubmit = async (data) =>
  {
    try {
      // Check honeypot field
      if (data.BotField) {
        console.log("Bot detected.");
        return;
      }

      setIsSubmitting(true);

      // Get device information
      const deviceInfo = getDeviceInfo();

      // Get IP address
      const ipAddress = await getIPAddress();

      // Format date of submission
      // Format date of acceptance as "Wednesday, July 9th 2025, 6:48:31 am"
      const now = new Date();
      const dateOfSubmission = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).replace(/(\d+)/, (match) =>
      {
        const day = parseInt(match);
        const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
          day === 2 || day === 22 ? 'nd' :
            day === 3 || day === 23 ? 'rd' : 'th';
        return day + suffix;
      }) + ', ' + now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
      });

      // Add timestamp and form ID
      const finalData = {
        "formType": "austrac",
        ...data,
        timestamp: new Date().toISOString(),
        formId: "AUSTRAC",
        submissionId: `austrac_${Date.now()}`,
        "IP Address": ipAddress,
        "Device": deviceInfo.fullUserAgent, // Use full user agent instead of deviceString
        dateOfSubmission: dateOfSubmission,
      };

      console.log("AUSTRAC form data:", finalData);

      // Make the API call
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit the form");
      }

      const result = await response.json();
console.log(result)
      // setIsSubmitted(true);
      // setIsSubmitting(false);

      // // Reset form
      // reset();

      // // Redirect to /austrac on successful submission
      // router.push("/site-info");
      // // Auto-hide success message after 3 seconds
      // setTimeout(() =>
      // {
      //   setIsSubmitted(false);
      // }, 3000);

    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);

      // You might want to show an error message to the user
      alert("There was an error submitting your form. Please try again.");
    }
  };
    
  

    const ContactFormSchema = z.object({
        Department: z
            .string()
            .min(1, "Please select a department."),
        FullName: z
            .string()
            .min(1, "Full name is required.")
            .min(2, "Full name must be at least 2 characters long."),
        Organisation: z
            .string()
            .min(1, "Organisation name is required.")
            .min(2, "Organisation name must be at least 2 characters long."),
        Phone: z
            .string()
            .min(1, "Phone number is required.")
            .regex(/^[0-9\s\-\+\(\)]+$/, "Please enter a valid phone number.")
            .min(8, "Phone number must be at least 8 digits."),
        Email: z
            .string()
            .min(1, "Email is required.")
            .email("Please enter a valid email address."),
        ChkCallBack: z
            .string()
            .optional(),
        CallbackDate: z
            .any()
            .optional(),
        CallbackTime: z
            .string()
            .optional(),
        CallbackState: z
            .string()
            .optional(),
        Message: z
            .string()
            .min(1, "Please tell us how we can help you.")
            .min(10, "Please provide more details about how we can help."),
        BotField: z.string().max(0, "Bot detected!").optional(),
    }).refine((data) =>
    {
        // Check if callback is requested (checkbox is checked)
        const callbackRequested = data.ChkCallBack === 'Yes, please.';

        if (callbackRequested) {
            // If callback is requested, all callback fields must be filled
            return data.CallbackDate &&
                data.CallbackTime &&
                data.CallbackTime !== '' &&
                data.CallbackState &&
                data.CallbackState !== '';
        }

        return true; // If no callback requested, validation passes
    }, {
        message: "When requesting a callback, please select a date, time, and state.",
        path: ["CallbackDate"],
    }).refine((data) =>
    {
        const callbackRequested = data.ChkCallBack === 'Yes, please.';

        if (callbackRequested && (!data.CallbackTime || data.CallbackTime === '')) {
            return false;
        }
        return true;
    }, {
        message: "Please select a callback time.",
        path: ["CallbackTime"],
    }).refine((data) =>
    {
        const callbackRequested = data.ChkCallBack === 'Yes, please.';

        if (callbackRequested && (!data.CallbackState || data.CallbackState === '')) {
            return false;
        }
        return true;
    }, {
        message: "Please select your state.",
        path: ["CallbackState"],
    });



    const focusInput = (ref) =>
    {
        if (ref && ref.current) {
            ref.current.focus();
        }
    };

    const FranchiseForm = () =>
    {
        const [currentErrorField, setCurrentErrorField] = useState(null);
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [isSubmitted, setIsSubmitted] = useState(false);
        const [isFormSubmitted, setIsFormSubmitted] = useState(false);
        const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
        const [submissionStatus, setSubmissionStatus] = useState(null);
        const [formData, setFormData] = useState(null);

        // Create refs for focus management
        const fullNameRef = useRef(null);
        const organisationRef = useRef(null);
        const phoneRef = useRef(null);
        const emailRef = useRef(null);
        const messageRef = useRef(null);
        const CallbackDateRef = useRef(null);

        const calendlyURL = "https://calendly.com/jo_securecash?hide_gdpr_banner=1&primary_color=c7a652";

        const {
            register,
            handleSubmit,
            setValue,
            watch,
            reset,
            formState: { errors },
        } = useForm({
            resolver: ContactFormSchema ? zodResolver(ContactFormSchema) : undefined,
            defaultValues: {
                Department: "",
                FullName: "",
                Organisation: "",
                Phone: "",
                Email: "",
                ChkCallBack: "", // Explicitly set to empty string
                CallbackDate: "",
                CallbackTime: "",
                CallbackState: "",
                Message: "",
                BotField: "",
            },
        });

        const formatDate = (date) =>
        {
            const unixTimestamp = Math.floor(new Date(date).getTime());
            return unixTimestamp;
        };

        const selectedCallbackDate = watch("CallbackDate");
        const needsCallback = watch("ChkCallBack");

        const handleNumericOnly = (e) =>
        {
            const value = e.target.value.replace(/[^0-9]/g, "");
            setValue(e.target.name, value, { shouldValidate: true, shouldDirty: true });
        };

        // Function to get device information
        const getDeviceInfo = () =>
        {
            const userAgent = navigator.userAgent;

            // Parse browser and version
            let browserInfo = 'Unknown';
            let browserVersion = '';

            if (/Chrome\/([0-9.]+)/.test(userAgent)) {
                const match = userAgent.match(/Chrome\/([0-9.]+)/);
                browserInfo = 'Chrome';
                browserVersion = match[1];
            } else if (/Firefox\/([0-9.]+)/.test(userAgent)) {
                const match = userAgent.match(/Firefox\/([0-9.]+)/);
                browserInfo = 'Firefox';
                browserVersion = match[1];
            } else if (/Version\/([0-9.]+).*Safari/.test(userAgent)) {
                const match = userAgent.match(/Version\/([0-9.]+)/);
                browserInfo = 'Safari';
                browserVersion = match[1];
            } else if (/Edge\/([0-9.]+)/.test(userAgent)) {
                const match = userAgent.match(/Edge\/([0-9.]+)/);
                browserInfo = 'Edge';
                browserVersion = match[1];
            }

            // Parse OS information
            let osInfo = 'Unknown';
            if (/Windows NT ([0-9._]+)/.test(userAgent)) {
                const match = userAgent.match(/Windows NT ([0-9._]+)/);
                osInfo = `Windows NT ${match[1]}`;
            } else if (/Mac OS X ([0-9._]+)/.test(userAgent)) {
                const match = userAgent.match(/Mac OS X ([0-9._]+)/);
                osInfo = `Mac OS X ${match[1].replace(/_/g, '.')}`;
            } else if (/Android ([0-9.]+)/.test(userAgent)) {
                const match = userAgent.match(/Android ([0-9.]+)/);
                osInfo = `Android ${match[1]}`;
            } else if (/OS ([0-9._]+)/.test(userAgent) && /iPhone|iPad/.test(userAgent)) {
                const match = userAgent.match(/OS ([0-9._]+)/);
                osInfo = `iOS ${match[1].replace(/_/g, '.')}`;
            } else if (/Linux/.test(userAgent)) {
                osInfo = 'Linux';
            }

            return {
                fullUserAgent: userAgent,
                browser: browserInfo,
                browserVersion: browserVersion,
                os: osInfo,
            };
        };

        // Function to get IP address
        const getIPAddress = async () =>
        {
            try {
                // Try multiple IP services for reliability
                const ipServices = [
                    'https://api.ipify.org?format=json',
                    'https://ipapi.co/json/',
                    'https://api.ip.sb/jsonip',
                ];

                for (const service of ipServices) {
                    try {
                        const response = await fetch(service);
                        const data = await response.json();

                        // Different services return IP in different formats
                        if (data.ip) return data.ip;
                        if (data.query) return data.query;

                    } catch (error) {
                        console.log(`IP service ${service} failed:`, error);
                        continue;
                    }
                }

                return 'Unable to detect';
            } catch (error) {
                console.error('Error fetching IP:', error);
                return 'Unable to detect';
            }
        };

        // Focus management effect
        useEffect(() =>
        {
            if (errors && Object.keys(errors).length > 0) {
                const errorField = Object.keys(errors)[0]; // Get the first error field
                setCurrentErrorField(errorField);

                const focusMap = {
                    FullName: fullNameRef,
                    Organisation: organisationRef,
                    Phone: phoneRef,
                    Email: emailRef,
                    Message: messageRef,
                    CallbackDate: CallbackDateRef,
                };

                const refToFocus = focusMap[errorField];
                if (refToFocus) {
                    focusInput(refToFocus);
                }
            } else {
                setCurrentErrorField(null);
            }
        }, [errors]);

        useEffect(() =>
        {
            if (submissionStatus) {
                const timer = setTimeout(() =>
                {
                    // dispatch(setPopupForm("")); // Uncomment if using Redux
                    setTimeout(() =>
                    {
                        setSubmissionStatus(null);
                    }, 1000);
                }, 6000);
                return () => clearTimeout(timer);
            }
        }, [submissionStatus]);

    
      

        const handleFormSubmit = async (data) =>
        {

            try {
                // Basic validation
                if (!data.Department || !data.FullName || !data.Email || !data.Message) {
                    console.log("Missing required fields:");
                    console.log("Department:", data.Department);
                    console.log("FullName:", data.FullName);
                    console.log("Email:", data.Email);
                    console.log("Message:", data.Message);
                    alert("Please fill in all required fields.");
                    return;
                }

                // Check honeypot field
                if (data.BotField) {
                    console.log("Bot detected.");
                    return;
                }

                console.log("All validations passed, proceeding with submission...");

                setIsSubmitting(true);

                // Get device information
                const deviceInfo = getDeviceInfo();

                // Get IP address
                const ipAddress = await getIPAddress();

                // Format date of submission
                const now = new Date();
                const dateOfSubmission = now.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }).replace(/(\d+)/, (match) =>
                {
                    const day = parseInt(match);
                    const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                        day === 2 || day === 22 ? 'nd' :
                            day === 3 || day === 23 ? 'rd' : 'th';
                    return day + suffix;
                }) + ', ' + now.toLocaleTimeString('en-US', {
                    hour12: true,
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit'
                });

                // Add timestamp, form ID, and device info
                const finalData = {
                    "formType": "contact",
                    ...data,
                    timestamp: new Date().toISOString(),
                    formId: "Contact",
                    submissionId: `contact_${Date.now()}`,
                    "IP Address": ipAddress,
                    "Device": deviceInfo.fullUserAgent,
                    "Browser": `${deviceInfo.browser} ${deviceInfo.browserVersion}`,
                    "Operating System": deviceInfo.os,
                    dateOfSubmission: dateOfSubmission,
                };

                console.log("Final contact form data:", finalData);

                // Uncomment this section when you want to make the actual API call
                const response = await fetch("/api/forms", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(finalData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to submit the form");
                }

                const result = await response.json();

                // Store form data for use in Calendly
                setFormData(finalData);

                // Set form as submitted
                setIsFormSubmitted(true);
                setIsSubmitted(true);
                setIsSubmitting(false);

                console.log("Form submitted successfully!");

                // Reset form after successful submission
                // setTimeout(() =>
                // {
                //     reset();
                //     setIsSubmitted(false);
                //     setIsFormSubmitted(false);
                // }, 3000);

            } catch (error) {
                console.error("Form submission error:", error);
                setIsSubmitting(false);

                // Show error message to user
                alert("There was an error submitting your form. Please try again.");
            }
        };

     
        // Zod Schema for Franchise Form
        const FranchiseFormSchema = z.object({
            FullName: z
                .string()
                .min(1, "Full name is required.")
                .min(2, "Full name must be at least 2 characters long."),
            Phone: z
                .string()
                .min(1, "Phone number is required.")
                .regex(/^[0-9\s\-\+\(\)]+$/, "Please enter a valid phone number.")
                .min(8, "Phone number must be at least 8 digits."),
            Email: z
                .string()
                .min(1, "Email is required.")
                .email("Please enter a valid email address."),
            Address: z
                .string()
                .min(1, "Address is required.")
                .min(5, "Please enter a complete address."),
            InterestedArea: z
                .string()
                .min(1, "Territory/area/suburb of interest is required.")
                .min(2, "Please specify the area you're interested in."),
            ReasonForInterest: z
                .string()
                .min(1, "Please tell us what interests you in a SecureCash franchise.")
                .min(20, "Please provide more details about your interest."),
            ReferralSource: z
                .string()
                .min(1, "Please tell us how you heard about this opportunity.")
                .min(2, "Please provide details about how you heard about us."),
            BotField: z.string().max(0, "Bot detected!").optional(),
        });

        const InputField = ({
            label,
            name,
            placeholder,
            type = "text",
            Icon,
            register,
            errors,
            currentErrorField,
            setCurrentErrorField,
            textarea = false,
            ref,
            autoComplete,
            onFocus,
            onBlur,
        }) =>
        {
            const hasError = errors[name] && currentErrorField === name;
            const [isFocused, setIsFocused] = useState(false);

            const handleFocus = () =>
            {
                setCurrentErrorField(name);
                setIsFocused(true);
                if (onFocus) onFocus();
            };

            const handleBlur = () =>
            {
                setCurrentErrorField(null);
                setIsFocused(false);
                if (onBlur) onBlur();
            };

            return (
                <div className="relative">
                    <label className="text-primary-text text-[16px] font-medium inline-block mt-4 mb-2 w-full text-left px-1 768px:px-0">
                        {label}
                    </label>
                    <div className="relative w-full flex items-center bg-white rounded-[2px] border">
                        {textarea ? (
                            <textarea
                                className={`w-full text-sm rounded-sm border-none p-4 shadow-none font-montserrat bg-white ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
                                    }`}
                                name={name}
                                ref={ref}
                                {...register(name)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                placeholder={placeholder}
                                rows="3"
                                autoComplete={autoComplete || "new-password"}
                                required
                            ></textarea>
                        ) : (
                            <>
                                <input
                                    className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
                                        }`}
                                    type={type}
                                    name={name}
                                    ref={ref}
                                    {...register(name)}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    placeholder={placeholder}
                                    autoComplete={autoComplete || "new-password"}
                                    required
                                />
                                <Icon
                                    className={`min-w-[50px] text-[18px] ${hasError
                                        ? "text-red-500"
                                        : isFocused
                                            ? "text-primary"
                                            : "text-[#999]"
                                        }`}
                                />
                            </>
                        )}

                        {errors[name] && (
                            <WarningPopup
                                error={errors[name]?.message}
                                isFirstError={currentErrorField === name}
                            />
                        )}
                    </div>
                </div>
            );
        };

        const focusInput = (ref) =>
        {
            if (ref && ref.current) {
                ref.current.focus();
            }
        };

        const FranchiseForm = () =>
        {
            const [currentErrorField, setCurrentErrorField] = useState(null);
            const [isSubmitting, setIsSubmitting] = useState(false);
            const [isSubmitted, setIsSubmitted] = useState(false);
            const [isFormSubmitted, setIsFormSubmitted] = useState(false);
            const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
            const [submissionStatus, setSubmissionStatus] = useState(null);
            const [formData, setFormData] = useState(null);

            // Create refs for focus management
            const fullNameRef = useRef(null);
            const phoneRef = useRef(null);
            const emailRef = useRef(null);
            const addressRef = useRef(null);
            const interestedAreaRef = useRef(null);
            const reasonForInterestRef = useRef(null);
            const referralSourceRef = useRef(null);

            const calendlyURL = "https://calendly.com/jo_securecash?hide_gdpr_banner=1&primary_color=c7a652";

            const {
                register,
                handleSubmit,
                setValue,
                watch,
                reset,
                formState: { errors },
            } = useForm({
                resolver: zodResolver(FranchiseFormSchema),
                defaultValues: {
                    FullName: "",
                    Phone: "",
                    Email: "",
                    Address: "",
                    InterestedArea: "",
                    ReasonForInterest: "",
                    ReferralSource: "",
                    BotField: "",
                },
            });

            // Function to get device information
            const getDeviceInfo = () =>
            {
                const userAgent = navigator.userAgent;

                // Parse browser and version
                let browserInfo = 'Unknown';
                let browserVersion = '';

                if (/Chrome\/([0-9.]+)/.test(userAgent)) {
                    const match = userAgent.match(/Chrome\/([0-9.]+)/);
                    browserInfo = 'Chrome';
                    browserVersion = match[1];
                } else if (/Firefox\/([0-9.]+)/.test(userAgent)) {
                    const match = userAgent.match(/Firefox\/([0-9.]+)/);
                    browserInfo = 'Firefox';
                    browserVersion = match[1];
                } else if (/Version\/([0-9.]+).*Safari/.test(userAgent)) {
                    const match = userAgent.match(/Version\/([0-9.]+)/);
                    browserInfo = 'Safari';
                    browserVersion = match[1];
                } else if (/Edge\/([0-9.]+)/.test(userAgent)) {
                    const match = userAgent.match(/Edge\/([0-9.]+)/);
                    browserInfo = 'Edge';
                    browserVersion = match[1];
                }

                // Parse OS information
                let osInfo = 'Unknown';
                if (/Windows NT ([0-9._]+)/.test(userAgent)) {
                    const match = userAgent.match(/Windows NT ([0-9._]+)/);
                    osInfo = `Windows NT ${match[1]}`;
                } else if (/Mac OS X ([0-9._]+)/.test(userAgent)) {
                    const match = userAgent.match(/Mac OS X ([0-9._]+)/);
                    osInfo = `Mac OS X ${match[1].replace(/_/g, '.')}`;
                } else if (/Android ([0-9.]+)/.test(userAgent)) {
                    const match = userAgent.match(/Android ([0-9.]+)/);
                    osInfo = `Android ${match[1]}`;
                } else if (/OS ([0-9._]+)/.test(userAgent) && /iPhone|iPad/.test(userAgent)) {
                    const match = userAgent.match(/OS ([0-9._]+)/);
                    osInfo = `iOS ${match[1].replace(/_/g, '.')}`;
                } else if (/Linux/.test(userAgent)) {
                    osInfo = 'Linux';
                }

                return {
                    fullUserAgent: userAgent,
                    browser: browserInfo,
                    browserVersion: browserVersion,
                    os: osInfo,
                };
            };

            // Function to get IP address
            const getIPAddress = async () =>
            {
                try {
                    // Try multiple IP services for reliability
                    const ipServices = [
                        'https://api.ipify.org?format=json',
                        'https://ipapi.co/json/',
                        'https://api.ip.sb/jsonip',
                    ];

                    for (const service of ipServices) {
                        try {
                            const response = await fetch(service);
                            const data = await response.json();

                            // Different services return IP in different formats
                            if (data.ip) return data.ip;
                            if (data.query) return data.query;

                        } catch (error) {
                            console.log(`IP service ${service} failed:`, error);
                            continue;
                        }
                    }

                    return 'Unable to detect';
                } catch (error) {
                    console.error('Error fetching IP:', error);
                    return 'Unable to detect';
                }
            };

            // Focus management effect
            useEffect(() =>
            {
                if (errors && Object.keys(errors).length > 0) {
                    const errorField = Object.keys(errors)[0]; // Get the first error field
                    setCurrentErrorField(errorField);

                    const focusMap = {
                        FullName: fullNameRef,
                        Phone: phoneRef,
                        Email: emailRef,
                        Address: addressRef,
                        InterestedArea: interestedAreaRef,
                        ReasonForInterest: reasonForInterestRef,
                        ReferralSource: referralSourceRef,
                    };

                    const refToFocus = focusMap[errorField];
                    if (refToFocus) {
                        focusInput(refToFocus);
                    }
                } else {
                    setCurrentErrorField(null);
                }
            }, [errors]);

            useEffect(() =>
            {
                if (submissionStatus) {
                    const timer = setTimeout(() =>
                    {
                        // dispatch(setPopupForm("")); // Uncomment if using Redux
                        setTimeout(() =>
                        {
                            setSubmissionStatus(null);
                        }, 1000);
                    }, 6000);
                    return () => clearTimeout(timer);
                }
            }, [submissionStatus]);

          
            const handleFormSubmit = async (data) =>
            {
                try {
                    // Basic validation
                    if (!data.FullName || !data.Email || !data.Phone || !data.Address ||
                        !data.InterestedArea || !data.ReasonForInterest || !data.ReferralSource) {
                        console.log("Missing required fields");
                        alert("Please fill in all required fields.");
                        return;
                    }

                    // Check honeypot field
                    if (data.BotField) {
                        console.log("Bot detected.");
                        return;
                    }

                    console.log("All validations passed, proceeding with submission...");

                    setIsSubmitting(true);

                    // Get device information
                    const deviceInfo = getDeviceInfo();

                    // Get IP address
                    const ipAddress = await getIPAddress();

                    // Format date of submission
                    const now = new Date();
                    const dateOfSubmission = now.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }).replace(/(\d+)/, (match) =>
                    {
                        const day = parseInt(match);
                        const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                            day === 2 || day === 22 ? 'nd' :
                                day === 3 || day === 23 ? 'rd' : 'th';
                        return day + suffix;
                    }) + ', ' + now.toLocaleTimeString('en-US', {
                        hour12: true,
                        hour: 'numeric',
                        minute: '2-digit',
                        second: '2-digit'
                    });

                    // Add timestamp, form ID, and device info
                    const finalData = {
                        ...data,
                        "formType": "franchise",
                        timestamp: new Date().toISOString(),
                        formId: "Franchise",
                        submissionId: `franchise_${Date.now()}`,
                        "IP Address": ipAddress,
                        "Device": deviceInfo.fullUserAgent,
                        "Browser": `${deviceInfo.browser} ${deviceInfo.browserVersion}`,
                        "Operating System": deviceInfo.os,
                        dateOfSubmission: dateOfSubmission,
                    };

                    console.log("Final franchise form data:", finalData);

                    // Uncomment this section when you want to make the actual API call
                    const response = await fetch("/api/forms", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(finalData),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || "Failed to submit the form");
                    }

                    const result = await response.json();

                    // Store form data for use in Calendly
                    setFormData(finalData);

                    // Set form as submitted
                    setIsFormSubmitted(true);
                    setIsSubmitted(true);
                    setIsSubmitting(false);

                    console.log("Form submitted successfully!");

                    // Open Calendly popup
                    setIsCalendlyOpen(true);

                    // Reset form after successful submission (optional)
                    // setTimeout(() => {
                    //     reset();
                    //     setIsSubmitted(false);
                    //     setIsFormSubmitted(false);
                    // }, 3000);

                } catch (error) {
                    console.error("Form submission error:", error);
                    setIsSubmitting(false);

                    // Show error message to user
                    alert("There was an error submitting your form. Please try again.");
                }
            }; "use client";
            import React, { useState, useEffect } from "react";
            import { useForm } from "react-hook-form";
            import { zodResolver } from "@hookform/resolvers/zod";
            import { z } from "zod";
            import
            {
                FaUser,
                FaUsers,
                FaPhone,
                FaComments,
                FaEnvelope,
                FaHome,
                FaMapMarkerAlt,
            } from "react-icons/fa";
            import Quote from "./Quote";
            import Banking from "./Banking";
            import Change from "./Change";

            // Validation Schemas
            const createValidationSchemas = () =>
            {
                const QuoteFormSchema = z.object({
                    Name: z
                        .string()
                        .min(1, "Full Name is required.")
                        .regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces.")
                        .regex(/^\S+\s\S+$/, "Name must include both first and last name."),
                    Organisation: z.string().min(1, "Please enter your organisation's name."),
                    Phone: z
                        .string()
                        .min(1, "Phone Number is required.")
                        .regex(/^\d+$/, "Phone Number must contain only digits."),
                    Referrer: z.string().min(1, "Please enter where you heard about us."),
                    Email: z
                        .string()
                        .min(1, "Email is required.")
                        .email("Please enter a valid email address."),
                    Address: z.string().min(1, "Please enter your postal address."),
                    Locations: z.string().min(1, "Please enter locations for the service."),
                    Service: z
                        .array(z.enum(["Banking", "Change"]))
                        .min(1, "Please select at least one service."),
                });

                const BankingSchema = z.object({
                    BankingFrequency: z.enum(
                        ["Weekly", "Fortnightly", "Ad Hoc", "Special Event (once off)"],
                        {
                            errorMap: () => ({ message: "Please select a collection frequency." }),
                        }
                    ),
                    BankingAmount: z.enum(
                        [
                            "$0 - $1000",
                            "$1000 - $5000",
                            "$5000 - $20,000",
                            "$20,000 - $50,000",
                            "over $50,000",
                        ],
                        {
                            errorMap: () => ({
                                message: "Please select an average collection amount.",
                            }),
                        }
                    ),
                    BankingBank: z.string().min(1, "Please enter who you bank with."),
                    BankingDays: z
                        .array(
                            z.enum([
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                                "Sunday",
                                "Ad Hoc",
                                "Banking",
                            ])
                        )
                        .min(1, "Please select at least one day for collection."),
                    BankingComments: z.string().optional(),
                });


                // Fix 1: Update the ChangeSchema frequency options to match the frequencyOptions array
                const ChangeSchema = z.object({
                    ChangeFrequency: z.enum(
                        ["Weekly", "Fortnightly", "Monthly", "Ad Hoc"], // Remove this line
                        ["Weekly", "Fortnightly", "Ad Hoc", "Special Event (once off)"], // Add this line
                        {
                            errorMap: () => ({ message: "Please select a frequency for change." }),
                        }
                    ),
                    ChangeNotesAmount: z.enum(
                        [
                            "$0 - $1000",
                            "$1000 - $5000",
                            "$5000 - $20,000",
                            "$20,000 - $50,000",
                            "over $50,000",
                        ],
                        {
                            errorMap: () => ({
                                message: "Please select an average notes value.",
                            }),
                        }
                    ),
                    ChangeCoinsAmount: z
                        .string()
                        .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid amount for coins.") // Fix regex pattern
                        .min(1, "Please enter the average coins value."),
                    ChangeDays: z
                        .array(
                            z.enum([
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                                "Sunday",
                                "Ad Hoc",
                                "Banking",
                            ])
                        )
                        .min(1, "Please select at least one usual day for delivery."),
                    ChangeComments: z.string().optional(),
                });

                return { QuoteFormSchema, BankingSchema, ChangeSchema };
            };

            // Device and IP utilities
            const getDeviceInfo = () =>
            {
                const userAgent = navigator.userAgent;
                let browserInfo = 'Unknown';
                let browserVersion = '';

                const browserPatterns = [
                    { name: 'Chrome', pattern: /Chrome\/([0-9.]+)/ },
                    { name: 'Firefox', pattern: /Firefox\/([0-9.]+)/ },
                    { name: 'Safari', pattern: /Version\/([0-9.]+).*Safari/ },
                    { name: 'Edge', pattern: /Edge\/([0-9.]+)/ }
                ];

                for (const { name, pattern } of browserPatterns) {
                    const match = userAgent.match(pattern);
                    if (match) {
                        browserInfo = name;
                        browserVersion = match[1];
                        break;
                    }
                }

                let osInfo = 'Unknown';
                const osPatterns = [
                    { name: 'Windows NT', pattern: /Windows NT ([0-9._]+)/, format: (v) => `Windows NT ${v}` },
                    { name: 'Mac OS X', pattern: /Mac OS X ([0-9._]+)/, format: (v) => `Mac OS X ${v.replace(/_/g, '.')}` },
                    { name: 'Android', pattern: /Android ([0-9.]+)/, format: (v) => `Android ${v}` },
                    { name: 'iOS', pattern: /OS ([0-9._]+)/, format: (v) => `iOS ${v.replace(/_/g, '.')}`, condition: /iPhone|iPad/.test(userAgent) },
                    { name: 'Linux', pattern: /Linux/, format: () => 'Linux' }
                ];

                for (const { pattern, format, condition } of osPatterns) {
                    if (condition && !condition) continue;
                    const match = userAgent.match(pattern);
                    if (match) {
                        osInfo = format(match[1] || '');
                        break;
                    }
                }

                return {
                    fullUserAgent: userAgent,
                    browser: browserInfo,
                    browserVersion: browserVersion,
                    os: osInfo
                };
            };

            const getIPAddress = async () =>
            {
                const ipServices = [
                    'https://api.ipify.org?format=json',
                    'https://ipapi.co/json/',
                    'https://api.ip.sb/jsonip',
                ];

                for (const service of ipServices) {
                    try {
                        const response = await fetch(service);
                        const data = await response.json();
                        if (data.ip || data.query) return data.ip || data.query;
                    } catch (error) {
                        console.log(`IP service ${service} failed:`, error);
                    }
                }
                return 'Unable to detect';
            };

            const QuoteForm = ({ className }) =>
            {
                // State management
                const [formData, setFormData] = useState({});
                const [showThankYou, setShowThankYou] = useState(false);
                const [currentStep, setCurrentStep] = useState(0);
                const [selectedServices, setSelectedServices] = useState([]);

                // Form submission states
                const [currentErrorField, setCurrentErrorField] = useState(null);
                const [isFormSubmitted, setIsFormSubmitted] = useState(false);
                const [submissionStatus, setSubmissionStatus] = useState(null);
                const [isSubmitting, setIsSubmitting] = useState(false);

                // Get schemas
                const { QuoteFormSchema, BankingSchema, ChangeSchema } = createValidationSchemas();

                // Create dynamic schema based on current step and selected services
                const createCombinedSchema = (step, services) =>
                {
                    const baseFields = {
                        Service: z.array(z.string()).optional(),
                        BankingFrequency: z.string().optional(),
                        BankingAmount: z.string().optional(),
                        BankingBank: z.string().optional(),
                        BankingDays: z.array(z.string()).optional(),
                        BankingComments: z.string().optional(),
                        ChangeFrequency: z.string().optional(),
                        ChangeNotesAmount: z.string().optional(),
                        ChangeCoinsAmount: z.string().optional(),
                        ChangeDays: z.array(z.string()).optional(),
                        ChangeComments: z.string().optional(),
                    };

                    switch (step) {
                        case 0:
                            return QuoteFormSchema.extend(baseFields);
                        case 1:
                            if (services.includes("Banking")) {
                                return BankingSchema.extend({
                                    ...baseFields,
                                    // Override with optional fields for non-Banking fields
                                    ChangeFrequency: z.string().optional(),
                                    ChangeNotesAmount: z.string().optional(),
                                    ChangeCoinsAmount: z.string().optional(),
                                    ChangeDays: z.array(z.string()).optional(),
                                    ChangeComments: z.string().optional(),
                                });
                            }
                            return z.object(baseFields);
                        case 2:
                            if (services.includes("Change")) {
                                return ChangeSchema.extend({
                                    ...baseFields,
                                    // Override with optional fields for non-Change fields
                                    BankingFrequency: z.string().optional(),
                                    BankingAmount: z.string().optional(),
                                    BankingBank: z.string().optional(),
                                    BankingDays: z.array(z.string()).optional(),
                                    BankingComments: z.string().optional(),
                                });
                            }
                            return z.object(baseFields);
                        default:
                            return z.object(baseFields);
                    }
                };

                // Get default values
                const getDefaultValues = () => ({
                    Name: "",
                    Organisation: "",
                    Phone: "",
                    Referrer: "",
                    Email: "",
                    Address: "",
                    Locations: "",
                    Service: [],
                    BankingFrequency: "",
                    BankingAmount: "",
                    BankingBank: "",
                    BankingDays: [],
                    BankingComments: "",
                    ChangeFrequency: "",
                    ChangeNotesAmount: "",
                    ChangeCoinsAmount: "",
                    ChangeDays: [],
                    ChangeComments: "",
                    ...formData,
                });

                const methods = useForm({
                    resolver: zodResolver(createCombinedSchema(currentStep, selectedServices)),
                    defaultValues: getDefaultValues(),
                });

                const { register, handleSubmit, trigger, setValue, getValues, reset, formState: { errors } } = methods;

                // Update resolver when step or services change
                useEffect(() =>
                {
                    const newSchema = createCombinedSchema(currentStep, selectedServices);
                    methods.resolver = zodResolver(newSchema);

                    // Don't reset the form data, just update the resolver
                    // This prevents losing the previously entered data
                    const currentValues = getValues();
                    const mergedValues = { ...getDefaultValues(), ...formData, ...currentValues };

                    // Only reset with merged values if there's actual data to preserve
                    if (Object.keys(formData).length > 0) {
                        reset(mergedValues);
                    }
                }, [currentStep, selectedServices]);


                // API submission handler
                const submitToAPI = async (finalData) =>
                {
                    const deviceInfo = getDeviceInfo();
                    const ipAddress = await getIPAddress();

                    const payload = {
                        ...finalData,
                        deviceInfo: deviceInfo.fullUserAgent,
                        ipAddress: ipAddress,
                        timestamp: new Date().toISOString(),
                        FormID: "quote",
                    };

                    console.log("Submitting to API:", payload);

                    const response = await fetch("/api/forms", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'API request failed');
                    }

                    return response.json();
                };

                // Complete form reset function
                const resetFormState = () =>
                {
                    const emptyFormData = {
                        Name: "",
                        Organisation: "",
                        Phone: "",
                        Referrer: "",
                        Email: "",
                        Address: "",
                        Locations: "",
                        Service: [],
                        BankingFrequency: "",
                        BankingAmount: "",
                        BankingBank: "",
                        BankingDays: [],
                        BankingComments: "",
                        ChangeFrequency: "",
                        ChangeNotesAmount: "",
                        ChangeCoinsAmount: "",
                        ChangeDays: [],
                        ChangeComments: "",
                    };

                    setFormData(emptyFormData);
                    reset(emptyFormData);
                    setCurrentStep(0);
                    setSelectedServices([]);
                    setCurrentErrorField(null);
                    setSubmissionStatus(null);
                };

                // Modal close handler
                const handleModalClose = () =>
                {
                    setShowThankYou(false);
                    setIsFormSubmitted(false);
                    resetFormState();
                };

                const handleFormSubmit = async (data) =>
                {
                    try {
                        // Get current form values first
                        const currentFormData = getValues();
                        console.log("Current form data:", currentFormData);
                        console.log("Submitted data:", data);

                        // Merge the data properly
                        const updatedFormData = {
                            ...formData, ...currentFormData, ...data, "formType": "quote",
                        };
                        console.log("Updated form data:", updatedFormData);

                        setFormData(updatedFormData);

                        if (currentStep === 0) {
                            // First step - capture services and base info
                            const services = data.Service || [];
                            setSelectedServices(services);

                            if (services.includes("Banking")) {
                                setCurrentStep(1);
                            } else if (services.includes("Change")) {
                                setCurrentStep(2);
                            } else {
                                // No services selected, submit with base info only
                                await finalSubmission(updatedFormData);
                            }
                        } else if (currentStep === 1) {
                            // Banking step
                            if (selectedServices.includes("Change")) {
                                setCurrentStep(2);
                            } else {
                                // Only Banking service, submit
                                await finalSubmission(updatedFormData);
                            }
                        } else if (currentStep === 2) {
                            // Change step - final submission
                            await finalSubmission(updatedFormData);
                        }
                    } catch (error) {
                        console.error("Form submission error:", error);
                        setSubmissionStatus('error');
                    }
                };

                const finalSubmission = async (finalData) =>
                {
                    setIsSubmitting(true);

                    console.log("Final submission data:", finalData);
                    console.log("Change fields:", {
                        ChangeFrequency: finalData.ChangeFrequency,
                        ChangeNotesAmount: finalData.ChangeNotesAmount,
                        ChangeCoinsAmount: finalData.ChangeCoinsAmount,
                        ChangeDays: finalData.ChangeDays,
                        ChangeComments: finalData.ChangeComments
                    });

                    try {
                        const result = await submitToAPI(finalData);
                        console.log('API Response:', result);

                        setIsSubmitting(false);
                        setIsFormSubmitted(true);
                        setSubmissionStatus('success');
                        setShowThankYou(true); // Add this line to show thank you modal

                    } catch (apiError) {
                        console.error('API submission error:', apiError);
                        setIsSubmitting(false);
                        setSubmissionStatus('error');
                    }
                };

                // Render current form step
                const renderFormStep = () =>
                {
                    switch (currentStep) {
                        case 0:
                            return (
                                <Quote
                                    inputFields={inputFields}
                                    register={register}
                                    errors={errors}
                                    currentErrorField={currentErrorField}
                                    setCurrentErrorField={setCurrentErrorField}
                                />
                            );
                        case 1:
                            return selectedServices.includes("Banking") ? (
                                <Banking
                                    frequencyOptions={frequencyOptions}
                                    amountOptions={amountOptions}
                                    daysOfWeek={daysOptions.standard}
                                    register={register}
                                    errors={errors}
                                    setValue={setValue}
                                    currentErrorField={currentErrorField}
                                    setCurrentErrorField={setCurrentErrorField}
                                />
                            ) : null;
                        case 2:
                            return selectedServices.includes("Change") ? (
                                <Change
                                    frequencyOptions={changeFrequencyOptions} // Use separate options for Change
                                    amountOptions={amountOptions}
                                    daysOfWeek={daysOptions.withBanking}
                                    register={register}
                                    errors={errors}
                                    setValue={setValue}
                                    currentErrorField={currentErrorField}
                                    setCurrentErrorField={setCurrentErrorField}
                                />
                            ) : null;
                        default:
                            return null;
                    }
                };

                // Calculate if this is the final step
                const isFinalStep = () =>
                {
                    if (currentStep === 0) return false;
                    if (currentStep === 1 && !selectedServices.includes("Change")) return true;
                    if (currentStep === 2) return true;
                    return false;
                };
             ]
                const COMPANY_INFO = {
                  name: "Office Central Pty Ltd",
                  acn: "ACN 668 461 050",
                  address: "30 Church Hill Road, Old Noarlunga SA 5168",
                  email: "sales@securecash.com.au",
                };
                
                // Loading Spinner Component
                const LoadingSpinner = () => (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                );
                
                // Submit Button Component
                const SubmitButton = ({ isSubmitting, isSubmitted }) => (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`nextBtn ${isSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b]'} text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer rounded-[40px] outline-none appearance-none hover:opacity-80 text-base p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <LoadingSpinner />
                        Submitting... Please Wait.
                      </span>
                    ) : isSubmitted ? (
                      "Thank you. We received your submission!"
                    ) : (
                      "Click here to execute this deed & agreement"
                    )}
                  </button>
                );
                
                // Success Message Component
                const SuccessMessage = () => (
                  <div className="text-green-600 font-medium">
                    <svg
                      className="inline w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Thank you. We received your submission!
                  </div>
                );
                
                // Progressive image compression function
                const compressImageFile = async (file) =>
                {
                  const targetSizeKB = 400;
                  const targetSizeBytes = targetSizeKB * 1024;
                
                  // Compression options in order of preference (quality, maxWidth, maxHeight)
                  const compressionLevels = [
                    { quality: 0.8, maxWidthOrHeight: 1920 },
                    { quality: 0.6, maxWidthOrHeight: 1280 },
                    { quality: 0.4, maxWidthOrHeight: 800 },
                    { quality: 0.2, maxWidthOrHeight: 600 }
                  ];
                
                  console.log(`Starting compression for ${file.name} (${(file.size / 1024).toFixed(2)}KB)`);
                
                  // Try each compression level until we get under 400KB or exhaust all options
                  for (let i = 0; i < compressionLevels.length; i++) {
                    const options = {
                      maxSizeMB: targetSizeKB / 1024, // Convert KB to MB
                      maxWidthOrHeight: compressionLevels[i].maxWidthOrHeight,
                      useWebWorker: true,
                      quality: compressionLevels[i].quality
                    };
                
                    try {
                      const compressedFile = await imageCompression(file, options);
                      console.log(`Compression level ${i + 1}: ${(compressedFile.size / 1024).toFixed(2)}KB (quality: ${options.quality})`);
                
                      // If we're under the target size, or this is our last attempt, use this version
                      if (compressedFile.size <= targetSizeBytes || i === compressionLevels.length - 1) {
                        console.log(`Final compressed size: ${(compressedFile.size / 1024).toFixed(2)}KB`);
                        return compressedFile;
                      }
                    } catch (error) {
                      console.error(`Compression level ${i + 1} failed:`, error);
                      // If this compression level fails, try the next one
                      continue;
                    }
                  }
                
                  // If all compression attempts failed, return original file
                  console.warn('All compression attempts failed, using original file');
                  return file;
                };
                
                const processAttachments = async (fileFields, data) =>
                {
                  const attachments = [];
                  const errors = [];
                
                  // Process files concurrently but with limit
                  const concurrencyLimit = 2; // Process 2 files at a time
                
                  for (let i = 0; i < fileFields.length; i += concurrencyLimit) {
                    const batch = fileFields.slice(i, i + concurrencyLimit);
                
                    const batchPromises = batch.map(async ({ field, prefix }) =>
                    {
                      if (data[field]) {
                        try {
                          // First compress the image, then convert to base64
                          const compressedFile = await compressImageFile(data[field]);
                          const base64File = await fileToBase64(compressedFile);
                          if (base64File) {
                            return {
                              filename: `${prefix}.${data[field].name.split('.').pop()}`,
                              data: base64File
                            };
                          }
                        } catch (error) {
                          errors.push(`${field}: ${error.message}`);
                          return null;
                        }
                      }
                      return null;
                    });
                
                    const batchResults = await Promise.all(batchPromises);
                    attachments.push(...batchResults.filter(Boolean));
                  }
                
                  if (errors.length > 0) {
                    throw new Error(`File processing errors: ${errors.join(', ')}`);
                  }
                
                  return attachments;
                };
                
                const fileToBase64 = async (file) =>
                {
                  return new Promise((resolve, reject) =>
                  {
                    if (!file) {
                      resolve(null);
                      return;
                    }
                
                    // Updated file size validation - now 5MB is still the max for original files
                    // but we'll compress them down to 400KB
                    if (file.size > 5 * 1024 * 1024) {
                      reject(new Error(`File ${file.name} is too large. Max 5MB allowed.`));
                      return;
                    }
                
                    // Updated file type validation - only images allowed now
                    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                    if (!allowedTypes.includes(file.type)) {
                      reject(new Error(`File ${file.name} type not allowed. Only JPEG and PNG images allowed.`));
                      return;
                    }
                
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                    reader.readAsDataURL(file);
                  });
                };
                
                // Function to get device information
                const getDeviceInfo = () =>
                {
                  const userAgent = navigator.userAgent;
                
                  // Parse browser and version
                  let browserInfo = 'Unknown';
                  let browserVersion = '';
                
                  if (/Chrome\/([0-9.]+)/.test(userAgent)) {
                    const match = userAgent.match(/Chrome\/([0-9.]+)/);
                    browserInfo = 'Chrome';
                    browserVersion = match[1];
                  } else if (/Firefox\/([0-9.]+)/.test(userAgent)) {
                    const match = userAgent.match(/Firefox\/([0-9.]+)/);
                    browserInfo = 'Firefox';
                    browserVersion = match[1];
                  } else if (/Version\/([0-9.]+).*Safari/.test(userAgent)) {
                    const match = userAgent.match(/Version\/([0-9.]+)/);
                    browserInfo = 'Safari';
                    browserVersion = match[1];
                  } else if (/Edge\/([0-9.]+)/.test(userAgent)) {
                    const match = userAgent.match(/Edge\/([0-9.]+)/);
                    browserInfo = 'Edge';
                    browserVersion = match[1];
                  }
                
                  // Parse OS information
                  let osInfo = 'Unknown';
                  if (/Windows NT ([0-9._]+)/.test(userAgent)) {
                    const match = userAgent.match(/Windows NT ([0-9._]+)/);
                    osInfo = `Windows NT ${match[1]}`;
                  } else if (/Mac OS X ([0-9._]+)/.test(userAgent)) {
                    const match = userAgent.match(/Mac OS X ([0-9._]+)/);
                    osInfo = `Mac OS X ${match[1].replace(/_/g, '.')}`;
                  } else if (/Android ([0-9.]+)/.test(userAgent)) {
                    const match = userAgent.match(/Android ([0-9.]+)/);
                    osInfo = `Android ${match[1]}`;
                  } else if (/OS ([0-9._]+)/.test(userAgent) && /iPhone|iPad/.test(userAgent)) {
                    const match = userAgent.match(/OS ([0-9._]+)/);
                    osInfo = `iOS ${match[1].replace(/_/g, '.')}`;
                  } else if (/Linux/.test(userAgent)) {
                    osInfo = 'Linux';
                  }
                
                  // Parse WebKit version if present
                  let webkitVersion = '';
                  if (/WebKit\/([0-9.]+)/.test(userAgent)) {
                    const match = userAgent.match(/WebKit\/([0-9.]+)/);
                    webkitVersion = match[1];
                  }
                
                  // Format device info
                  let deviceString = '';
                  if (browserInfo === 'Chrome') {
                    deviceString = `${browserInfo}/${browserVersion}`;
                  } else if (browserInfo === 'Safari') {
                    deviceString = `${browserInfo}/${browserVersion}`;
                  } else if (browserInfo === 'Firefox') {
                    deviceString = `${browserInfo}/${browserVersion}`;
                  } else {
                    deviceString = `${browserInfo}/${browserVersion}`;
                  }
                
                  // Add additional browser engine info
                  if (webkitVersion) {
                    deviceString += ` (WebKit/${webkitVersion})`;
                  }
                
                  if (osInfo !== 'Unknown') {
                    deviceString += ` ${osInfo}`;
                  }
                
                  return {
                    deviceString,
                    fullUserAgent: userAgent,
                  };
                };
                
                // Function to get IP address
                const getIPAddress = async () =>
                {
                  try {
                    // Try multiple IP services for reliability
                    const ipServices = [
                      'https://api.ipify.org?format=json',
                      'https://ipapi.co/json/',
                      'https://api.ip.sb/jsonip',
                    ];
                
                    for (const service of ipServices) {
                      try {
                        const response = await fetch(service);
                        const data = await response.json();
                
                        // Different services return IP in different formats
                        if (data.ip) return data.ip;
                        if (data.query) return data.query;
                
                      } catch (error) {
                        console.log(`IP service ${service} failed:`, error);
                        continue;
                      }
                    }
                
                    return 'Unable to detect';
                  } catch (error) {
                    console.error('Error fetching IP:', error);
                    return 'Unable to detect';
                  }
                };
                
                // Main Form Component
                const IndependentContractorsForm = ({
                  agreementTermData,
                  deedOfGuaranteeData,
                }) =>
                {
                  const [currentErrorField, setCurrentErrorField] = useState(null);
                  const [isSubmitting, setIsSubmitting] = useState(false);
                  const [isSubmitted, setIsSubmitted] = useState(false);
                  const router = useRouter();
                
                  // Create refs for form fields that need to be focused
                  const fieldRefs = useRef({});
                
                  const {
                    register,
                    handleSubmit,
                    formState: { errors },
                    reset,
                    watch,
                    setValue,
                    trigger,
                    clearErrors,
                  } = useForm({
                    resolver: zodResolver(IcaFormSchema),
                    mode: "onChange"
                  });
                
                  // Watch all form values
                  const watchedValues = watch();
                
                  // Function to register field refs
                  const registerFieldRef = (fieldName, ref) =>
                  {
                    if (ref) {
                      fieldRefs.current[fieldName] = ref;
                    }
                  };
                
                  // Enhanced function to focus on error field
                  const focusErrorField = (fieldName) =>
                  {
                    console.log('Attempting to focus field:', fieldName);
                    console.log('Available field refs:', Object.keys(fieldRefs.current));
                
                    if (fieldRefs.current[fieldName]) {
                      console.log('Field ref found, focusing...');
                      // Small delay to ensure DOM is updated
                      setTimeout(() =>
                      {
                        try {
                          fieldRefs.current[fieldName].focus();
                          fieldRefs.current[fieldName].scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                          });
                          console.log('Field focused successfully:', fieldName);
                        } catch (error) {
                          console.error('Error focusing field:', fieldName, error);
                        }
                      }, 100);
                    } else {
                      console.warn('Field ref not found for:', fieldName);
                    }
                  };
                
                  const handleFieldChange = (name, value) =>
                  {
                    setValue(name, value);
                    if (errors[name]) clearErrors(name);
                    if (currentErrorField === name) setCurrentErrorField(null);
                    trigger(name);
                  };
                
                  const handleFormSubmit = async (data) =>
                  {
                    try {
                      setIsSubmitting(true);
                      setCurrentErrorField(null);
                
                      console.log("Raw form data:", data);
                
                      // Get device information
                      const deviceInfo = getDeviceInfo();
                
                      // Get IP address
                      const ipAddress = await getIPAddress();
                
                      // Format current date and time
                      const now = new Date();
                      const currentDateTime = now.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }).replace(/(\d+)/, (match) =>
                      {
                        const day = parseInt(match);
                        const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                          day === 2 || day === 22 ? 'nd' :
                            day === 3 || day === 23 ? 'rd' : 'th';
                        return day + suffix;
                      }) + ', ' + now.toLocaleTimeString('en-US', {
                        hour12: true,
                        hour: 'numeric',
                        minute: '2-digit',
                        second: '2-digit'
                      });
                
                      // Process file uploads with compression
                      const fileFields = [
                        { field: 'GovernmentID', prefix: 'Guarantors Government ID' },
                        { field: 'WitnessID', prefix: 'Witness ID' },
                        { field: 'SecurityLicense', prefix: 'Security or Masters License' },
                        { field: 'CITInsurance', prefix: 'CIT Insurance' }
                      ];
                
                      console.log("Starting file processing and compression...");
                      const attachments = await processAttachments(fileFields, data);
                      console.log("File processing completed. Attachments:", attachments.length);
                
                      // Format dates for API
                      const formatDate = (date) =>
                      {
                        if (!date) return '';
                        const d = new Date(date);
                        const day = String(d.getDate()).padStart(2, '0');
                        const month = String(d.getMonth() + 1).padStart(2, '0');
                        const year = d.getFullYear();
                        return `${day}/${month}/${year}`;
                      };
                
                      // Prepare final data matching API expectations
                      const finalData = {
                        // Personal/Principal Details (matching HTML form field names)
                        Name: data.Name || '',
                        OrganisationType: data.OrganisationType || '',
                        ABN: data.ABN || '',
                        Phone: data.Phone || '',
                        Email: data.Email || '',
                        Address: data.Address || '',
                        AddressPostal: data.AddressPostal || '',
                
                        // Agreement Term fields
                        DateCommencement: formatDate(data.DateCommencement),
                        AcceptAgreement: data.AcceptAgreement || false,
                
                        // Deed of Guarantee fields
                        DateDeed: formatDate(data.DateDeed),
                        NameConfirm: data.NameConfirm || '',
                        AddressResidential: data.AddressResidential || '',
                
                        // Executed as Deed fields
                        BusinessName: data.BusinessName || '',
                        WitnessName: data.WitnessName || '',
                        WitnessAddress: data.WitnessAddress || '',
                
                        eDocketsContractorCode: data.eDocketsContractorCode || '',
                
                        // System data
                        attachments: attachments,
                        timestamp: new Date().toISOString(),
                        formType: "ica",
                        formId: "ICA",
                        submissionId: `ica_${Date.now()}`,
                        fullUserAgent: deviceInfo.fullUserAgent,
                        ipAddress: ipAddress,
                        deviceInfo: deviceInfo.deviceString,
                        submissionDateTime: currentDateTime,
                      };
                
                      console.log("Final data being sent to API:", finalData);
                
                      // Make the API call
                      const response = await fetch("/api/forms", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(finalData),
                      });
                
                      if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || "Failed to submit the form");
                      }
                
                      const result = await response.json();
                      console.log("API Response:", result);
                
                      setIsSubmitted(true);
                      setIsSubmitting(false);
                
                      // Reset form
                      // reset();
                
                      // Optional: Redirect after successful submission
                      // setTimeout(() => {
                      //   router.push("/success");
                      // }, 2000);
                
                    } catch (error) {
                      console.error("Form submission error:", error);
                      setIsSubmitting(false);
                
                      // Show error message to user
                      alert("There was an error submitting your form. Please try again.");
                    }
                  };
                
                  const onError = (validationErrors) =>
                  {
                    console.log("Form validation errors:", validationErrors);
                    const firstErrorField = Object.keys(validationErrors)[0];
                    setCurrentErrorField(firstErrorField);
                
                    // Focus on the first error field
                    focusErrorField(firstErrorField);
                  };
                
                  // Focus management effect
                  useEffect(() =>
                  {
                    if (errors && Object.keys(errors).length > 0) {
                      const errorField = Object.keys(errors)[0];
                      setCurrentErrorField(errorField);
                      focusErrorField(errorField);
                    } else {
                      setCurrentErrorField(null);
                    }
                  }, [errors]);
                 

                    // Enhanced ABN InputField Component
                    const ABNInputField = ({
                        label,
                        name,
                        placeholder,
                        Icon,
                        register,
                        errors,
                        currentErrorField,
                        setCurrentErrorField,
                        setValue,
                        abnValue,
                        abnRef
                    }) =>
                    {
                        const hasError = errors[name] && currentErrorField === name;
                        const [isFocused, setIsFocused] = useState(false);

                        // ABN input handler to limit to 11 digits and format
                        const handleABNChange = (e) =>
                        {
                            const value = e.target.value;
                            // Remove all non-digit characters
                            const digitsOnly = value.replace(/\D/g, '');

                            // Limit to 11 digits
                            const limitedDigits = digitsOnly.slice(0, 11);

                            // Format with spaces for display (XX XXX XXX XXX)
                            let formattedValue = limitedDigits;
                            if (limitedDigits.length > 2) {
                                formattedValue = limitedDigits.slice(0, 2) + ' ' + limitedDigits.slice(2);
                            }
                            if (limitedDigits.length > 5) {
                                formattedValue = limitedDigits.slice(0, 2) + ' ' + limitedDigits.slice(2, 5) + ' ' + limitedDigits.slice(5);
                            }
                            if (limitedDigits.length > 8) {
                                formattedValue = limitedDigits.slice(0, 2) + ' ' + limitedDigits.slice(2, 5) + ' ' + limitedDigits.slice(5, 8) + ' ' + limitedDigits.slice(8);
                            }

                            setValue("ABN", formattedValue, { shouldValidate: true });
                        };

                        return (
                            <div className="relative">
                                <label className="text-white text-base inline-block mt-4 mb-2 w-full text-left">
                                    {label}
                                </label>
                                <div className="relative w-full flex items-center bg-white rounded-[2px] border">
                                    <input
                                        className={`w-full text-sm py-2 px-3 shadow-none font-montserrat border-none rounded-sm ${hasError ? "focus:outline-red-600" : "focus:outline-primary"
                                            }`}
                                        type="text"
                                        name={name}
                                        ref={abnRef}
                                        value={abnValue || ""}
                                        onChange={handleABNChange}
                                        onFocus={() =>
                                        {
                                            setCurrentErrorField(name);
                                            setIsFocused(true);
                                        }}
                                        onBlur={() =>
                                        {
                                            setCurrentErrorField(null);
                                            setIsFocused(false);
                                        }}
                                        placeholder={placeholder}
                                        maxLength={14}
                                        autoComplete="new-password"
                                        required
                                    />
                                    <Icon
                                        className={`min-w-[50px] text-[18px] text-[#999] ${hasError
                                            ? "text-red-500"
                                            : isFocused
                                                ? "text-primary"
                                                : "text-[#999]"
                                            }`}
                                    />
                                    {errors[name] && (
                                        <WarningPopup
                                            error={errors[name]?.message}
                                            isFirstError={currentErrorField === name}
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    };

                    // Enhanced Zod schema for Terms form validation
                    const TermsFormSchema = z.object({
                        Name: z
                            .string()
                            .nonempty("Full Name is required.")
                            .regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces.")
                            .regex(/^\S+\s\S+$/, "Name must include both first and last name."),
                        Position: z
                            .string()
                            .nonempty("Position is required.")
                            .min(2, "Position must be at least 2 characters long."),
                        Email: z
                            .string()
                            .nonempty("Email is required.")
                            .email("Please enter a valid email address."),
                        Birthdate: z
                            .date({
                                required_error: "Date of Birth is required",
                                invalid_type_error: "Date of Birth is required",
                            })
                            .refine((date) => date <= new Date(), {
                                message: "Date of Birth must be in the past or today",
                            }),
                        Organisation: z
                            .string()
                            .nonempty("Organisation name is required.")
                            .min(2, "Organisation name must be at least 2 characters long."),
                        ABN: z
                            .string()
                            .nonempty("ABN number is required.")
                            .regex(/^[0-9\s]+$/, "ABN must contain only digits and spaces.")
                            .refine((abn) =>
                            {
                                // Remove spaces and check if it's 11 digits
                                const cleanABN = abn.replace(/\s/g, '');
                                return cleanABN.length === 11;
                            }, {
                                message: "ABN must be exactly 11 digits.",
                            }),
                        BotField: z.string().max(0, "Bot detected!"), // honeypot field must be empty
                    });

                    // Focus utility function
                    const focusInput = (ref) =>
                    {
                        if (ref && ref.current) {
                            ref.current.focus();
                        }
                    };

                    const TermsForm = ({ setName, setPosition, setOrganisation, setAbn }) =>
                    {
                        const [currentErrorField, setCurrentErrorField] = useState(null);
                        const [isSubmitting, setIsSubmitting] = useState(false);
                        const [isSubmitted, setIsSubmitted] = useState(false);
                        const router = useRouter();

                        // Create refs for focus management
                        const nameRef = useRef(null);
                        const positionRef = useRef(null);
                        const emailRef = useRef(null);
                        const birthdateRef = useRef(null);
                        const organisationRef = useRef(null);
                        const abnRef = useRef(null);

                        const {
                            register,
                            handleSubmit,
                            setValue,
                            watch,
                            reset,
                            formState: { errors },
                        } = useForm({
                            resolver: zodResolver(TermsFormSchema),
                        });

                        const nameValue = watch("Name");
                        const positionValue = watch("Position");
                        const organisationValue = watch("Organisation");
                        const abnValue = watch("ABN");
                        const birthdateValue = watch("Birthdate");

                        useEffect(() =>
                        {
                            if (nameValue && setName) {
                                setName(nameValue);
                            }
                        }, [nameValue, setName]);

                        useEffect(() =>
                        {
                            if (positionValue && setPosition) {
                                setPosition(positionValue);
                            }
                        }, [positionValue, setPosition]);

                        useEffect(() =>
                        {
                            if (organisationValue && setOrganisation) {
                                setOrganisation(organisationValue);
                            }
                        }, [organisationValue, setOrganisation]);

                        useEffect(() =>
                        {
                            if (abnValue && setAbn) {
                                setAbn(abnValue);
                            }
                        }, [abnValue, setAbn]);

                      

                        // Focus management effect
                        useEffect(() =>
                        {
                            if (errors && Object.keys(errors).length > 0) {
                                const errorField = Object.keys(errors)[0]; // Get the first error field
                                setCurrentErrorField(errorField);

                                const focusMap = {
                                    Name: nameRef,
                                    Position: positionRef,
                                    Email: emailRef,
                                    Birthdate: birthdateRef,
                                    Organisation: organisationRef,
                                    ABN: abnRef,
                                };

                                const refToFocus = focusMap[errorField];
                                if (refToFocus) {
                                    focusInput(refToFocus);
                                } else {
                                    console.warn(`Unhandled error field: ${errorField}`);
                                }
                            } else {
                                setCurrentErrorField(null);
                            }
                        }, [errors]);

                        // Function to get device information in the exact format needed
                        const getDeviceInfo = () =>
                        {
                            const userAgent = navigator.userAgent;

                            // Parse browser and version
                            let browserInfo = 'Unknown';
                            let browserVersion = '';

                            if (/Chrome\/([0-9.]+)/.test(userAgent)) {
                                const match = userAgent.match(/Chrome\/([0-9.]+)/);
                                browserInfo = 'Chrome';
                                browserVersion = match[1];
                            } else if (/Firefox\/([0-9.]+)/.test(userAgent)) {
                                const match = userAgent.match(/Firefox\/([0-9.]+)/);
                                browserInfo = 'Firefox';
                                browserVersion = match[1];
                            } else if (/Version\/([0-9.]+).*Safari/.test(userAgent)) {
                                const match = userAgent.match(/Version\/([0-9.]+)/);
                                browserInfo = 'Safari';
                                browserVersion = match[1];
                            } else if (/Edge\/([0-9.]+)/.test(userAgent)) {
                                const match = userAgent.match(/Edge\/([0-9.]+)/);
                                browserInfo = 'Edge';
                                browserVersion = match[1];
                            }

                            // Parse OS information
                            let osInfo = 'Unknown';
                            if (/Windows NT ([0-9._]+)/.test(userAgent)) {
                                const match = userAgent.match(/Windows NT ([0-9._]+)/);
                                osInfo = `Windows NT ${match[1]}`;
                            } else if (/Mac OS X ([0-9._]+)/.test(userAgent)) {
                                const match = userAgent.match(/Mac OS X ([0-9._]+)/);
                                osInfo = `Mac OS X ${match[1].replace(/_/g, '.')}`;
                            } else if (/Android ([0-9.]+)/.test(userAgent)) {
                                const match = userAgent.match(/Android ([0-9.]+)/);
                                osInfo = `Android ${match[1]}`;
                            } else if (/OS ([0-9._]+)/.test(userAgent) && /iPhone|iPad/.test(userAgent)) {
                                const match = userAgent.match(/OS ([0-9._]+)/);
                                osInfo = `iOS ${match[1].replace(/_/g, '.')}`;
                            } else if (/Linux/.test(userAgent)) {
                                osInfo = 'Linux';
                            }

                            // Parse WebKit version if present
                            let webkitVersion = '';
                            if (/WebKit\/([0-9.]+)/.test(userAgent)) {
                                const match = userAgent.match(/WebKit\/([0-9.]+)/);
                                webkitVersion = match[1];
                            }

                            // Format device info similar to the email example
                            let deviceString = '';
                            if (browserInfo === 'Chrome') {
                                deviceString = `${browserInfo}/${browserVersion}`;
                            } else if (browserInfo === 'Safari') {
                                deviceString = `${browserInfo}/${browserVersion}`;
                            } else if (browserInfo === 'Firefox') {
                                deviceString = `${browserInfo}/${browserVersion}`;
                            } else {
                                deviceString = `${browserInfo}/${browserVersion}`;
                            }

                            // Add additional browser engine info
                            if (webkitVersion) {
                                deviceString += ` (WebKit/${webkitVersion})`;
                            }

                            if (osInfo !== 'Unknown') {
                                deviceString += ` ${osInfo}`;
                            }

                            return {
                                deviceString,
                                fullUserAgent: userAgent,
                            };
                        };

                        // Function to get IP address
                        const getIPAddress = async () =>
                        {
                            try {
                                // Try multiple IP services for reliability
                                const ipServices = [
                                    'https://api.ipify.org?format=json',
                                    'https://ipapi.co/json/',
                                    'https://api.ip.sb/jsonip',
                                ];

                                for (const service of ipServices) {
                                    try {
                                        const response = await fetch(service);
                                        const data = await response.json();

                                        // Different services return IP in different formats
                                        if (data.ip) return data.ip;
                                        if (data.query) return data.query;

                                    } catch (error) {
                                        console.log(`IP service ${service} failed:`, error);
                                        continue;
                                    }
                                }

                                return 'Unable to detect';
                            } catch (error) {
                                console.error('Error fetching IP:', error);
                                return 'Unable to detect';
                            }
                        };

                        const handleFormSubmit = async (data) =>
                        {
                            try {
                                // Check honeypot field
                                if (data.BotField) {
                                    console.log("Bot detected.");
                                    return;
                                }

                                setIsSubmitting(true);

                                // Get device information
                                const deviceInfo = getDeviceInfo();

                                // Get IP address
                                const ipAddress = await getIPAddress();

                                // Format birthday as YYYY-MM-DD
                                const birthdayFormatted = (() =>
                                {
                                    const date = new Date(data.Birthdate);
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const day = String(date.getDate()).padStart(2, '0');
                                    return `${year}-${month}-${day}`;
                                })();


                                // Format date of acceptance as "Wednesday, July 9th 2025, 6:48:31 am"
                                const now = new Date();
                                const dateOfAcceptance = now.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }).replace(/(\d+)/, (match) =>
                                {
                                    const day = parseInt(match);
                                    const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                                        day === 2 || day === 22 ? 'nd' :
                                            day === 3 || day === 23 ? 'rd' : 'th';
                                    return day + suffix;
                                }) + ', ' + now.toLocaleTimeString('en-US', {
                                    hour12: true,
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    second: '2-digit'
                                });

                                // Format agreement commencement date as DD / MM / YYYY
                                const agreementDate = now.toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                }).replace(/\//g, ' / ');

                                // Format the data exactly like the email structure
                                const finalData = {
                                    // Form data mapped to email structure
                                    "Organisation Name": data.Organisation,
                                    "Organisation Role": data.Position,
                                    "Organisation ABN": data.ABN,
                                    "Full Name": data.Name,
                                    "Birthday": birthdayFormatted,
                                    "Email": data.Email,
                                    "formType": "terms",
                                    "IP Address": ipAddress,
                                    "Device": deviceInfo.fullUserAgent, // Use full user agent instead of deviceString
                                    "Date of Acceptance": dateOfAcceptance,
                                    "Agreement Commencement": `**THIS AGREEMENT COMMENCES ON THE:** ${agreementDate} and will be ongoing unless either party terminates this Agreement in accordance with the termination provisions herein ("Expiry").`,

                                    // Additional system data for backend processing
                                    timestamp: new Date().toISOString(),
                                    formId: "Terms",
                                    submissionId: `terms_${Date.now()}`,
                                    fullUserAgent: deviceInfo.fullUserAgent,
                                };

                                // Make the API call
                                const response = await fetch("/api/forms", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(finalData),
                                });

                                if (!response.ok) {
                                    const errorData = await response.json();
                                    throw new Error(errorData.error || "Failed to submit the form");
                                }

                                const result = await response.json();

                                setIsSubmitted(true);
                                setIsSubmitting(false);

                                // Reset form
                                reset();

                                // Redirect to /austrac on successful submission
                                router.push("/austrac");

                            } catch (error) {
                                console.error("Form submission error:", error);
                                setIsSubmitting(false);

                                // You might want to show an error message to the user
                                alert("There was an error submitting your form. Please try again.");
                            }
                        };

                        const renderFormFields = () => (
                            <>
                                {/* Bot field (honeypot) - hidden */}
                                <input
                                    type="text"
                                    {...register("BotField")}
                                    style={{ display: "none" }}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />

                                {/* Hidden ABN field for form validation */}
                                <input
                                    type="hidden"
                                    {...register("ABN")}
                                    value={abnValue || ""}
                                />

                                {inputFields.slice(0, 3).map((field, index) => (
                                    <div key={index} className="relative">
                                        <InputField
                                            {...field}
                                            register={register}
                                            errors={errors}
                                            currentErrorField={currentErrorField}
                                            setCurrentErrorField={setCurrentErrorField}
                                            ref={field.ref}
                                            autoComplete="new-password"
                                            onFocus={() => setCurrentErrorField(field.name)}
                                            onBlur={() => setCurrentErrorField(null)}
                                        />
                                    </div>
                                ))}

                                {/* DatePickerField for Birthdate at 4th position */}
                                <div className="relative">
                                    <DatePickerFieldWithRef
                                        label="What is your date of birth?"
                                        name="Birthdate"
                                        value={birthdateValue}
                                        onChange={(date) =>
                                        {
                                            setValue("Birthdate", date, { shouldValidate: true });
                                        }}
                                        onFocus={() => setCurrentErrorField("Birthdate")}
                                        onBlur={() => setCurrentErrorField(null)}
                                        errors={errors}
                                        currentErrorField={currentErrorField}
                                        dayPlaceholder="DD"
                                        monthPlaceholder="MM"
                                        yearPlaceholder="YYYY"
                                        format="dd/MM/yyyy"
                                        containerClassName=""
                                        labelClassName="text-white text-base inline-block mt-4 mb-2 w-full text-left"
                                        ref={birthdateRef}
                                        autoComplete="new-password"
                                    />
                                </div>

                                {/* Organisation field */}
                                <div className="relative">
                                    <InputField
                                        {...inputFields[3]}
                                        register={register}
                                        errors={errors}
                                        currentErrorField={currentErrorField}
                                        setCurrentErrorField={setCurrentErrorField}
                                        ref={organisationRef}
                                        autoComplete="new-password"
                                        onFocus={() => setCurrentErrorField("Organisation")}
                                        onBlur={() => setCurrentErrorField(null)}
                                    />
                                </div>

                                {/* ABN field with custom handling using the enhanced ABNInputField */}
                                <ABNInputField
                                    label="What is your organisation's ABN number?"
                                    name="ABN"
                                    placeholder="Enter your organisation's ABN number (11 digits)"
                                    Icon={FaIdCard}
                                    register={register}
                                    errors={errors}
                                    currentErrorField={currentErrorField}
                                    setCurrentErrorField={setCurrentErrorField}
                                    setValue={setValue}
                                    abnValue={abnValue}
                                    abnRef={abnRef}
                                />
                            </>
                        );
                       
                        // Validation Schemas
                        const createValidationSchemas = () =>
                        {
                          const BusinessInfoSchema = z.object({
                            Type: z.string().default("Regular Service"),
                            BusinessName: z.string().min(1, "Please enter the business name of this location."),
                            Address: z.string().min(1, "Please enter the number & street for this location."),
                            Suburb: z.string().min(1, "Please enter the suburb for this location."),
                            State: z.string()
                              .min(1, "Please enter the state this is located in.")
                              .refine((val) => val !== "select", "Please select a state."),
                            Postcode: z.string().min(1, "Please enter the post code for this location."),
                          });
                        
                          const ContactInfoSchema = z.object({
                            Contact: z.string().min(1, "Please enter the main contact person at this location."),
                            Position: z.string().min(1, "Please enter the main contact person position or role at this location."),
                            Phone: z.string().min(1, "Please enter their best contact number."),
                            Email: z.string()
                              .email("Please enter a valid email address.")
                              .min(1, "Please enter the email address at this location."),
                            Accounts: z.string()
                              .email("Please enter a valid email address.")
                              .min(1, "Please enter the email address to send accounts."),
                          });
                        
                          const OtherInfoSchema = z.object({
                            Services: z.array(z.string()).min(1, "Please select what services you require."),
                            Dates: z.string().min(1, "Please enter the date you would like to commence this service."),
                            Schedule: z.array(z.string()).min(1, "Please select your preferred schedule."),
                            Bank: z.string().min(1, "Please enter the bank this location uses."),
                          });
                        
                          const SiteRiskFormSchema = z.object({
                            Amount: z.enum([
                              "$100 to $500",
                              "$500 to $1,000",
                              "$1,000 to 5,000",
                              "$5,000 to $10,000",
                              "$10,000 to $20,000",
                              "$20,000 to $25,000",
                              "$25,000 to $50,000",
                              "$50,000 to $100,000",
                              "$100,000+",
                            ], {
                              errorMap: () => ({ message: "Please select an average notes value." })
                            }).refine((val) => val !== "" && val !== undefined, {
                              message: "Please select an average notes value.",
                            }),
                            Parking: z.array(z.string()).optional(),
                            Security: z.array(z.string()).optional(),
                            External: z.array(z.string()).optional(),
                            Internal: z.array(z.string()).optional(),
                          });
                        
                          return { BusinessInfoSchema, ContactInfoSchema, OtherInfoSchema, SiteRiskFormSchema };
                        };
                        
                        // Device and IP utilities
                        const getDeviceInfo = () =>
                        {
                          const userAgent = navigator.userAgent;
                          let browserInfo = 'Unknown';
                          let browserVersion = '';
                        
                          const browserPatterns = [
                            { name: 'Chrome', pattern: /Chrome\/([0-9.]+)/ },
                            { name: 'Firefox', pattern: /Firefox\/([0-9.]+)/ },
                            { name: 'Safari', pattern: /Version\/([0-9.]+).*Safari/ },
                            { name: 'Edge', pattern: /Edge\/([0-9.]+)/ }
                          ];
                        
                          for (const { name, pattern } of browserPatterns) {
                            const match = userAgent.match(pattern);
                            if (match) {
                              browserInfo = name;
                              browserVersion = match[1];
                              break;
                            }
                          }
                        
                          let osInfo = 'Unknown';
                          const osPatterns = [
                            { name: 'Windows NT', pattern: /Windows NT ([0-9._]+)/, format: (v) => `Windows NT ${v}` },
                            { name: 'Mac OS X', pattern: /Mac OS X ([0-9._]+)/, format: (v) => `Mac OS X ${v.replace(/_/g, '.')}` },
                            { name: 'Android', pattern: /Android ([0-9.]+)/, format: (v) => `Android ${v}` },
                            { name: 'iOS', pattern: /OS ([0-9._]+)/, format: (v) => `iOS ${v.replace(/_/g, '.')}`, condition: /iPhone|iPad/.test(userAgent) },
                            { name: 'Linux', pattern: /Linux/, format: () => 'Linux' }
                          ];
                        
                          for (const { pattern, format, condition } of osPatterns) {
                            if (condition && !condition) continue;
                            const match = userAgent.match(pattern);
                            if (match) {
                              osInfo = format(match[1] || '');
                              break;
                            }
                          }
                        
                          return {
                            fullUserAgent: userAgent,
                            browser: browserInfo,
                            browserVersion: browserVersion,
                            os: osInfo
                          };
                        };
                        
                        const getIPAddress = async () =>
                        {
                          const ipServices = [
                            'https://api.ipify.org?format=json',
                            'https://ipapi.co/json/',
                            'https://api.ip.sb/jsonip',
                          ];
                        
                          for (const service of ipServices) {
                            try {
                              const response = await fetch(service);
                              const data = await response.json();
                              if (data.ip || data.query) return data.ip || data.query;
                            } catch (error) {
                              console.log(`IP service ${service} failed:`, error);
                            }
                          }
                          return 'Unable to detect';
                        };
                        
                        const FormSection = () =>
                        {
                          // State management
                          const [formData, setFormData] = useState({});
                          const [showThankYou, setShowThankYou] = useState(false);
                          const [quoteFormStep, setQuoteFormStep] = useState(0);
                          const [schemaStep, setSchemaStep] = useState(0);
                        
                          // Form submission states
                          const [currentErrorField, setCurrentErrorField] = useState(null);
                          const [isFormSubmitted, setIsFormSubmitted] = useState(false);
                          const [submissionStatus, setSubmissionStatus] = useState(null);
                          const [isSubmitting, setIsSubmitting] = useState(false);
                          const [submitButton, setSubmitButton] = useState(false);
                        
                          // Get schemas
                          const { BusinessInfoSchema, ContactInfoSchema, OtherInfoSchema, SiteRiskFormSchema } = createValidationSchemas();
                          const schemas = [BusinessInfoSchema, ContactInfoSchema, OtherInfoSchema, SiteRiskFormSchema];
                          const quoteFormSchemas = [BusinessInfoSchema, ContactInfoSchema, OtherInfoSchema];
                        
                          // Create dynamic schema based on current step
                          const createCombinedSchema = (currentStep) =>
                          {
                            const fieldConfig = {
                              0: {
                                BusinessName: z.string().min(1, "Please enter the business name of this location."),
                                Address: z.string().min(1, "Please enter the number & street for this location."),
                                Suburb: z.string().min(1, "Please enter the suburb for this location."),
                                State: z.string().min(1, "Please enter the state this is located in.").refine((val) => val !== "select", "Please select a state."),
                                Postcode: z.string().min(1, "Please enter the post code for this location."),
                              },
                              1: {
                                Contact: z.string().min(1, "Please enter the main contact person at this location."),
                                Position: z.string().min(1, "Please enter the main contact person position or role at this location."),
                                Phone: z.string().min(1, "Please enter their best contact number."),
                                Email: z.string().email("Please enter a valid email address.").min(1, "Please enter the email address at this location."),
                                Accounts: z.string().email("Please enter a valid email address.").min(1, "Please enter the email address to send accounts."),
                              },
                              2: {
                                Services: z.array(z.string()).min(1, "Please select what services you require."),
                                Dates: z.string().min(1, "Please enter the date you would like to commence this service."),
                                Schedule: z.array(z.string()).min(1, "Please select your preferred schedule."),
                                Bank: z.string().min(1, "Please enter the bank this location uses."),
                              },
                              3: {
                                Amount: z.enum([
                                  "$100 to $500", "$500 to $1,000", "$1,000 to 5,000", "$5,000 to $10,000",
                                  "$10,000 to $20,000", "$20,000 to $25,000", "$25,000 to $50,000",
                                  "$50,000 to $100,000", "$100,000+",
                                ], {
                                  errorMap: () => ({ message: "Please select an average notes value." })
                                }).refine((val) => val !== "" && val !== undefined, {
                                  message: "Please select an average notes value.",
                                }),
                              }
                            };
                        
                            const baseFields = {
                              Type: z.string().default("Regular Service"),
                              Parking: z.array(z.string()).optional(),
                              Security: z.array(z.string()).optional(),
                              External: z.array(z.string()).optional(),
                              Internal: z.array(z.string()).optional(),
                            };
                        
                            // Add optional fields for all other steps
                            Object.keys(fieldConfig).forEach(step =>
                            {
                              if (parseInt(step) !== currentStep) {
                                Object.keys(fieldConfig[step]).forEach(field =>
                                {
                                  if (field === 'Services' || field === 'Schedule' || field === 'Parking' || field === 'Security' || field === 'External' || field === 'Internal') {
                                    baseFields[field] = z.array(z.string()).optional();
                                  } else {
                                    baseFields[field] = z.string().optional();
                                  }
                                });
                              }
                            });
                        
                            // Add required fields for current step
                            const currentStepFields = fieldConfig[currentStep] || {};
                        
                            return z.object({ ...baseFields, ...currentStepFields });
                          };
                        
                          // FIXED: Get default values with proper empty state
                          const getDefaultValues = () => ({
                            Type: "Regular Service",
                            BusinessName: "",
                            Address: "",
                            Suburb: "",
                            Postcode: "",
                            Contact: "",
                            Position: "",
                            Phone: "",
                            Email: "",
                            Accounts: "",
                            Services: [],
                            Dates: "",
                            Schedule: [],
                            Bank: "",
                            Amount: "",
                            Parking: [],
                            Security: [],
                            External: [],
                            Internal: [],
                            ...formData,
                          });
                        
                          const methods = useForm({
                            resolver: zodResolver(createCombinedSchema(schemaStep)),
                            defaultValues: getDefaultValues(),
                          });
                        
                          const { register, handleSubmit, trigger, setValue, getValues, reset, formState: { errors } } = methods;
                        
                          // Update resolver when schema step changes
                          useEffect(() =>
                          {
                            const newSchema = createCombinedSchema(schemaStep);
                            methods.resolver = zodResolver(newSchema);
                            reset(getDefaultValues());
                          }, [schemaStep, formData]);
                        
                          // Step navigation handler
                          const handleStepNavigation = (targetStep) =>
                          {
                            const currentFormData = getValues();
                            setFormData(prev => ({ ...prev, ...currentFormData }));
                            setSchemaStep(targetStep);
                        
                            if (targetStep <= 2) {
                              setQuoteFormStep(targetStep);
                            }
                          };
                        
                          // Focus on franchise form when transitioning
                          const focusOnFranchiseForm = () =>
                          {
                            setTimeout(() =>
                            {
                              const franchiseFormFirstField = document.querySelector('[name="Amount"]');
                              if (franchiseFormFirstField) {
                                franchiseFormFirstField.focus();
                                franchiseFormFirstField.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'center'
                                });
                              }
                            }, 100);
                          };
                        
                          // API submission handler
                          const submitToAPI = async (finalData) =>
                          {
                            const deviceInfo = getDeviceInfo();
                            const ipAddress = await getIPAddress();
                        
                            const payload = {
                              ...finalData,
                              deviceInfo: deviceInfo.fullUserAgent,
                              ipAddress: ipAddress,
                              timestamp: new Date().toISOString(),
                            };
                        
                            const response = await fetch("/api/forms", {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(payload),
                            });
                        
                            if (!response.ok) {
                              const errorData = await response.json();
                              throw new Error(errorData.error || 'API request failed');
                            }
                        
                            return response.json();
                          };
                        
                          // FIXED: Complete form reset function
                          const resetFormState = () =>
                          {
                            // Reset all form data to empty state
                            const emptyFormData = {
                              Type: "Regular Service",
                              BusinessName: "",
                              Address: "",
                              Suburb: "",
                              State: "",
                              Postcode: "",
                              Contact: "",
                              Position: "",
                              Phone: "",
                              Email: "",
                              Accounts: "",
                              Services: [],
                              Dates: "",
                              Schedule: [],
                              Bank: "",
                              Amount: "",
                              Parking: [],
                              Security: [],
                              External: [],
                              Internal: [],
                            };
                        
                            setFormData(emptyFormData);
                            reset(emptyFormData);
                            setQuoteFormStep(0);
                            setSchemaStep(0);
                            setSubmitButton(false);
                            setCurrentErrorField(null);
                            setSubmissionStatus(null);
                          };
                        
                          // FIXED: Modal close handler that properly resets form
                          const handleModalClose = () =>
                          {
                            setShowThankYou(false);
                            setIsFormSubmitted(false);
                            resetFormState();
                          };
                        
                          // Main form submission handler
                          const handleFormSubmit = async (data) =>
                          {
                            try {
                              const updatedFormData = { ...formData, ...data, "formType": "siteinfo" };
                              setFormData(updatedFormData);
                        
                              if (schemaStep < 3) {
                                // Progress to next step
                                if (quoteFormStep < 2) setQuoteFormStep(prev => prev + 1);
                                setSchemaStep(prev => prev + 1);
                        
                                // Enable submit button and focus when moving to franchise form
                                if (schemaStep === 2) {
                                  setSubmitButton(true);
                                  focusOnFranchiseForm();
                                }
                              } else {
                                // Final submission
                                setIsSubmitting(true);
                        
                                try {
                                  const result = await submitToAPI(updatedFormData);
                                  console.log('API Response:', result);
                        
                                  setIsSubmitting(false);
                                  setIsFormSubmitted(true);
                                  setSubmissionStatus('success');
                        
                                  // FIXED: Don't reset form state here, let modal handle it
                                  setShowThankYou(true);
                        
                                } catch (apiError) {
                                  console.error('API submission error:', apiError);
                                  setIsSubmitting(false);
                                  setSubmissionStatus('error');
                                }
                              }
                            } catch (error) {
                              console.error("Form submission error:", error);
                              setIsSubmitting(false);
                              setSubmissionStatus('error');
                            }
                          };
                          
                            
                            // Validation Schemas
                            const createValidationSchemas = () =>
                            {
                              const BusinessInfoSchema = z.object({
                                Type: z.string().default("Special Event"),
                                BusinessName: z.string().min(1, "Please enter the business name of this location."),
                                Address: z.string().min(1, "Please enter the number & street for this location."),
                                Suburb: z.string().min(1, "Please enter the suburb for this location."),
                                State: z.string()
                                  .min(1, "Please enter the state this is located in.")
                                  .refine((val) => val !== "select", "Please select a state."),
                                Postcode: z.string().min(1, "Please enter the post code for this location."),
                              });
                            
                              const ContactInfoSchema = z.object({
                                Contact: z.string().min(1, "Please enter the main contact person at this location."),
                                Position: z.string().min(1, "Please enter the main contact person position or role at this location."),
                                Phone: z.string().min(1, "Please enter their best contact number."),
                                Email: z.string()
                                  .email("Please enter a valid email address.")
                                  .min(1, "Please enter the email address at this location."),
                                Accounts: z.string()
                                  .email("Please enter a valid email address.")
                                  .min(1, "Please enter the email address to send accounts."),
                              });
                            
                              const OtherInfoSchema = z.object({
                                Services: z.array(z.string()).min(1, "Please select what services you require."),
                                Dates: z.string().min(1, "Please enter the date you would like to commence this service."),
                                Bank: z.string().min(1, "Please enter the bank this location uses."),
                              });
                            
                              const SiteRiskFormSchema = z.object({
                                Amount: z.enum([
                                  "$100 to $500",
                                  "$500 to $1,000",
                                  "$1,000 to 5,000",
                                  "$5,000 to $10,000",
                                  "$10,000 to $20,000",
                                  "$20,000 to $25,000",
                                  "$25,000 to $50,000",
                                  "$50,000 to $100,000",
                                  "$100,000+",
                                ], {
                                  errorMap: () => ({ message: "Please select an average notes value." })
                                }).refine((val) => val !== "" && val !== undefined, {
                                  message: "Please select an average notes value.",
                                }),
                                Parking: z.array(z.string()).optional(),
                                Security: z.array(z.string()).optional(),
                                External: z.array(z.string()).optional(),
                                Internal: z.array(z.string()).optional(),
                              });
                            
                              return { BusinessInfoSchema, ContactInfoSchema, OtherInfoSchema, SiteRiskFormSchema };
                            };
                            
                            // Device and IP utilities
                            const getDeviceInfo = () =>
                            {
                              const userAgent = navigator.userAgent;
                              let browserInfo = 'Unknown';
                              let browserVersion = '';
                            
                              const browserPatterns = [
                                { name: 'Chrome', pattern: /Chrome\/([0-9.]+)/ },
                                { name: 'Firefox', pattern: /Firefox\/([0-9.]+)/ },
                                { name: 'Safari', pattern: /Version\/([0-9.]+).*Safari/ },
                                { name: 'Edge', pattern: /Edge\/([0-9.]+)/ }
                              ];
                            
                              for (const { name, pattern } of browserPatterns) {
                                const match = userAgent.match(pattern);
                                if (match) {
                                  browserInfo = name;
                                  browserVersion = match[1];
                                  break;
                                }
                              }
                            
                              let osInfo = 'Unknown';
                              const osPatterns = [
                                { name: 'Windows NT', pattern: /Windows NT ([0-9._]+)/, format: (v) => `Windows NT ${v}` },
                                { name: 'Mac OS X', pattern: /Mac OS X ([0-9._]+)/, format: (v) => `Mac OS X ${v.replace(/_/g, '.')}` },
                                { name: 'Android', pattern: /Android ([0-9.]+)/, format: (v) => `Android ${v}` },
                                { name: 'iOS', pattern: /OS ([0-9._]+)/, format: (v) => `iOS ${v.replace(/_/g, '.')}`, condition: /iPhone|iPad/.test(userAgent) },
                                { name: 'Linux', pattern: /Linux/, format: () => 'Linux' }
                              ];
                            
                              for (const { pattern, format, condition } of osPatterns) {
                                if (condition && !condition) continue;
                                const match = userAgent.match(pattern);
                                if (match) {
                                  osInfo = format(match[1] || '');
                                  break;
                                }
                              }
                            
                              return {
                                fullUserAgent: userAgent,
                                browser: browserInfo,
                                browserVersion: browserVersion,
                                os: osInfo
                              };
                            };
                            
                            const getIPAddress = async () =>
                            {
                              const ipServices = [
                                'https://api.ipify.org?format=json',
                                'https://ipapi.co/json/',
                                'https://api.ip.sb/jsonip',
                              ];
                            
                              for (const service of ipServices) {
                                try {
                                  const response = await fetch(service);
                                  const data = await response.json();
                                  if (data.ip || data.query) return data.ip || data.query;
                                } catch (error) {
                                  console.log(`IP service ${service} failed:`, error);
                                }
                              }
                              return 'Unable to detect';
                            };
                            
                            const FormSection = () =>
                            {
                            
                                // State management
                                const [formData, setFormData] = useState({});
                                const [showThankYou, setShowThankYou] = useState(false);
                                const [quoteFormStep, setQuoteFormStep] = useState(0);
                                const [schemaStep, setSchemaStep] = useState(0);
                              
                                // Form submission states
                                const [currentErrorField, setCurrentErrorField] = useState(null);
                                const [isFormSubmitted, setIsFormSubmitted] = useState(false);
                                const [submissionStatus, setSubmissionStatus] = useState(null);
                                const [isSubmitting, setIsSubmitting] = useState(false);
                                const [submitButton, setSubmitButton] = useState(false);
                              
                                // Get schemas
                                const { BusinessInfoSchema, ContactInfoSchema, OtherInfoSchema, SiteRiskFormSchema } = createValidationSchemas();
                                const schemas = [BusinessInfoSchema, ContactInfoSchema, OtherInfoSchema, SiteRiskFormSchema];
                                const quoteFormSchemas = [BusinessInfoSchema, ContactInfoSchema, OtherInfoSchema];
                              
                                // Create dynamic schema based on current step
                                const createCombinedSchema = (currentStep) =>
                                {
                                  const fieldConfig = {
                                    0: {
                                      BusinessName: z.string().min(1, "Please enter the business name of this location."),
                                      Address: z.string().min(1, "Please enter the number & street for this location."),
                                      Suburb: z.string().min(1, "Please enter the suburb for this location."),
                                      State: z.string().min(1, "Please enter the state this is located in.").refine((val) => val !== "select", "Please select a state."),
                                      Postcode: z.string().min(1, "Please enter the post code for this location."),
                                    },
                                    1: {
                                      Contact: z.string().min(1, "Please enter the main contact person at this location."),
                                      Position: z.string().min(1, "Please enter the main contact person position or role at this location."),
                                      Phone: z.string().min(1, "Please enter their best contact number."),
                                      Email: z.string().email("Please enter a valid email address.").min(1, "Please enter the email address at this location."),
                                      Accounts: z.string().email("Please enter a valid email address.").min(1, "Please enter the email address to send accounts."),
                                    },
                                    2: {
                                      Services: z.array(z.string()).min(1, "Please select what services you require."),
                                      Dates: z.string().min(1, "Please enter the date you would like to commence this service."),
                                      Bank: z.string().min(1, "Please enter the bank this location uses."),
                                    },
                                    3: {
                                      Amount: z.enum([
                                        "$100 to $500", "$500 to $1,000", "$1,000 to 5,000", "$5,000 to $10,000",
                                        "$10,000 to $20,000", "$20,000 to $25,000", "$25,000 to $50,000",
                                        "$50,000 to $100,000", "$100,000+",
                                      ], {
                                        errorMap: () => ({ message: "Please select an average notes value." })
                                      }).refine((val) => val !== "" && val !== undefined, {
                                        message: "Please select an average notes value.",
                                      }),
                                    }
                                  };
                              
                                  const baseFields = {
                                    Type: z.string().default("Special Event"),
                                    Parking: z.array(z.string()).optional(),
                                    Security: z.array(z.string()).optional(),
                                    External: z.array(z.string()).optional(),
                                    Internal: z.array(z.string()).optional(),
                                  };
                              
                                  // Add optional fields for all other steps
                                  Object.keys(fieldConfig).forEach(step =>
                                  {
                                    if (parseInt(step) !== currentStep) {
                                      Object.keys(fieldConfig[step]).forEach(field =>
                                      {
                                        if (field === 'Services' || field === 'Schedule' || field === 'Parking' || field === 'Security' || field === 'External' || field === 'Internal') {
                                          baseFields[field] = z.array(z.string()).optional();
                                        } else {
                                          baseFields[field] = z.string().optional();
                                        }
                                      });
                                    }
                                  });
                              
                                  // Add required fields for current step
                                  const currentStepFields = fieldConfig[currentStep] || {};
                              
                                  return z.object({ ...baseFields, ...currentStepFields });
                                };
                              
                                // Form setup with default values
                                const getDefaultValues = () => ({
                                  Type: "Special Event",
                                  Services: [],
                                  Schedule: [],
                                  Amount: "",
                                  Parking: [],
                                  Security: [],
                                  External: [],
                                  Internal: [],
                                  ...formData,
                                });
                              
                                const methods = useForm({
                                  resolver: zodResolver(createCombinedSchema(schemaStep)),
                                  defaultValues: getDefaultValues(),
                                });
                              
                                const { register, handleSubmit, trigger, setValue, getValues, reset, formState: { errors } } = methods;
                              
                                // Update resolver when schema step changes
                                useEffect(() =>
                                {
                                  const newSchema = createCombinedSchema(schemaStep);
                                  methods.resolver = zodResolver(newSchema);
                                  reset(getDefaultValues());
                                }, [schemaStep, formData]);
                              
                                // Step navigation handler
                                const handleStepNavigation = (targetStep) =>
                                {
                                  const currentFormData = getValues();
                                  setFormData(prev => ({ ...prev, ...currentFormData }));
                                  setSchemaStep(targetStep);
                              
                                  if (targetStep <= 2) {
                                    setQuoteFormStep(targetStep);
                                  }
                                };
                              
                                // Focus on franchise form when transitioning
                                const focusOnFranchiseForm = () =>
                                {
                                  setTimeout(() =>
                                  {
                                    const franchiseFormFirstField = document.querySelector('[name="Amount"]');
                                    if (franchiseFormFirstField) {
                                      franchiseFormFirstField.focus();
                                      franchiseFormFirstField.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'center'
                                      });
                                    }
                                  }, 100);
                                };
                              const handleModalClose = () =>
                              {
                                setShowThankYou(false);
                                setIsFormSubmitted(false);
                                resetFormState();
                              };
                            
                                // API submission handler
                                const submitToAPI = async (finalData) =>
                                {
                                  const deviceInfo = getDeviceInfo();
                                  const ipAddress = await getIPAddress();
                              
                                  const payload = {
                                    ...finalData,
                                    deviceInfo: deviceInfo.fullUserAgent,
                                    ipAddress: ipAddress,
                                    timestamp: new Date().toISOString(),
                                  };
                              
                                  const response = await fetch("/api/forms", {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(payload),
                                  });
                              
                                  if (!response.ok) {
                                    const errorData = await response.json();
                                    throw new Error(errorData.error || 'API request failed');
                                  }
                              
                                  return response.json();
                                };
                              
                                // Reset form state
                                const resetFormState = () =>
                                {
                                  reset();
                                  setQuoteFormStep(0);
                                  setSchemaStep(0);
                                  setFormData({});
                                  setIsFormSubmitted(false);
                                  setSubmitButton(false);
                                };
                              
                                // Main form submission handler
                                const handleFormSubmit = async (data) =>
                                {
                                  try {
                                    const updatedFormData = { ...formData, ...data, "formType": "siteinfo" };
                                    setFormData(updatedFormData);
                              
                                    if (schemaStep < 3) {
                                      // Progress to next step
                                      if (quoteFormStep < 2) setQuoteFormStep(prev => prev + 1);
                                      setSchemaStep(prev => prev + 1);
                              
                                      // Enable submit button and focus when moving to franchise form
                                      if (schemaStep === 2) {
                                        setSubmitButton(true);
                                        focusOnFranchiseForm();
                                      }
                                    } else {
                                      // Final submission
                                      setIsSubmitting(true);
                              
                                      try {
                                        const result = await submitToAPI(updatedFormData);
                                        console.log('API Response:', result);
                              
                                        setTimeout(() =>
                                        {
                                          setIsSubmitting(false);
                                          setIsFormSubmitted(true);
                                          setSubmissionStatus('success');
                                          resetFormState();
                                          setShowThankYou(true);
                                        }, 2000);
                              
                                      } catch (apiError) {
                                        console.error('API submission error:', apiError);
                                        setIsSubmitting(false);
                                        setSubmissionStatus('error');
                                      }
                                    }
                                  } catch (error) {
                                    console.error("Form submission error:", error);
                                    setIsSubmitting(false);
                                    setSubmissionStatus('error');
                                  }
                                };