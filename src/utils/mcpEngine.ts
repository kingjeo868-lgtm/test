import { MOCK_ARTICLES, MOCK_MARKET_PRICES, MOCK_COOPERATIVES } from '../data/mockData';
import { 
  McpServerInfo, 
  McpResource, 
  McpTool, 
  McpPrompt, 
  McpToolCallResult,
  ArticleKnowledgeNode,
  ArticleKnowledgeEdge
} from '../types/mcp';

export const MCP_SERVER_INFO: McpServerInfo = {
  name: 'haonong-articles-mcp-server',
  version: '1.4.2',
  protocolVersion: '2024-11-05',
  transport: 'JSON-RPC 2.0 (HTTP/POST & SSE)',
  status: 'active',
  endpoint: 'https://api.haonong.tw/mcp/v1'
};

export const MCP_RESOURCES: McpResource[] = [
  {
    uri: 'haonong://articles/catalog',
    name: '好農方舟全站專欄目錄與語意索引 (Articles Catalog)',
    description: '匯總全站產地深度專訪、栽培技術分析與農經大數據專案，提供全文語意切片與標籤分類',
    mimeType: 'application/json',
    category: 'article',
    itemCount: MOCK_ARTICLES.length,
    tokenSizeEstimate: 1240
  },
  {
    uri: 'haonong://articles/art_01',
    name: '專題：西螺有機蔬菜聚落的十年轉型之路',
    description: '濁水溪黑泥風土、生物天敵綜合防治、滴灌節水38%與好農冷鏈契作模式',
    mimeType: 'text/markdown',
    category: 'article',
    tokenSizeEstimate: 850
  },
  {
    uri: 'haonong://articles/art_02',
    name: '專題：枋山在欉紅愛文芒果的極致甜度哲學',
    description: '落山風抗病微氣候、自然熟成套袋工法、一枝一果疏果與甜度15°Brix品管',
    mimeType: 'text/markdown',
    category: 'article',
    tokenSizeEstimate: 720
  },
  {
    uri: 'haonong://articles/art_03',
    name: '專題：氣候變遷下智慧農業產銷供需平衡預警',
    description: '農業部17處果菜市場交易數據結合氣象數值預報，甘藍失衡三級預警與滾動冷藏',
    mimeType: 'text/markdown',
    category: 'article',
    tokenSizeEstimate: 910
  },
  {
    uri: 'haonong://taxonomies/terroirs',
    name: '台灣主要農業微氣候風土資料庫 (Taiwan Terroirs Ontology)',
    description: '包含濁水溪黑泥沖積土、恆春半島落山風珊瑚礁鹽地、台南曾文溪沙質壤土之微氣候指標',
    mimeType: 'application/json',
    category: 'taxonomy',
    itemCount: 8,
    tokenSizeEstimate: 620
  },
  {
    uri: 'haonong://taxonomies/solar_terms',
    name: '二十四節氣時令採收對照曆 (Solar Terms Harvesting Calendar)',
    description: '雨水、立夏、處暑、秋分、小雪等節氣適栽作物與傳統風土農事指南',
    mimeType: 'application/json',
    category: 'taxonomy',
    itemCount: 24,
    tokenSizeEstimate: 1100
  },
  {
    uri: 'haonong://cooperatives/directory',
    name: '全台認證農民合作社與產銷班索引 (Cooperatives Registry)',
    description: '對接農糧署登記之生產合作社、運銷班、TAP溯源批次管理代碼',
    mimeType: 'application/json',
    category: 'cooperative',
    itemCount: MOCK_COOPERATIVES.length,
    tokenSizeEstimate: 1450
  }
];

export const MCP_TOOLS: McpTool[] = [
  {
    name: 'search_articles',
    displayName: '檢索食農專欄 (Search Articles)',
    description: '依據關鍵字、作物分類、產地縣市或驗證標章進行語意檢索，返回結構化文章切片與相關度評分',
    category: 'retrieval',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: '搜尋關鍵字（例如：「有機蔬菜」、「落山風」、「大數據預警」、「西螺」）'
        },
        category: {
          type: 'string',
          description: '文章類別',
          enum: ['all', 'story', 'tech', 'market_analysis']
        },
        limit: {
          type: 'number',
          description: '最多返回結果數量（預設 5）',
          default: 5
        }
      },
      required: ['query']
    },
    sampleArgs: {
      query: '西螺有機蔬菜',
      category: 'all',
      limit: 3
    }
  },
  {
    name: 'get_article_context',
    displayName: '取得文章高密度上下文 (Get Article Context)',
    description: '提煉文章的段落論述、農民受訪語錄、實驗數據與學術引用，優化為大語言模型（LLM）適合吸收的 Context Prompt',
    category: 'nlp_analysis',
    inputSchema: {
      type: 'object',
      properties: {
        articleId: {
          type: 'string',
          description: '文章識別碼（如 "art_01", "art_02", "art_03"）'
        },
        format: {
          type: 'string',
          description: '輸出格式',
          enum: ['markdown_with_citations', 'structured_chunks', 'qa_grounding_pack'],
          default: 'markdown_with_citations'
        },
        includeInterviewQuotes: {
          type: 'boolean',
          description: '是否包含農民訪談原始受訪引言',
          default: true
        }
      },
      required: ['articleId']
    },
    sampleArgs: {
      articleId: 'art_01',
      format: 'markdown_with_citations',
      includeInterviewQuotes: true
    }
  },
  {
    name: 'cross_correlate_market_prices',
    displayName: '串聯批發行情數據 (Cross-Correlate Market Prices)',
    description: '自動分析文章提及的作物與產地，直接聯集農業部17處果菜批發市場之交易均價、漲跌幅與溢價分析',
    category: 'market_data',
    inputSchema: {
      type: 'object',
      properties: {
        articleId: {
          type: 'string',
          description: '關聯的文章代碼'
        },
        cropKeyword: {
          type: 'string',
          description: '指定作物關鍵字（例如：「甘藍」、「芒果」、「青江菜」）'
        },
        benchmarkMarket: {
          type: 'string',
          description: '基準對比市場（如 "台北一", "西螺", "台中"）',
          default: '台北一'
        }
      },
      required: ['articleId']
    },
    sampleArgs: {
      articleId: 'art_01',
      cropKeyword: '小白菜',
      benchmarkMarket: '台北一'
    }
  },
  {
    name: 'extract_entities_and_facts',
    displayName: '抽取農業實體與科學指標 (Extract Agri Entities & Facts)',
    description: '從文章文本中精準抽取：作物學名、產地經緯地號、節氣時期、農藥殘留標準、糖度Brix、耕作面積與效益數據',
    category: 'nlp_analysis',
    inputSchema: {
      type: 'object',
      properties: {
        articleId: {
          type: 'string',
          description: '欲抽取的文章識別碼'
        },
        entityTypes: {
          type: 'string',
          description: '欲抽取的實體類型（逗號分隔：crop, terroir, metric, standard, farmer）',
          default: 'crop, terroir, metric, standard'
        }
      },
      required: ['articleId']
    },
    sampleArgs: {
      articleId: 'art_02',
      entityTypes: 'crop, terroir, metric, standard'
    }
  },
  {
    name: 'generate_article_brief',
    displayName: '多視角受眾摘要生成 (Generate Multi-Audience Brief)',
    description: '針對不同目標對象（B2B大宗採購經理、家庭料理消費者、農學院研發者）生成客製化的商業或技術結論摘要',
    category: 'editorial',
    inputSchema: {
      type: 'object',
      properties: {
        articleId: {
          type: 'string',
          description: '文章代碼'
        },
        targetAudience: {
          type: 'string',
          description: '目標閱讀受眾',
          enum: ['b2b_buyer', 'consumer', 'researcher', 'investor']
        },
        tone: {
          type: 'string',
          description: '行文語調風格',
          enum: ['professional', 'warm_storytelling', 'actionable_guide'],
          default: 'professional'
        }
      },
      required: ['articleId', 'targetAudience']
    },
    sampleArgs: {
      articleId: 'art_03',
      targetAudience: 'b2b_buyer',
      tone: 'professional'
    }
  },
  {
    name: 'export_article_knowledge_graph',
    displayName: '匯出文章知識圖譜節點 (Export Knowledge Graph)',
    description: '以 Schema.org 與 GraphViz 格式輸出文章與產地、農友、作物品種、檢驗驗證與批發市場之多維拓撲關聯',
    category: 'knowledge_graph',
    inputSchema: {
      type: 'object',
      properties: {
        articleId: {
          type: 'string',
          description: '指定單篇文章，或傳入 "all" 匯出全站圖譜',
          default: 'all'
        },
        format: {
          type: 'string',
          description: '匯出格式',
          enum: ['json_ld', 'nodes_and_edges', 'cypher_query'],
          default: 'nodes_and_edges'
        }
      }
    },
    sampleArgs: {
      articleId: 'all',
      format: 'nodes_and_edges'
    }
  }
];

export const MCP_PROMPTS: McpPrompt[] = [
  {
    name: 'farm_story_editorial_writer',
    displayName: '產地職人紀實報導生成 (Farm Story Editorial Writer)',
    description: '引導 LLM 深入結合風土環境、有機耕作挑戰與職人語錄，撰寫富有人文情懷的食農專欄',
    arguments: [
      { name: 'farmerName', description: '農友或產銷班長姓名', required: true, defaultValue: '陳健興 班長' },
      { name: 'region', description: '產區產地名稱', required: true, defaultValue: '雲林縣西螺鎮' },
      { name: 'crop', description: '主要栽培作物', required: true, defaultValue: '有機溫室黑葉白菜' },
      { name: 'philosophy', description: '友善農法核心堅持', required: false, defaultValue: '以草蛉生物防治替代化學農藥，養護濁水溪黑泥有機質' }
    ],
    systemInstruction: '你是一位榮獲農業部金書獎與食農報導首獎的資深專欄作家。請運用真誠細膩的筆觸，融合在地風土科學與農民生命史，撰寫一篇字數約 800-1200 字的深度報導。',
    template: `請依據以下產地脈絡撰寫【好農方舟產地專欄】：
- 專訪主角：{{farmerName}}
- 耕作產地：{{region}}
- 主力作物：{{crop}}
- 核心農法：{{philosophy}}

報導結構請包含：
1. 【清晨田野啟幕】：生動刻劃破曉時分的田間微氣候、泥土氣味與晨露。
2. 【泥土與作物的對話】：解析土壤健康、天敵防治與微滴灌技術。
3. 【農民赤子心】：置入至少兩段深具啟發性的直白台語式人生哲理引言。
4. 【產銷方舟新契機】：說明雙溫層保鮮與契作保證收購對小農生計的實質改變。`
  },
  {
    name: 'market_intelligence_briefing',
    displayName: '農經供需與批發走勢決策簡報 (Market Intelligence Briefing)',
    description: '引導 LLM 比對農業部交易即時行情與專欄文章分析，產出給大宗採購與冷鏈物流的分析報告',
    arguments: [
      { name: 'cropName', description: '分析標的作物', required: true, defaultValue: '甘藍 (初秋甘藍)' },
      { name: 'marketZone', description: '主要交易中心', required: true, defaultValue: '台北一市場 / 西螺市場' },
      { name: 'weatherRisk', description: '當前氣候風險因子', required: false, defaultValue: '秋季熱浪與連續豪大雨預報' }
    ],
    systemInstruction: '你是一位擁有二十年果菜批發盤商與農經計量經濟學背景的高級分析師。重視量化數據、均價波動性、供需彈性與冷藏避險策略。',
    template: `請為好農方舟採購與冷鏈委員會產出【產銷供需即時決策簡報】：
- 分析標的：{{cropName}}
- 追蹤市場：{{marketZone}}
- 氣象風險：{{weatherRisk}}

請提供：
1. 【市場交易量價偏離度評估】：計算近30日均價走勢與供需失衡警戒等級（綠/黃/紅）。
2. 【產地收購與保證價策略】：提出具競爭力且能穩定小農收益的階梯收購建議。
3. 【冷鏈滾動釋出排程】：規劃 4°C 恆溫恆濕庫存週轉天數與預計損耗控管。`
  },
  {
    name: 'consumer_seasonal_nutrition_guide',
    displayName: '二十四節氣食療選購指南 (Seasonal Nutrition & Culinary Guide)',
    description: '根據當前節氣與專欄文章介紹的在令時鮮，為都會家庭編寫健康烹調與營養解析',
    arguments: [
      { name: 'solarTerm', description: '當前節氣', required: true, defaultValue: '白露 (Autumn Dew)' },
      { name: 'recommendedProduce', description: '推薦當季旬味', required: true, defaultValue: '枋山愛文芒果果乾、西螺白玉苦瓜、三星行健有機蔥' }
    ],
    systemInstruction: '你是一位精通地中海飲食與漢方時令養生的首席營養師與五星主廚。語言親切溫馨、實用度高。',
    template: `請為好農方舟會員編製【{{solarTerm}} 節令食光生活誌】：
- 推薦產地旬味：{{recommendedProduce}}

指南內容須包含：
1. 【節氣節奏與身體需求】：解釋此節氣之微氣候對人體水分與代謝的影響。
2. 【從產地到餐桌的保鮮秘訣】：生鮮保存溫度、是否需冷藏、最佳賞味天數。
3. 【十五分鐘旬味家常食譜】：提供一道低油低鹽、完整保留營養素的原味料理步驟。`
  }
];

// Helper to simulate realistic MCP Tool Calls
export function executeMcpTool(name: string, args: Record<string, any>): McpToolCallResult {
  const start = performance.now();
  const requestId = 'req-mcp-' + Math.floor(100000 + Math.random() * 900000);

  const rawJsonRpcRequest = {
    jsonrpc: '2.0',
    id: requestId,
    method: 'tools/call',
    params: {
      name,
      arguments: args
    }
  };

  let content: { type: 'text' | 'json' | 'markdown'; text?: string; data?: any }[] = [];
  let tokensEstimated = 350;

  switch (name) {
    case 'search_articles': {
      const q = (args.query || '').toLowerCase();
      const cat = args.category || 'all';
      const limit = Number(args.limit) || 5;

      const matched = MOCK_ARTICLES.filter(a => {
        const matchesCat = cat === 'all' || a.category === cat;
        const matchesQ = 
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q)) ||
          a.sections.some(s => s.body.toLowerCase().includes(q) || s.heading.toLowerCase().includes(q));
        return matchesCat && matchesQ;
      }).slice(0, limit);

      const searchResults = matched.length > 0 ? matched.map(m => ({
        id: m.id,
        title: m.title,
        category: m.categoryLabel,
        author: `${m.authorName} (${m.authorTitle})`,
        publishDate: m.publishDate,
        readTimeMin: m.readTimeMin,
        score: (0.94 - Math.random() * 0.08).toFixed(3),
        summary: m.summary,
        tags: m.tags,
        uri: `haonong://articles/${m.id}`
      })) : [
        {
          message: `未找到精確匹配 "${args.query}" 的專題，系統已推薦相關產地報導：`,
          recommendation: MOCK_ARTICLES[0]
        }
      ];

      tokensEstimated = 420;
      content = [
        {
          type: 'text',
          text: `檢索完成：共命中 ${matched.length} 篇相關文章（篩選條件：關鍵字="${args.query}", 類別="${cat}"）。`
        },
        {
          type: 'json',
          data: searchResults
        }
      ];
      break;
    }

    case 'get_article_context': {
      const art = MOCK_ARTICLES.find(a => a.id === args.articleId) || MOCK_ARTICLES[0];
      const format = args.format || 'markdown_with_citations';
      const includeQuotes = args.includeInterviewQuotes !== false;

      const markdownPayload = `
# 【產地專欄上下文】${art.title}
> ${art.subtitle}
- **專題代號**：\`${art.id}\`
- **發布時間**：${art.publishDate} | 預計閱讀時間：${art.readTimeMin} 分鐘
- **執筆專家**：${art.authorName}（${art.authorTitle}）
- **關聯標籤**：${art.tags.join(', ')}

---

### ■ 專題核心摘要 (Abstract)
${art.summary}

### ■ 詳細研討章節與田間實證 (Detailed Sections)
${art.sections.map((sec, idx) => `
#### ${sec.heading}
${sec.body}
${sec.quote && includeQuotes ? `\n> 💬 **訪談金句引用**：「${sec.quote}」\n` : ''}
${sec.highlightBox ? `\n> 📊 **實測量化指引**：${sec.highlightBox}\n` : ''}
`).join('\n')}

---
**資料來源驗證**：本資料由好農方舟產銷資訊系統通過 \`haonong://articles/${art.id}\` 簽發，符合 TAP 產銷履歷與農試所驗證規範。
      `.trim();

      tokensEstimated = Math.round(markdownPayload.length * 0.75);

      content = [
        {
          type: 'text',
          text: `已成功封裝專題「${art.title}」之高密度語意上下文。預估消耗 ${tokensEstimated} Tokens，可直接注入 AI Agent Prompt。`
        },
        {
          type: 'markdown',
          text: markdownPayload
        }
      ];
      break;
    }

    case 'cross_correlate_market_prices': {
      const art = MOCK_ARTICLES.find(a => a.id === args.articleId) || MOCK_ARTICLES[0];
      const cropKeyword = args.cropKeyword || (art.id === 'art_01' ? '西螺蔬菜' : art.id === 'art_02' ? '芒果' : '甘藍');
      
      const relevantPrices = MOCK_MARKET_PRICES.filter(p => 
        p.cropName.includes(cropKeyword) || p.originSupplyArea.includes(cropKeyword)
      );

      const avgMarketPrice = relevantPrices.length > 0 
        ? (relevantPrices.reduce((acc, cur) => acc + cur.avgPrice, 0) / relevantPrices.length).toFixed(1)
        : '38.5';

      const highPrice = relevantPrices.length > 0
        ? Math.max(...relevantPrices.map(p => p.highPrice))
        : 62.0;

      const correlationReport = {
        articleId: art.id,
        articleTitle: art.title,
        identifiedCrop: cropKeyword,
        benchmarkMarket: args.benchmarkMarket || '台北一',
        analysisDate: '2026-09-06',
        marketSignals: {
          averageWholesalePrice: `NT$ ${avgMarketPrice} / kg`,
          peakHighPrice: `NT$ ${highPrice} / kg`,
          priceTrendStatus: '穩健微升 (+4.2%)',
          supplyStabilityIndex: '88/100 (極穩定)',
          organicPricePremiumRatio: '185% (相較於一般慣行均價有大幅附加價值)'
        },
        associatedTransactionRecords: relevantPrices.slice(0, 3).map(p => ({
          crop: p.cropName,
          market: p.marketName,
          avgPrice: `NT$ ${p.avgPrice}`,
          volumeKg: `${p.volumeKg.toLocaleString()} kg`,
          origin: p.originSupplyArea
        })),
        agriEconomicInsight: `結合本專欄之友善農法分析，${cropKeyword}因具備 TAP 履歷與低溫冷鏈直採優勢，在台北果菜市場上價維持強勢，不易受產地大出崩盤波及。`
      };

      tokensEstimated = 510;
      content = [
        {
          type: 'text',
          text: `市場行情交聯比對完成：成功將專欄「${art.title}」與農業部 17 處批發行情資料庫進行即時對齊。`
        },
        {
          type: 'json',
          data: correlationReport
        }
      ];
      break;
    }

    case 'extract_entities_and_facts': {
      const art = MOCK_ARTICLES.find(a => a.id === args.articleId) || MOCK_ARTICLES[1];
      
      let entities: Record<string, any> = {};
      if (art.id === 'art_01') {
        entities = {
          crops: ['有機高麗菜', '黑葉白菜', '小松菜', '十字花科葉菜'],
          geographicTerroir: {
            county: '雲林縣西螺鎮',
            riverBasin: '濁水溪沖積平原',
            soilType: '黑泥壤土 (富含鐵錳矽微量元素)',
            waterSource: '濁水溪清澈灌溉深井水'
          },
          farmersAndPersons: ['陳健興 班長 (西螺綠金有機農場)'],
          scientificMetrics: {
            waterSavingPercent: '38%',
            soilOrganicMatterIncrease: '由 1.8% 提升至 4.5%',
            biologicalControlAgents: ['草蛉', '黃斑粗喙椿象', '性費洛蒙誘引劑']
          },
          certifications: ['TAP產銷履歷', '農糧署有機農產品驗證', '381項農藥殘留零檢出']
        };
      } else if (art.id === 'art_02') {
        entities = {
          crops: ['愛文芒果 (Mangifera indica)', '在欉紅完熟芒果'],
          geographicTerroir: {
            county: '屏東縣枋山鄉',
            microclimate: '中央山脈特有落山風 + 台灣海峽強勁海風',
            sunshineHours: '年均日照超過 2,200 小時'
          },
          farmersAndPersons: ['林阿木 園主 (枋山日光落山風果園)'],
          scientificMetrics: {
            sweetnessBrix: '15.0°Brix ~ 16.5°Brix (極高糖度)',
            pruningRule: '一枝一果嚴格疏花疏果',
            chemicalRipeningAgent: '0% (堅持枝頭自然熟成，不浸泡益收生長素)'
          },
          certifications: ['TAP產銷履歷', '屏東優選產地標章', '出口日本雙重農殘檢疫標準']
        };
      } else {
        entities = {
          crops: ['甘藍 (高麗菜)', '結球白菜', '根莖類蔬菜'],
          geographicTerroir: {
            focusArea: '彰化溪湖、雲林西螺、宜蘭南山大同高冷專區'
          },
          farmersAndPersons: ['黃敏淳 (大數據農業經理人)'],
          scientificMetrics: {
            forecastHorizonDays: '提前 21 天產銷失衡三級預警',
            marketCount: '17 座公設果菜批發市場全天候對齊',
            targetPriceFloor: '保障產地成本每公斤 NT$ 12 以上'
          },
          certifications: ['農業部產銷失衡調節機制認可', '雙溫層智慧冷鏈冷藏標準']
        };
      }

      tokensEstimated = 480;
      content = [
        {
          type: 'text',
          text: `農業實體抽取完成：從專題「${art.title}」提煉出風土地理、量化指標、驗證規章與農法人事實體。`
        },
        {
          type: 'json',
          data: {
            articleId: art.id,
            entitiesExtracted: entities
          }
        }
      ];
      break;
    }

    case 'generate_article_brief': {
      const art = MOCK_ARTICLES.find(a => a.id === args.articleId) || MOCK_ARTICLES[2];
      const audience = args.targetAudience || 'b2b_buyer';

      let tailoredSummary = '';
      if (audience === 'b2b_buyer') {
        tailoredSummary = `【B2B 採購策略評估】\n1. 供貨優勢：該產地（${art.tags[0]}）品質一致性高，透過智慧排程可確保每週穩定進貨。\n2. 成本抗跌性：文章驗證其冷鏈損耗率低於 3.5%，可減少門市上架報廢損耗。\n3. 採購建議：建議於產季前45天簽訂大宗契作收購約，鎖定產銷履歷優質批次。`;
      } else if (audience === 'consumer') {
        tailoredSummary = `【家庭主婦 / 料理愛好者食農筆記】\n1. 為什麼更好吃：因為堅持不催熟、吸飽自然陽光，果肉更甜、無粗纖維。\n2. 安心證明：完全通過381項農藥殘留檢驗，小孩子吃不用怕農藥殘留。\n3. 主廚賞味訣竅：常溫通風放置2天，聞到濃郁果香時放入冰箱冷藏2小時後享用風味最絕妙！`;
      } else {
        tailoredSummary = `【農業科技與風土研究報告備忘】\n1. 試驗亮點：微氣候風力有效壓制炭疽病與十字花科蟲害，驗證了非化學天敵防治之經濟可行性。\n2. 環境效益：滴灌節水率達38%，土壤有機質提升150%，為農地碳匯與ESG永續指標之優良實證案例。`;
      }

      tokensEstimated = 390;
      content = [
        {
          type: 'text',
          text: `針對目標受眾「${audience}」生成之客製化結論摘要：`
        },
        {
          type: 'markdown',
          text: tailoredSummary
        }
      ];
      break;
    }

    case 'export_article_knowledge_graph': {
      const graphData = getKnowledgeGraphData();
      tokensEstimated = 620;
      content = [
        {
          type: 'text',
          text: `圖譜拓撲匯出成功：包含 ${graphData.nodes.length} 個知識實體節點與 ${graphData.edges.length} 條語意關聯邊。`
        },
        {
          type: 'json',
          data: graphData
        }
      ];
      break;
    }

    default: {
      tokensEstimated = 100;
      content = [
        {
          type: 'text',
          text: `未知工具：${name}。可支援工具請參考 MCP tools/list 協定。`
        }
      ];
    }
  }

  const latencyMs = Math.round(performance.now() - start) + Math.floor(Math.random() * 25 + 15);

  const rawJsonRpcResponse = {
    jsonrpc: '2.0',
    id: requestId,
    result: {
      content,
      isError: false,
      _meta: {
        server: MCP_SERVER_INFO.name,
        version: MCP_SERVER_INFO.version,
        protocol: MCP_SERVER_INFO.protocolVersion,
        latencyMs,
        tokensEstimated
      }
    }
  };

  return {
    toolName: name,
    status: 'success',
    latencyMs,
    tokensEstimated,
    content,
    rawJsonRpcRequest,
    rawJsonRpcResponse
  };
}

export function readMcpResource(uri: string): { uri: string; mimeType: string; content: any } {
  const resource = MCP_RESOURCES.find(r => r.uri === uri) || MCP_RESOURCES[0];

  if (uri === 'haonong://articles/catalog') {
    return {
      uri,
      mimeType: 'application/json',
      content: MOCK_ARTICLES.map(a => ({
        id: a.id,
        title: a.title,
        subtitle: a.subtitle,
        category: a.category,
        author: a.authorName,
        publishDate: a.publishDate,
        tags: a.tags,
        readTimeMin: a.readTimeMin,
        tokens: Math.round(a.summary.length * 2.2 + 400)
      }))
    };
  }

  if (uri.startsWith('haonong://articles/art_')) {
    const artId = uri.split('/').pop();
    const art = MOCK_ARTICLES.find(a => a.id === artId) || MOCK_ARTICLES[0];
    return {
      uri,
      mimeType: 'text/markdown',
      content: `# ${art.title}\n\n**${art.subtitle}**\n\n- 作者：${art.authorName} (${art.authorTitle})\n- 發布日期：${art.publishDate}\n\n## 專欄綱要\n${art.summary}\n\n` +
        art.sections.map(s => `### ${s.heading}\n${s.body}\n${s.quote ? `> ${s.quote}\n` : ''}`).join('\n\n')
    };
  }

  if (uri === 'haonong://taxonomies/terroirs') {
    return {
      uri,
      mimeType: 'application/json',
      content: [
        { terroir: '濁水溪黑泥平原', area: '雲林西螺、莿桐、二崙', trait: '微量元素高、富含泥質黏土、保水保肥強' },
        { terroir: '恆春半島落山風珊瑚礁地', area: '屏東枋山、車城、恆春', trait: '逆風抑制旺長、日照長、海風微鹽提升果物甜度' },
        { terroir: '曾文溪兩岸沖積沙壤', area: '台南麻豆、官田、西港', trait: '排水通氣極佳、適合文旦柚與胡麻生長' },
        { terroir: '蘭陽溪純淨冷泉扇', area: '宜蘭三星、員山', trait: '日夜溫差大、水質無污染、造就特長蔥白與甘甜' }
      ]
    };
  }

  return {
    uri,
    mimeType: resource.mimeType,
    content: {
      description: resource.description,
      status: 'verified_active',
      lastSyncedAt: '2026-09-06T18:00:00Z'
    }
  };
}

export function renderMcpPrompt(promptName: string, args: Record<string, string>): { promptText: string; systemInstruction?: string } {
  const p = MCP_PROMPTS.find(item => item.name === promptName) || MCP_PROMPTS[0];
  let rendered = p.template;

  Object.entries(args).forEach(([key, val]) => {
    rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), val || '');
  });

  return {
    promptText: rendered,
    systemInstruction: p.systemInstruction
  };
}

export function getKnowledgeGraphData(): { nodes: ArticleKnowledgeNode[]; edges: ArticleKnowledgeEdge[] } {
  const nodes: ArticleKnowledgeNode[] = [
    // Articles
    { id: 'art_01', label: '西螺有機蔬菜十年轉型', type: 'article', color: '#059669', details: '專題：黑泥風土、天敵防治與冷鏈契作' },
    { id: 'art_02', label: '枋山落山風愛文芒果', type: 'article', color: '#059669', details: '專題：在欉紅自然熟成與15度糖度' },
    { id: 'art_03', label: '農業大數據產銷失衡預警', type: 'article', color: '#059669', details: '專題：批發市場17座聯網與提前21天調節' },

    // Crops
    { id: 'crop_xiluo_veg', label: '西螺有機葉菜 (白菜/高麗菜)', type: 'crop', color: '#10b981', details: '十字花科、黑泥友善栽種' },
    { id: 'crop_fangshan_mango', label: '枋山在欉紅愛文芒果', type: 'crop', color: '#f59e0b', details: '15°Brix、落山風微氣候' },
    { id: 'crop_cabbage_bulk', label: '初秋甘藍 (大數據監控)', type: 'crop', color: '#14b8a6', details: '冬季盛產、產銷平衡關鍵' },

    // Terroirs / Locations
    { id: 'loc_xiluo', label: '雲林西螺 (濁水溪黑泥平原)', type: 'location', color: '#6366f1', details: '全台最大葉菜集散基地' },
    { id: 'loc_fangshan', label: '屏東枋山 (落山風海風廊道)', type: 'location', color: '#6366f1', details: '日光充沛、熱帶季風' },

    // Farmers / Cooperatives
    { id: 'farmer_chen', label: '陳健興 班長', type: 'farmer', color: '#8b5cf6', details: '綠金有機農場創辦人' },
    { id: 'farmer_lin', label: '林阿木 園主', type: 'farmer', color: '#8b5cf6', details: '枋山日光果園職人' },
    { id: 'coop_xiluo', label: '西螺果菜運銷合作社', type: 'cooperative', color: '#ec4899', details: '北農重要供應人 (代號63-019)' },

    // Solar Terms
    { id: 'st_bailu', label: '白露 (時令節氣)', type: 'solar_term', color: '#3b82f6', details: '露凝而白、氣肅秋涼' },
    { id: 'st_lixia', label: '立夏 (採收盛期)', type: 'solar_term', color: '#3b82f6', details: '芒果正甜、日光豐滿' },

    // Markets
    { id: 'mkt_taipei1', label: '台北一市 (濱江市場)', type: 'market', color: '#0284c7', details: '全台最大消費地拍賣中心' }
  ];

  const edges: ArticleKnowledgeEdge[] = [
    { source: 'art_01', target: 'crop_xiluo_veg', relation: '論述標的' },
    { source: 'art_01', target: 'loc_xiluo', relation: '報導產地' },
    { source: 'art_01', target: 'farmer_chen', relation: '專訪職人' },
    { source: 'farmer_chen', target: 'coop_xiluo', relation: '所屬社場' },
    { source: 'crop_xiluo_veg', target: 'mkt_taipei1', relation: '批發行情報價' },

    { source: 'art_02', target: 'crop_fangshan_mango', relation: '論述標的' },
    { source: 'art_02', target: 'loc_fangshan', relation: '報導產地' },
    { source: 'art_02', target: 'farmer_lin', relation: '專訪職人' },
    { source: 'crop_fangshan_mango', target: 'st_lixia', relation: '自然熟成節令' },

    { source: 'art_03', target: 'crop_cabbage_bulk', relation: '監控標的' },
    { source: 'art_03', target: 'mkt_taipei1', relation: '預警模型數據源' },
    { source: 'crop_cabbage_bulk', target: 'st_bailu', relation: '育苗定植期' }
  ];

  return { nodes, edges };
}

export function generateMcpConfigSnippet(clientType: 'claude_desktop' | 'cursor' | 'python' | 'typescript'): string {
  switch (clientType) {
    case 'claude_desktop':
      return JSON.stringify({
        mcpServers: {
          "haonong-articles": {
            "command": "npx",
            "args": ["-y", "@haonong/mcp-articles-server"],
            "env": {
              "HAONONG_API_ENDPOINT": "https://api.haonong.tw/mcp/v1",
              "DATA_REGION": "TW-ASIA"
            }
          }
        }
      }, null, 2);

    case 'cursor':
      return JSON.stringify({
        "name": "HaoNong Articles MCP",
        "serverType": "sse",
        "url": "https://api.haonong.tw/mcp/sse",
        "headers": {
          "Authorization": "Bearer mcp_haonong_pub_2026",
          "Content-Type": "application/json"
        }
      }, null, 2);

    case 'typescript':
      return `import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const transport = new SSEClientTransport(
  new URL("https://api.haonong.tw/mcp/sse")
);

const client = new Client(
  { name: "haonong-web-app", version: "1.0.0" },
  { capabilities: { tools: {}, resources: {}, prompts: {} } }
);

await client.connect(transport);

// 1. 檢索農業文章
const searchResult = await client.callTool({
  name: "search_articles",
  arguments: { query: "西螺有機蔬菜", limit: 3 }
});

// 2. 獲取 LLM 專用上下文
const contextResult = await client.callTool({
  name: "get_article_context",
  arguments: { articleId: "art_01", format: "markdown_with_citations" }
});

console.log(contextResult.content[1].text);`;

    case 'python':
      return `import asyncio
from mcp import ClientSession
from mcp.client.sse import sse_client

async def main():
    async with sse_client("https://api.haonong.tw/mcp/sse") as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            # 呼叫好農方舟文章 MCP 工具
            result = await session.call_tool(
                "cross_correlate_market_prices",
                arguments={"articleId": "art_01", "cropKeyword": "西螺蔬菜"}
            )
            print("批發行情聯集數據:", result.content)

asyncio.run(main())`;
  }
}
