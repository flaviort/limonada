'use client'

// libraries
import clsx from 'clsx'
import { useEffect } from 'react'

// svg
import UxClose from '@/assets/svg/ux/close.svg'

interface DialogProps {
    className?: string
    children: React.ReactNode
    id: string
}

export default function Dialog({
    className,
    children,
    id
}: DialogProps) {

    const closeDialog = () => {
        const dialog = document.getElementById(id) as HTMLDialogElement

        if (dialog) {
            dialog.close()
           
            // check if there are any other opn dialogs
            const openDialogs = document.querySelectorAll('dialog[open')

            if (openDialogs.length === 0) {
                document.body.classList.remove('no-scroll')
            }
        }
    }

    // check if the dialog is open
    useEffect(() => {
        const dialog = document.getElementById(id) as HTMLDialogElement

        if (dialog) {
            const observer = new MutationObserver((mutationsList) => {
                mutationsList.forEach((mutation) => {
                    if (mutation.attributeName === 'open') {
                        if (dialog.open) {
                            document.body.classList.add('no-scroll')
                        } else {
                            const openDialogs = document.querySelectorAll('dialog[open]')

                            if (openDialogs.length === 0) {
                                document.body.classList.remove('no-scroll')
                            }
                        }
                    }
                })
            })

            observer.observe(dialog, { attributes: true })

            return () => {
                observer.disconnect()

                const openDialogs = document.querySelectorAll('dialog[open]')

                if (openDialogs.length === 0) {
                    document.body.classList.remove('no-scroll')
                }
            }
        }
    }, [id])

    // add effect to handle elements with data-dialog-close
    useEffect(() => {
        const dialog = document.getElementById(id) as HTMLDialogElement
        
        const closeButtons = dialog?.querySelectorAll('[data-dialog-close]')

        const handleClick = (event: Event) => {
            const targetButton = event.currentTarget as HTMLElement
            const closestDialog = targetButton.closest('dialog') as HTMLDialogElement

            if (closestDialog && closestDialog.open) {
                closestDialog.close()
                const openDialogs = document.querySelectorAll('dialog[open]')

                if (openDialogs.length === 0) {
                    document.body.classList.remove('no-scroll')
                }
            }
        }

        closeButtons?.forEach(button => {
            button.addEventListener('click', handleClick)
        })

        return () => {
            closeButtons?.forEach(button => {
                button.removeEventListener('click', handleClick)
            })

            const openDialogs = document.querySelectorAll('dialog[open]')

            if (openDialogs.length === 0) {
                document.body.classList.remove('no-scroll')
            }
        }
    }, [id])

    // backdrop click
    const handleBackdropClick = (event: React.MouseEvent<HTMLElement>) => {
        const dialogElement = event.currentTarget

        if (event.target === dialogElement) {
            closeDialog()

            const openDialogs = document.querySelectorAll('dialog[open]')

            if (openDialogs.length === 0) {
                document.body.classList.remove('no-scroll')
            }
        }
    }

    // open popups
    useEffect(() => {
        const dialogTriggers = document.querySelectorAll('[data-dialog]')

        dialogTriggers.forEach(trigger => {
            trigger.addEventListener('click', (event) => {
                event.preventDefault()
                document.body.classList.add('no-scroll')

                const dialogId = (trigger.getAttribute('href') as string).substring(1)

                const dialog = document.getElementById(dialogId)
                
                if (dialog && (dialog as HTMLDialogElement).showModal) {
                    (dialog as HTMLDialogElement).showModal()
                }
            })
        })
    }, [])

    return (
        <dialog
            className={clsx(
            'fixed z-99999 m-0 p-0 inset-0 border-none opacity-0 invisible bg-transparent flex content-center items-center justify-center w-full max-w-full h-full max-h-full transition-opacity duration-300 ease-in-out',
            'open:opacity-100 open:visible',
            'open:[&_.backdrop]:opacity-100',
            'backdrop:hidden',
            className)}
            id={id}
        >

            <div
                className='backdrop fixed z-0 top-0 left-0 w-full h-full bg-black/80 opacity-0 transition-opacity duration-300 ease-in-out'
                onClick={handleBackdropClick}
            />

            <div className='relative z-2 bg-white py-12 md:py-14 px-8 sm:px-10 md:px-20 w-160 max-w-[calc(100%-2rem)] rounded-md'>

                <button
                    data-dialog-close
                    className='absolute cursor-pointer z-2 top-4 md:top-6 right-4 md:right-6 flex items-center justify-center w-4 h-4 hover:rotate-180 transition-transform duration-300 ease-in-out'
                >
                    <UxClose className='w-full h-full' />
                </button>

                <div>
                    {children}
                </div>

            </div>
        </dialog>
    )
}