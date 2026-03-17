import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What documents do I need to rent a car?", a: "You'll need a valid driver's license, a passport or ID card, and a credit or debit card for the deposit. International visitors should also have an international driving permit." },
  { q: "Is insurance included in the rental price?", a: "Yes, comprehensive insurance is included with every rental. Additional coverage options are available upon request." },
  { q: "Can I pick up a car at Pristina Airport?", a: "Absolutely! We offer airport pickup and drop-off services at Pristina International Airport. Please let us know your flight details when booking." },
  { q: "What is your cancellation policy?", a: "Free cancellation up to 24 hours before your pickup time. Cancellations within 24 hours may be subject to a fee." },
  { q: "Do you offer child seats?", a: "Yes, child seats and booster seats are available free of charge upon request. Please mention this when booking." },
  { q: "What fuel policy do you use?", a: "We use a full-to-full fuel policy. You'll receive the car with a full tank and should return it full. Alternatively, we can refuel for you at a small charge." },
  { q: "Is there a mileage limit?", a: "Most rentals include unlimited mileage. Some premium vehicles may have daily limits — this will be clearly stated during booking." },
  { q: "Can I drive the rental car outside Kosovo?", a: "Cross-border travel is available for most vehicles with prior arrangement. Additional insurance and documentation may be required." },
];

export default function FAQ() {
  return (
    <>
      <section className="hero-gradient py-16">
        <div className="container text-center text-primary-foreground">
          <h1 className="font-display text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="text-primary-foreground/70 mt-2">Find answers to common questions</p>
        </div>
      </section>
      <section className="py-16">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
