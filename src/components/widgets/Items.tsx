import { component$, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { twMerge } from "tailwind-merge";

// ... (your existing interfaces remain the same) ...

const styles = `
    @keyframes breathe {
        0%, 100% { box-shadow: 0 0 15px 5px rgba(59, 130, 246, 0.3); }
        50% { box-shadow: 0 0 25px 10px rgba(59, 130, 246, 0.5); }
    }
    .breathing-glow { 
        animation: breathe 2s ease-in-out infinite; 
    }
  
`;

export default component$(({ selectedClass }: ItemsProps) => {
    const selectedCategory = useSignal(0);
    const selectedItem = useSignal(0);

    useStyles$(styles);

    useVisibleTask$(({ track }) => {
        track(() => selectedCategory.value);
        selectedItem.value = 0;
    });

    // Filter items based on selected class and ensure we have valid categories
    const filteredCategories = categories.map(category => ({
        ...category,
        items: category.items.filter(item =>
            !item.metadata.class || item.metadata.class === selectedClass
        )
    })).filter(category => category.items.length > 0);

    const currentCategory = filteredCategories[selectedCategory.value] || filteredCategories[0];
    const currentItem = currentCategory?.items[selectedItem.value] ||
        currentCategory?.items[0] ||
    {
        title: "No Items Available",
        description: "No items found for this class",
        icon: (
            <svg class="w-full h-full" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2v20M2 12h20" />
            </svg>
        ),
        metadata: {}
    };

    return (
        <section class="scroll-mt-16">
            <div class="max-w-5xl mx-auto">
                {filteredCategories.length > 0 ? (
                    <div class="flex flex-col md:flex-row md:space-x-4 min-h-[284px] lg:min-h-[363px]">
                        {/* Left Column: Category Tabs and Item Grid */}
                        <div class="flex-1 md:w-1/2 flex flex-col space-y-1 order-2 md:order-1">
                        
                            {/* Category Tabs */}
                            <div class="grid grid-cols-4 md:mx-4 sm:flex sm:space-x-4 w-full border-gray-700  shadow-md p-0 mt-2 rounded-sm">
                                {filteredCategories.map((category, index) => (
                                    <button
                                        key={index}
                                        class={twMerge(
                                            "p-2 bg-transparent text-gray-400 transition-colors duration-200",
                                            selectedCategory.value === index && "bg-gray-800 rounded-sm text-white"
                                        )}
                                        onClick$={() => selectedCategory.value = index}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>

                            {/* Item Grid */}
                            <div class="grid grid-cols-3 border-gray-800 border-2 p-2 md:p-4 lg:grid-cols-3 gap-2 md:gap-4 xl:gap-4 md:min-h-[220px] lg:min-h-[220px]">
                                {currentCategory.items.map((item, index) => (
                                    <div
                                        key={index}
                                        class="relative p-1 cursor-pointer group"
                                        onClick$={() => selectedItem.value = index}
                                    >
                                        <div class="relative flex items-center justify-center">
                                            <div class={twMerge(
                                                "absolute inset-[-2px] rounded-none transition-all duration-300 bg-blue-100/50 dark:bg-blue-900/50 border border-gray-300 dark:border-gray-800",
                                                selectedItem.value === index && "bg-secondary-300/70 dark:bg-secondary-800/70 breathing-glow",
                                                "group-hover:bg-secondary-200/70 dark:group-hover:bg-secondary-800/70 group-hover:shadow-[0_0_15px_5px_rgba(59,130,246,0.4)]"
                                            )} />
                                            <div class={twMerge(
                                                "relative bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 w-full p-2 transition-transform duration-300",
                                                selectedItem.value === index && "scale-105",
                                                "group-hover:scale-105"
                                            )}>
                                                {item.icon}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Item Showcase */}
                        <div class="md:w-1/2 mt-4  order-1 md:order-2 md:-mt-6">
                            <div class="rounded-sm pt-4 shadow-md border-2 items-center border-gray-800">
                                <div class="flex flex-col items-center gap-4 px-4 mb-2">
                                    <div class="rotating-item flex-shrink-0 max-w-[150px] max-h-[150px]">
                                        {currentItem.icon}
                                    </div>
                                    <div class="flex-1 w-full">
                                        <h3 class="text-xl font-bold mb-1">{currentItem.title}</h3>
                                        <p class="text-sm text-gray-400 mb-2 md:mb-4 min-h-[40px] lg:min-h-[50px]">{currentItem.description}</p>
                                        <div class="grid grid-cols-2 gap-2 text-sm text-gray-400">
                                            {currentItem.metadata.weight && (
                                                <div>
                                                    <span class="font-semibold">Drop rate:</span> {currentItem.metadata.weight}
                                                </div>
                                            )}
                                            {currentItem.metadata.rarity && (
                                                <div>
                                                    <span class="font-semibold">Rarity:</span>{' '}
                                                    <span class={twMerge(
                                                        currentItem.metadata.rarity === "Common" && "text-green-500",
                                                        currentItem.metadata.rarity === "Rare" && "text-orange-400"
                                                    )}>
                                                        {currentItem.metadata.rarity}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div class="text-center p-4">
                        <p class="text-gray-400">No items available for {selectedClass} class</p>
                    </div>
                )}
            </div>
        </section>
    );
});

const categories: Category[] = [
    {
        name: "Head",
        items: [
            {
                title: "Sorcerer’s Conical Crown"

                ,
                description: "A towering hat imbued with arcane runes, amplifying the wearer’s spellcasting prowess."

                ,
                icon: (<img src="/images/broom.png" alt="Icon" class="w-full h-full" />),
                metadata: {
                    weight: "5%",
                    durability: "High",
                    rarity: "Rare",
                    class: "Wizard"
                }
            },
            {
                title: "Mystic Guardian Helm",
                description: "A towering hat imbued with arcane runes, amplifying the wearer’s spellcasting prowess."

                ,
                icon: (<img src="/images/maskX.png" alt="Icon" class="w-full h-full" />),
                metadata: {
                    weight: "20%",
                    durability: "Medium",
                    rarity: "Common",
                    class: "Wizard"
                }
            },
            {
                title: "Sorcerer’s Conical Crown"

                ,
                description: "A towering hat imbued with arcane runes, amplifying the wearer’s spellcasting prowess."

                ,
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "High",
                    rarity: "Rare",
                    class: "Wizard"
                }
            },
            {
                title: "Mystic Guardian Helm",
                description: "A towering hat imbued with arcane"

                ,
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "20%",
                    durability: "Medium",
                    rarity: "Common",
                    class: "Wizard"
                }
            },
            {
                title: "Sorcerer’s Conical Crown"

                ,
                description: "A towering hat imbued with arcane runes, amplifying the wearer’s spellcasting prowess."

                ,
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "High",
                    rarity: "Rare",
                    class: "Wizard"
                }
            },
            {
                title: "Mystic Guardian Helm",
                description: "A towering hat imbued with arcane runes, amplifying the wearer’s spellcasting prowess."

                ,
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "20%",
                    durability: "Medium",
                    rarity: "Common",
                    class: "Wizard"
                }
            },
            {
                title: "Elf Hat",
                description: "Enhances magical abilities",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>),
                metadata: {
                    weight: "20%",
                    durability: "High",
                    rarity: "Common",
                    class: "Elf"
                }
            },
            {
                title: "Orc Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Orc"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Orc"
                }
            },
            {
                title: "Dark Lord Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Dark Lord"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Warrior"
                }
            },
            {
                title: "Dragon Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Dragon"
                }
            },
            // Add more items with class specifications
        ]
    },
    {
        name: "Neck",
        items: [
            {
                title: "Wizard Hat",
                description: "Enhances magical abilities",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "20%",
                    durability: "High",
                    rarity: "Common",
                    class: "Wizard"
                }
            },
            {
                title: "Wizard toque",
                description: "Enhances magical abilities",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>),
                metadata: {
                    weight: "20%",
                    durability: "High",
                    rarity: "Common",
                    class: "Wizard"
                }
            },
            {
                title: "Wizard Hat",
                description: "Enhances magical abilities",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "20%",
                    durability: "High",
                    rarity: "Common",
                    class: "Wizard"
                }
            },
            {
                title: "Wizard toque",
                description: "Enhances magical abilities",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>),
                metadata: {
                    weight: "20%",
                    durability: "High",
                    rarity: "Common",
                    class: "Wizard"
                }
            },
      
     
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Wizard"
                }
            },
            {
                title: "Wizard Hat",
                description: "Enhances magical abilities",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>),
                metadata: {
                    weight: "20%",
                    durability: "High",
                    rarity: "Common",
                    class: "Elf"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Orc"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Orc"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Dark Lord"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Warrior"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Dragon"
                }
            },
            // Add more items with class specifications
        ]
    },

    {
        name: "Torso",
        items: [
            {
                title: "Wizard Hat",
                description: "Enhances magical abilities",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>),
                metadata: {
                    weight: "20%",
                    durability: "High",
                    rarity: "Common",
                    class: "Wizard"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Wizard"
                }
            },
            {
                title: "Elf Hat",
                description: "Enhances magical abilities",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>),
                metadata: {
                    weight: "20%",
                    durability: "High",
                    rarity: "Common",
                    class: "Elf"
                }
            },
            {
                title: "Orc Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Orc"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Orc"
                }
            },
            {
                title: "Dark Lord Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Dark Lord"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Warrior"
                }
            },
            {
                title: "Dragon Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Dragon"
                }
            },
            {
                title: "Wizard Hat",
                description: "Enhances magical abilities",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>),
                metadata: {
                    weight: "20%",
                    durability: "High",
                    rarity: "Common",
                    class: "Wizard"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Wizard"
                }
            },
            {
                title: "Elf Hat",
                description: "Enhances magical abilities",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>),
                metadata: {
                    weight: "20%",
                    durability: "High",
                    rarity: "Common",
                    class: "Elf"
                }
            },
            {
                title: "Orc Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Orc"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Orc"
                }
            },
            {
                title: "Dark Lord Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Dark Lord"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Warrior"
                }
            },
            {
                title: "Dragon Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Dragon"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Warrior"
                }
            },
            {
                title: "Dragon Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Dragon"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Warrior"
                }
            },
            {
                title: "Dragon Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Dragon"
                }
            },
            // Add more items with class specifications
        ]
    },

    {
        name: "Eyes",
        items: [
            {
                title: "Wizard Hat",
                description: "Enhances magical abilities",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>),
                metadata: {
                    weight: "20%",
                    durability: "High",
                    rarity: "Common",
                    class: "Wizard"
                }
            },
            {
                title: "Mystic Guardian Helm",
                description: "A sturdy headpiece blending steel and sorcery, shielding wizards in battle while enhancing focus."

                ,
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Wizard"
                }
            },
            {
                title: "Elf Hat",
                description: "Enhances magical abilities",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>),
                metadata: {
                    weight: "20%",
                    durability: "High",
                    rarity: "Common",
                    class: "Elf"
                }
            },
            {
                title: "Orc Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Orc"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Orc"
                }
            },
            {
                title: "Dark Lord Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Dark Lord"
                }
            },
            {
                title: "Warrior Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Warrior"
                }
            },
            {
                title: "Dragon Helmet",
                description: "Heavy armor for combat",
                icon: (<svg class="w-full h-full" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /></svg>),
                metadata: {
                    weight: "5%",
                    durability: "Medium",
                    rarity: "Rare",
                    class: "Dragon"
                }
            },
            // Add more items with class specifications
        ]
    },

    // Add other categories with class-specific items...
];

interface Item {
    title: string;
    description: string;
    icon: any;
    metadata: {
        weight?: string;
        durability?: string;
        rarity?: string;
        class?: string;
    };
}

interface Category {
    name: string;
    items: Item[];
}

interface ItemsProps {
    selectedClass: string;
}