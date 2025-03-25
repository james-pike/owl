import { component$ } from "@builder.io/qwik";
import { routeLoader$, StaticGenerateHandler } from "@builder.io/qwik-city";

interface Service {
  title: string;
  description: string;
  details: string;
  image: string;
  alt: string;
  slug: string;
}

const services: Service[] = [
  {
    title: "Wizard Lord",
    description: "Fast and reliable 24/7 lockout services for homes, offices, and vehicles.",
    details: "Regain access to your property quickly with our professional lockout solutions. Regain access to your property quickly with our professional lockout solutions. Regain access to your property quickly with our professional lockout solutions. Regain access to your property quickly with our professional lockout solutions.",
    image: "/images/placeholder.png",
    alt: "Emergency Lockout Assistance",
    slug: "emergency-lockout"
  },
  {
    title: "Dark Lord",
    description: "Precision key cutting and duplication for all types of locks.",
    details: "Get spare keys for your home, office, or vehicle with accuracy and efficiency. Get spare keys for your home, office, or vehicle with accuracy and efficiency. Get spare keys for your home, office, or vehicle with accuracy and efficiency. Get spare keys for your home, office, or vehicle with accuracy and efficiency. Get spare keys for your home, office, or vehicle with accuracy and efficiency.",
    image: "/images/placeholder.png",
    alt: "Key Duplication & Replacement",
    slug: "key-duplication"
  },
  {
    title: "Elf Lord",
    description: "Enhance security with professional lock installation and repair services.",
    details: "We install and fix all types of locks to keep your property secure. We install and fix all types of locks to keep your property secure. We install and fix all types of locks to keep your property secure. We install and fix all types of locks to keep your property secure.",
    image: "/images/placeholder.png",
    alt: "Lock Installation & Repair",
    slug: "lock-installation"
  },
  {
    title: "Orc Lord",
    description: "Upgrade your security with the latest smart locks and access control systems.",
    details: " We install high-tech security solutions for homes and businesses. We install high-tech security solutions for homes and businesses. We install high-tech security solutions for homes and businesses. We install high-tech security solutions for homes and businesses.",
    image: "/images/placeholder.png",
    alt: "Smart Lock & Security System Installation",
    slug: "smart-locks"
  },
  {
    title: "Warrior Lord",
    description: "Key programming, lock repairs, and ignition services for all vehicle models.",
    details: "We provide expert automotive locksmith solutions, including key fob replacement. We provide expert automotive locksmith solutions, including key fob replacement. We provide expert automotive locksmith solutions, including key fob replacement. We provide expert automotive locksmith solutions, including key fob replacement. We provide expert automotive locksmith solutions, including key fob replacement. We provide expert automotive locksmith solutions, including key fob replacement. We provide expert automotive locksmith solutions, including key fob replacement. We provide expert automotive locksmith solutions, including key fob replacement.",
    image: "/images/placeholder.png",
    alt: "Automotive Locksmith Services",
    slug: "automotive-locksmith"
  },
  {
    title: "Dragon Lord",
    description: "Secure storage solutions and expert safe opening services.",
    details: "We install, repair, and unlock safes while maintaining their integrity. We install, repair, and unlock safes while maintaining their integrity. We install, repair, and unlock safes while maintaining their integrity. We install, repair, and unlock safes while maintaining their integrity.",
    image: "/images/placeholder.png",
    alt: "Safe Opening & Installation",
    slug: "safe-services"
  },
];

export const useService = routeLoader$<Service | null>(({ params }) => {
  const service = services.find(s => s.slug === params.slug);
  return service || null;
});

export default component$(() => {
  const service = useService();
  if (!service.value) {
    return (
      <div class="max-w-screen-xl mx-auto px- py-16 text-center">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Service Not Found</h1>
        <p class="text-gray-600 dark:text-gray-400">The requested service could not be found.</p>
      </div>
    );
  }

  return (
    <div class="max-w-7xl  bg-gray-100 dark:bg-gray-800">
    <section class="max-w-5xl mx-auto px-4 pb-8 md:py-16 bg-gray-100 dark:bg-gray-800">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-start">
        {/* Image Section */}
        <div class="flex justify-center md:justify-start">
          <img
            src={service.value.image}
            alt={service.value.alt}
            width={500}
            height={300}
            class="w-full max-w-md rounded-none shadow-md object-cover"
          />
        </div>

        {/* Text Section */}
        <div class="space-y-6">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {service.value.title}
          </h1>
          <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            {service.value.description}
          </p>
          <p class="text-base md:text-lg text-gray-600 dark:text-gray-400">
            {service.value.details}
          </p>
          {/* Optional Call-to-Action */}
      
        </div>
      </div>
    </section>
    </div>
  );
});

// Pre-render all slugs
export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: services.map(service => ({ slug: service.slug })),
  };
};