import {
  MdInput,
  MdOutput,
  MdOutlineTextSnippet,
  MdCrop,
  MdSave,
  MdOutlineFileDownload,
} from "react-icons/md";
import { FaRegFile } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { BiTransfer } from "react-icons/bi";
import { BsChatRightText } from "react-icons/bs";
import { SiSlack, SiGmail, SiNotion, SiDiscord } from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";

// UI Constants
export const GRID_SIZE = 20;
export const PRO_OPTIONS = { hideAttribution: true };

// Node Dimensions
export const NODE_DIMENSIONS = {
  DEFAULT: "220px",
  WIDE: "250px",
  EXTRA_WIDE: "300px",
};

// Field Heights
export const FIELD_HEIGHTS = {
  DEFAULT: 24,
  SINGLE_LINE: 24,
  MULTI_LINE: 24,
};

// Navigation Categories
export const NAV_CATEGORIES = [
  { id: "general", label: "General" },
  { id: "llms", label: "LLMs" },
  { id: "multiModal", label: "Multi-Modal" },
  { id: "dataLoaders", label: "Data Loaders" },
  { id: "integration", label: "Integrations" },
  { id: "vectorDB", label: "Vector DB" },
  { id: "logic", label: "Logic" },
  { id: "chat", label: "Chat" },
];

// Node Types Configuration
export const NODES_BY_CATEGORY = {
  general: [
    {
      type: "customInput",
      label: "Input",
      icon: <MdInput className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "customOutput",
      label: "Output",
      icon: <MdOutput className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "text",
      label: "Text",
      icon: <MdOutlineTextSnippet className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "file",
      label: "File",
      icon: <FaRegFile className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "pipeline",
      label: "Pipeline",
      icon: <FaRegCirclePlay className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "integration",
      label: "Integration",
      icon: <BiTransfer className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "transform",
      label: "Transform",
      icon: <MdCrop className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "fileSave",
      label: "File Save",
      icon: <MdSave className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "note",
      label: "Note",
      icon: <BsChatRightText className="w-5 h-5 text-gray-500" />,
    },
  ],
  llms: [
    {
      type: "llm",
      label: "LLM",
      icon: <RiOpenaiFill className="w-5 h-5 text-gray-500" />,
    },
  ],
  vectorDB: [
    {
      type: "vecQuery",
      label: "Vec Query",
      icon: <MdCrop className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "vecStore",
      label: "Vec Store",
      icon: <MdOutlineFileDownload className="w-5 h-5 text-gray-500" />,
    },
  ],
  integration: [
    {
      type: "slack",
      label: "Slack",
      icon: <SiSlack className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "gmail",
      label: "Gmail",
      icon: <SiGmail className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "notion",
      label: "Notion",
      icon: <SiNotion className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "discord",
      label: "Discord",
      icon: <SiDiscord className="w-5 h-5 text-gray-500" />,
    },
  ],
};

// Model Options
export const MODEL_OPTIONS = [
  { value: "gpt-3.5 turbo", label: "gpt-3.5 turbo" },
  { value: "gpt-4o", label: "gpt-4o" },
];

// Vector Store Options
export const VECTOR_STORE_OPTIONS = [
  { value: "pinecone", label: "Pinecone" },
  { value: "qdrant", label: "Qdrant" },
  { value: "weaviate", label: "Weaviate" },
];

// Input/Output Types
export const IO_TYPES = [
  { value: "Text", label: "Text" },
  { value: "File", label: "File" },
];

// Edge Styles
export const EDGE_STYLES = {
  DEFAULT: {
    type: "smoothstep",
    animated: true,
    style: {
      stroke: "#6466E9",
      strokeWidth: 2,
      strokeDasharray: "5, 5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
  },
};

// Regular Expressions
export const VARIABLE_REGEX = /{{\s*([a-zA-Z][a-zA-Z0-9_]*)\s*}}/g;
