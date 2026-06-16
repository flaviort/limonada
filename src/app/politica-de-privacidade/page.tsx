// libraries
import Image from 'next/image'

// components
import BannerInternal from '@/components/BannerInternal'
import MultiText from '@/components/PortfolioBlocks/MultiText'
import BigNumbers from '@/components/BigNumbers'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import Video from '@/components/Video'
import StaggerScale from '@/components/Utils/Animations/StaggerScale'

// utils
import { logos } from '@/utils/logos'

export const metadata = {
	title: 'Política de Privacidade',
	description: 'Política de Privacidade da Agência Esfera',
	canonical: '/politica-de-privacidade'
}

export default function Privacy() {
    return (
        <main>

            <BannerInternal
                image='/img/green.jpg'
                subtitle='Política de Privacidade'
                title='Compromisso e transparência no tratamento das informações'
            >
                <p className='text-20 leading-loose! text-white'>
                    Esta Política de Privacidade descreve como os dados são coletados, utilizados, armazenados e protegidos, em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018), assegurando a confidencialidade, a integridade, a transparência e o respeito aos direitos dos titulares em todas as etapas do tratamento das informações.
                </p>
            </BannerInternal>

            <MultiText
                title='Política de Segurança da Informação e Proteção de Privacidade'
                subTitle='1. Objetivo'
                className='pt-16 sm:pt-28 lg:pt-32'
            >
                <p>
                    A Política de Segurança da Informação e Proteção de Privacidade da JB Propaganda e Marketing Ltda tem como objetivo garantir a integridade, confidencialidade e disponibilidade das informações, bem como assegurar a proteção dos dados pessoais tratados pela empresa, em conformidade com a Lei Geral de Proteção de Dados (Lei n° 13.709/2018 - LGPD) e outras legislações aplicáveis.
                </p>
            </MultiText>

            <MultiText
                subTitle='2. Âmbito'
                className='-mt-4 xs:-mt-8 md:-mt-12'
            >
                <p>
                    Esta política se aplica a todos os colaboradores, estagiários, terceiros, fornecedores e parceiros que tenham acesso a informações da JB Propaganda e Marketing Ltda.
                </p>
            </MultiText>

            <MultiText
                subTitle='3. Princípios'
                className='-mt-4 xs:-mt-8 md:-mt-12'
            >
                <ul>

                    <li>
                        <b>Confidencialidade:</b> garantir que as informações sejam acessíveis apenas por pessoas autorizadas.
                    </li>

                    <li>
                        <b>Integridade:</b> assegurar que as informações estejam completas e precisas, protegidas contra alterações não autorizadas.
                    </li>

                    <li>
                        <b>Disponibilidade:</b> garantir que as informações estejam disponíveis quando necessário para os processos de negócio.
                    </li>

                    <li>
                        <b>Legalidade:</b> tratar os dados pessoais em conformidade com a legislação vigente.
                    </li>

                    <li>
                        <b>Transparência:</b> manter uma comunicação clara e transparente sobre o tratamento de dados pessoais.
                    </li>

                    <li>
                        <b>Minimização de Dados:</b> garantir que os dados pessoais coletados sejam adequados, relevantes e limitados ao necessário em relação às finalidades para as quais são tratados.
                    </li>

                    <li>
                        <b>Qualidade dos Dados:</b> assegurar que os dados pessoais sejam exatos e, quando necessário, atualizados.
                    </li>

                </ul>
            </MultiText>

            <MultiText
                subTitle='4. Diretrizes'
                className='-mt-4 xs:-mt-8 md:-mt-12'
            >
                <p>
                    <b>Classificação da Informação</b><br />
                    As informações devem ser classificadas de acordo com o seu nível de sensibilidade: Confidencial, Interna e Pública.
                </p>

                <p>
                    <b>Controle de Acesso</b><br />
                    O acesso às informações deve ser restrito aos colaboradores que necessitam da informação para o desempenho de suas funções. O acesso deve ser controlado por senhas fortes e mecanismos de autenticação.
                </p>

                <p>
                    <b>Tratamento de Dados Pessoais</b>
                </p>

                <ul className='-mt-7'>

                    <li>
                        <b>Coleta:</b> Os dados pessoais devem ser coletados de forma mínima, necessária e adequada para as finalidades específicas.
                    </li>

                    <li>
                        <b>Uso:</b> Os dados pessoais devem ser utilizados apenas para as finalidades informadas e consentidas pelos titulares.
                    </li>

                    <li>
                        <b>Armazenamento:</b> Os dados pessoais devem ser armazenados de forma segura, protegidos contra acesso, alteração ou divulgação não autorizados.
                    </li>

                    <li>
                        <b>Compartilhamento:</b> O compartilhamento de dados pessoais com terceiros deve ser realizado somente com o consentimento do titular ou conforme permitido por lei.
                    </li>

                    <li>
                        <b>Retenção e Eliminação:</b> Os dados pessoais devem ser mantidos apenas pelo tempo necessário para as finalidades para as quais foram coletados, sendo eliminados ou anonimizados posteriormente.
                    </li>

                    <li>
                        <b>Direitos dos Titulares:</b> Assegurar os direitos dos titulares de dados, conforme disposto na LGPD, incluindo acesso, correção, eliminação e portabilidade dos dados.
                    </li>

                </ul>

                <p>
                    <b>Segurança da Informação</b>
                </p>

                <ul className='-mt-7'>

                    <li>
                        <b>Backup:</b> Realizar backups regulares das informações críticas e armazená-los de forma segura.
                    </li>

                    <li>
                        <b>Criptografia:</b> Utilizar criptografia para proteger informações sensíveis em trânsito e em repouso.
                    </li>

                    <li>
                        <b>Monitoramento:</b> Implementar mecanismos de monitoramento para detectar e responder a incidentes de segurança.
                    </li>

                    <li>
                        <b>Treinamento:</b> Proporcionar treinamentos regulares aos colaboradores sobre práticas de segurança da informação e proteção de dados pessoais.
                    </li>

                </ul>

            </MultiText>

            <MultiText
                subTitle='5. Direitos dos Titulares de Dados:'
                className='-mt-4 xs:-mt-8 md:-mt-12'
            >

                <p>
                    A JB Propaganda e Marketing Ltda assegura aos titulares de dados os seguintes direitos:
                </p>

                <ul>

                    <li>
                        <b>Confirmação e Acesso:</b> Confirmar a existência de tratamento e acessar os dados pessoais.
                    </li>

                    <li>
                        <b>Correção:</b> Corrigir dados incompletos, inexatos ou desatualizados.
                    </li>

                    <li>
                        <b>Anonimização, Bloqueio ou Eliminação:</b> Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD.
                    </li>

                    <li>
                        <b>Portabilidade:</b> Solicitar a portabilidade dos dados a outro fornecedor de serviço ou produto, mediante requisição expressa.
                    </li>

                    <li>
                        <b>Eliminação:</b> Solicitar a eliminação dos dados pessoais tratados com o consentimento do titular.
                    </li>

                    <li>
                        <b>Informação:</b> Obter informações sobre as entidades públicas e privadas com as quais a JB Propaganda e Marketing Ltda compartilhou seus dados.
                    </li>

                    <li>
                        <b>Revogação do Consentimento:</b> Revogar o consentimento, quando o tratamento for baseado no consentimento.
                    </li>

                </ul>
            </MultiText>

            <MultiText
                subTitle='6. Responsabilidades:'
                className='-mt-4 xs:-mt-8 md:-mt-12'
            >
                <ul>

                    <li>
                        <b>Colaboradores:</b> Devem cumprir esta política e participar dos treinamentos oferecidos.
                    </li>

                    <li>
                        <b>Encarregada de Proteção de Dados (DPO):</b> A Sra. Rosana Nielsen é responsável por monitorar o cumprimento desta política, orientar os colaboradores e servir como ponto de contato com os titulares de dados e a Autoridade Nacional de Proteção de Dados (ANPD).
                    </li>

                    <li>
                        <b>Gestores:</b> Devem assegurar que os processos sob sua responsabilidade estejam em conformidade com esta política e proporcionar os recursos necessários para sua implementação.
                    </li>

                </ul>
            </MultiText>

            <MultiText
                subTitle='7. Violação de Segurança:'
                className='-mt-4 xs:-mt-8 md:-mt-12'
            >
                <p>
                    Qualquer suspeita ou confirmação de violação de segurança da informação ou de dados pessoais deve ser comunicada imediatamente à Encarregada de Proteção de Dados (DPO), que deverá tomar as medidas necessárias para mitigar os danos e notificar a ANPD e os titulares dos dados, conforme exigido pela LGPD.
                </p>
            </MultiText>

            <MultiText
                subTitle='8. Revisão e Atualização:'
                className='-mt-4 xs:-mt-8 md:-mt-12'
            >
                <p>
                    Esta política deve ser revisada e, se necessário, atualizada anualmente ou sempre que houver mudanças significativas nos processos de negócio ou na legislação aplicável.
                </p>
            </MultiText>

            <MultiText
                subTitle='9. Aprovação:'
                className='-mt-4 xs:-mt-8 md:-mt-12'
            >
                <p>
                    Esta política entra em vigor a partir da data de aprovação e é parte integrante de nossa missão de excelência em todas as áreas de nossa atuação.
                </p>
            </MultiText>

            <MultiText>

                <Image
                    src='/img/signature.jpg'
                    alt='Julcio Maron Torres'
                    width={704}
                    height={361}
                    className='block relative z-1 w-60 h-auto -ml-5 sm:-ml-8 md:-ml-10 -mb-26 mix-blend-multiply'
                />

                <p className='relative z-2'>
                    <b>Julcio Maron Torres</b><br /><br />

                    Documento Criado em 03/01/2021<br />
                    Revisado Anualmente | Última Revisão em 21/03/2023
                </p>

            </MultiText>

        </main>
    )
}