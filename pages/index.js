import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()
  const { query, isReady } = router
  const [budget, setBudget] = useState()
  const [budgetAnnuel, setBudgetAnnuel] = useState()
  const [date, setDate] = useState()
  const [start, setStart] = useState()
  const [startup, setStartup] = useState()
  const [startupId, setStartupId] = useState()

  useEffect(() => {
      if (isReady) {
        const { budget, date, start, startup, startupId } = query
        const budgetValue = parseInt(budget)
        setBudget(budgetValue.toLocaleString())

        const asOfDate = new Date(date)
        setDate(asOfDate.toLocaleDateString("fr-fr", { month: "long", year: "numeric"}))

        setStartup(startup)
        setStartupId(startupId)
        
        if (start) {
          const startDate = new Date(start)
          setStart(startDate.toLocaleDateString("fr-fr", { month: "long", year: "numeric"}))

          const years = Math.max(1, (asOfDate - startDate) / 1000 / 60 / 60 / 24 / 365)
          setBudgetAnnuel((Math.round(budget/years/ 1000) * 1000).toLocaleString())
        }
      }
  }, [isReady, query])

  return (
    <div className={styles.container}>
      <Head>
        <title>Budget d’une Startup d’État</title>
        <meta name="description" content="Publication des budgets des Startup d’État" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {isReady && startup ? (
          <>
            <h1 className={styles.title}>
              Quel est le budget de<br/>la Startup d’État<br/><a
              href={`https://beta.gouv.fr/startups/${startupId}.html`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {startup}
            </a> ?
            </h1>

            <div className={styles.content}>
              <p className={styles.description}>
                La startup d’État {startup} a été lancée en {start}.
              </p>
              <p className={styles.description}>
                Au mois de {date}, le budget de cette équipe s’élevait à {budget} €.
              </p>
              { start &&
                <p className={styles.description}>
                  Cela représente {budgetAnnuel} € / an.
                </p>
              }
            </div>

            <div className={styles.grid}>
              <a href={`https://beta.gouv.fr/startups/${startupId}.html`} target="_blank"
              rel="noopener noreferrer" className={styles.card}>
                <h2>{startup} &rarr;</h2>
                <p>En savoir sur le problème à résoudre, l’approche choisie.</p>
              </a>

              <a href="https://pad.incubateur.net/s/qeT5bzHUM" target="_blank"
              rel="noopener noreferrer" className={styles.card}>
                <h2>La transparence financière &rarr;</h2>
                <p>Pourquoi est-ce important de rendre public les ressources des équipes.</p>
              </a>
            </div>
          </>
        ) : (
          <>
          <h1 className={styles.title}>Transparence financière<br/>des Startups d’État</h1>
          <div className={styles.content}>
            <p className={styles.description}>
              Les équipes de Startup d’État sont incitées à publier leur budget.
            </p>
          </div>

          <div className={styles.grid}>
            <a href="https://beta.gouv.fr/startups/" target="_blank"
            rel="noopener noreferrer" className={styles.card}>
              <h2>En savoir plus &rarr;</h2>
              <p>Accéder à la liste des Startups d’État.</p>
            </a>
          </div>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://beta.gouv.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          beta.gouv.fr
        </a>
        <a
          href="https://github.com/betagouv/budget-show"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code source
        </a>
      </footer>
    </div>
  )
}
