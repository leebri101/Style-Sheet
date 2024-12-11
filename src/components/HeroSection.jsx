
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export default function HeroSection() {
  return (
    <section className="relative bg-gray-100">
      <div className="container flex flex-col lg:flex-row items-center gap-8 py-12">
        <div className="flex-1 space-y-4">
          <Badge variant="secondary" className="bg-red-500 text-white hover:bg-red-600">
            LIMITED OFFER
          </Badge>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
            HEATTECH Extra Warm Cashmere Blend Crew Neck T-Shirt
          </h1>
          <p className="text-muted-foreground text-lg">Save on our softest thermals yet.</p>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">£14.90</div>
            <p className="text-sm text-muted-foreground">
              Limited-time offer available until December 11th.
            </p>
          </div>
          <Button size="lg" className="w-full sm:w-auto">
            Add to Cart
          </Button>
        </div>
        <div className="flex-1">
          <img
            src="/placeholder.svg?height=600&width=400"
            alt="Product Image"
            className="aspect-[3/4] object-cover rounded-md shadow-lg"
            width={400}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}
