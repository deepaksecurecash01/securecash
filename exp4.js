// FIXED: CheckboxGroupInput in SpecializedInputs.js
export const CheckboxGroupInput = forwardRef(({
	value,
	onChange,
	onBlur,
	onFocus,
	options = [],
	name,
	theme = 'dark',
	hasError = false,
	isFocused = false,
	variant = 'horizontal',
	label,
	footnote,
	disabled = false,
	currentErrorField,
	setCurrentErrorField,
	...props
}, ref) =>
{
	const themeConfig = THEMES[theme];

	// Legacy theme rendering with clean focus management
	if (theme === 'legacy-hazard') {
		return (
			<div className={themeConfig.checkboxGroupContainer}>
				<FaCircle className={themeConfig.bulletPoint} />
				<div className={themeConfig.contentWrapper}>
					<label className={themeConfig.label}>
						{label}
					</label>
					<div className={themeConfig.checkboxGroupWrapper}>
						{options.map((option, index) => (
							<LegacyCheckbox
								key={index}
								inputRef={index === 0 ? ref : null}
								label={option.label}
								value={option.value}
								name={name}
								checked={(value || []).includes(option.value)}
								onChange={(e) =>
								{
									const currentValues = value || [];
									const newValues = e.target.checked
										? [...currentValues, option.value]
										: currentValues.filter(val => val !== option.value);
									onChange(newValues);
								}}
								onFocus={onFocus}
								onBlur={onBlur}
								disabled={disabled}
								currentErrorField={currentErrorField}
								setCurrentErrorField={setCurrentErrorField}
								className={themeConfig.checkboxItem}
							/>
						))}
					</div>
					{footnote && (
						<p className={themeConfig.checkboxGroupFootnote} style={{ textAlign: "left" }}>
							{footnote}
						</p>
					)}
				</div>
			</div>
		);
	}

	// Standard theme rendering (including ICA)
	const getLayoutConfig = (variant) =>
	{
		switch (variant) {
			case 'grid':
				return {
					container: "text-left relative",
					wrapper: "chkbox-container w-full mx-auto text-left relative chkbox-grid grid grid-flow-col place-content-around 1366px:place-content-between grid-rows-5 600px:grid-rows-3",
					warningPosition: "top-[142px]"
				};
			case 'site-grid':
				return {
					container: "text-left relative",
					wrapper: "chkbox-container w-full mx-auto text-left relative chkbox-grid grid grid-flow-col place-content-around gap-1 1366px:place-content-between grid-rows-5 600px:grid-rows-4",
					warningPosition: "top-[142px]"
				};
			case 'agreement':
				return {
					container: "text-left relative ",
					wrapper: "control-wrapper relative w-full flex flex-row justify-left items-center mt-2",
					warningPosition: "top-12 left-[58px]"
				};
			case 'horizontal':
			default:
				return {
					container: "text-left relative",
					wrapper: "control-wrapper relative flex flex-row justify-around items-center w-full mt-2",
					warningPosition: "top-12 left-[58px]"
				};
		}
	};

	const layoutConfig = getLayoutConfig(variant);

	return (
		<div className={layoutConfig.container}>
			<div className={layoutConfig.wrapper}>
				{options.map((option, index) => (
					<Checkbox
						key={index}
						inputRef={index === 0 ? ref : null}
						label={option.label}
						value={option.value}
						name={name}
						theme={theme}
						register={() => ({
							name,
							onChange: (e) =>
							{
								const currentValues = value || [];
								const newValues = e.target.checked
									? [...currentValues, option.value]
									: currentValues.filter(val => val !== option.value);
								onChange(newValues);
							},
							checked: (value || []).includes(option.value)
						})}
						// FIXED: Pass these props properly - they will be handled by the fixed Checkbox component
						currentErrorField={currentErrorField}
						setCurrentErrorField={setCurrentErrorField}
						// FIXED: Also pass focus handlers properly
						onFocus={onFocus}
						onBlur={onBlur}
						className="chkbox float-left text-left relative"
						// FIXED: Don't spread props here as they might contain React-specific props
						disabled={disabled}
					/>
				))}
			</div>
		</div>
	);
});

// FIXED: LegacyCheckbox Component - No changes needed as it already handles props correctly
const LegacyCheckbox = ({
	value,
	className = "",
	inputRef,
	style = {},
	label,
	name,
	checked,
	onChange,
	onFocus,
	onBlur,
	disabled = false,
	currentErrorField,
	setCurrentErrorField,
}) =>
{
	const [isActive, setIsActive] = useState(false);

	const handleFocus = () =>
	{
		setIsActive(true);
		if (onFocus) onFocus();
	};

	const handleBlur = (e) =>
	{
		setIsActive(false);
		if (onBlur) onBlur(e);
		if (currentErrorField === name && setCurrentErrorField) {
			setCurrentErrorField(null);
		}
	};

	const handleChange = (e) =>
	{
		if (onChange) onChange(e);
	};

	return (
		<div className={`${className} ${styles.checkbox}`} style={style}>
			<input
				type="checkbox"
				name={value}
				value={value}
				checked={checked}
				ref={inputRef}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				data-validate="CheckboxMulti"
				className="text-sm p-2.5 shadow-none font-montserrat border-none w-[28px] h-[28px] opacity-0 absolute z-40 peer"
				disabled={disabled}
			/>
			<label
				className="font-light text-left w-full relative flex cursor-pointer"
				htmlFor={value}
			>
				<span className="w-[28px] h-[28px]"></span>
				<div>{label}</div>
			</label>
		</div>
	);
};

// FIXED: Main Checkbox Component (in separate Checkbox.js file)
import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({
	value,
	className = "",
	inputRef,
	style = {},
	register,
	label,
	name,
	theme = 'dark',
	// FIXED: Extract React-specific props to prevent DOM warnings
	currentErrorField,
	setCurrentErrorField,
	onFocus,
	onBlur,
	disabled = false,
	// Extract any other props that shouldn't go to DOM
	...restProps
}) =>
{
	const checkboxProps = register ? register(name) : {};

	// Theme-based label styling
	const getLabelClasses = (theme) =>
	{
		switch (theme) {
			case 'light':
				return `font-medium inline-block mt-4 text-left w-full relative cursor-pointer text-primary-text`;
			case 'ica':
				return `font-medium text-left w-full relative flex`;
			case 'dark':
			default:
				return `text-white text-base inline-block mb-2 text-left mt-[10px] w-full relative`;
		}
	};

	// FIXED: Handle focus/blur with extracted props
	const handleFocus = (e) =>
	{
		if (setCurrentErrorField) {
			setCurrentErrorField(name);
		}
		if (onFocus) {
			onFocus(e);
		}
	};

	const handleBlur = (e) =>
	{
		if (setCurrentErrorField) {
			setCurrentErrorField(null);
		}
		if (onBlur) {
			onBlur(e);
		}
	};

	return (
		<div className={`${className} ${styles.checkbox}`} style={style}>
			<input
				type="checkbox"
				name={value}
				ref={inputRef}
				value={value}
				{...checkboxProps}
				onFocus={handleFocus}
				onBlur={handleBlur}
				data-validate="CheckboxMulti"
				className="mt-2 text-sm p-2.5 shadow-none font-montserrat border-none w-[28px] h-[28px] opacity-0 absolute z-40 peer"
				disabled={disabled}
			// FIXED: Don't spread restProps to avoid passing React-specific props to DOM
			// Only spread specific DOM attributes if needed
			/>
			<label
				className={getLabelClasses(theme)}
				htmlFor={value}
			>
				<span className="w-[28px] h-[28px]"></span>
				{label}
			</label>
		</div>
	);
};

export default Checkbox;