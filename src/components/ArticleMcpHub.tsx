import React, { useState } from 'react';
import { 
  Bot, 
  Cpu, 
  Terminal, 
  Database, 
  Sparkles, 
  Play, 
  Copy, 
  Check, 
  FileText, 
  Layers, 
  Code, 
  ExternalLink, 
  ArrowRight, 
  BookOpen, 
  Search, 
  Share2, 
  CheckCircle2, 
  TrendingUp, 
  Network, 
  HelpCircle, 
  RefreshCw, 
  Zap,
  Sliders,
  ChevronRight,
  Send,
  MessageSquare,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { 
  MCP_SERVER_INFO, 
  MCP_RESOURCES, 
  MCP_TOOLS, 
  MCP_PROMPTS, 
  executeMcpTool, 
  readMcpResource, 
  renderMcpPrompt,
  getKnowledgeGraphData,
  generateMcpConfigSnippet
} from '../utils/mcpEngine';
import { McpTool, McpToolCallResult, ViewMode } from '../types';
import { MOCK_ARTICLES } from '../data/mockData';

interface ArticleMcpHubProps {
  onNavigate?: (view: ViewMode) => void;
}

export const ArticleMcpHub: React.FC<ArticleMcpHubProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'tools' | 'resources' | 'prompts' | 'graph' | 'agent' | 'config'>('tools');
  
  // Tool Sandbox State
  const [selectedToolName, setSelectedToolName] = useState<string>(MCP_TOOLS[0].name);
  const [toolArgs, setToolArgs] = useState<Record<string, any>>(MCP_TOOLS[0].sampleArgs);
  const [isExecutingTool, setIsExecutingTool] = useState(false);
  const [toolExecutionResult, setToolExecutionResult] = useState<McpToolCallResult | null>(() => 
    executeMcpTool(MCP_TOOLS[0].name, MCP_TOOLS[0].sampleArgs)
  );
  const [outputDisplayTab, setOutputDisplayTab] = useState<'rendered' | 'json_response' | 'json_request'>('rendered');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Resource Viewer State
  const [selectedResourceUri, setSelectedResourceUri] = useState<string>(MCP_RESOURCES[0].uri);
  const [resourcePayload, setResourcePayload] = useState<{ uri: string; mimeType: string; content: any }>(() =>
    readMcpResource(MCP_RESOURCES[0].uri)
  );

  // Prompt Template State
  const [selectedPromptName, setSelectedPromptName] = useState<string>(MCP_PROMPTS[0].name);
  const [promptArgs, setPromptArgs] = useState<Record<string, string>>({
    farmerName: '陳健興 班長',
    region: '雲林縣西螺鎮',
    crop: '有機溫室黑葉白菜',
    philosophy: '以草蛉生物防治替代化學農藥，養護濁水溪黑泥有機質'
  });

  // Config Client State
  const [configClientType, setConfigClientType] = useState<'claude_desktop' | 'cursor' | 'typescript' | 'python'>('claude_desktop');

  // Agent Chat Simulation State
  const [agentMessages, setAgentMessages] = useState<{
    id: string;
    sender: 'user' | 'agent';
    text: string;
    toolCalls?: { tool: string; args: any; status: string; latency: number }[];
    sources?: string[];
  }[]>([
    {
      id: 'msg-init',
      sender: 'agent',
      text: '您好！我是好農方舟的文章 MCP（Model Context Protocol）智慧對話助理。我已直接對接本站產地報導全文、產銷行情大數據與農民合作社履歷資料庫。您可以點擊下方情境題，或直接發起調用！'
    }
  ]);
  const [isAgentThinking, setIsAgentThinking] = useState(false);

  // Graph state
  const graphData = getKnowledgeGraphData();
  const [selectedGraphNode, setSelectedGraphNode] = useState<string | null>('art_01');

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSelectTool = (tool: McpTool) => {
    setSelectedToolName(tool.name);
    setToolArgs({ ...tool.sampleArgs });
    const result = executeMcpTool(tool.name, tool.sampleArgs);
    setToolExecutionResult(result);
  };

  const handleExecuteTool = () => {
    setIsExecutingTool(true);
    setTimeout(() => {
      const result = executeMcpTool(selectedToolName, toolArgs);
      setToolExecutionResult(result);
      setIsExecutingTool(false);
    }, 280);
  };

  const handleSelectResource = (uri: string) => {
    setSelectedResourceUri(uri);
    setResourcePayload(readMcpResource(uri));
  };

  const handleSelectPrompt = (name: string) => {
    setSelectedPromptName(name);
    const p = MCP_PROMPTS.find(item => item.name === name);
    if (p) {
      const initialArgs: Record<string, string> = {};
      p.arguments.forEach(arg => {
        initialArgs[arg.name] = arg.defaultValue || '';
      });
      setPromptArgs(initialArgs);
    }
  };

  const handleRunAgentScenario = (scenario: 'xiluo' | 'fangshan' | 'forecast') => {
    if (isAgentThinking) return;

    let userQuery = '';
    let toolFlow: { tool: string; args: any; status: string; latency: number }[] = [];
    let agentReply = '';
    let sources: string[] = [];

    if (scenario === 'xiluo') {
      userQuery = '西螺有機蔬菜相較於一般批發市場慣行蔬菜，具備哪些風土優勢與行情競爭力？';
      toolFlow = [
        { tool: 'search_articles', args: { query: '西螺有機蔬菜', category: 'story' }, status: 'ok', latency: 38 },
        { tool: 'get_article_context', args: { articleId: 'art_01', format: 'markdown_with_citations' }, status: 'ok', latency: 42 },
        { tool: 'cross_correlate_market_prices', args: { articleId: 'art_01', cropKeyword: '西螺蔬菜' }, status: 'ok', latency: 55 }
      ];
      agentReply = `根據專案報導《濁水溪畔的綠色奇蹟》（haonong://articles/art_01）與台北果菜批發即時交聯數據分析：
1. **風土核心優勢**：西螺位於濁水溪沖積平原，富含黑泥微量元素（鐵/矽/錳），綠金農場以智慧滴灌節水 38%，並藉由草蛉與椿象生物防治使土壤有機質自 1.8% 攀升至 4.5%。
2. **批發行情溢價**：經 \`cross_correlate_market_prices\` 即時計算，西螺有機蔬菜相較於傳統慣行蔬菜享有平均 185% 的穩固溢價比率，即使遇到盛產期因有好農方舟低溫冷鏈契作保證收購，完全免除崩盤風險。
3. **金句印證**：陳健興班長強調：「土地是有生命的，你對它好，它就會長出最清甜的蔬菜回報你。」`;
      sources = ['haonong://articles/art_01', 'haonong://cooperatives/directory', '農業部台北一市行情數據庫'];
    } else if (scenario === 'fangshan') {
      userQuery = '請提取屏東枋山在欉紅愛文芒果的微氣候生理機制與科學糖度品管指標。';
      toolFlow = [
        { tool: 'get_article_context', args: { articleId: 'art_02' }, status: 'ok', latency: 35 },
        { tool: 'extract_entities_and_facts', args: { articleId: 'art_02', entityTypes: 'crop, terroir, metric, standard' }, status: 'ok', latency: 46 }
      ];
      agentReply = `透過 \`extract_entities_and_facts\` 工具對專訪《落山風淬鍊的紅寶石》（haonong://articles/art_02）進行深度實體提煉：
1. **微氣候機制**：恆春半島每年 10 月至翌年 4 月強勁落山風（過山沉降風）抑制果樹營養枝徒長，促使光線均勻穿透果冠，並有效抑制炭疽病傳播；
2. **自然熟成堅持**：堅持 0% 化學催熟劑，讓愛文芒果在樹枝上吸飽陽光自然熟成掉入套袋；
3. **品質硬指標**：
   - 糖度（Brix）：高達 15.0°Brix ~ 16.5°Brix
   - 疏果標準：嚴格執行「一枝一果」頂級規格
   - 認證標準：具備 TAP 產銷履歷並通過出口日本檢疫標準。`;
      sources = ['haonong://articles/art_02', 'haonong://taxonomies/terroirs'];
    } else {
      userQuery = '農業大數據模型如何提前21天防範甘藍產銷失衡？';
      toolFlow = [
        { tool: 'get_article_context', args: { articleId: 'art_03' }, status: 'ok', latency: 32 },
        { tool: 'generate_article_brief', args: { articleId: 'art_03', targetAudience: 'b2b_buyer' }, status: 'ok', latency: 49 }
      ];
      agentReply = `引用專題《大數據看菜價》（haonong://articles/art_03）架構解析：
1. **數據多源對齊**：系統每日自動爬梳農業部育苗場出苗量、產區定植面積與中央氣象署數值預報；
2. **21天提前預警體系**：在種苗下田初期即精準推估採收期重疊度，分為綠色（正常）、黃色（注意）、紅色（超產警戒）；
3. **三級防禦反制**：若觸發紅色警戒，好農方舟平台即刻啟動加工預冷收購、低溫滾動倉儲與線上早鳥契作促銷排程，將菜金菜土週期平準化。`;
      sources = ['haonong://articles/art_03', 'haonong://taxonomies/solar_terms'];
    }

    // Append user message
    const userMsgId = 'msg-' + Date.now();
    setAgentMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: userQuery }]);
    setIsAgentThinking(true);

    setTimeout(() => {
      setAgentMessages(prev => [
        ...prev,
        {
          id: 'msg-agent-' + Date.now(),
          sender: 'agent',
          text: agentReply,
          toolCalls: toolFlow,
          sources
        }
      ]);
      setIsAgentThinking(false);
    }, 650);
  };

  const selectedTool = MCP_TOOLS.find(t => t.name === selectedToolName) || MCP_TOOLS[0];
  const selectedPrompt = MCP_PROMPTS.find(p => p.name === selectedPromptName) || MCP_PROMPTS[0];
  const renderedPrompt = renderMcpPrompt(selectedPromptName, promptArgs);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 font-sans">
      
      {/* 1. Protocol Status Top Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-14 sm:top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              MCP SERVER: ACTIVE
            </span>
            <span className="text-slate-400 font-mono">SPEC: 2024-11-05</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400 font-mono">TRANSPORT: JSON-RPC 2.0 (SSE / HTTP)</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-emerald-300/80 font-mono">ENDPOINT: /api/mcp/v1</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigate && (
              <button
                onClick={() => onNavigate('articles')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>返回專欄閱讀</span>
              </button>
            )}
            {onNavigate && (
              <button
                onClick={() => onNavigate('admin')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>後台 CMS</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Hero Header */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 text-xs font-mono">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>MODEL CONTEXT PROTOCOL (MCP) ARTICLES SUITE</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-serif">
                文章 MCP 智慧功能模組
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-3xl leading-relaxed">
                遵循 Anthropic 官方 Model Context Protocol 標準，將好農方舟產地深度報導、農業部 17 處批發交易行情與風土知識庫封裝為可供 LLM（Claude、Gemini、GPT-4）直接調用的標準化工具、資源與提示詞。
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-center min-w-[75px]">
                <div className="text-[10px] text-slate-500 uppercase">Tools</div>
                <div className="text-emerald-400 font-bold text-base mt-0.5">{MCP_TOOLS.length}</div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-center min-w-[75px]">
                <div className="text-[10px] text-slate-500 uppercase">Resources</div>
                <div className="text-cyan-400 font-bold text-base mt-0.5">{MCP_RESOURCES.length}</div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-center min-w-[75px]">
                <div className="text-[10px] text-slate-500 uppercase">Prompts</div>
                <div className="text-purple-400 font-bold text-base mt-0.5">{MCP_PROMPTS.length}</div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-center min-w-[75px]">
                <div className="text-[10px] text-slate-500 uppercase">Context</div>
                <div className="text-amber-400 font-bold text-base mt-0.5">6.8k tok</div>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-4 border-t border-slate-800/80 scrollbar-none">
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'tools'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>1. 協定工具沙盒 (Tools Sandbox)</span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'resources'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>2. 資源庫瀏覽器 (Resources)</span>
            </button>

            <button
              onClick={() => setActiveTab('prompts')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'prompts'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>3. 提示詞範本 (Prompts)</span>
            </button>

            <button
              onClick={() => setActiveTab('graph')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'graph'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>4. 知識圖譜拓撲 (Knowledge Graph)</span>
            </button>

            <button
              onClick={() => setActiveTab('agent')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'agent'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>5. AI 產銷對話模擬 (Agent Demo)</span>
            </button>

            <button
              onClick={() => setActiveTab('config')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'config'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>6. 伺服器配置與匯出 (Server Config)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Body per Tab */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* ================= TAB 1: TOOLS SANDBOX ================= */}
        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Tool Selection & Parameter Form */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>註冊之 MCP 工具清單 (Registered Tools)</span>
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    tools/list: {MCP_TOOLS.length} Ready
                  </span>
                </div>

                <div className="space-y-2">
                  {MCP_TOOLS.map(tool => (
                    <button
                      key={tool.name}
                      onClick={() => handleSelectTool(tool)}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                        selectedToolName === tool.name
                          ? 'bg-emerald-950/70 border-emerald-500/70 text-white shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-emerald-300">
                          {tool.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                          {tool.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {tool.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tool Argument Form */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                      <span>工具參數設定 (Input Schema)</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {selectedTool.name}
                    </div>
                  </div>

                  <button
                    onClick={() => setToolArgs({ ...selectedTool.sampleArgs })}
                    className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                    title="還原為預設範例參數"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>還原範例</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {Object.entries(selectedTool.inputSchema.properties).map(([propName, propConfig]) => {
                    const isRequired = selectedTool.inputSchema.required?.includes(propName);
                    return (
                      <div key={propName} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <label className="font-mono text-slate-300 flex items-center gap-1">
                            <span>{propName}</span>
                            {isRequired && <span className="text-rose-400 text-[10px]">*required</span>}
                          </label>
                          <span className="text-[10px] font-mono text-slate-500">{propConfig.type}</span>
                        </div>
                        <p className="text-[10px] text-slate-400">{propConfig.description}</p>

                        {propConfig.enum ? (
                          <select
                            value={toolArgs[propName] ?? propConfig.default ?? ''}
                            onChange={(e) => setToolArgs(prev => ({ ...prev, [propName]: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                          >
                            {propConfig.enum.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : propConfig.type === 'boolean' ? (
                          <div className="flex items-center gap-3 pt-1">
                            <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                              <input
                                type="radio"
                                name={propName}
                                checked={toolArgs[propName] === true}
                                onChange={() => setToolArgs(prev => ({ ...prev, [propName]: true }))}
                                className="text-emerald-500"
                              />
                              <span>true (開啟)</span>
                            </label>
                            <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                              <input
                                type="radio"
                                name={propName}
                                checked={toolArgs[propName] === false}
                                onChange={() => setToolArgs(prev => ({ ...prev, [propName]: false }))}
                                className="text-emerald-500"
                              />
                              <span>false (關閉)</span>
                            </label>
                          </div>
                        ) : propConfig.type === 'number' ? (
                          <input
                            type="number"
                            value={toolArgs[propName] ?? propConfig.default ?? 5}
                            onChange={(e) => setToolArgs(prev => ({ ...prev, [propName]: Number(e.target.value) }))}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                          />
                        ) : (
                          <input
                            type="text"
                            value={toolArgs[propName] ?? ''}
                            onChange={(e) => setToolArgs(prev => ({ ...prev, [propName]: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                            placeholder={propConfig.description}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={handleExecuteTool}
                  disabled={isExecutingTool}
                  className="w-full mt-2 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {isExecutingTool ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>正在執行 JSON-RPC 調用中...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>執行 MCP 工具調用 (Execute Tool)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Execution Inspector & Live Results */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                {/* Result Header & Tabs */}
                <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                      <span>調用回應結果 (Tool Result)</span>
                    </span>

                    {toolExecutionResult && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                        <span className="text-emerald-400">● {toolExecutionResult.latencyMs} ms</span>
                        <span>|</span>
                        <span className="text-amber-400">~{toolExecutionResult.tokensEstimated} Tokens</span>
                      </span>
                    )}
                  </div>

                  {/* Inspector View Mode */}
                  <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
                    <button
                      onClick={() => setOutputDisplayTab('rendered')}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                        outputDisplayTab === 'rendered'
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      格式化預覽
                    </button>
                    <button
                      onClick={() => setOutputDisplayTab('json_response')}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer font-mono ${
                        outputDisplayTab === 'json_response'
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Response (JSON)
                    </button>
                    <button
                      onClick={() => setOutputDisplayTab('json_request')}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer font-mono ${
                        outputDisplayTab === 'json_request'
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Request (JSON)
                    </button>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-4 min-h-[420px] max-h-[600px] overflow-y-auto font-mono text-xs">
                  {toolExecutionResult ? (
                    <>
                      {outputDisplayTab === 'rendered' && (
                        <div className="space-y-4 font-sans text-slate-200">
                          {toolExecutionResult.content.map((block, idx) => (
                            <div key={idx} className="space-y-2">
                              {block.type === 'text' && (
                                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-200 text-xs leading-relaxed">
                                  {block.text}
                                </div>
                              )}

                              {block.type === 'markdown' && (
                                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs leading-relaxed space-y-2 whitespace-pre-wrap font-sans">
                                  {block.text}
                                </div>
                              )}

                              {block.type === 'json' && (
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                                    <span>STRUCTURED MCP PAYLOAD:</span>
                                    <button
                                      onClick={() => handleCopy(JSON.stringify(block.data, null, 2), 'block_data_' + idx)}
                                      className="text-emerald-400 hover:underline flex items-center gap-1"
                                    >
                                      {copiedKey === 'block_data_' + idx ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                      <span>複製 JSON</span>
                                    </button>
                                  </div>
                                  <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 text-[11px] font-mono overflow-x-auto">
                                    {JSON.stringify(block.data, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {outputDisplayTab === 'json_response' && (
                        <div className="relative">
                          <button
                            onClick={() => handleCopy(JSON.stringify(toolExecutionResult.rawJsonRpcResponse, null, 2), 'resp_json')}
                            className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-sans flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === 'resp_json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>複製完整 Response</span>
                          </button>
                          <pre className="text-emerald-400 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                            {JSON.stringify(toolExecutionResult.rawJsonRpcResponse, null, 2)}
                          </pre>
                        </div>
                      )}

                      {outputDisplayTab === 'json_request' && (
                        <div className="relative">
                          <button
                            onClick={() => handleCopy(JSON.stringify(toolExecutionResult.rawJsonRpcRequest, null, 2), 'req_json')}
                            className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-sans flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === 'req_json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>複製 Request</span>
                          </button>
                          <pre className="text-cyan-400 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                            {JSON.stringify(toolExecutionResult.rawJsonRpcRequest, null, 2)}
                          </pre>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 text-center py-20 font-sans">
                      <div>
                        <Terminal className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                        <p>點擊左側「執行 MCP 工具調用」即時檢視回應</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Protocol Specs Quick Callout */}
              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-200">全站語意上下文驗證保證：</span>
                  <p className="leading-relaxed text-[11px]">
                    所有經由 MCP 工具返回之專欄段落與行情數值，均包含確切來源 URI（例如 \`haonong://articles/art_01\`）與農委會公設市場交易日報代碼，確保 AI Agent 回答具備 100% Grounding 可追溯性與零幻覺。
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: RESOURCES BROWSER ================= */}
        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Resource Endpoints List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <span>MCP 資源庫端點 (resources/list)</span>
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {MCP_RESOURCES.length} Resources
                  </span>
                </div>

                <div className="space-y-2">
                  {MCP_RESOURCES.map(res => (
                    <button
                      key={res.uri}
                      onClick={() => handleSelectResource(res.uri)}
                      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedResourceUri === res.uri
                          ? 'bg-cyan-950/60 border-cyan-500/70 text-white shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-cyan-300 truncate">
                          {res.uri}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono shrink-0 ml-2">
                          ~{res.tokenSizeEstimate} tok
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-200 mt-1">
                        {res.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                        {res.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Resource Content Inspector */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3">
                  <div className="truncate">
                    <div className="text-[10px] text-slate-500 font-mono uppercase">Resource Payload (resources/read)</div>
                    <div className="text-xs font-mono font-bold text-cyan-300 truncate mt-0.5">
                      {resourcePayload.uri}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      MIME: {resourcePayload.mimeType}
                    </span>
                    <button
                      onClick={() => handleCopy(
                        typeof resourcePayload.content === 'string' 
                          ? resourcePayload.content 
                          : JSON.stringify(resourcePayload.content, null, 2), 
                        'resource_payload'
                      )}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedKey === 'resource_payload' ? <Check className="w-3 h-3 text-cyan-400" /> : <Copy className="w-3 h-3" />}
                      <span>複製內文</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 min-h-[460px] max-h-[620px] overflow-y-auto">
                  {resourcePayload.mimeType === 'text/markdown' ? (
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-slate-300 text-xs whitespace-pre-wrap leading-relaxed font-sans">
                      {resourcePayload.content}
                    </div>
                  ) : (
                    <pre className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-cyan-400 text-xs font-mono overflow-x-auto leading-relaxed">
                      {JSON.stringify(resourcePayload.content, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: PROMPTS REGISTRY ================= */}
        {activeTab === 'prompts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Prompt Select & Variables */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>MCP 預設提示詞樣板 (prompts/list)</span>
                  </h3>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                    {MCP_PROMPTS.length} Templates
                  </span>
                </div>

                <div className="space-y-2">
                  {MCP_PROMPTS.map(p => (
                    <button
                      key={p.name}
                      onClick={() => handleSelectPrompt(p.name)}
                      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedPromptName === p.name
                          ? 'bg-purple-950/60 border-purple-500/70 text-white shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold text-purple-300">
                        {p.name}
                      </div>
                      <div className="text-xs font-bold text-slate-200 mt-1">
                        {p.displayName}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                        {p.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Arguments */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3">
                <div className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  <span>樣板變數填入 (Template Variables)</span>
                </div>

                <div className="space-y-3">
                  {selectedPrompt.arguments.map(arg => (
                    <div key={arg.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <label className="font-mono text-slate-300">
                          {`{{${arg.name}}}`}
                        </label>
                        {arg.required && <span className="text-rose-400 text-[10px]">*required</span>}
                      </div>
                      <p className="text-[10px] text-slate-400">{arg.description}</p>
                      <textarea
                        rows={2}
                        value={promptArgs[arg.name] || ''}
                        onChange={(e) => setPromptArgs(prev => ({ ...prev, [arg.name]: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                        placeholder={arg.description}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Compiled Prompt Preview */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] text-slate-500 font-mono uppercase">Compiled Prompt Preview (prompts/get)</div>
                    <div className="text-xs font-mono font-bold text-purple-300 mt-0.5">
                      {selectedPrompt.name}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(
                      `${renderedPrompt.systemInstruction ? `[SYSTEM INSTRUCTION]\n${renderedPrompt.systemInstruction}\n\n[USER PROMPT]\n` : ''}${renderedPrompt.promptText}`,
                      'prompt_text'
                    )}
                    className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                  >
                    {copiedKey === 'prompt_text' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>複製完整 Prompt</span>
                  </button>
                </div>

                <div className="p-4 space-y-4 min-h-[460px] max-h-[620px] overflow-y-auto text-xs">
                  {renderedPrompt.systemInstruction && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Bot className="w-3.5 h-3.5 text-purple-400" />
                        <span>System Instruction:</span>
                      </div>
                      <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-800/60 text-purple-200 leading-relaxed font-sans">
                        {renderedPrompt.systemInstruction}
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono font-bold text-slate-400 uppercase flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>Rendered User Prompt:</span>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                      {renderedPrompt.promptText}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 4: KNOWLEDGE GRAPH ================= */}
        {activeTab === 'graph' && (
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Network className="w-4 h-4 text-emerald-400" />
                    <span>文章多維語意圖譜拓撲 (Article Multi-Entity Knowledge Graph)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    展示文章專題與產地微氣候、作物品種、農友合作社、節氣時令與批發市場交易節點之多對多語意拓撲。
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <span className="flex items-center gap-1 text-[11px] text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> 專題文章
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> 作物
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" /> 產地風土
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> 職人農友
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" /> 批發市場
                  </span>
                </div>
              </div>

              {/* Interactive Node Network Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {/* Nodes list */}
                <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>圖譜節點矩陣 (點擊節點聚焦關聯)</span>
                    <span className="font-mono text-[11px] text-emerald-400">{graphData.nodes.length} Nodes / {graphData.edges.length} Edges</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                    {graphData.nodes.map(node => (
                      <div
                        key={node.id}
                        onClick={() => setSelectedGraphNode(node.id)}
                        className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          selectedGraphNode === node.id
                            ? 'bg-slate-800 border-emerald-400 text-white shadow-md ring-1 ring-emerald-500/50'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span 
                            className="w-2 h-2 rounded-full shrink-0" 
                            style={{ backgroundColor: node.color }} 
                          />
                          <span className="text-[10px] font-mono text-slate-400 uppercase">
                            {node.type}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-100 mt-1 truncate">
                          {node.label}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                          {node.details}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Edges Flow Visualization */}
                  <div className="pt-3 border-t border-slate-800">
                    <div className="text-[11px] font-bold text-slate-400 mb-2 font-mono">
                      語意關係三元組 (Subject → Predicate → Object):
                    </div>
                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                      {graphData.edges.map((edge, idx) => {
                        const srcNode = graphData.nodes.find(n => n.id === edge.source);
                        const tgtNode = graphData.nodes.find(n => n.id === edge.target);
                        const isHighlighted = selectedGraphNode === edge.source || selectedGraphNode === edge.target;

                        return (
                          <div 
                            key={idx}
                            className={`flex items-center gap-2 text-[11px] px-2.5 py-1 rounded transition-colors ${
                              isHighlighted 
                                ? 'bg-emerald-950/70 border border-emerald-700/50 text-emerald-200' 
                                : 'bg-slate-900 text-slate-400'
                            }`}
                          >
                            <span className="font-bold text-slate-200">{srcNode?.label || edge.source}</span>
                            <ArrowRight className="w-3 h-3 text-emerald-500 shrink-0" />
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                              {edge.relation}
                            </span>
                            <ArrowRight className="w-3 h-3 text-emerald-500 shrink-0" />
                            <span className="font-bold text-slate-200">{tgtNode?.label || edge.target}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Node Detail Inspector */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      節點檢視器 (Entity Inspector)
                    </div>

                    {selectedGraphNode ? (() => {
                      const node = graphData.nodes.find(n => n.id === selectedGraphNode);
                      const connectedEdges = graphData.edges.filter(e => e.source === node?.id || e.target === node?.id);
                      if (!node) return null;

                      return (
                        <div className="mt-3 space-y-3">
                          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                            <div className="flex items-center gap-1.5">
                              <span 
                                className="w-2.5 h-2.5 rounded-full" 
                                style={{ backgroundColor: node.color }} 
                              />
                              <span className="text-xs font-bold text-white">{node.label}</span>
                            </div>
                            <div className="text-[11px] font-mono text-emerald-400">ID: {node.id}</div>
                            <p className="text-xs text-slate-300">{node.details}</p>
                          </div>

                          <div>
                            <div className="text-[11px] font-bold text-slate-400 mb-1.5">直接關聯數 ({connectedEdges.length}):</div>
                            <div className="space-y-1">
                              {connectedEdges.map((e, idx) => (
                                <div key={idx} className="text-[11px] text-slate-300 bg-slate-900 px-2 py-1 rounded flex items-center justify-between">
                                  <span>{e.relation}</span>
                                  <span className="font-mono text-slate-400 text-[10px]">
                                    {e.source === node.id ? e.target : e.source}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })() : (
                      <div className="text-slate-500 text-xs text-center py-10">
                        點選左側任一節點以展開詳細語意屬性
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      const graphResult = executeMcpTool('export_article_knowledge_graph', { articleId: 'all', format: 'nodes_and_edges' });
                      handleCopy(JSON.stringify(graphResult.content[1].data, null, 2), 'graph_export');
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copiedKey === 'graph_export' ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>匯出 Schema.org 知識圖譜 JSON</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: AGENT CONVERSATION DEMO ================= */}
        {activeTab === 'agent' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Quick Prompts / Scenarios */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span>實境對話情境實測 (Simulated Scenarios)</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  點擊以下預設問題，觀察 AI Agent 如何自動發送 MCP Tool Call、抓取文章上下文並產出帶有確切數據依據的解答：
                </p>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => handleRunAgentScenario('xiluo')}
                    disabled={isAgentThinking}
                    className="w-full text-left p-3 rounded-lg bg-slate-950 hover:bg-emerald-950/50 border border-slate-800 hover:border-emerald-700/60 transition-all cursor-pointer group disabled:opacity-50"
                  >
                    <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300">
                      情境 A：西螺有機蔬菜優勢與行情
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      「西螺有機蔬菜相較於一般批發市場慣行蔬菜，具備哪些風土優勢與行情競爭力？」
                    </div>
                    <div className="mt-2 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <span>調用: search_articles + cross_correlate_market_prices</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>

                  <button
                    onClick={() => handleRunAgentScenario('fangshan')}
                    disabled={isAgentThinking}
                    className="w-full text-left p-3 rounded-lg bg-slate-950 hover:bg-amber-950/50 border border-slate-800 hover:border-amber-700/60 transition-all cursor-pointer group disabled:opacity-50"
                  >
                    <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300">
                      情境 B：枋山愛文芒果在欉紅糖度
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      「請提取屏東枋山在欉紅愛文芒果的微氣候生理機制與科學糖度品管指標。」
                    </div>
                    <div className="mt-2 text-[10px] text-amber-400 font-mono flex items-center gap-1">
                      <span>調用: get_article_context + extract_entities_and_facts</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>

                  <button
                    onClick={() => handleRunAgentScenario('forecast')}
                    disabled={isAgentThinking}
                    className="w-full text-left p-3 rounded-lg bg-slate-950 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-700/60 transition-all cursor-pointer group disabled:opacity-50"
                  >
                    <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300">
                      情境 C：甘藍產銷失衡提前21天預警
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      「農業大數據模型如何提前21天防範甘藍產銷失衡？」
                    </div>
                    <div className="mt-2 text-[10px] text-cyan-400 font-mono flex items-center gap-1">
                      <span>調用: get_article_context + generate_article_brief</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Live Chat Box */}
            <div className="lg:col-span-8 bg-slate-900 rounded-xl border border-slate-800 flex flex-col h-[580px] overflow-hidden">
              <div className="p-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">好農方舟・產銷專欄 MCP 智慧助理</div>
                    <div className="text-[10px] font-mono text-emerald-400">Model: Gemini 2.5 Flash / Claude 3.5 Sonnet (MCP Enabled)</div>
                  </div>
                </div>

                <button
                  onClick={() => setAgentMessages([agentMessages[0]])}
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  清空對話
                </button>
              </div>

              {/* Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
                {agentMessages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-400 font-mono">
                      <span>{msg.sender === 'user' ? '您 (User)' : '好農方舟 AI (Agent)'}</span>
                    </div>

                    <div 
                      className={`max-w-[88%] p-3.5 rounded-xl space-y-2 leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-br-none'
                          : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-none shadow-md'
                      }`}
                    >
                      {/* Tool Calls Execution Badge */}
                      {msg.toolCalls && msg.toolCalls.length > 0 && (
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 font-mono text-[11px]">
                          <div className="text-emerald-400 font-bold flex items-center gap-1.5 text-[10px]">
                            <Terminal className="w-3 h-3" />
                            <span>MCP TOOLS INVOKED ({msg.toolCalls.length}):</span>
                          </div>
                          {msg.toolCalls.map((tc, idx) => (
                            <div key={idx} className="flex items-center justify-between text-slate-400 bg-slate-950/70 px-2 py-1 rounded">
                              <span className="text-emerald-300">● {tc.tool}()</span>
                              <span className="text-[10px] text-slate-500">{tc.latency}ms</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="whitespace-pre-wrap">{msg.text}</div>

                      {/* Source Citations */}
                      {msg.sources && (
                        <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 flex-wrap text-[10px] text-slate-400 font-mono">
                          <span className="text-slate-500">來源溯源:</span>
                          {msg.sources.map((src, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 text-emerald-400 border border-slate-800">
                              {src}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isAgentThinking && (
                  <div className="flex items-start gap-2 text-slate-400">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                      <span className="text-xs">AI 正在解析 MCP Tool Call 並執行文章語意檢索中...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="點選左側情境題，或直接體驗 MCP 智慧調用..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleRunAgentScenario('xiluo');
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button
                  onClick={() => handleRunAgentScenario('xiluo')}
                  disabled={isAgentThinking}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>發送</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 6: SERVER CONFIG & EXPORT ================= */}
        {activeTab === 'config' && (
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Code className="w-4 h-4 text-emerald-400" />
                    <span>MCP 客戶端配置代碼產生器 (Client Configuration Snippets)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    一鍵複製標準配置檔，將好農方舟的文章 MCP 伺服器掛載進您的 Claude Desktop、Cursor IDE、Python 腳本或 Node.js 系統。
                  </p>
                </div>

                {/* Client Selector */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                  <button
                    onClick={() => setConfigClientType('claude_desktop')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                      configClientType === 'claude_desktop' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Claude Desktop
                  </button>
                  <button
                    onClick={() => setConfigClientType('cursor')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                      configClientType === 'cursor' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Cursor IDE
                  </button>
                  <button
                    onClick={() => setConfigClientType('typescript')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                      configClientType === 'typescript' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    TypeScript SDK
                  </button>
                  <button
                    onClick={() => setConfigClientType('python')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                      configClientType === 'python' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Python SDK
                  </button>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="relative">
                <button
                  onClick={() => handleCopy(generateMcpConfigSnippet(configClientType), 'mcp_config')}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
                >
                  {copiedKey === 'mcp_config' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>複製配置內容</span>
                </button>

                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 text-xs font-mono overflow-x-auto leading-relaxed">
                  {generateMcpConfigSnippet(configClientType)}
                </pre>
              </div>

              {/* Step-by-step installation instructions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center text-[10px] font-mono font-bold">1</span>
                    <span>安裝與掛載</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    將上述 JSON 貼入相應客戶端的 MCP 設定檔（例如 MacOS 下之 <code className="text-emerald-300">~/Library/Application Support/Claude/claude_desktop_config.json</code>）。
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center text-[10px] font-mono font-bold">2</span>
                    <span>自動握手驗證</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    重啟 Claude Desktop 或 Cursor，客戶端將自動向 <code className="text-emerald-300">/api/mcp</code> 發送 <code className="text-emerald-300">tools/list</code> 握手請求。
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center text-[10px] font-mono font-bold">3</span>
                    <span>開展產銷對話</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    在 Claude 輸入「查詢西螺有機蔬菜文章與最新批發價格」，AI 將無縫透過 MCP 工具完成上下文檢索與回答。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
