import { Separator } from '@/components/ui/separator';

export default function CountsSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Stats</h2>

        <div className="flex flex-col md:flex-row text-center py-5 md:py-9 items-center border-t border-b border-gray-200 dark:border-gray-800">
          {/* Customers */}
          <div className="flex-1 py-6">
            <h3 className="text-5xl font-extrabold">2.5M</h3>
            <p className="mt-2 text-gray-500 uppercase tracking-wider">
              Generate
            </p>
          </div>

          {/* Separator */}
          <Separator
            orientation="vertical"
            className="hidden md:block h-15 w-0.5 bg-gray-200 dark:bg-gray-800"
          />

          {/* Sales */}
          <div className="flex-1 py-6">
            <h3 className="text-5xl font-extrabold">8.5K</h3>
            <p className="mt-2 text-gray-500 uppercase tracking-wider">Sales</p>
          </div>

          <Separator
            orientation="vertical"
            className="hidden md:block h-15 w-0.5 bg-gray-200 dark:bg-gray-800"
          />

          {/* Revenue */}
          <div className="flex-1 py-6">
            <h3 className="text-5xl font-extrabold">$120K</h3>
            <p className="mt-2 text-gray-500 uppercase tracking-wider">
              Revenue
            </p>
          </div>

          <Separator
            orientation="vertical"
            className="hidden md:block h-15 w-0.5 bg-gray-200 dark:bg-gray-800"
          />

          {/* Growth */}
          <div className="flex-1 py-6">
            <h3 className="text-5xl font-extrabold">35%</h3>
            <p className="mt-2 text-gray-500 uppercase tracking-wider">
              Growth
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
