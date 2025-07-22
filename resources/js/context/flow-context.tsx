import React, { createContext, useContext, useState } from "react";
import { Node, Edge } from "reactflow";

interface FlowContextType {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}
const FlowContext = createContext<FlowContextType | undefined>(undefined);
export const FlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", position: { x: 100, y: 100 }, data: { label: "Start Node" }, type: "default" },
    { id: "2", position: { x: 300, y: 200 }, data: { label: "Second update Node" }, type: "default" },
  ]);
  const [edges, setEdges] = useState<Edge[]>([
    { id: "e1-2", source: "1", target: "2", animated: true },
  ]);
  return (
    <FlowContext.Provider value={{ nodes, edges, setNodes, setEdges }}>
      {children}
    </FlowContext.Provider>
  );
};
export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlow must be used within a FlowProvider");
  }
  return context;
};