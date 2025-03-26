import { component$, useStyles$ } from '@builder.io/qwik';
import { Card } from '../ui/Card';

const styles = `
  .box {
    border-radius: 0.125rem; /* Matches rounded-sm */
    background: #1f2937; /* Tailwind gray-800 */
    position: relative;
    overflow: hidden;
    text-align: center;
    max-width: 400px; /* Kept wider as requested */
    width: 100%; /* Ensure it takes full available width */
  }
  .box:before {
    position: absolute;
    content: '';
    left: 0px;
    top: 0px;
    width: 0px;
    height: 100%;
    border-radius: 0.125rem; /* Matches rounded-sm */
    box-shadow: inset 0 0 25px rgba(0,0,0,0.30);
    transition: all 0.3s ease;
    background-image: linear-gradient(to right, #374151 0%, #4b5563 100%); /* Gray-700 to Gray-600 */
  }
  .box:hover:before {
    width: 100%;
  }
  .box:hover .image-wrapper {
    padding: 0;
  }
  .box:hover .box-desc {
    color: #f3f4f6; /* Tailwind gray-100 */
  }
  .box:hover .social li a {
    background: #f3f4f6; /* Tailwind gray-100 */
    background-image: none;
    color: #1f2937; /* Tailwind gray-800 */
  }
  .box:hover .social li a:hover {
    background: #111827; /* Tailwind gray-900 */
    color: #f3f4f6; /* Tailwind gray-100 */
  }
  .image-wrapper {
    position: relative;
    max-width: 250px; /* Reduced from 350px to make image smaller */
    max-height: 250px; /* Reduced from 350px to maintain square aspect and reduce height */
    margin: 0 auto;
    overflow: hidden;
    border-radius: 50%;
    padding: 15px;
    transition: all 0.5s ease;
    box-shadow: inset 0px 0px 20px rgba(0,0,0,0.20);
  }
  .image-wrapper img {
    border-radius: 50%;
    transition: all 500ms ease;
  }
  .box-desc {
    position: relative;
    color: #d1d5db; /* Tailwind gray-300 */
  }
  .box-desc h5 {
    color: #f3f4f6; /* Tailwind gray-100 */
  }
  ul.social {
    padding: 0;
  }
  ul.social li {
    display: inline-block;
    list-style-type: none;
  }
  ul.social li a {
    position: relative;
    width: 36px;
    height: 36px;
    background-image: linear-gradient(to right, #374151 0%, #4b5563 100%); /* Gray-700 to Gray-600 */
    display: inline-block;
    line-height: 36px;
    border-radius: 50%;
    color: #f3f4f6; /* Tailwind gray-100 */
    transition: all .5s ease;
  }
`;

// TeamCard component for each card
const TeamCard = component$<{ name: string; title: string; imageSrc: string }>(({ name, title, imageSrc }) => {
  return (
    <Card.Content>
      <div class="box shadow-sm p-4">
        <div class="image-wrapper mb-3">
          <img class="img-fluid w-full h-full object-cover" src={imageSrc} alt={name} />
        </div>
        <div class="box-desc">
          <h5>{name}</h5>
          <p>{title}</p>
        </div>
        <ul class="social">
          <li>
            <a href="#">
              <i class="fab fa-facebook-f" />
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fab fa-instagram" />
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fab fa-pinterest-p" />
            </a>
          </li>
        </ul>
      </div>
    </Card.Content>
  );
});

// Main component
export default component$(() => {
  useStyles$(styles);

  const teamMembers = [
    { name: 'Jon Doe', title: 'FrontEnd Developer', imageSrc: 'https://images.pexels.com/photos/555790/pexels-photo-555790.png' },
    { name: 'Jon Doe', title: 'FrontEnd Developer', imageSrc: 'https://images.pexels.com/photos/555790/pexels-photo-555790.png' },
    { name: 'Jon Doe', title: 'FrontEnd Developer', imageSrc: 'https://images.pexels.com/photos/555790/pexels-photo-555790.png' },
    { name: 'Jon Doe', title: 'FrontEnd Developer', imageSrc: 'https://images.pexels.com/photos/555790/pexels-photo-555790.png' },
  ];

  return (
    <div class="bg-gray-700">
      <div class="container mx-auto px-0">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {teamMembers.map((member, index) => (
            <div key={index} class="flex justify-center">
              <TeamCard name={member.name} title={member.title} imageSrc={member.imageSrc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});