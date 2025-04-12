import { component$, Signal, useStyles$ } from '@builder.io/qwik';
import {
  LuWand2,
  LuShield,
  LuSword,
  LuFlame,
  LuSkull,
  LuLeaf,
} from '@qwikest/icons/lucide';
import { twMerge } from 'tailwind-merge';

interface ClassSelectProps {
  selectedClass: Signal<string>;
}

const styles = `
  @keyframes breathe {
    0%, 100% { box-shadow: 0 0 15px 5px rgba(112, 199, 186, 0.3); }
    50% { box-shadow: 0 0 25px 10px rgba(112, 199, 186, 0.5); }
  }
  .breathing-glow { 
    animation: breathe 2s ease-in-out infinite; 
  }
`;

export default component$(({ selectedClass }: ClassSelectProps) => {
  useStyles$(styles);

  const classes = [
    { name: 'Wizard', icon: LuWand2 },
    { name: 'Orc', icon: LuShield },
    { name: 'Warrior', icon: LuSword },
    { name: 'Dragon', icon: LuFlame },
    { name: 'Dark Lord', icon: LuSkull },
    { name: 'Elf', icon: LuLeaf },
  ];

  return (
    <div class="w-full border-gray-700 shadow-md rounded-sm p-1 bg-gray-800 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory">
      <div class="flex flex-nowrap">
        {classes.map(({ name: className, icon: Icon }) => (
          <button
            key={className}
            class={twMerge(
              'flex-1 p-2 bg-transparent text-gray-400 transition-colors duration-200 flex items-center justify-center gap-2 text-sm min-w-[80px] snap-center',
              'md:flex-row flex-col', // Stack on mobile, row on desktop
              selectedClass.value === className &&
                'bg-gray-700 rounded-sm text-secondary-500 breathing-glow'
            )}
            onClick$={() => {
              selectedClass.value = className;
            }}
          >
            <Icon class="h-5 w-5" />
            <span>{className}</span>
          </button>
        ))}
      </div>
    </div>
  );
});