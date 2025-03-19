import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Hackathon {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  prizePools: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  image: string;
  organizer: {
    name: string;
    logo: string;
  };
  technologies: string[];
}

const Hackathons = () => {
  const [hackathons] = useState<Hackathon[]>([
    {
      id: '1',
      title: 'AI Innovation Challenge',
      description: 'Build the next generation of AI-powered solutions',
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      prizePools: '$50,000',
      participants: 500,
      status: 'upcoming',
      image: '/hackathons/ai-challenge.jpg',
      organizer: {
        name: 'Tech Innovators',
        logo: '/logos/tech-innovators.png'
      },
      technologies: ['AI/ML', 'Python', 'TensorFlow']
    },
    {
      id: '2',
      title: 'Blockchain Buildathon',
      description: 'Create innovative blockchain solutions',
      startDate: '2024-05-15',
      endDate: '2024-06-15',
      prizePools: '$75,000',
      participants: 300,
      status: 'upcoming',
      image: '/hackathons/blockchain.jpg',
      organizer: {
        name: 'Web3 Foundation',
        logo: '/logos/web3.png'
      },
      technologies: ['Blockchain', 'Solidity', 'Web3']
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Hackathons</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Participate in exciting hackathons, showcase your skills, and win amazing prizes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hackathons.map((hackathon) => (
            <motion.div
              key={hackathon.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <img
                  src={hackathon.image}
                  alt={hackathon.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${hackathon.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                      hackathon.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'}
                  `}>
                    {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <img
                    src={hackathon.organizer.logo}
                    alt={hackathon.organizer.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{hackathon.organizer.name}</span>
                </div>

                <h3 className="text-xl font-bold mb-2">{hackathon.title}</h3>
                <p className="text-gray-600 mb-4">{hackathon.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span>{hackathon.prizePools}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span>{hackathon.participants} participants</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <span>{new Date(hackathon.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span>{new Date(hackathon.endDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {hackathon.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hackathons;
