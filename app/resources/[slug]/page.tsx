import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { getResourceBySlug } from '@/content/resources'

interface PageProps {
  params: { slug: string }
}

export default function ResourcePage({ params }: PageProps) {
  const resource = getResourceBySlug(params.slug)
  if (!resource) notFound()

  return (
    <>
      <Section className="pt-16 md:pt-24">
        <Container>
          <Link href="/resources" className="text-muted hover:text-text text-sm mb-6 inline-block">
            ← Back to Resources
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
            {resource.title}
          </h1>
          <p className="text-muted text-lg">{resource.excerpt}</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <article className="max-w-3xl mx-auto prose prose-invert prose-muted">
            <div className="text-muted leading-relaxed whitespace-pre-line">
              {resource.content}
            </div>
          </article>
        </Container>
      </Section>
    </>
  )
}
