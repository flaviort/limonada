'use client'

// libraries
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { FormProvider, type RegisterOptions, type SubmitHandler, useForm, useFormContext } from 'react-hook-form'

// components
import Portal from '@/components/Utils/Portal'
import Dialog from '@/components/Dialog'

// svg
import UxCheck from '@/assets/svg/ux/check.svg'
import UxEye from '@/assets/svg/ux/eye.svg'
import UxEyeSlash from '@/assets/svg/ux/eye-slash.svg'
import UxSpinner from '@/assets/svg/ux/spinner.svg'

interface ModalProps {
	id: string
	title: string
	text: string
	onClose: () => void
}

export const Modal = ({
	id,
	title,
	text,
	onClose
}: ModalProps) => {
	return (
		<Portal>
			<Dialog id={id}>
				<div className='text-center'>

					<h2 className='font-heading text-60 uppercase font-semibold tracking-tight'>
						{title}
					</h2>

					<div
						className='text-18 my-6 sm:my-8 block'
						dangerouslySetInnerHTML={{ __html: text }}
					/>

					<button
						className='button button--yellow mx-auto'
						data-dialog-close
						onClick={onClose}
						type='button'
					>
						Fechar
					</button>

				</div>
			</Dialog>
		</Portal>
	)
}

interface FormProps {
	className?: string
	children: React.ReactNode
	endpoint: string
	isFormData?: boolean
	onSuccess: {
		title: string
		text: string
	}
	onError: {
		title: string
		text: string
	}
	clearOnSubmit?: boolean
}

interface FormValues {
	[key: string]: any
}

export const Form = ({
	className,
	children,
	endpoint,
	isFormData,
	onSuccess,
	onError,
	clearOnSubmit,
}: FormProps) => {

	// refs
	const form = useRef<HTMLFormElement>(null)

	// useState to make the Modals visible
	const [renderSuccessModal, setRenderSuccessModal] = useState(false)
	const [renderErrorModal, setRenderErrorModal] = useState(false)

	// close success modal
	const closeSuccessModal = () => {
		setRenderSuccessModal(false)
	}

	// close error modal
	const closeErrorModal = () => {
		setRenderErrorModal(false)
	}

	// form validations
	const methods = useForm({
		criteriaMode: 'all',
		mode: 'all'
	})

	// local state for any global errors
	const [_globalError, setGlobalError] = useState('')

	// submit function
	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		
        // clear any old error messages
		setGlobalError('')

		// fake response timer
		const fakeTimer = 1000

		if (form.current) {
			form.current.setAttribute('data-is-sending', 'true')
			document.dispatchEvent(new Event('formSending'))
		}

		let body

		if (isFormData) {
			const formData = new FormData()

			Object.keys(data).forEach((key) => {
				formData.append(key, data[key])
			})

			body = formData
		} else {
			body = JSON.stringify(data)
		}

		fetch(endpoint, {
			method: 'post',
			body: body
		})
			.then(async (response) => {
				if (!response.ok) {
					// if the response is not ok, we try to parse the error message
					const errBody = await response.json().catch(() => ({}))
					const message = errBody.message || 'Something went wrong'
					throw new Error(message)
				}

				// if response is ok, parse the JSON
				return response.json()
			})

			// if success
			.then((_responseData) => {
				if (onSuccess) {
					setRenderSuccessModal(true)

					setTimeout(() => {
						const dialog = document.getElementById('success') as HTMLDialogElement
						if (dialog) {
							dialog.showModal()
						}

						if (form.current) {
							form.current.setAttribute('data-is-sending', 'false')
							document.dispatchEvent(new Event('formSent'))

							if (clearOnSubmit) {
								form?.current?.reset()
								document.dispatchEvent(new Event('formReset'))
							}
						}
					}, fakeTimer)
				}
			})

			// if error
			.catch((error) => {
				setTimeout(() => {
					setGlobalError(error.message)
				}, fakeTimer)

				if (onError) {
					setRenderErrorModal(true)

					setTimeout(() => {
						const dialog = document.getElementById('error') as HTMLDialogElement
						if (dialog) {
							dialog.showModal()
						}

						if (form.current) {
							form.current.setAttribute('data-is-sending', 'false')
							document.dispatchEvent(new Event('formError'))
						}
					}, fakeTimer)
				}
			})
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className={clsx(
					className,
					'[&[data-is-sending="true"]_[data-submit-text]]:opacity-0 [&[data-is-sending="true"]_[data-submit-spinner]]:opacity-100 [&[data-is-sending="true"]_[data-submit-button]]:pointer-events-none [&[data-is-sending="true"]_[data-submit-button]]:bg-black'
				)}
				ref={form}
				data-is-sending='false'
			>
				{children}
			</form>

			{/*
			<button
				type='button'
				onClick={() => {
					setRenderSuccessModal(true)
					setTimeout(() => {
						const dialog = document.getElementById('success') as HTMLDialogElement
						if (dialog) {
							dialog.showModal()
						}
					}, 100)
				}}
			>
				test Success Modal
			</button>

			<button
				type='button'
				onClick={() => {
					setRenderErrorModal(true)
					setTimeout(() => {
						const dialog = document.getElementById('error') as HTMLDialogElement
						if (dialog) {
							dialog.showModal()
						}
					}, 100)
				}}
			>
				test Error Modal
			</button>
			*/}

			{renderSuccessModal && (
				<Modal
					id='success'
					title={onSuccess.title}
					text={onSuccess.text}
					onClose={closeSuccessModal}
				/>
			)}

			{renderErrorModal && (
				<Modal
					id='error'
					title={onError.title}
					text={onError.text}
					onClose={closeErrorModal}
				/>
			)}

		</FormProvider>
	)
}

interface LabelProps {
    id: string
    label?: string
    required?: boolean
}

export const Label = ({
	id,
    label,
    required
}: LabelProps) => {
	return (
		<label
            className='block text-sm mb-1'
            htmlFor={id}
            data-label
        >

            {label && label}

            {required && (
                <span className='text-red-600'>
                    &nbsp;*
                </span>
            )}

        </label>
	)
}

interface InputProps {
	id: string
	label?: string
	name: string
	hideLabel?: boolean
	type: string
	placeholder: string
	className?: string
	inputClassName?: string
	required?: boolean
	maxLength?: number
	minLength?: number
	hidePasswordToggle?: boolean
	disabled?: boolean
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
	match?: string
}

export const Input = ({
	id,
	label,
	name,
	hideLabel,
	type,
	placeholder,
	className,
	inputClassName,
	required,
	maxLength,
	minLength,
	hidePasswordToggle,
	disabled,
	onChange = () => {},
	onKeyDown,
	match
}: InputProps) => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext()

	// track focus state
	const [isFocused, setIsFocused] = useState(false)

	let validations: RegisterOptions = {
		onChange: (e) => onChange(e),
		required
	}

	if (match) {
		validations.validate = (value) => (
			value === watch(match) || 'Password não confere'
        )
	}

	const text = type === 'password' ? 'password' : 'message'

    validations = {
        ...validations,
        required: required && 'Este campo é obrigatório',
        maxLength: maxLength && {
            value: maxLength,
            message: 'Máximo de caracteres excedido',
        },
        minLength: minLength && {
            value: minLength,
            message: `${text} é muito curto`,
        },
    }

    // add pattern validation for email type
    if (type === 'email') {
        validations = {
            ...validations,
            pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email inválido'
            }
        } as {
            required: string | false | undefined
            maxLength:
                | 0
                | {
                        value: number
                        message: string
                    }
                | undefined
            minLength:
                | 0
                | {
                        value: number
                        message: string
                    }
                | undefined
            pattern: {
                value: RegExp
                message: string
            }
        }
    }

	// track visibility for password fields
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	// decide which input type to use (if 'password', swap to 'text' when toggled)
	const currentInputType = type === 'password' && isPasswordVisible ? 'text' : type

	const handleTogglePassword = () => {
		setIsPasswordVisible(!isPasswordVisible)
	}

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && onKeyDown) {
			onKeyDown(event)
		}
	}

	return (
		<div
			className={clsx(
				'relative block w-full mb-2 sm:mb-4',
				className,
				errors[name] && 'text-red-600 [&_input]:border-red-600'
			)}
			data-form-line
		>

			{!hideLabel && (
				<Label
					id={id}
					label={label}
					required={required}
				/>
			)}

			<div className='relative'>

				<input
					type={currentInputType}
					id={id}
					placeholder={placeholder}
					className={clsx(
                        'block w-full border border-gray-lighter bg-transparent rounded-md text-black p-4 text-ellipsis focus-visible:outline-1 focus-visible:outline-gray-light placeholder:opacity-75',
                        inputClassName
                    )}
					disabled={disabled || false}
					onKeyDown={handleKeyPress}
					onFocus={() => setIsFocused(true)}
					{...register(name, {
						...validations,
						onBlur: () => {
							setIsFocused(false)
						}
					})}
				/>

				{type === 'password' && !hidePasswordToggle && (
					<button
						className='absolute z-2 top-1/2 right-1 -translate-y-1/2 flex items-center justify-center min-w-4 w-4 h-4 text-current'
						onClick={handleTogglePassword}
						type='button'
					>
						{isPasswordVisible ? <UxEyeSlash /> : <UxEye />}
					</button>
				)}

			</div>

			{errors[name] && (
				<p className='text-[.5rem] text-white px-1 py-px absolute z-2 bg-red-600 -bottom-2 right-4 rounded-xs'>
                    {String(errors[name].message)}
                </p>
			)}
		</div>
	)
}

interface TextareaProps {
	id: string
	label?: string
	name: string
	hideLabel?: boolean
	placeholder?: string
	className?: string
	required?: boolean
	maxLength?: number
	minLength?: number
}

export const Textarea = ({
	id,
	label,
	name,
	hideLabel,
	placeholder,
	required,
	minLength,
	maxLength,
	className
}: TextareaProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext() ?? {}

	// track focus state
	const [isFocused, setIsFocused] = useState(false)

	let validations = {}
	
    validations = {
        required: required && 'Este campo é obrigatório',
        maxLength: maxLength && {
            value: maxLength,
            message: `Máximo de caracteres excedido`
        },
        minLength: minLength && {
            value: minLength,
            message: `A mensagem é muito curta`
        }
    }

	return (
		<div
			className={clsx(
				'relative block w-full mb-2 sm:mb-4',
				className,
				errors[name] && 'text-red-600 [&_textarea]:border-red-600'
			)}
		>

            {!hideLabel && (
				<Label
					id={id}
					label={label}
					required={required}
				/>
			)}

			<div className='relative'>
				<textarea
					id={id}
					placeholder={placeholder}
					className='block w-full border border-gray-lighter bg-transparent rounded-md text-black p-4 text-ellipsis focus-visible:outline-1 focus-visible:outline-gray-light placeholder:opacity-75 resize-y min-h-30 h-30'
					onFocus={() => setIsFocused(true)}
					{...register(name, {
						...validations,
						onBlur: () => {
							setIsFocused(false)
						}
					})}
				/>
			</div>

			{errors[name] && (
				<p className='text-[.5rem] text-white px-1 py-px absolute z-2 bg-red-600 -bottom-2 right-4 rounded-xs'>
                    {String(errors[name].message)}
                </p>
			)}
            
		</div>
	)
}

interface CheckboxProps {
	type: 'checkbox' | 'radio'
	id: string
	label: string
	name: string
	className?: string
	required?: boolean
	disabled?: boolean
	checked?: boolean
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	children?: React.ReactNode
}

export const Checkbox = ({
	type,
	id,
	label,
	name,
	className,
	required,
	disabled,
	checked,
	onChange = () => {},
	children
}: CheckboxProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()

	let validations: RegisterOptions = {
		onChange: (e) => onChange(e),
		required
	}

    validations = {
        ...validations,
        required: required && 'Este campo é obrigatório',
    }

	return (
		<div className={clsx(
            'relative block w-full mb-2 sm:mb-4',
            className
        )}>
			<label
				htmlFor={id}
				className='has-[input:checked]:**:data-radio-box:bg-black has-[input:focus]:**:data-radio-box:outline-1 has-[input:focus]:**:data-radio-box:outline-gray-light'
				data-error={!!errors[name]}
				data-label
				data-checkbox
			>
				<input
					type={type}
					id={id}
					className='absolute -z-1 opacity-0'
					defaultChecked={checked}
					disabled={disabled || false}
					value={label}
					{...register(
                        name,
                        { ...validations }
                    )}
				/>

				<span className='flex items-center gap-2 cursor-pointer'>

					<span
                        className='relative flex items-center justify-center w-7 min-w-7 h-7 p-1 border border-gray-lighter rounded-sm text-white'
                        data-radio-box
                    >
						<UxCheck />
					</span>

					{!children && (
						<span
                            className='text-sm leading-snug'
                            data-radio-text
                        >
							{label}
						</span>
					)}

					{children && (
						<span
                            className='text-sm leading-snug'
                            data-radio-text
                        >
							{children}
						</span>
					)}

				</span>
			</label>

			{errors[name] && (
				<p className='text-[.5rem] text-white bg-red-600 px-1 py-px block absolute -bottom-4 sm:-bottom-5 left-0 rounded-xs'>
                    {String(errors[name].message)}
                </p>
			)}

		</div>
	)
}

interface InputHiddenProps {
	name: string
	value: string
	id: string
}

export const InputHidden = ({ name, value, id }: InputHiddenProps) => {
	const { register } = useFormContext() ?? {}

	return (
        <input
            type='hidden'
            id={id}
            value={value}
            {...register(name)}
        />
    )
}

interface SubmitProps {
	text: string
	className?: string
	disabled?: boolean
	onClick?: () => void
}

export const Submit = ({
	text,
	className,
	disabled,
	onClick
}: SubmitProps) => {
	return (
		<button
			className={clsx(
				className,
				'button button--yellow'
			)}
			type='submit'
			disabled={disabled}
			onClick={onClick}
			data-submit-button
		>
			<span data-submit-text>
				{text}
			</span>

			<span
                className='absolute inset-0 z-2 opacity-0 text-yellow p-3'
                data-submit-spinner
            >
				<UxSpinner
					className='w-full h-full animate-spin'
					style={{
						animationDuration: '.4s'
					}}
				/>
			</span>

		</button>
	)
}