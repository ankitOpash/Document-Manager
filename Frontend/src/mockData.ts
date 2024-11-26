import { Document } from './types';
import { subDays, subHours, subMinutes } from 'date-fns';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

export const generateMockDocuments = (): Document[] => {
  const documents: Document[] = [
    { id: '1', name: 'Project Proposal.txt', content: loremIpsum, createdAt: subDays(new Date(), 5), size: 2048 },
    { id: '2', name: 'Meeting Notes.txt', content: loremIpsum, createdAt: subHours(new Date(), 12), size: 1024 },
    { id: '3', name: 'Research Summary.txt', content: loremIpsum, createdAt: subDays(new Date(), 2), size: 4096 },
    { id: '4', name: 'Budget Report.txt', content: loremIpsum, createdAt: subMinutes(new Date(), 45), size: 3072 },
    { id: '5', name: 'Client Feedback.txt', content: loremIpsum, createdAt: subDays(new Date(), 1), size: 1536 },
    { id: '6', name: 'Development Plan.txt', content: loremIpsum, createdAt: subHours(new Date(), 6), size: 2560 },
    { id: '7', name: 'Marketing Strategy.txt', content: loremIpsum, createdAt: subDays(new Date(), 3), size: 1792 },
    { id: '8', name: 'Team Updates.txt', content: loremIpsum, createdAt: subHours(new Date(), 24), size: 896 },
    { id: '9', name: 'Product Roadmap.txt', content: loremIpsum, createdAt: subDays(new Date(), 4), size: 3584 },
    { id: '10', name: 'User Research.txt', content: loremIpsum, createdAt: subHours(new Date(), 36), size: 2304 },
    { id: '11', name: 'Design Guidelines.txt', content: loremIpsum, createdAt: subDays(new Date(), 6), size: 1280 },
    { id: '12', name: 'Technical Specs.txt', content: loremIpsum, createdAt: subHours(new Date(), 48), size: 4608 },
    { id: '13', name: 'Release Notes.txt', content: loremIpsum, createdAt: subDays(new Date(), 7), size: 768 },
    { id: '14', name: 'QA Report.txt', content: loremIpsum, createdAt: subHours(new Date(), 72), size: 2816 },
    { id: '15', name: 'Stakeholder Brief.txt', content: loremIpsum, createdAt: subDays(new Date(), 8), size: 1920 },
  ];

  return documents;
};