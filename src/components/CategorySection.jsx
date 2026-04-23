import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CategorySection',
  props: {
    title: { type: String, required: true },
    description: { type: String, required: false },
    products: { type: Array, required: true },
  },
  setup(props) {
    const selected = ref(null);
    const open = (p) => (selected.value = p);
    const close = () => (selected.value = null);

    return () => (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl text-primary mb-2">{props.title}</h2>
          <p className="text-muted-foreground">{props.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {props.products.map((p) => (
            <div
              key={p.id}
              className="bg-[#0b0b0b] border border-primary/20 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => open(p)}
            >
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg text-primary mb-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{p.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-accent font-semibold">{p.price}</span>
                  <button className="text-sm text-primary underline">Quick view</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selected.value && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={close}></div>

            <div className="relative bg-[#0b0b0b] border border-primary/30 rounded-lg max-w-3xl w-full mx-4 overflow-hidden shadow-xl">
              <div className="flex flex-col md:flex-row">
                <img src={selected.value.image} alt={selected.value.name} className="w-full md:w-1/2 h-64 object-cover" />
                <div className="p-6 md:w-1/2">
                  <h3 className="text-2xl text-primary mb-2">{selected.value.name}</h3>
                  <p className="text-muted-foreground mb-4">{selected.value.description}</p>
                  <p className="text-accent font-bold text-lg mb-6">{selected.value.price}</p>

                  <div className="flex gap-3">
                    <button className="bg-linear-to-r from-primary via-accent to-primary text-primary-foreground px-4 py-2 rounded" onClick={close}>
                      Add to cart
                    </button>
                    <button className="border border-primary text-primary px-4 py-2 rounded" onClick={close}>
                      Close
                    </button>
                  </div>
                </div>
              </div>

              <button className="absolute top-3 right-3 text-muted-foreground" onClick={close}>
                ✕
              </button>
            </div>
          </div>
        )}
      </section>
    );
  },
});
