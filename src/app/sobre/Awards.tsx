// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import TextReveal from '@/components/Utils/Animations/TextReveal'
import Accordion from '@/components/Accordion'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'

export default function Awards() {
    return (
        <section className='bg-black py-15 sm:py-20 md:py-25 xl:py-30'>
            <div className='base-container'>

                <h2 className='font-heading uppercase text-100 font-semibold tracking-tighter text-yellow'>
                    <AnimatedText text='Prêmios' />
                </h2>

                <div className='row mt-6 sm:mt-10 lg:mt-20'>

                    <div className='col-lg-4 flex flex-col gap-4 lg:pr-20 mb-10 lg:mb-0'>

                        <TextReveal>
                            <p className='text-18 text-white'>
                                Grandes conquistas rendem uma coleção de memórias únicas - são mais de 30 prêmios em 26 anos de Esfera.
                            </p>
                        </TextReveal>

                        <TextReveal>
                            <p className='text-18 text-yellow'>
                                Conheça nossa estante de troféus!
                            </p>
                        </TextReveal>

                    </div>

                    <div className='col-lg-8'>
                        <StaggerUp>
                            {[
                                {
                                    question: 'Prêmio Caio 2025',
                                    answer: `
                                        <ul>
                                            <li>
                                                Prata em Operação e Produção de Estandes<br />
                                                Case: John Deere na Agrishow 2025
                                            </li>
                                            <li>
                                                Prata em Convenção Regional<br />
                                                Case: Encontro Estadual de Líderes Rurais 2024 | Sistema FAEP/SENAR-PR
                                            </li>
                                            <li>
                                                Prata em Evento Corporativo<br />
                                                Case: John Deere Space
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: '23ª Mostra de Comunicação do Agro - Associação Brasileira de Marketing Rural e Agro (ABMRA)',
                                    answer: `
                                        <ul>
                                            <li>
                                                Bronze em Ações de Dia de Campo<br />
                                                Case: John Deere Space
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Prêmio Caio 2024',
                                    answer: `
                                        <ul>
                                            <li>
                                                Ouro em Convenção Regional<br />
                                                Case: Encontro Estadual de Líderes Rurais 2023 | Sistema FAEP/SENAR-PR
                                            </li>
                                            <li>
                                                Ouro em Evento Promocional<br />
                                                Case: John Deere & Wirtgen Group na M&T Expo 2024
                                            </li>
                                            <li>
                                                Bronze em Convenção Internacional<br />
                                                Case: Dealer Meeting C&F John Deere
                                            </li>
                                            <li>
                                                Bronze em Mostra e Exposição<br />
                                                Case: John Deere na Expoforest 2023
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Prêmio Mais Sustentável by M&T Expo',
                                    answer: `
                                        <ul>
                                            <li>
                                                Vencedores na Categoria C (Estandes acima de 500m²)<br />
                                                Case: Estande John Deere & Wirtgen Group
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Prêmio Achieving Excellence John Deere',
                                    answer: `
                                        <ul>
                                            <li>
                                                Partner Level Performance 2024
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Prêmio Caio 2023',
                                    answer: `
                                        <ul>
                                            <li>
                                                Prata em Soluções Inovadoras e Novas Tecnologias<br />
                                                Case: Experiência Imersiva Agrishow 2023 | John Deere
                                            </li>
                                            <li>
                                                Prata em Convenção Internacional<br />
                                                Case: Planning Week 2023 | John Deere
                                            </li>
                                            <li>
                                                Prata em Convenção Regional<br />
                                                Case: Encontro Estadual de Líderes Rurais 2022 | Sistema FAEP/ SENAR-PR
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: '21ª Mostra de Comunicação do Agro - Associação Brasileira de Marketing Rural e Agro (ABMRA)',
                                    answer: `
                                        <ul>
                                            <li>
                                                Prata em Ações em Feiras, Eventos e Congressos Presenciais<br />
                                                Case: John Deere na Agrishow 2023
                                            </li>
                                            <li>
                                                Prata em Campanhas de valorização do Agro<br />
                                                Case: Agro pela Vida | John Deere
                                            </li>
                                            <li>
                                                Bronze em Ações de “Dia de Campo”<br />
                                                Case: Rally da Cana | John Deere
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Prêmio Achieving Excellence John Deere',
                                    answer: `
                                        <ul>
                                            <li>
                                                Partner Level Performance 2023
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Prêmio Caio 2022',
                                    answer: `
                                        <ul>
                                            <li>
                                                Prata em Evento Promocional<br />
                                                Case: John Deere na Agrishow 2022
                                            </li>
                                            <li>
                                                Prata em Convenção Internacional<br />
                                                Case: Dealer Meeting 2022 - John Deere
                                            </li>
                                            <li>
                                                Prata em Evento de Responsabilidade Social - Prêmio Sustentabilidade<br />
                                                Case: Agro pela Vida - John Deere
                                            </li>
                                            <li>
                                                Bronze em Convenção Internacional<br />
                                                Case: Expo Latin America 2021 - John Deere
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: '20ª Mostra de Comunicação do Agro - Associação Brasileira de Marketing Rural e Agro (ABMRA)',
                                    answer: `
                                        <ul>
                                            <li>
                                                Ouro em Programa e Campanha de Incentivo<br />
                                                Case: Expo Latin America 2021 - John Deere
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Premiação Encontro com Fornecedores John Deere',
                                    answer: `
                                        <ul>
                                            <li>
                                                Fornecedor Partner 2022
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Prêmio Achieving Excellence John Deere',
                                    answer: `
                                        <ul>
                                            <li>
                                                Hall of Fame 2022
                                            </li>
                                            <li>
                                                Partner Level Performance 2022
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Prêmio Caio 2021',
                                    answer: `
                                        <ul>
                                            <li>
                                                Ouro em Evento Artístico<br />
                                                Case: Huawei Music Night 4All
                                            </li>
                                            <li>
                                                Prata em Feira, Exposição, Salão e Mostra B2C<br />
                                                Case: Expofeira Pelotas 2020 - Associação Rural de Pelotas
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Premiação Encontro com Fornecedores John Deere',
                                    answer: `
                                        <ul>
                                            <li>
                                                Fornecedor Partner 2021
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Prêmio Live',
                                    answer: `
                                        <ul>
                                            <li>
                                                Ouro em Agência Regional de Brand Experience
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Prêmio Caio 2020',
                                    answer: `
                                        <ul>
                                            <li>
                                                Ouro em Convenção Regional<br />
                                                Case: Premiação Agrinho 2019 - SENAR-PR
                                            </li>
                                            <li>
                                                Prata em Solução Web<br />
                                                Case: Plataforma Conecta John Deere
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Premiação Encontro com Fornecedores John Deere',
                                    answer: `
                                        <ul>
                                            <li>
                                                Prêmio Colaboração - Excelência em Gestão de Custos 2020
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Prêmio Caio 2019',
                                    answer: `
                                        <ul>
                                            <li>
                                                Prata em Evento Promocional<br />
                                                Case: John Deere e Esfera na M&T Expo 2018
                                            </li>
                                        </ul>
                                    `
                                },
                                {
                                    question: 'Premiação Encontro com Fornecedores John Deere',
                                    answer: `
                                        <ul>
                                            <li>
                                                Fornecedor Partner 2019
                                            </li>
                                        </ul>
                                    `
                                }
                            ].map((item, i) => (
                                <Accordion
                                    key={i}
                                    question={item.question}
                                    answer={item.answer}
                                />
                            ))}
                        </StaggerUp>
                    </div>

                </div>
            </div>
        </section>
    )
}