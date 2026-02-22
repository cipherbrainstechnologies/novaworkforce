import Link from 'next/link'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { Card } from '@/components/Card'

const articles = [
  { slug: 'india-eor-vs-opening-entity', title: 'India EOR vs Opening an Entity', excerpt: 'When to use an Employer of Record vs setting up your own Indian entity.' },
  { slug: 'common-mistakes-hiring-in-india', title: 'Common Mistakes Hiring in India', excerpt: 'Avoid these pitfalls when building your India team.' },
  { slug: 'eor-pricing-models-explained', title: 'EOR Pricing Models Explained', excerpt: 'Understanding how EOR pricing works and what to look for.' },
]

export default function ResourcesPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold text-text text-center mb-4">
            Resources
          </h1>
          <p className="text-muted text-center max-w-2xl mx-auto">
            Guides and insights for hiring in India.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {articles.map((article) => (
              <Link key={article.slug} href={`/resources/${article.slug}`}>
                <Card>
                  <h2 className="font-semibold text-text text-lg mb-2">{article.title}</h2>
                  <p className="text-muted text-sm">{article.excerpt}</p>
                  <span className="inline-block mt-4 text-primary text-sm font-medium">Read more →</span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
