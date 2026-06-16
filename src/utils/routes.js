// svg
import Facebook from '@/assets/svg/social/facebook.svg'
import Linkedin from '@/assets/svg/social/linkedin.svg'
import Instagram from '@/assets/svg/social/instagram.svg'

// pages
export const pages = {
	home: '/',

	// regular pages
	about: '/sobre',
	services: '/sobre#servicos',
	portfolio: '/portfolio',
	portfolio_inner: '/portfolio/inner',
	contact: '/contato',

	// privacy
	privacy: '/politica-de-privacidade',

	// others
	error: '/404'
}

// social
export const social = {
	facebook: 'https://facebook.com/AgenciaEsfera/',
	linkedin: 'https://linkedin.com/company/agencia-esfera',
	instagram: 'https://instagram.com/agencia_esfera/'
}

// contact
export const contact = {
	phone: '(41) 3340-4300',
	email: 'administrativo@agenciaesfera.com.br',
	address: 'Av. Rep. Argentina, 1228 - Sala 2210 - Vila Izabel, Curitiba - PR, 80610-260',
	gmaps: 'https://maps.app.goo.gl/Sg1E92zC1FYNJMYx7'
}

// social links
export const socialLinks = [
	{
		icon: Instagram,
		name: 'Instagram',
		href: social.instagram
	},
	{
		icon: Facebook,
		name: 'Facebook',
		href: social.facebook
	},
	{
		icon: Linkedin,
		name: 'Linkedin',
		href: social.linkedin
	}
]