// store.js

import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";
import { EDGE_STYLES } from "./constants/constants";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  // Generate unique IDs for new nodes
  getNodeID: (type) => {
    const currentIDs = { ...get().nodeIDs };
    currentIDs[type] = (currentIDs[type] || 0) + 1;
    set({ nodeIDs: currentIDs });
    return `${type}-${currentIDs[type]}`;
  },

  // Node operations
  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  deleteNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    })),

  // Update specific node field
  updateNodeField: (nodeId, field, value) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [field]: value } }
          : node
      ),
    })),

  // ReactFlow event handlers
  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge({ ...connection, ...EDGE_STYLES.DEFAULT }, state.edges),
    })),
}));
