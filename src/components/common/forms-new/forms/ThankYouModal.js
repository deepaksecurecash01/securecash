"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import Link from "next/link";

// Constants
const MODAL_TYPES = {
    THANKYOU: 'Thankyou',
    BUSINESS: 'Business'
};

const MODAL_STYLES = {
    backdrop: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        pointerEvents: "all",
    },
    content: {
        pointerEvents: "all",
        zIndex: 99999,
    },
    button: {
        pointerEvents: "all",
        cursor: "pointer",
        zIndex: 999999,
    }
};

export default function ThankYouModal({
    setIsFormSubmitted,
    onClose,
    type,
    showThankYou = false,
})
{
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // Determine if modal should be visible
    const shouldShowModal = type === MODAL_TYPES.THANKYOU ? showThankYou : true;

    // Body scroll management
    const manageBodyScroll = useCallback((lock) =>
    {
        if (lock) {
            const scrollY = window.scrollY;
            document.body.style.top = `-${scrollY}px`;
            document.body.classList.add("modal-on");
        } else {
            const scrollY = document.body.style.top;
            document.body.classList.remove("modal-on");
            document.body.style.top = "";

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
    }, []);

    // Modal control functions
    const closeModal = useCallback(() =>
    {
        setIsOpen(false);
        onClose?.();
        
    }, [setIsFormSubmitted, onClose]);

    // Event handlers
    const handleModalContentClick = useCallback((e) =>
    {
        e.stopPropagation();
    }, []);

    const createNavigationHandler = useCallback((path, additionalAction) =>
    {
        return (e) =>
        {
            e.preventDefault();
            e.stopPropagation();
            additionalAction?.();
            closeModal();
            if (path) {
                router.push(path);
            }
        };
    }, [router, closeModal]);

    // Navigation handlers
    const handleAddAnotherLocation = createNavigationHandler();
    const handleReturnToHomepage = createNavigationHandler("/");
    const handleYesClick = createNavigationHandler();
    const handleNoClick = createNavigationHandler("/special-event");

    // Effects
    useEffect(() =>
    {
        setIsOpen(shouldShowModal);
    }, [shouldShowModal]);

    useEffect(() =>
    {
        manageBodyScroll(isOpen && shouldShowModal);

        return () => manageBodyScroll(false);
    }, [isOpen, shouldShowModal, manageBodyScroll]);

    // Early return if modal should not be shown
    if (!isOpen || !shouldShowModal) {
        return null;
    }

    // Modal renderers
    const renderThankYouModal = () => (
        <div
            className="site-modal-outer site-info-modal bus-type-modal"
            style={MODAL_STYLES.backdrop}
        >
            <div
                className="site-modal-inner business-type-dailog-box--card flex flex-col items-center justify-center relative"
                onClick={handleModalContentClick}
                style={MODAL_STYLES.content}
            >
                <FaCheckCircle className="text-[#4bb543] text-[68px] mb-4" />

                <p className="business-type-dailog-box--card__text-strong mb-4">
                    Thank you! All these details have been sent through. You will receive
                    a confirmation email shortly.
                </p>

                <p className="business-type-thank-you--card__text mb-4">
                    For any further inquiries, please contact{" "}
                    <a href="mailto:customers@securecash.com.au" className="text-primary">
                        customers@securecash.com.au
                    </a>
                </p>

                <div className="business-type-thank-you--card__btn-wrap w-full">
                        <button
                            className="btn-gold-alt btn-ty-note-submit"
                            onClick={onClose}
                            style={MODAL_STYLES.button}
                        >
                            Add another Location
                        </button>
                    <Link href="/">
                        <button
                            className="btn-gold-alt btn-ty-note-submit"
                            style={MODAL_STYLES.button}
                        >
                            Return to Homepage
                        </button>
                    </Link>
                </div>

                <button
                    className="absolute -top-[13px] -right-[11px] bg-black p-2 rounded-full"
                    onClick={closeModal}
                    style={MODAL_STYLES.button}
                >
                    <FaTimes className="text-[#ffff] text-[20px]" />
                </button>
            </div>
        </div>
    );

    const renderBusinessModal = () => (
        <div
            className="site-modal-outer site-info-modal bus-type-modal"
            style={MODAL_STYLES.backdrop}
        >
            <div
                className="site-modal-inner business-type-dailog-box--card"
                onClick={handleModalContentClick}
                style={MODAL_STYLES.content}
            >
                <p className="business-type-dailog-box--card__text-strong mb-4">
                    Is this going to be a regular service?
                </p>
                <p className="business-type-dailog-box--card__text">
                    If so, then please click <span>&apos;Yes&apos;</span>.
                </p>
                <p className="business-type-dailog-box--card__text-strong mb-4">
                    If not and it is only going to be for a once off special event e.g.
                    School Fete or after hours Function
                </p>
                <p className="business-type-dailog-box--card__text">
                    then please click <span>&apos;No&apos;</span>.
                </p>
                <div className="business-type-dailog-box--card__btn-wrap">
                    <button
                        className="btn-gold-alt btn-location-submit btn-yes"
                        onClick={handleYesClick}
                        style={MODAL_STYLES.button}
                    >
                        Yes
                    </button>
                    <button
                        className="btn-black btn-location-submit btn-no"
                        onClick={handleNoClick}
                        style={MODAL_STYLES.button}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );

    // Render appropriate modal based on type
    const modalRenderers = {
        [MODAL_TYPES.THANKYOU]: renderThankYouModal,
        [MODAL_TYPES.BUSINESS]: renderBusinessModal,
    };

    const ModalRenderer = modalRenderers[type];
    return ModalRenderer ? <ModalRenderer /> : null;
}