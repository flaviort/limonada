// format date in US format (MM/DD/YYYY)
export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).replace(/\//g, '.')
}

// format the date and only get the day showing always 2 digits
export function getDay(day: string) {
    return new Date(day).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        day: '2-digit'
    })
}

// format the date and show only the written month
export function getMonth(month: string) {
    return new Date(month).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        month: 'long'
    })
}

// format the date and show only the year
export function getYear(year: string) {
    return new Date(year).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        year: 'numeric'
    })
}

// phone
export function phone(str: string) {
	return (
		'tel:' + str.replace(/[^0-9]/g, '')
	)
}

// email
export function email(str: string) {
	return (
		'mailto:' + str
	)
}

// limit characters
export function limitCharacters(
    text: string,
    limit: number
) {
    if (text.length <= limit) {
        return text
    } else {
        return text.slice(0, limit) + '...'
    }
}

// slugify
export function slugify(str: string) {
    return String(str)
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
}

// get all focusable elements inside the container
export const getFocusableElements = (container: HTMLElement) => {
    return container.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )
}

// get all focusable elements outside the container
export const getFocusableElementsOutside = (container: HTMLElement) => {
    const allFocusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )

    // filter out elements that are inside the container
    return Array.from(allFocusableElements).filter(
        (element) => !container?.contains(element)
    )
}

// first char
export function firstChar(str: string) {
    return str.charAt(0) || ''
}