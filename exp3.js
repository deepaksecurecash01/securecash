"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import
{
	FaUser,
	FaPhone,
	FaEnvelope,
	FaHome,
	FaMapMarkerAlt,
	FaInfoCircle,
	FaQuestionCircle,
	FaSpinner,
	FaCheckCircle,
} from "react-icons/fa";
import { PopupModal } from "react-calendly";

import WarningPopup from "@/components/common/forms/elements/WarningPopup";
import Typography from "@/components/common/Typography";

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

	const inputFields = [
		{
			label: "Full Name",
			name: "FullName",
			placeholder: "Enter your full name",
			Icon: FaUser,
			errorMessage: "Please enter your full name.",
			ref: fullNameRef,
		},
		{
			label: "Phone Number",
			name: "Phone",
			placeholder: "Enter your phone number",
			Icon: FaPhone,
			errorMessage: "Please enter your phone number.",
			ref: phoneRef,
		},
		{
			label: "Email Address",
			name: "Email",
			type: "email",
			placeholder: "Your email address",
			Icon: FaEnvelope,
			errorMessage: "Please enter your email address.",
			ref: emailRef,
		},
		{
			label: "Address",
			name: "Address",
			placeholder: "Enter your address",
			Icon: FaHome,
			errorMessage: "Please enter your address.",
			ref: addressRef,
		},
		{
			label: "Territory/Area/Suburb of Interest",
			name: "InterestedArea",
			placeholder: "What territory/area/suburb are you interested in?",
			Icon: FaMapMarkerAlt,
			errorMessage: "Please specify what territory/area/suburb you are interested in.",
			ref: interestedAreaRef,
		},
		{
			label: "What interests you in a SecureCash Franchise?",
			name: "ReasonForInterest",
			placeholder: "Briefly tell us why you're interested in a SecureCash franchise",
			Icon: FaInfoCircle,
			errorMessage: "Please tell us why you're interested in a franchise.",
			textarea: true,
			ref: reasonForInterestRef,
		},
		{
			label: "How did you hear about this Opportunity?",
			name: "ReferralSource",
			placeholder: "E.g., Google, Social Media, Referral",
			Icon: FaQuestionCircle,
			errorMessage: "Please let us know how you heard about this opportunity.",
			ref: referralSourceRef,
		},
	];

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
	};

	return (
		<div className="float-none 992px:w-[60%] 992px:float-left relative left-0 flex justify-center 414px:mx-4 992px:mx-0">
			<form
				className="forms-franchise-v2 rounded-r-[8px] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.2)] h-auto 992px:mx-0 px-8 480px:px-[5%] 1366px:h-full submit-status 992px:mt-4 992px:mt-0 992px:mb-16 w-full lg:mt-0 lg:mb-0 text-center py-8 bg-[#f1f1f1] relative"
				data-formid="Franchise"
				style={{ background: "#f1f1f1" }}
				onSubmit={handleSubmit(handleFormSubmit)}
				noValidate
				autoComplete="off"
			>
				{/* Bot field (honeypot) - hidden */}
				<input
					type="text"
					{...register("BotField")}
					style={{ display: "none" }}
					tabIndex={-1}
					autoComplete="off"
				/>

				<div className="form-tab 480px:w-[90%] mx-auto">
					<>
						{inputFields.map((field, index) => (
							<InputField
								key={index}
								{...field}
								register={register}
								errors={errors}
								currentErrorField={currentErrorField}
								setCurrentErrorField={setCurrentErrorField}
								autoComplete="new-password"
							/>
						))}

						<div className="text-primary-text text-[14px] font-medium mt-4 mb-2 w-full text-left px-2 768px:px-0">
							After submitting the form, please pick a time from the popup
							screen for a video meeting.
						</div>
					</>
				</div>

				{isFormSubmitted && (
					<div
						className="form-submitted-message text-center py-4 absolute h-full top-0 flex justify-center items-center bg-[#f1f1f1] z-10"
						style={{ background: "#f1f1f1" }}
					>
						<div className="480px:w-[90%] mx-auto">
							<Typography
								as="h3"
								fontFamily="montserrat"
								className="text-[32px] text-primary leading-[1.4em] text-center font-bold mb-[16px]"
							>
								Thank You for Your Interest!
							</Typography>

							<p className="mb-6">
								Your form has been submitted successfully. The meeting scheduler
								should appear shortly.
							</p>
						</div>
					</div>
				)}

				<div className="button-controls-container w-[80%] mx-auto mt-7">
					<div className="button-section relative">
						<button
							type="submit"
							disabled={isSubmitting}
							className={`nextBtn ${isSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b]'
								} text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer w-full rounded-[40px] outline-none appearance-none hover:opacity-80 text-sm p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed`}
						>
							{isSubmitting ? (
								<div className="flex items-center justify-center">
									<FaSpinner className="animate-spin mr-2" />
									Submitting... Please Wait.
								</div>
							) : isSubmitted ? (
								<div className="flex items-center justify-center">
									<FaCheckCircle className="text-white mr-2" />
									Thank you, form submitted successfully!
								</div>
							) : (
								"Submit"
							)}
						</button>
					</div>
				</div>
			</form>

			{/* Calendly Modal Component */}
			{formData && (
				<PopupModal
					url={calendlyURL}
					prefill={{
						name: formData.FullName || "",
						email: formData.Email || "",
						customAnswers: {
							a1: formData.InterestedArea || "",
						},
					}}
					onModalClose={() =>
					{
						setIsCalendlyOpen(false);
						setIsFormSubmitted(false);
					}}
					open={isCalendlyOpen}
					rootElement={document.getElementById("root") || document.body}
				/>
			)}
		</div>
	);
};

export default FranchiseForm;