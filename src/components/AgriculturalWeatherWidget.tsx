import React, { useState } from 'react';
import { 
  CloudSun, 
  Sun, 
  CloudRain, 
  CloudLightning, 
  Cloud, 
  Droplets, 
  Wind, 
  Thermometer, 
  Compass, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  CalendarDays,
  ShieldAlert,
  Sprout,
  Activity,
  Waves
} from 'lucide-react';

export interface WeatherDayForecast {
  dateStr: string;
  dayLabel: string;
  weatherCondition: string;
  weatherIcon: 'sun' | 'cloud-sun' | 'cloud-rain' | 'cloud-lightning' | 'cloud';
  tempMin: number;
  tempMax: number;
  rainChance: number;
  humidity: number;
  windSpeed: string;
  advisoryTip: string;
}

export interface RegionWeatherData {
  regionId: string;
  cityName: string;
  mainZone: string;
  representativeCrops: string[];
  current: {
    temp: number;
    feelsLike: number;
    weatherCondition: string;
    weatherIcon: 'sun' | 'cloud-sun' | 'cloud-rain' | 'cloud-lightning' | 'cloud';
    humidity: number;
    rainChance: number;
    windSpeed: number; // km/h
    windDirection: string;
    uvIndex: number;
    uvLabel: string;
    soilMoisture: number; // %
    sunshineHours: number; // hrs
    airQualityAqi: number;
    updateTime: string;
  };
  smartFarmingAdvice: {
    irrigationStatus: string;
    sprayingStatus: string;
    harvestStatus: string;
    pestRiskLevel: 'low' | 'moderate' | 'high';
    pestWarningText: string;
  };
  threeDayForecast: WeatherDayForecast[];
}

export const REGION_WEATHER_LIST: RegionWeatherData[] = [
  {
    regionId: 'yunlin',
    cityName: '雲林縣 (西螺 / 褒忠)',
    mainZone: '中南部平原蔬菜重鎮',
    representativeCrops: ['甘藍高麗菜', '有機葉菜', '溫室水果黃瓜'],
    current: {
      temp: 31,
      feelsLike: 35,
      weatherCondition: '多雲時晴 / 午後微熱',
      weatherIcon: 'cloud-sun',
      humidity: 74,
      rainChance: 35,
      windSpeed: 12,
      windDirection: '西南風',
      uvIndex: 8,
      uvLabel: '過量級',
      soilMoisture: 68,
      sunshineHours: 7.2,
      airQualityAqi: 38,
      updateTime: '10:00 即時觀測'
    },
    smartFarmingAdvice: {
      irrigationStatus: '午後建議縮短自動滴灌時數，利用清晨地溫未升時補水。',
      sprayingStatus: '上午 06:00-09:00 適合進行有機生物防治噴灑，避開午後陣雨。',
      harvestStatus: '葉菜類宜於清晨 05:00-08:00 採收以保脆度與降低田間熱。',
      pestRiskLevel: 'moderate',
      pestWarningText: '高溫多濕環境，需特別注意十字花科小菜蛾與軟腐病好發。'
    },
    threeDayForecast: [
      {
        dateStr: '8/24 (一)',
        dayLabel: '明日預測',
        weatherCondition: '晴時多雲',
        weatherIcon: 'sun',
        tempMin: 26,
        tempMax: 33,
        rainChance: 20,
        humidity: 68,
        windSpeed: '2級 西南風',
        advisoryTip: '全日日照充足，適合露天高麗菜田間整地與翻土'
      },
      {
        dateStr: '8/25 (二)',
        dayLabel: '後天預測',
        weatherCondition: '午後雷陣雨',
        weatherIcon: 'cloud-lightning',
        tempMin: 25,
        tempMax: 32,
        rainChance: 65,
        humidity: 82,
        windSpeed: '3級 偏南風',
        advisoryTip: '午後強對流機率高，請預先巡查排水溝渠避免田區積水'
      },
      {
        dateStr: '8/26 (三)',
        dayLabel: '大後天',
        weatherCondition: '短暫陣雨',
        weatherIcon: 'cloud-rain',
        tempMin: 26,
        tempMax: 31,
        rainChance: 50,
        humidity: 78,
        windSpeed: '2級 西南風',
        advisoryTip: '溫室設施應開啟內循環風扇降濕，抑制葉菜露菌病'
      }
    ]
  },
  {
    regionId: 'pingtung',
    cityName: '屏東縣 (枋山 / 高樹)',
    mainZone: '南台灣熱帶果樹專區',
    representativeCrops: ['愛文芒果', '牛奶蓮霧', '金鑽鳳梨'],
    current: {
      temp: 33,
      feelsLike: 37,
      weatherCondition: '晴朗炎熱 / 豔陽高照',
      weatherIcon: 'sun',
      humidity: 66,
      rainChance: 15,
      windSpeed: 16,
      windDirection: '落山風/東南風',
      uvIndex: 10,
      uvLabel: '危險級',
      soilMoisture: 58,
      sunshineHours: 8.5,
      airQualityAqi: 28,
      updateTime: '10:00 即時觀測'
    },
    smartFarmingAdvice: {
      irrigationStatus: '果園需維持根系微潤，傍晚啟動微噴灌降地溫。',
      sprayingStatus: '日照強烈，避免於中午噴灑乳劑類藥劑以防果皮藥傷日燒。',
      harvestStatus: '芒果採收後請即刻送入預冷室降溫，維持在欉紅脆度。',
      pestRiskLevel: 'high',
      pestWarningText: '東方果實蠅與炭疽病進入繁殖盛期，加強套袋檢視與誘引劑補充。'
    },
    threeDayForecast: [
      {
        dateStr: '8/24 (一)',
        dayLabel: '明日預測',
        weatherCondition: '晴朗炎熱',
        weatherIcon: 'sun',
        tempMin: 27,
        tempMax: 34,
        rainChance: 10,
        humidity: 62,
        windSpeed: '2級 東南風',
        advisoryTip: '果園糖度累積加速，適合安排鮮果分級包裝出貨'
      },
      {
        dateStr: '8/25 (二)',
        dayLabel: '後天預測',
        weatherCondition: '多雲短暫雨',
        weatherIcon: 'cloud-rain',
        tempMin: 26,
        tempMax: 32,
        rainChance: 40,
        humidity: 76,
        windSpeed: '3級 偏南風',
        advisoryTip: '山區午後偶有陣雨，留意採收搬運坡道防滑安全'
      },
      {
        dateStr: '8/26 (三)',
        dayLabel: '大後天',
        weatherCondition: '多雲時晴',
        weatherIcon: 'cloud-sun',
        tempMin: 27,
        tempMax: 33,
        rainChance: 25,
        humidity: 70,
        windSpeed: '2級 東南風',
        advisoryTip: '氣候穩定，可進行果樹夏剪修枝與有機肥穴施'
      }
    ]
  },
  {
    regionId: 'tainan',
    cityName: '台南市 (麻豆 / 七股)',
    mainZone: '文旦果園與沿海智慧養殖',
    representativeCrops: ['50年老欉文旦', '生態白蝦', '龍膽石斑'],
    current: {
      temp: 32,
      feelsLike: 36,
      weatherCondition: '多雲時晴',
      weatherIcon: 'cloud-sun',
      humidity: 72,
      rainChance: 25,
      windSpeed: 14,
      windDirection: '偏南風',
      uvIndex: 9,
      uvLabel: '甚高',
      soilMoisture: 65,
      sunshineHours: 7.8,
      airQualityAqi: 32,
      updateTime: '10:00 即時觀測'
    },
    smartFarmingAdvice: {
      irrigationStatus: '中秋文旦進入辭水轉甜期，宜適度節水控灌以提升甜度風味。',
      sprayingStatus: '可配合夜間進行養殖水池益生菌菌相補充與溶氧監控。',
      harvestStatus: '文旦採收前10天停止施肥與過量灌溉，維持最佳果肉油包品質。',
      pestRiskLevel: 'low',
      pestWarningText: '紅蜘蛛與薊馬數量處於安全監控值內，維持草生栽培生態平衡。'
    },
    threeDayForecast: [
      {
        dateStr: '8/24 (一)',
        dayLabel: '明日預測',
        weatherCondition: '多雲時晴',
        weatherIcon: 'cloud-sun',
        tempMin: 26,
        tempMax: 33,
        rainChance: 20,
        humidity: 70,
        windSpeed: '2級 南風',
        advisoryTip: '水產池注意中午溶氧量波動，水車應全日自動感應運轉'
      },
      {
        dateStr: '8/25 (二)',
        dayLabel: '後天預測',
        weatherCondition: '晴朗',
        weatherIcon: 'sun',
        tempMin: 27,
        tempMax: 34,
        rainChance: 15,
        humidity: 67,
        windSpeed: '2級 偏南風',
        advisoryTip: '麻豆文旦園日照極佳，果實甜度轉化順暢'
      },
      {
        dateStr: '8/26 (三)',
        dayLabel: '大後天',
        weatherCondition: '午後雷陣雨',
        weatherIcon: 'cloud-lightning',
        tempMin: 25,
        tempMax: 32,
        rainChance: 60,
        humidity: 80,
        windSpeed: '3級 西南風',
        advisoryTip: '雨後注意養殖池水鹽度變化，及時調節進排水閥'
      }
    ]
  },
  {
    regionId: 'changhua',
    cityName: '彰化縣 (溪湖 / 田尾)',
    mainZone: '花卉園藝與多元溫室蔬菜',
    representativeCrops: ['溫室小黃瓜', '網室番茄', '精緻花卉'],
    current: {
      temp: 31,
      feelsLike: 34,
      weatherCondition: '多雲',
      weatherIcon: 'cloud',
      humidity: 76,
      rainChance: 30,
      windSpeed: 10,
      windDirection: '西北風',
      uvIndex: 7,
      uvLabel: '高量級',
      soilMoisture: 70,
      sunshineHours: 6.5,
      airQualityAqi: 42,
      updateTime: '10:00 即時觀測'
    },
    smartFarmingAdvice: {
      irrigationStatus: '溫室設施微氣候監控良好，維持滴灌定時定量供應。',
      sprayingStatus: '陰天散射光充足，適合施用葉面微量元素與胺基酸營養劑。',
      harvestStatus: '小黃瓜正值盛產期，維持早晚各採收一次以保細嫩品級。',
      pestRiskLevel: 'moderate',
      pestWarningText: '注意溫室內銀葉粉蝨與白粉病，保持側捲揚透風良好。'
    },
    threeDayForecast: [
      {
        dateStr: '8/24 (一)',
        dayLabel: '明日預測',
        weatherCondition: '多雲時晴',
        weatherIcon: 'cloud-sun',
        tempMin: 26,
        tempMax: 32,
        rainChance: 25,
        humidity: 72,
        windSpeed: '2級 偏西風',
        advisoryTip: '適合溫室換氣降溫作業，調節側邊遮陽黑網'
      },
      {
        dateStr: '8/25 (二)',
        dayLabel: '後天預測',
        weatherCondition: '短暫陣雨',
        weatherIcon: 'cloud-rain',
        tempMin: 25,
        tempMax: 31,
        rainChance: 55,
        humidity: 80,
        windSpeed: '2級 西南風',
        advisoryTip: '露地花卉注意排水，避免花苞積水受損'
      },
      {
        dateStr: '8/26 (三)',
        dayLabel: '大後天',
        weatherCondition: '晴時多雲',
        weatherIcon: 'sun',
        tempMin: 26,
        tempMax: 33,
        rainChance: 20,
        humidity: 68,
        windSpeed: '2級 偏南風',
        advisoryTip: '光照充足，適宜進行花卉與瓜類人工授粉作業'
      }
    ]
  },
  {
    regionId: 'hualien',
    cityName: '花蓮縣 (富里 / 玉里)',
    mainZone: '花東縱谷無污染有機米倉',
    representativeCrops: ['富里御皇米', '有機大豆', '金針花'],
    current: {
      temp: 29,
      feelsLike: 32,
      weatherCondition: '多雲時晴 / 縱谷微風',
      weatherIcon: 'cloud-sun',
      humidity: 70,
      rainChance: 20,
      windSpeed: 15,
      windDirection: '東北風',
      uvIndex: 8,
      uvLabel: '過量級',
      soilMoisture: 75,
      sunshineHours: 7.6,
      airQualityAqi: 15,
      updateTime: '10:00 即時觀測'
    },
    smartFarmingAdvice: {
      irrigationStatus: '二期水稻進入分櫱期，維持淺水灌溉 (3-5cm) 促進有效分櫱。',
      sprayingStatus: '天然麥飯石水源水質極佳，有機田區持續使用枯草桿菌預防稻熱病。',
      harvestStatus: '金針花採收作業正常進行，日光天然曝曬乾燥條件良好。',
      pestRiskLevel: 'low',
      pestWarningText: '縱谷日夜溫差適度，稻株強健，無重大病蟲害蔓延徵兆。'
    },
    threeDayForecast: [
      {
        dateStr: '8/24 (一)',
        dayLabel: '明日預測',
        weatherCondition: '晴時多雲',
        weatherIcon: 'sun',
        tempMin: 24,
        tempMax: 31,
        rainChance: 15,
        humidity: 65,
        windSpeed: '2級 東北風',
        advisoryTip: '縱谷日照充足，適合有機米田間除草與田埂草生維護'
      },
      {
        dateStr: '8/25 (二)',
        dayLabel: '後天預測',
        weatherCondition: '多雲午後陣雨',
        weatherIcon: 'cloud-rain',
        tempMin: 24,
        tempMax: 30,
        rainChance: 45,
        humidity: 78,
        windSpeed: '2級 偏東風',
        advisoryTip: '山區陣雨挹注水圳流量，注意水門引水調節'
      },
      {
        dateStr: '8/26 (三)',
        dayLabel: '大後天',
        weatherCondition: '多雲時晴',
        weatherIcon: 'cloud-sun',
        tempMin: 25,
        tempMax: 31,
        rainChance: 20,
        humidity: 69,
        windSpeed: '2級 東南風',
        advisoryTip: '天候晴朗微風，適合二期稻作中耕追肥作業'
      }
    ]
  },
  {
    regionId: 'nantou',
    cityName: '南投縣 (信義 / 仁愛 / 埔里)',
    mainZone: '高山冷涼蔬菜與高山茶特區',
    representativeCrops: ['高山甘藍', '高山烏龍茶', '埔里百香果'],
    current: {
      temp: 24,
      feelsLike: 25,
      weatherCondition: '山區多雲 / 氣候涼爽',
      weatherIcon: 'cloud-sun',
      humidity: 80,
      rainChance: 40,
      windSpeed: 8,
      windDirection: '山谷風',
      uvIndex: 9,
      uvLabel: '甚高',
      soilMoisture: 82,
      sunshineHours: 5.8,
      airQualityAqi: 18,
      updateTime: '10:00 即時觀測'
    },
    smartFarmingAdvice: {
      irrigationStatus: '高海拔霧氣充沛，土壤含水率高，今日可暫停人工噴灌。',
      sprayingStatus: '茶園清晨採茶露水乾後即可開始採摘，避開午後起霧時段。',
      harvestStatus: '百香果落網自然熟成採集，運送平地前需妥善防震防擠壓。',
      pestRiskLevel: 'moderate',
      pestWarningText: '山區濕度偏高，高山甘藍注意黑腐病，茶園注意小綠葉蟬活動。'
    },
    threeDayForecast: [
      {
        dateStr: '8/24 (一)',
        dayLabel: '明日預測',
        weatherCondition: '午後雷陣雨',
        weatherIcon: 'cloud-lightning',
        tempMin: 19,
        tempMax: 26,
        rainChance: 60,
        humidity: 85,
        windSpeed: '2級 谷風',
        advisoryTip: '午後山區雨勢較大，注意邊坡巡護與菜園排水'
      },
      {
        dateStr: '8/25 (二)',
        dayLabel: '後天預測',
        weatherCondition: '多雲時陰',
        weatherIcon: 'cloud',
        tempMin: 18,
        tempMax: 25,
        rainChance: 35,
        humidity: 78,
        windSpeed: '1級 輕風',
        advisoryTip: '雲霧繚繞散射光適中，利於茶葉茶胺酸與果膠累積'
      },
      {
        dateStr: '8/26 (三)',
        dayLabel: '大後天',
        weatherCondition: '晴時多雲',
        weatherIcon: 'cloud-sun',
        tempMin: 19,
        tempMax: 27,
        rainChance: 25,
        humidity: 74,
        windSpeed: '2級 谷風',
        advisoryTip: '高山天氣放晴，適合進行採收與高山冷鏈直發'
      }
    ]
  }
];

export const AgriculturalWeatherWidget: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('yunlin');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState('2026-08-23 10:00:00');

  const currentRegion = REGION_WEATHER_LIST.find(r => r.regionId === selectedRegionId) || REGION_WEATHER_LIST[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      const timeStr = `${now.getFullYear()}-08-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      setLastRefreshedTime(timeStr);
    }, 800);
  };

  const renderWeatherIcon = (icon: 'sun' | 'cloud-sun' | 'cloud-rain' | 'cloud-lightning' | 'cloud', className: string = 'w-6 h-6') => {
    switch (icon) {
      case 'sun':
        return <Sun className={`${className} text-amber-500`} />;
      case 'cloud-sun':
        return <CloudSun className={`${className} text-amber-400`} />;
      case 'cloud-rain':
        return <CloudRain className={`${className} text-blue-500`} />;
      case 'cloud-lightning':
        return <CloudLightning className={`${className} text-indigo-500`} />;
      case 'cloud':
      default:
        return <Cloud className={`${className} text-slate-400`} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-3 sm:p-4 bg-gradient-to-r from-slate-900 via-teal-950 to-emerald-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center shrink-0">
            <CloudSun className="w-4 h-4 text-teal-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-xs sm:text-sm tracking-tight flex items-center gap-1.5 text-white">
                主要農產基地・即時微氣候與未來三日氣象預測
              </h3>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-1.5 py-0.2 rounded border border-emerald-500/30">
                農業氣象署 (CWA) × 農業部智慧農業連動
              </span>
            </div>
            <p className="text-[10px] text-slate-300 mt-0.5">
              觀測全台核心蔬果產區氣溫、相對濕度、降雨機率與土壤蒸散率，提供智慧農耕決策與採收排程建議
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <span className="text-[10px] text-slate-300 font-mono hidden md:inline">
            更新時間: {lastRefreshedTime.split(' ')[1]}
          </span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white rounded-md text-[11px] font-bold transition-all flex items-center gap-1 border border-white/20 cursor-pointer shadow-2xs"
            title="重新整理氣象觀測數據"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? '同步中...' : '同步即時氣象'}</span>
          </button>
        </div>
      </div>

      {/* Region Selector Pills */}
      <div className="px-3 sm:px-4 py-2.5 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-500 shrink-0 mr-1 flex items-center gap-1">
            <Compass className="w-3 h-3 text-slate-400" />
            切換主要產區：
          </span>
          {REGION_WEATHER_LIST.map((reg) => {
            const isSelected = selectedRegionId === reg.regionId;
            return (
              <button
                key={reg.regionId}
                onClick={() => setSelectedRegionId(reg.regionId)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>{reg.cityName.split(' ')[0]}</span>
                <span className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                  isSelected ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-500'
                }`}>
                  {reg.current.temp}°C
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area: Left Current Telemetry + Center Smart Advice + Right 3-Day Forecast */}
      <div className="p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        
        {/* Module A: Current Real-time Weather & Microclimate (4 Cols) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/30 rounded-xl p-3.5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 font-serif">
                  {currentRegion.cityName}
                </h4>
              </div>
              <p className="text-[10px] text-emerald-800 font-medium mt-0.5">
                {currentRegion.mainZone}
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {currentRegion.representativeCrops.map((crop, idx) => (
                  <span key={idx} className="bg-white text-slate-600 text-[9px] px-1.5 py-0.2 rounded border border-slate-200">
                    {crop}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full border border-emerald-200">
                {currentRegion.current.updateTime}
              </span>
            </div>
          </div>

          {/* Current Temp Hero */}
          <div className="flex items-center justify-between py-1 border-y border-slate-200/70">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-2xs border border-slate-200/80">
                {renderWeatherIcon(currentRegion.current.weatherIcon, 'w-8 h-8')}
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-slate-900">
                    {currentRegion.current.temp}
                  </span>
                  <span className="text-sm font-bold text-slate-500 font-mono">°C</span>
                </div>
                <div className="text-[11px] font-bold text-slate-700">
                  {currentRegion.current.weatherCondition}
                </div>
              </div>
            </div>

            <div className="text-right space-y-0.5 text-xs">
              <div className="text-slate-500 text-[10px]">
                體感溫度 <span className="font-mono font-bold text-slate-800">{currentRegion.current.feelsLike}°C</span>
              </div>
              <div className="text-slate-500 text-[10px]">
                降雨機率 <span className="font-mono font-bold text-blue-600">{currentRegion.current.rainChance}%</span>
              </div>
              <div className="text-slate-500 text-[10px]">
                紫外線指數 <span className="font-mono font-bold text-amber-600">{currentRegion.current.uvIndex} ({currentRegion.current.uvLabel})</span>
              </div>
            </div>
          </div>

          {/* Key Agricultural Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-white p-2 rounded-lg border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 mb-0.5">
                <Droplets className="w-3 h-3 text-blue-500" />
                <span>相對濕度</span>
              </div>
              <div className="font-mono font-bold text-slate-900 text-xs">
                {currentRegion.current.humidity}%
              </div>
            </div>

            <div className="bg-white p-2 rounded-lg border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 mb-0.5">
                <Wind className="w-3 h-3 text-teal-500" />
                <span>風速風向</span>
              </div>
              <div className="font-mono font-bold text-slate-900 text-xs">
                {currentRegion.current.windSpeed} <span className="text-[9px] font-normal text-slate-400">km/h</span>
              </div>
            </div>

            <div className="bg-white p-2 rounded-lg border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 mb-0.5">
                <Sun className="w-3 h-3 text-amber-500" />
                <span>日照時數</span>
              </div>
              <div className="font-mono font-bold text-slate-900 text-xs">
                {currentRegion.current.sunshineHours} <span className="text-[9px] font-normal text-slate-400">hr</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 rounded-lg p-2 border border-slate-200 text-[10px] flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1">
              <Sprout className="w-3 h-3 text-emerald-600" />
              土壤含水飽和度：<strong className="font-mono text-emerald-800">{currentRegion.current.soilMoisture}%</strong>
            </span>
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-teal-600" />
              空氣品質 AQI：<strong className="font-mono text-teal-800">{currentRegion.current.airQualityAqi} (良好)</strong>
            </span>
          </div>
        </div>

        {/* Module B: 3-Day Forecast Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-emerald-700" />
              <span>未來三天天氣概況與農事影響</span>
            </h4>
            <span className="text-[10px] text-slate-400">氣象署 72 小時數值逐日預報</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {currentRegion.threeDayForecast.map((day, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-lg p-3 border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-1.5">
                    <span className="font-bold text-xs text-slate-900 font-mono">{day.dateStr}</span>
                    <span className="text-[9px] font-medium text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-100">
                      {day.dayLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 my-1.5">
                    <div className="p-1.5 bg-slate-50 rounded-lg">
                      {renderWeatherIcon(day.weatherIcon, 'w-5 h-5')}
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-800 leading-tight">
                        {day.weatherCondition}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        {day.tempMin}° ~ <span className="font-bold text-slate-900">{day.tempMax}°C</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-0.5 text-[10px] text-slate-500 bg-slate-50/70 p-1.5 rounded mt-2 font-mono">
                    <div className="flex justify-between">
                      <span>降雨機率</span>
                      <span className={`font-bold ${day.rainChance >= 50 ? 'text-blue-600' : 'text-slate-700'}`}>
                        {day.rainChance}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>相對濕度</span>
                      <span>{day.humidity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>風向風力</span>
                      <span>{day.windSpeed}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-600 leading-relaxed">
                  <span className="font-bold text-emerald-800">農事：</span>{day.advisoryTip}
                </div>
              </div>
            ))}
          </div>

          {/* Microclimate Notice */}
          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>
              <strong>智慧灌溉聯動：</strong>若未來 24 小時降雨機率逾 60%，系統將自動推播通知產銷班暫緩自動滴灌排程，節約農業用水並防止積水傷根。
            </span>
          </div>
        </div>

        {/* Module C: Smart Agronomy Decision & Pest Advisory (3 Cols) */}
        <div className="lg:col-span-3 bg-slate-900 text-white rounded-xl p-3.5 shadow-2xs space-y-2.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                <h4 className="font-bold text-xs sm:text-sm text-white">智慧田間決策分析</h4>
              </div>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                currentRegion.smartFarmingAdvice.pestRiskLevel === 'high' 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                  : currentRegion.smartFarmingAdvice.pestRiskLevel === 'moderate'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                病蟲害風險: {currentRegion.smartFarmingAdvice.pestRiskLevel === 'high' ? '高風險' : currentRegion.smartFarmingAdvice.pestRiskLevel === 'moderate' ? '中度警戒' : '低風險安全'}
              </span>
            </div>

            {/* Smart Advice Items */}
            <div className="space-y-2 text-xs">
              <div className="bg-slate-800/80 rounded-lg p-2 border border-slate-700/60">
                <div className="text-[10px] text-teal-300 font-bold mb-0.5">💧 節水灌溉調控</div>
                <div className="text-[11px] text-slate-300 leading-snug">
                  {currentRegion.smartFarmingAdvice.irrigationStatus}
                </div>
              </div>

              <div className="bg-slate-800/80 rounded-lg p-2 border border-slate-700/60">
                <div className="text-[10px] text-amber-300 font-bold mb-0.5">🛡️ 綠色施藥適宜度</div>
                <div className="text-[11px] text-slate-300 leading-snug">
                  {currentRegion.smartFarmingAdvice.sprayingStatus}
                </div>
              </div>

              <div className="bg-slate-800/80 rounded-lg p-2 border border-slate-700/60">
                <div className="text-[10px] text-emerald-300 font-bold mb-0.5">📦 採收與保鮮冷鏈</div>
                <div className="text-[11px] text-slate-300 leading-snug">
                  {currentRegion.smartFarmingAdvice.harvestStatus}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-rose-950/40 border border-rose-500/30 rounded-lg p-2 text-[10px] text-rose-200 flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-rose-300">產銷即時防護：</strong>
              <span>{currentRegion.smartFarmingAdvice.pestWarningText}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
