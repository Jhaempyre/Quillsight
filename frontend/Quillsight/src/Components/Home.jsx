import React from 'react';
import { motion } from 'framer-motion';

const cards = [
  { title: 'Technology', content: 'Technology is the one of the Boon.' , image:"https://res.cloudinary.com/du7ctzi61/image/upload/v1722407876/IMG-20240731-WA0015_zwxmr7.jpg" },
  { title: 'Travel', content: 'Welcome to Delhi.' , image :"https://res.cloudinary.com/du7ctzi61/image/upload/v1722407834/IMG-20240731-WA0014_hpa46g.jpg" },
  { title: 'Food and Cooking', content: 'Let us make Paneer butter masala' , image :"https://res.cloudinary.com/du7ctzi61/image/upload/v1722407892/IMG-20240731-WA0017_v2rqcs.jpg" },
  { title: 'Sports', content: 'India won T-20 world cup' , image :"https://res.cloudinary.com/du7ctzi61/image/upload/v1722407887/IMG-20240731-WA0016_ixnmwi.jpg" },
  
];

const blogBenefits = [
  { title: 'Improve Writing Skills', description: 'Regular blogging enhances your writing ability and communication skills.' },
  { title: 'Establish Authority', description: 'Showcase your expertise and become a thought leader in your field.' },
  { title: 'Network Growth', description: 'Connect with like-minded individuals and expand your professional network.' },
  { title: 'Personal Branding', description: 'Build and strengthen your personal or business brand online.' },
  { title: 'Generate Opportunities', description: 'Attract potential clients, job offers, or collaboration proposals.' },
  { title: 'Knowledge Sharing', description: 'Contribute to your community by sharing valuable insights and information.' },
  { title: 'SEO Benefits', description: 'Improve your websites search engine rankings with fresh, relevant content.' },
  { title: 'Feedback and Interaction', description: 'Gain valuable insights from your readers comments and feedback.' },
  { title: 'Monetization Potential', description: 'Create opportunities for income through sponsored content or affiliate marketing.' },
  { title: 'Personal Growth', description: 'Learn and grow as you research topics and articulate your thoughts.' },
  { title: 'Creative Expression', description: 'Express your creativity and unique voice through your writing.' },
{ title: 'Content Repurposing', description: 'Create versatile content that can be repurposed for different platforms and formats.' },

];

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Quillsight
      </motion.h1>
      
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8">
          <motion.div 
            className="bg-blue-400 rounded-lg p-6 h-full overflow-auto"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Benefits of Blogging</h2>
            <ul className="space-y-2">
              {blogBenefits.map((benefit, index) => (
                <li key={index} className="mb-2">
                  <strong>{benefit.title}:</strong> {benefit.description}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2 px-4">
  <div className="grid grid-cols-2 gap-4">
    {cards.map((card, index) => (
      <motion.div
        key={index}
        className="card card-compact bg-base-100 shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <figure>
          <img
            src={card.image}
            alt={card.title}
          />
        </figure>
        <br/>
        <hr/>
        <div className="card-body">
          <h2 className="card-title text-sm">{card.title}</h2>
          <p className="text-xs">{card.content}</p>
          <div className="card-actions justify-end">
            {/* You can add actions here if needed */}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</div>
      </div>
    </div>
  );
}

export default HomePage;