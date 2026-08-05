<template>
  <section class="project-presentation">
    <div class="project-presentation__container">
      <!-- Introduction -->
      <header class="project-presentation__header">
        <p class="project-presentation__eyebrow">
          Projet personnalisé
        </p>

        <h2 class="project-presentation__title">
          Réserver un projet de tatouage
        </h2>

        <div class="project-presentation__divider"></div>

        <div class="project-presentation__intro">
          <p class="project-presentation__lead">
            Tatouage réaliste noir et gris et flash, Plaisance-du-touch.
          </p>
          <p>
            Chaque projet est conçu pour s'intégrer naturellement au corps,
            avec une attention particulière portée à la structure, aux volumes
            et à la longévité.
          </p>
        </div>
      </header>

      <!-- Étapes -->
      <div class="project-presentation__process">
        <div class="project-presentation__section-heading">
          <p class="project-presentation__section-number">
            01
          </p>

          <h3>
            Comment réserver
          </h3>
        </div>

        <div class="project-presentation__steps">
          <article
            v-for="step in steps"
            :key="step.number"
            class="project-step"
          >
            <div class="project-step__number">
              {{ step.number }}
            </div>

            <div class="project-step__content">
              <h4 class="project-step__title">
                {{ step.title }}
              </h4>

              <p class="project-step__description">
                {{ step.description }}
              </p>

              <p
                v-if="step.secondaryText"
                class="project-step__secondary"
              >
                {{ step.secondaryText }}
              </p>
            </div>
          </article>
        </div>
      </div>

      <!-- Appel à l'action -->
      <div class="project-presentation__cta">
        <div class="project-presentation__section-heading">
          <p class="project-presentation__section-number">
            02
          </p>

          <h3>
            Démarrer mon projet
          </h3>
        </div>

        <div class="project-presentation__cta-content">
          <p>
            Cliquez ci-dessous pour déposer votre projet.
          </p>

          <button
            type="button"
            class="project-presentation__button"
            @click="scrollToBookingForm"
          >
            <span>Soumettre un projet</span>

            <span
              class="project-presentation__button-arrow"
              aria-hidden="true"
            >
              ↘
            </span>
          </button>

          <div class="project-presentation__cta-details">
            <p>
              Le formulaire vous permet de décrire votre idée en détail et
              d’envoyer vos références.
            </p>

            <p>
              Chaque demande est étudiée personnellement.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
  import { useRouter } from "vue-router"

  const router = useRouter()

  const steps = [
    {
      number: "01",
      title: "Demande de projet",
      description:
        "Remplissez le formulaire avec votre idée et vos références.",
    },
    {
      number: "02",
      title: "Appel de consultation",
      description:
        "Un échange permet de définir la composition, la taille et le placement.",
    },
    {
      number: "03",
      title: "Design et planification",
      description:
        "Chaque projet est unique et conçu sur-mesure.",
      secondaryText:
        "Le tarif dépend de la taille et de la complexité du projet.",
    },
    {
      number: "04",
      title: "Séances de tatouage",
      description:
        "Les grands projets sont réalisés sur plusieurs séances pour respecter la peau et garantir une qualité durable.",
    },
  ]

  const scrollToBookingForm = () => {
    router.push("/booking")
    // const bookingForm = document.querySelector("#booking-form")

    // bookingForm?.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    // })
  }
</script>

<style scoped>
.project-presentation {
  --background-color: #111111;
  --surface-color: #181818;
  --border-color: rgba(255, 255, 255, 0.14);
  --primary-color: #f4f1eb;
  --secondary-color: #a8a8a8;
  --accent-color: #d9c4a3;

  width: 100%;
  padding: 96px 24px;
  color: var(--primary-color);
  background:
    radial-gradient(
      circle at top right,
      rgba(217, 196, 163, 0.08),
      transparent 34%
    ),
    var(--background-color);
}

.project-presentation__container {
  width: min(100%, 1100px);
  margin: 0 auto;
}

.project-presentation__header {
  max-width: 800px;
}

.project-presentation__eyebrow {
  margin: 0 0 18px;
  color: var(--accent-color);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.project-presentation__title {
  max-width: 800px;
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.7rem, 7vw, 6.4rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}

.project-presentation__divider {
  width: 100%;
  height: 1px;
  margin: 44px 0;
  background-color: var(--border-color);
}

.project-presentation__intro {
  display: grid;
  max-width: 720px;
  gap: 16px;
  color: var(--secondary-color);
  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.8;
}

.project-presentation__intro p {
  margin: 0;
}

.project-presentation__intro .project-presentation__lead {
  color: var(--primary-color);
  font-size: clamp(1.2rem, 2.5vw, 1.55rem);
}

.project-presentation__process,
.project-presentation__cta {
  display: grid;
  grid-template-columns: minmax(180px, 0.75fr) minmax(0, 2fr);
  gap: 60px;
  padding-top: 110px;
}

.project-presentation__section-heading {
  align-self: start;
  position: sticky;
  top: 30px;
}

.project-presentation__section-number {
  margin: 0 0 18px;
  color: var(--accent-color);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
}

.project-presentation__section-heading h3 {
  max-width: 220px;
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  line-height: 1.5;
  text-transform: uppercase;
}

.project-presentation__steps {
  border-top: 1px solid var(--border-color);
}

.project-step {
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr);
  gap: 28px;
  padding: 38px 0;
  border-bottom: 1px solid var(--border-color);
}

.project-step__number {
  padding-top: 5px;
  color: var(--accent-color);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1rem;
}

.project-step__content {
  max-width: 620px;
}

.project-step__title {
  margin: 0 0 15px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.45rem, 3vw, 2.3rem);
  font-weight: 400;
  line-height: 1.1;
}

.project-step__description,
.project-step__secondary {
  margin: 0;
  color: var(--secondary-color);
  font-size: 1rem;
  line-height: 1.75;
}

.project-step__secondary {
  margin-top: 10px;
}

.project-presentation__cta {
  align-items: start;
}

.project-presentation__cta-content {
  padding: 45px;
  border: 1px solid var(--border-color);
  background-color: var(--surface-color);
}

.project-presentation__cta-content > p {
  margin: 0 0 30px;
  color: var(--primary-color);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.2;
}

.project-presentation__button {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 24px;
  border: 1px solid var(--primary-color);
  color: var(--background-color);
  background-color: var(--primary-color);
  cursor: pointer;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-align: left;
  text-transform: uppercase;
  transition:
    color 180ms ease,
    background-color 180ms ease,
    transform 180ms ease;
}

.project-presentation__button:hover {
  color: var(--primary-color);
  background-color: transparent;
  transform: translateY(-2px);
}

.project-presentation__button-arrow {
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1;
}

.project-presentation__cta-details {
  display: grid;
  gap: 10px;
  margin-top: 28px;
  color: var(--secondary-color);
  font-size: 0.95rem;
  line-height: 1.7;
}

.project-presentation__cta-details p {
  margin: 0;
}

@media (max-width: 800px) {
  .project-presentation {
    padding: 70px 20px;
  }

  .project-presentation__process,
  .project-presentation__cta {
    grid-template-columns: 1fr;
    gap: 35px;
    padding-top: 80px;
  }

  .project-presentation__section-heading {
    position: static;
  }

  .project-presentation__section-heading h3 {
    max-width: none;
  }

  .project-presentation__cta-content {
    padding: 32px 25px;
  }
}

@media (max-width: 520px) {
  .project-presentation {
    padding-inline: 16px;
  }

  .project-presentation__title {
    font-size: clamp(2.4rem, 14vw, 4rem);
  }

  .project-step {
    grid-template-columns: 48px minmax(0, 1fr);
    gap: 15px;
    padding: 30px 0;
  }

  .project-presentation__cta-content {
    padding: 26px 20px;
  }

  .project-presentation__button {
    padding: 18px;
    font-size: 0.7rem;
  }
}
</style>