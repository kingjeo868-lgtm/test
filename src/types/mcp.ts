export interface McpServerInfo {
  name: string;
  version: string;
  protocolVersion: string;
  transport: 'JSON-RPC 2.0 (HTTP/POST & SSE)' | 'Stdio' | 'WebSocket';
  status: 'active' | 'degraded' | 'offline';
  endpoint: string;
}

export interface McpResource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
  category: 'article' | 'taxonomy' | 'market_data' | 'cooperative';
  itemCount?: number;
  tokenSizeEstimate: number;
}

export interface McpToolProperty {
  type: string;
  description: string;
  enum?: string[];
  default?: any;
}

export interface McpToolInputSchema {
  type: 'object';
  properties: Record<string, McpToolProperty>;
  required?: string[];
}

export interface McpTool {
  name: string;
  displayName: string;
  description: string;
  category: 'retrieval' | 'market_data' | 'nlp_analysis' | 'knowledge_graph' | 'editorial';
  inputSchema: McpToolInputSchema;
  sampleArgs: Record<string, any>;
}

export interface McpPromptArgument {
  name: string;
  description: string;
  required: boolean;
  defaultValue?: string;
}

export interface McpPrompt {
  name: string;
  displayName: string;
  description: string;
  arguments: McpPromptArgument[];
  template: string;
  systemInstruction?: string;
}

export interface McpToolCallResult {
  toolName: string;
  status: 'success' | 'error';
  latencyMs: number;
  tokensEstimated: number;
  content: {
    type: 'text' | 'json' | 'markdown';
    text?: string;
    data?: any;
  }[];
  rawJsonRpcRequest: Record<string, any>;
  rawJsonRpcResponse: Record<string, any>;
}

export interface ArticleKnowledgeNode {
  id: string;
  label: string;
  type: 'article' | 'crop' | 'location' | 'farmer' | 'cooperative' | 'solar_term' | 'market';
  color: string;
  details?: string;
}

export interface ArticleKnowledgeEdge {
  source: string;
  target: string;
  relation: string; // e.g. "栽種於", "隸屬", "時令節氣", "批發交易於", "撰寫報導"
}
