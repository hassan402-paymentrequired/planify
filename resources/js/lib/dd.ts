export const mockAgents: AgentType[] = [
  {
    id: "1",
    name: "Customer Support Bot",
    description: "Handles customer inquiries and support tickets automatically.",
    type: "Customer Service",
    status: "active",
    createdAt: "2023-10-15",
    interactions: 1253,
    isPersonal: true,
    model: "GPT-4",
    channels: ["voice", "chat", "email"],
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=1",
    purpose: "Help users with their customer support questions and resolve issues.",
    prompt: "You are a customer support bot. Your job is to help users solve their problems and answer their questions about our products and services."
  },
  {
    id: "2",
    name: "Sales Assistant",
    description: "Guides customers through the sales process and answers product questions.",
    type: "Sales & Marketing" as AgentTypeCategory, // Adding type assertion to ensure exact match
    status: "active",
    createdAt: "2023-11-22",
    interactions: 876,
    isPersonal: false,
    model: "Claude-2",
    channels: ["voice", "chat", "whatsapp", "sms"],
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=2",
    purpose: "Help users find the right products and make purchasing decisions.",
    prompt: "You are a sales assistant bot. Your job is to help users find the right products for their needs and guide them through the purchasing process."
  },
  {
    id: "3",
    name: "Knowledge Base Agent",
    description: "Provides information from company documentation and knowledge base.",
    type: "FAQ & Knowledge Base",
    status: "inactive",
    createdAt: "2024-01-05",
    interactions: 432,
    isPersonal: true,
    model: "GPT-3.5 Turbo",
    channels: ["voice", "chat"]
  },
  {
    id: "4",
    name: "Meeting Scheduler",
    description: "Helps schedule and manage meetings with clients and team members.",
    type: "Appointment Booking",
    status: "active",
    createdAt: "2024-02-10",
    interactions: 198,
    isPersonal: false,
    model: "LLama-2",
    channels: ["voice", "email", "sms"]
  },
  {
    id: "5",
    name: "Document Analyzer",
    description: "Analyzes documents and extracts key information automatically.",
    type: "Technical Support", // Changed from "Other Function" to a valid category
    status: "inactive",
    createdAt: "2024-03-01",
    interactions: 52,
    isPersonal: true,
    model: "GPT-4",
    channels: ["voice"]
  }
];