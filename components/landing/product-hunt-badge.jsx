export function ProductHuntBadge() {
  return (
    <div
      className="fixed z-50 transition-transform hover:-translate-x-2"
      style={{ right: '-98px', top: '50%', transform: 'translateY(-50%) rotate(-90deg)' }}
    >
      <a href="https://www.producthunt.com/products/arcfuse?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-arcfuse" target="_blank" rel="noopener noreferrer" className="block drop-shadow-2xl">
        <img alt="Arcfuse - Unify Your Digital World. | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1140986&amp;theme=dark&amp;t=1778128185000" />
      </a>
    </div>
  );
}
