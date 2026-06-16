import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
	throw new Error('RESEND_API_KEY is not defined')
}

const resend = new Resend(process.env.RESEND_API_KEY)

const getDestinationEmail = (): string => {
	return 'administrativo@agenciaesfera.com.br'
}

const IGNORED_FIELDS = ['form', 'company'] // company = honeypot

const normalizeValue = (value: unknown): string => {
	if (typeof value === 'string') return value
	if (typeof value === 'number' || typeof value === 'boolean') return String(value)
	return JSON.stringify(value)
}

export async function POST(req: Request) {
	try {
		const body = await req.json()

		// honeypot (anti-spam)
		if (body.company) {
			return new Response(
				JSON.stringify({ status: 'success' }),
				{ status: 200 }
			)
		}

		if (!body.Email) {
			return new Response(
				JSON.stringify({
					status: 'error',
					error: 'Email é obrigatório',
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			)
		}

		const destinationEmail = getDestinationEmail()

		const keyValuePairs = Object.entries(body).filter(
			([key]) => !IGNORED_FIELDS.includes(key)
		)

		const formattedData = keyValuePairs
			.map(
				([key, value]) => `
					<tr style="vertical-align: top;">
						<td style="padding: 10px; border: 1px solid #ccc; background-color: #f2f2f2; font-size: 14px; line-height: 1.25; color: #030304;">
							<strong>${key}:</strong>
						</td>
						<td style="padding: 10px; border: 1px solid #ccc; font-size: 14px; line-height: 1.25; color: #030304;">
							${normalizeValue(value)}
						</td>
					</tr>
				`
			)
			.join('')

		const htmlMessage = `
			<div style="background-color: #f2f2f2; padding: 50px 20px; font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;">
				<div style="margin: auto; background-color: #fff; padding: 40px; width: 520px; max-width: 100%;">
					<p style="font-size: 18px; color: #030304;">
						<strong>Agência Esfera</strong>
					</p>

					<hr /><br />

					<table style="border-collapse: collapse; width: 100%;" cellspacing="0" cellpadding="0">
						<tbody>
							${formattedData}
						</tbody>
					</table>
				</div>
			</div>
		`

		const textMessage = keyValuePairs
			.map(([key, value]) => `${key}: ${normalizeValue(value)}`)
			.join('\n')

		const { error } = await resend.emails.send({
			from: 'Agência Esfera <administrativo@agenciaesfera.com.br>',
			//from: 'onboarding@resend.dev',
			to: [destinationEmail],
			replyTo: body.Email,
			subject: 'Mensagem enviada de Formulário de Contato',
			html: htmlMessage,
			text: textMessage,
		})

		if (error) {
			console.error('Error sending email:', error)
			return new Response(
				JSON.stringify({
					status: 'error',
					error: 'Erro ao enviar email',
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				}
			)
		}

		return new Response(
			JSON.stringify({ status: 'success' }),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		)
	} catch (error) {
		console.error('Unexpected error:', error)

		return new Response(
			JSON.stringify({
				status: 'error',
				error: 'Erro inesperado ao processar a solicitação',
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		)
	}
}