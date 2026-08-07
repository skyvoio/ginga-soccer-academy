import { getUncachableStripeClient } from '../server/stripeClient';

const GINGA_PROGRAMS = [
  { name: "Justplay", description: "120-minute open play session for all levels.", price: 5650, category: "TRAINING" },
  { name: "Group Session", description: "90-minute small group training session.", price: 5650, category: "TRAINING" },
  { name: "Private Session", description: "2-hour private 1-on-1 training with elite coaching.", price: 19775, category: "TRAINING" },
  { name: "GingaFit", description: "Youth athletic conditioning — speed, power & agility. Tuesdays 7–8 PM, Jul 28–Dec 15. Max 24 athletes.", price: 4520, category: "TRAINING" },
  { name: "PD Day Camp", description: "Full-day PD Day training camp. Available: May 29 & Jun 26, 2026.", price: 16950, category: "CAMPS" },
  { name: "Summer Camp", description: "Weekly intensive summer camps throughout August 2026.", price: 56500, category: "CAMPS" },
  { name: "Christmas Camp", description: "3-day Christmas holiday camp, Dec 28-30.", price: 33900, category: "CAMPS" },
  { name: "Full Turf Rental", description: "Full pitch rental — 1 hour.", price: 15000, category: "RENTALS" },
  { name: "3/4 Turf Rental", description: "Three-quarter pitch rental — 1 hour.", price: 10000, category: "RENTALS" },
  { name: "Mini Turf Rental", description: "Mini pitch rental — 1 hour.", price: 7000, category: "RENTALS" },
];

async function seedProducts() {
  try {
    const stripe = await getUncachableStripeClient();
    console.log('Seeding Ginga Soccer products to Stripe...\n');

    for (const program of GINGA_PROGRAMS) {
      const existing = await stripe.products.search({ query: `name:'${program.name}' AND active:'true'` });
      if (existing.data.length > 0) {
        console.log(`✓ Already exists: ${program.name}`);
        continue;
      }

      const product = await stripe.products.create({
        name: program.name,
        description: program.description,
        metadata: { category: program.category, academy: "ginga_soccer" },
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: program.price,
        currency: 'cad',
      });

      console.log(`✓ Created: ${program.name} — CA$${(program.price / 100).toFixed(2)} (${price.id})`);
    }

    console.log('\n✅ All products seeded successfully!');
  } catch (err: any) {
    console.error('Error seeding products:', err.message);
    process.exit(1);
  }
}

seedProducts();
