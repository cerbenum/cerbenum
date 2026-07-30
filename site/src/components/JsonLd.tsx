export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is built from local, static data only.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
