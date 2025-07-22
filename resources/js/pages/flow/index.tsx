
import LucidSidebar from '@/components/lucid-sidebar';
import { useFlow } from '@/context/flow-context';
import React, { useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Node } from 'reactflow';
import 'reactflow/dist/style.css';

const dummyUsers = [
    { id: 1, name: 'Alice Doe' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Charlie Brown' },
];

const FlowChart: React.FC = () => {
    const { nodes, edges, setNodes } = useFlow();
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);

    const onNodeClick = (_: any, node: Node) => setSelectedNode(node);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedNode) return;
        const { name, value } = e.target;
        setNodes((nds: Node[]) =>
            nds.map((n) =>
                n.id === selectedNode.id ? { ...n, data: { ...n.data, [name]: value } } : n
            )
        );
        setSelectedNode((prev) =>
            prev ? { ...prev, data: { ...prev.data, [name]: value } } : prev
        );
    };

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            {/* Left Sidebar */}
            <div style={{ width: 200, background: '#f3f3f3' }}>
                {/* <h4>Users</h4>
                <ul>
                    {dummyUsers.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul> */}
            <LucidSidebar />
            </div>

            {/* Main Flow Area */}
            <div style={{ flex: 1, position: 'relative' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodeClick={onNodeClick}
                    nodesDraggable={true}
                    nodesConnectable={true}
                    elementsSelectable={true}
                >
                    <Background />
                    <Controls />
                    <MiniMap color="#000" />
                </ReactFlow>
            </div>

            {/* Right Sidebar */}
            <div style={{ width: 250, background: '#00333', padding: 16 }}>
                <h4>Edit Node</h4>
                {selectedNode ? (
                    <form>
                        <div>
                            <label>
                                Label:
                                <input
                                    name="label"
                                    value={selectedNode.data?.label || ''}
                                    onChange={handleInputChange}
                                    style={{ width: '100%' }}
                                />
                            </label>
                        </div>
                        {/* Add more fields as needed */}
                    </form>
                ) : (
                    <div>Select a node to edit</div>
                )}
            </div>
        </div>
    );
};

export default FlowChart;
