import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city"; // Import Link component

const services = [
    {
      title: "Wizard Lord",
      description: "Fast and reliable 24/7 lockout services for homes, offices, and vehicles.",
      details: "Regain access to your property quickly with our professional lockout solutions.",
      image: "/images/placeholder.png",
      alt: "Emergency Lockout Assistance",
      slug: "emergency-lockout"
    },
    {
      title: "Dark Lord",
      description: "Precision key cutting and duplication for all types of locks.",
      details: "Get spare keys for your home, office, or vehicle with accuracy and efficiency.",
      image: "/images/placeholder.png",
      alt: "Key Duplication & Replacement",
      slug: "key-duplication"
    },
    {
      title: "Elf Lord",
      description: "Enhance security with professional lock installation and repair services.",
      details: "We install and fix all types of locks to keep your property secure.",
      image: "/images/placeholder.png",
      alt: "Lock Installation & Repair",
      slug: "lock-installation"
    },
    {
      title: "Orc Lord",
      description: "Upgrade your security with the latest smart locks and access control systems.",
      details: "We install high-tech security solutions for homes and businesses.",
      image: "/images/placeholder.png",
      alt: "Smart Lock & Security Systems",
      slug: "smart-locks"
    },
    {
      title: "Warrior Lord",
      description: "Key programming, lock repairs, and ignition services for all vehicle models.",
      details: "We provide expert automotive locksmith solutions, including key fob replacement.",
      image: "/images/placeholder.png",
      alt: "Automotive Locksmith Services",
      slug: "automotive-locksmith"
    },
    {
      title: "Dragon Lord",
      description: "Secure storage solutions and expert safe opening services.",
      details: "We install, repair, and unlock safes while maintaining their integrity.",
      image: "/images/placeholder.png",
      alt: "Safe Opening & Installation",
      slug: "safe-services"
    },
  ];



  export default component$(() => {
    const isVisible = useSignal(false);
  
    useVisibleTask$(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            isVisible.value = true;
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
  
      const element = document.querySelector('#services-grid');
      if (element) observer.observe(element);
  
      return () => observer.disconnect();
    });
  
    return (
      <div 
        id="services-grid"
        class="grid mx-auto max-w-screen-xl mt-2 mb-2 md:mb-16 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {services.map(({ title, description, details, image, alt, slug }, index) => (
          <Link
            href={`/services/${slug}`}
            key={index}
            class={`
              group relative overflow-hidden rounded-lg shadow-md no-underline
              transition-all duration-500
              ${isVisible.value ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <div class="relative aspect-[2/1]">
              <img
                width={700}
                height={350} // Explicit height for 2/1 aspect ratio
                src={image}
                alt={alt}
                loading="eager"
                class="w-full h-full object-cover transition-transform bg-primary-50 duration-300 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                <p class="text-white text-center px-4">{details}</p>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-100 dark:bg-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  });