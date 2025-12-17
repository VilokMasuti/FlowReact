export interface App {
  id: string;
  name: string;
  icon: string;
}
export interface GraphNode {
  id: string;
  type: 'service' | 'database';
  position: { x: number; y: number };
  data: {
    name: string;
    description: string;
    status: 'healthy' | 'degraded' | 'down';
    cpu: number;
    memory: string;
    disk: string;
    region: number;
    provider: 'aws' | 'gcp' | 'azure';
    sliderValue: number;
  };
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

export const mockApps: App[] = [
  { id: 'golang', name: 'golang', icon: '/galang.jpg' },
  { id: 'java', name: 'java', icon: '/javaa.png' },
  { id: 'python', name: 'python', icon: '/py.jpg' },
  { id: 'ruby', name: 'ruby', icon: '/ruby.png' },
  { id: 'nodejs', name: 'nodejs', icon: '/node.png' },
];

export const mockGraphs: Record<string, GraphData> = {
  golang: {
    nodes: [
      {
        id: 'postgres-1',
        type: 'database',
        position: { x: 700, y: 100 },
        data: {
          name: 'Postgres',
          description: 'Primary PostgreSQL database',
          status: 'healthy',
          cpu: 0.02,
          memory: '0.05 GB',
          disk: '10.00 GB',
          region: 1,
          provider: 'aws',
          sliderValue: 45,
        },
      },
      {
        id: 'redis-1',
        type: 'database',
        position: { x: 250, y: 350 },
        data: {
          name: 'Redis',
          description: 'Cache and session store',
          status: 'down',
          cpu: 0.02,
          memory: '0.05 GB',
          disk: '10.00 GB',
          region: 1,
          provider: 'aws',
          sliderValue: 62,
        },
      },
      {
        id: 'mongodb-1',
        type: 'database',
        position: { x: 700, y: 400 },
        data: {
          name: 'MongoDB',
          description: 'Document database for logs',
          status: 'down',
          cpu: 0.02,
          memory: '0.05 GB',
          disk: '10.00 GB',
          region: 1,
          provider: 'aws',
          sliderValue: 78,
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'postgres-1', target: 'redis-1' },
      { id: 'e1-3', source: 'redis-1', target: 'mongodb-1' },
    ],
  },

  java: {
    nodes: [
      {
        id: 'mysql-1',
        type: 'database',
        position: { x: 300, y: 150 },
        data: {
          name: 'MySQL',
          description: 'Primary MySQL database',
          status: 'healthy',
          cpu: 0.05,
          memory: '0.1 GB',
          disk: '20.00 GB',
          region: 2,
          provider: 'aws',
          sliderValue: 30,
        },
      },
      {
        id: 'memcached-1',
        type: 'service',
        position: { x: 600, y: 150 },
        data: {
          name: 'Memcached',
          description: 'Distributed memory caching',
          status: 'degraded',
          cpu: 0.01,
          memory: '0.02 GB',
          disk: '5.00 GB',
          region: 1,
          provider: 'gcp',
          sliderValue: 50,
        },
      },
      {
        id: 'elasticsearch-1',
        type: 'service',
        position: { x: 450, y: 350 },
        data: {
          name: 'Elasticsearch',
          description: 'Search and analytics engine',
          status: 'healthy',
          cpu: 0.08,
          memory: '0.5 GB',
          disk: '50.00 GB',
          region: 1,
          provider: 'aws',
          sliderValue: 85,
        },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'mysql-1', target: 'memcached-1' },
      { id: 'e1-3', source: 'mysql-1', target: 'elasticsearch-1' },
    ],
  },

  python: {
    nodes: [
      {
        id: 'django-1',
        type: 'service',
        position: { x: 320, y: 180 },
        data: {
          name: 'Django API',
          description: 'Web API + admin backend',
          status: 'healthy',
          cpu: 0.04,
          memory: '0.15 GB',
          disk: '6.00 GB',
          region: 2,
          provider: 'aws',
          sliderValue: 55,
        },
      },
      {
        id: 'postgres-2',
        type: 'database',
        position: { x: 650, y: 180 },
        data: {
          name: 'Postgres',
          description: 'Primary relational database',
          status: 'healthy',
          cpu: 0.03,
          memory: '0.12 GB',
          disk: '25.00 GB',
          region: 2,
          provider: 'aws',
          sliderValue: 40,
        },
      },
      {
        id: 'celery-1',
        type: 'service',
        position: { x: 480, y: 380 },
        data: {
          name: 'Celery Worker',
          description: 'Async jobs + scheduled tasks',
          status: 'degraded',
          cpu: 0.02,
          memory: '0.10 GB',
          disk: '4.00 GB',
          region: 1,
          provider: 'gcp',
          sliderValue: 65,
        },
      },
    ],
    edges: [
      { id: 'e-py-1', source: 'django-1', target: 'postgres-2' },
      { id: 'e-py-2', source: 'django-1', target: 'celery-1' },
    ],
  },

  ruby: {
    nodes: [
      {
        id: 'rails-1',
        type: 'service',
        position: { x: 320, y: 180 },
        data: {
          name: 'Rails App',
          description: 'Web app + JSON API',
          status: 'healthy',
          cpu: 0.05,
          memory: '0.20 GB',
          disk: '8.00 GB',
          region: 1,
          provider: 'azure',
          sliderValue: 60,
        },
      },
      {
        id: 'postgres-3',
        type: 'database',
        position: { x: 650, y: 180 },
        data: {
          name: 'Postgres',
          description: 'Primary database',
          status: 'healthy',
          cpu: 0.03,
          memory: '0.14 GB',
          disk: '30.00 GB',
          region: 1,
          provider: 'azure',
          sliderValue: 35,
        },
      },
      {
        id: 'sidekiq-1',
        type: 'service',
        position: { x: 480, y: 380 },
        data: {
          name: 'Sidekiq',
          description: 'Background jobs processing',
          status: 'degraded',
          cpu: 0.02,
          memory: '0.12 GB',
          disk: '3.50 GB',
          region: 2,
          provider: 'aws',
          sliderValue: 70,
        },
      },
    ],
    edges: [
      { id: 'e-rb-1', source: 'rails-1', target: 'postgres-3' },
      { id: 'e-rb-2', source: 'rails-1', target: 'sidekiq-1' },
    ],
  },

  nodejs: {
    nodes: [
      {
        id: 'api-1',
        type: 'service',
        position: { x: 320, y: 180 },
        data: {
          name: 'Node API',
          description: 'Express/Fastify HTTP API',
          status: 'healthy',
          cpu: 0.04,
          memory: '0.18 GB',
          disk: '6.50 GB',
          region: 1,
          provider: 'aws',
          sliderValue: 58,
        },
      },
      {
        id: 'mongo-1',
        type: 'database',
        position: { x: 650, y: 180 },
        data: {
          name: 'MongoDB',
          description: 'Primary document database',
          status: 'healthy',
          cpu: 0.03,
          memory: '0.16 GB',
          disk: '35.00 GB',
          region: 1,
          provider: 'aws',
          sliderValue: 42,
        },
      },
      {
        id: 'redis-2',
        type: 'database',
        position: { x: 480, y: 380 },
        data: {
          name: 'Redis',
          description: 'Caching + rate limiting + sessions',
          status: 'degraded',
          cpu: 0.02,
          memory: '0.08 GB',
          disk: '8.00 GB',
          region: 2,
          provider: 'gcp',
          sliderValue: 66,
        },
      },
    ],
    edges: [
      { id: 'e-js-1', source: 'api-1', target: 'mongo-1' },
      { id: 'e-js-2', source: 'api-1', target: 'redis-2' },
    ],
  },
};

// Default graph for apps without specific data
export const defaultGraph: GraphData = {
  nodes: [
    {
      id: 'service-1',
      type: 'service',
      position: { x: 300, y: 200 },
      data: {
        name: 'API Service',
        description: 'Main API service',
        status: 'healthy',
        cpu: 0.03,
        memory: '0.1 GB',
        disk: '5.00 GB',
        region: 1,
        provider: 'aws',
        sliderValue: 40,
      },
    },
    {
      id: 'db-1',
      type: 'database',
      position: { x: 600, y: 200 },
      data: {
        name: 'Database',
        description: 'Primary database',
        status: 'healthy',
        cpu: 0.02,
        memory: '0.05 GB',
        disk: '10.00 GB',
        region: 1,
        provider: 'aws',
        sliderValue: 25,
      },
    },
    {
      id: 'cache-1',
      type: 'service',
      position: { x: 450, y: 400 },
      data: {
        name: 'Cache',
        description: 'Caching layer',
        status: 'degraded',
        cpu: 0.01,
        memory: '0.02 GB',
        disk: '2.00 GB',
        region: 1,
        provider: 'aws',
        sliderValue: 60,
      },
    },
  ],
  edges: [
    { id: 'e1-2', source: 'service-1', target: 'db-1' },
    { id: 'e1-3', source: 'service-1', target: 'cache-1' },
  ],
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchApps(): Promise<App[]> {
  await delay(500);
  return mockApps;
}

export async function fetchGraph(appId: string): Promise<GraphData> {
  await delay(600);
  return mockGraphs[appId] ?? defaultGraph;
}
