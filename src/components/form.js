// /components/form/LoadingSpinner.jsx
export const LoadingSpinner = () => (
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

// /components/form/SubmitButton.jsx
import { LoadingSpinner } from './LoadingSpinner';

export const SubmitButton = ({
    isSubmitting,
    isSubmitted,
    children,
    className = "",
    disabled = false,
    ...props
}) => (
    <button
        type="submit"
        disabled={isSubmitting || disabled}
        className={`nextBtn ${isSubmitted ? 'bg-[#4bb543]' : 'bg-[#c6a54b]'
            } text-white border-none py-[15px] px-[50px] text-[17px] cursor-pointer rounded-[40px] outline-none appearance-none hover:opacity-80 text-base p-2.5 shadow-none font-montserrat disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
    >
        {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
                <LoadingSpinner />
                Submitting... Please Wait.
            </span>
        ) : isSubmitted ? (
            "Thank you. We received your submission!"
        ) : (
            children
        )}
    </button>
);

// /components/form/SuccessMessage.jsx
export const SuccessMessage = ({ message = "Thank you. We received your submission!" }) => (
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
        {message}
    </div>
);

// /components/form/HoneypotField.jsx
export const HoneypotField = ({ register }) => (
    <input
        type="text"
        {...register("BotField")}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
    />
);