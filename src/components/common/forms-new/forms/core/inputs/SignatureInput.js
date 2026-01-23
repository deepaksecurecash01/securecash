import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import SignatureCanvas from "react-signature-canvas";

export const SignatureInput = forwardRef(
  (
    {
      value,
      onChange,
      onFocus,
      onBlur,
      name,
      theme = "dark",
      hasError,
      isFocused,
      label,
      disabled = false,
      ...otherProps
    },
    ref,
  ) => {
    const sigCanvas = useRef({});
    const containerRef = useRef(null);
    const [isEmpty, setIsEmpty] = useState(!value);

    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          if (containerRef.current) {
            containerRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            // 1. Actually focus the DOM element so blur events work
            containerRef.current.focus({ preventScroll: true });

            if (onFocus) {
              onFocus({ target: { name } });
            }
          }
        },
        scrollIntoView: (options) => {
          if (containerRef.current) {
            containerRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
              ...options,
            });
          }
        },
        name,
        type: "signature",
      }),
      [onFocus, name],
    );

    useEffect(() => {
      if (value && sigCanvas.current && isEmpty) {
        sigCanvas.current.fromDataURL(value);
        setIsEmpty(false);
      }
    }, [value]);

    // 2. Hide icon IMMEDIATELY when drawing starts
    const handleBegin = () => {
      setIsEmpty(false);
    };

    const handleEnd = () => {
      if (sigCanvas.current) {
        if (sigCanvas.current.isEmpty()) {
          setIsEmpty(true);
          onChange(null);
        } else {
          setIsEmpty(false);
          const signatureData = sigCanvas.current.toDataURL("image/png");
          onChange(signatureData);
        }
        // No need to trigger blur here; let the container handle it naturally
      }
    };

    const clearSignature = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (sigCanvas.current) {
        sigCanvas.current.clear();
        setIsEmpty(true);
        onChange(null);
      }
      // Re-focus container after clearing so user can sign again immediately
      containerRef.current?.focus();
    };

    // 3. Handle native blur events (clicking outside)
    const handleContainerBlur = (e) => {
      // Only blur if the new focus is NOT inside this component (e.g. not the clear button)
      if (!e.currentTarget.contains(e.relatedTarget)) {
        if (onBlur) onBlur();
      }
    };

    const handleContainerClick = () => {
      if (!disabled && onFocus) {
        onFocus({ target: { name } });
      }
    };

    const getContainerClasses = () => {
      // 4. Add 'outline-none' to prevent double focus rings (browser blue ring + your custom border)
      const baseClasses =
        "relative w-full rounded-md border border-gray-400 mb-2.5 p-4 shadow-none font-montserrat bg-white h-48 outline-none";

      let stateStyles = "";

      if (disabled) {
        stateStyles = "bg-gray-100 cursor-not-allowed opacity-75";
      }

      if (hasError && isFocused) {
        stateStyles =
          "outline outline-red-600 [outline-offset:unset] [outline-style:auto]";
      } else if (isFocused) {
        stateStyles =
          "outline outline-primary [outline-offset:unset] [outline-style:auto]";
      }

      return `${baseClasses} ${stateStyles}`;
    };

    return (
      <div
        ref={containerRef}
        className="w-full relative"
        onClick={handleContainerClick}
        onBlur={handleContainerBlur} // 5. Bind the blur handler
        tabIndex={0} // 6. Make div focusable so it can receive/lose focus
        data-field-name={name}
      >
        <div className={getContainerClasses()}>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              className: "w-full h-full absolute top-0 left-0 cursor-crosshair",
            }}
            onBegin={handleBegin} // 7. Bind the begin handler
            onEnd={handleEnd}
          />

          <div className="absolute top-2 right-2 flex gap-2 pointer-events-none">
            {!isEmpty && !disabled && (
              <button
                type="button"
                onClick={clearSignature}
                className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition-colors shadow-sm pointer-events-auto"
                title="Clear Signature"
              >
                <FaTrash size={14} />
              </button>
            )}
          </div>

          {isEmpty && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="text-center">
                <FaPen size={36} className="mx-auto mb-1 text-gray-500" />
                <span className="text-gray-500 text-sm font-montserrat">
                  Sign here
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

SignatureInput.displayName = "SignatureInput";

