export interface App {
  id: string;
  name: string;
  icon: string;
}

export interface ServiceNodeData extends Record<string, unknown> {
  name: string;
  description: string;
  status: 'healthy' | 'degraded' | 'down';
  cpu: number;
  memory: string;
  disk: string;
  region: number;
  provider: 'aws' | 'gcp' | 'azure';
  sliderValue: number;
}

export interface GraphNode {
  id: string;
  type: 'service' | 'database';
  position: { x: number; y: number };
  data: ServiceNodeData;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
