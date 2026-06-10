import FlowingMenu from './FlowingMenu';

export default function Products() {
  return (
    <section className="section products" id="products" data-screen-label="Products">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow"><i></i>Our products</p>
          <h2 className="sec-title">Platforms ready<br />to deploy.</h2>
        </div>
        <div className="flowing-menu-wrap">
          <FlowingMenu speed={13} />
        </div>
      </div>
    </section>
  );
}
