import Image from "next/image";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { FaTrash } from "react-icons/fa";
import SignatureCanvas from "react-signature-canvas";

export const SignatureInput = forwardRef(
  (
    {
      value,
      onChange,
      onFocus,
      onBlur,
      name,
      hasError,
      isFocused,
      disabled = false,
    },
    ref,
  ) => {
    const sigCanvas = useRef(null);
    const containerRef = useRef(null);
    const [isEmpty, setIsEmpty] = useState(!value);

    useImperativeHandle(ref, () => ({
      focus: () => {
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        containerRef.current?.focus({ preventScroll: true });
        onFocus?.({ target: { name } });
      },
      name,
      type: "signature",
    }));

    useEffect(() => {
      if (value && sigCanvas.current && isEmpty) {
        sigCanvas.current.fromDataURL(value);
        setIsEmpty(false);
      }
    }, [value, isEmpty]);

    const handleBegin = () => setIsEmpty(false);

    const handleEnd = () => {
      if (!sigCanvas.current) return;

      if (sigCanvas.current.isEmpty()) {
        setIsEmpty(true);
        onChange(null);
      } else {
        onChange(sigCanvas.current.toDataURL("image/png"));
        setIsEmpty(false);
      }
    };

    const clearSignature = (e) => {
      e.preventDefault();
      e.stopPropagation();
      sigCanvas.current?.clear();
      setIsEmpty(true);
      onChange(null);
      containerRef.current?.focus();
    };

    const handleBlur = (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) onBlur?.();
    };

    const handleClick = () => {
      if (!disabled) onFocus?.({ target: { name } });
    };

    const getContainerClasses = () => {
      const base =
        "relative w-full h-48 rounded-xl p-4 mb-2.5 outline-none " +
        "bg-white/90 border border-white/40 " +
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.95)," +
        "inset_0_-6px_12px_rgba(0,0,0,0.22)," +
        "0_14px_32px_rgba(0,0,0,0.35)]";

      if (disabled) return `${base} opacity-60 cursor-not-allowed`;

      if (hasError && isFocused) return `${base} outline outline-red-600 [outline-style:auto]`;


      return base;
    };

    return (
      <div
        ref={containerRef}
        tabIndex={0}
        className="w-full relative"
        onClick={handleClick}
        onBlur={handleBlur}
        data-field-name={name}
      >
        <div className={getContainerClasses()}>
          {/* Placeholder */}
          {isEmpty && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
              <Image
                src="/images/SignaturePlaceholder.svg"
                alt="Sign here"
                width={320}
                height={120}
                className="opacity-40"
                unoptimized
              />
            </div>
          )}

          {/* TOP EDGE LIGHT (glass thickness) */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl
            bg-gradient-to-r from-transparent via-white/90 to-transparent
            pointer-events-none z-[2]"
          />

          {/* MAIN GLOSS REFLECTION */}
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-[3]">
            <div
              className="absolute -top-1/2 -left-1/3 w-[180%] h-[180%]
              bg-gradient-to-br from-white/70 via-white/25 to-transparent
              rotate-[18deg]"
            />
          </div>

          {/* SUBTLE INTERNAL REFRACTION */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none z-[4]
            bg-[linear-gradient(145deg,rgba(255,255,255,0.12),transparent_45%,rgba(0,0,0,0.08))]"
          />

          {/* Signature Canvas */}
          <SignatureCanvas
            ref={sigCanvas}
            penColor="rgba(15,15,15,0.9)"
            minWidth={0.8}
            maxWidth={2.3}
            velocityFilterWeight={0.72}
            onBegin={handleBegin}
            onEnd={handleEnd}
            canvasProps={{
              className:
                "absolute inset-0 w-full h-full cursor-crosshair z-[5] touch-none",
            }}
          />

          {/* Clear Button */}
          {!isEmpty && !disabled && (
            <div className="absolute top-2 right-2 z-[6]">
              <button
                type="button"
                onClick={clearSignature}
                title="Clear Signature"
                className="p-2 rounded-full bg-red-100/90 hover:bg-red-200
                  text-red-600 shadow-lg backdrop-blur-md"
              >
                <FaTrash size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  },
);

SignatureInput.displayName = "SignatureInput";
