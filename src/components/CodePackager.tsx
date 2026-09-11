import React, { useState } from 'react';
import { 
  Download, 
  FileCode, 
  Folder, 
  CheckCircle2, 
  Copy, 
  Check, 
  Terminal, 
  Server, 
  Database, 
  ShieldCheck, 
  Sparkles,
  Layers,
  FileText,
  Boxes
} from 'lucide-react';
import JSZip from 'jszip';
import { CI3_PROJECT_FILES, CodeFile } from '../data/ci3Codebase';

export const CodePackager: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<CodeFile>(CI3_PROJECT_FILES[0]);
  const [isCopied, setIsCopied] = useState(false);
  const [isPackaging, setIsPackaging] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsPackaging(true);
    setDownloadSuccess(false);

    try {
      const zip = new JSZip();
      
      // Add all project source files into the zip
      CI3_PROJECT_FILES.forEach(file => {
        zip.file(file.path, file.content);
      });

      // Add .env.example
      zip.file('.env.example', `# 好農方舟 HaoNong Ark - 營運環境參數
CI_ENV=production
BASE_URL=https://haonong.example.tw/

# MySQL / MariaDB 資料庫設定
DB_HOST=127.0.0.1
DB_NAME=haonong_ark
DB_USER=haonong_user
DB_PASS=HaoNong@2026!Sec

# 農業部 Open Data API Key (選填)
MOA_API_KEY=
`);

      // Generate zip blob
      const content = await zip.generateAsync({ type: 'blob' });
      
      // Trigger download
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'haonong_ark_ci3_php81_system.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadSuccess(true);
    } catch (err) {
      console.error('Packaging failed', err);
    } finally {
      setIsPackaging(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      
      {/* Top Banner - High Density */}
      <div className="bg-slate-900 border-b border-slate-800 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-amber-500/20 text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-md border border-amber-400/30">
                  階段二 & 階段三：PHP 8.1 / CI3 營運原始碼打包
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-md border border-emerald-400/30">
                  符合真實商業營運規格
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
                好農方舟完整營運系統程式碼與一鍵打包下載
              </h1>
              <p className="text-slate-400 text-xs mt-1.5 max-w-2xl leading-relaxed">
                涵蓋 MVC 完整架構（Controller、Model、View、Config）、農業部 OpenData 串接函式庫、MySQL 8.0 完整 schema.sql、Nginx 與 Docker 部署容器設定及繁體中文上線手冊。
              </p>
            </div>

            {/* Packaging Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                id="btn-download-full-zip"
                onClick={handleDownloadZip}
                disabled={isPackaging}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-black rounded-lg shadow-md hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <Download className={`w-4 h-4 ${isPackaging ? 'animate-bounce' : ''}`} />
                <span>{isPackaging ? '正在壓縮打包中...' : '📦 一鍵下載完整專案包 (ZIP)'}</span>
              </button>
            </div>
          </div>

          {downloadSuccess && (
            <div className="mt-3 p-3 bg-emerald-950/80 border border-emerald-500 text-emerald-200 rounded-lg text-xs flex items-center justify-between shadow-2xs">
              <span className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                下載已開始！檔案名稱：haonong_ark_ci3_php81_system.zip（解壓縮後可直接依照 DEPLOYMENT.md 指南部署上線）。
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Code Explorer Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* File Tree Explorer (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-900 rounded-xl border border-slate-800 p-3.5 space-y-3 shadow-2xs">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>專案檔案目錄結構 (CI3)</span>
              <span className="text-[10px] text-amber-400 font-mono">PHP 8.1 規格</span>
            </div>

            <div className="space-y-1 text-xs font-mono max-h-[500px] overflow-y-auto pr-1">
              {CI3_PROJECT_FILES.map((file) => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                      <span className="truncate text-xs">{file.path}</span>
                    </div>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {file.category}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Architecture Highlights */}
            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
              <div className="font-bold text-slate-300 flex items-center gap-1.5 text-xs">
                <Boxes className="w-3.5 h-3.5 text-emerald-400" />
                營運系統三大特點確認
              </div>
              <ul className="space-y-0.5 text-[11px] list-disc list-inside text-slate-400">
                <li>已完全移除營養午餐相關舊邏輯</li>
                <li>內建農業部 OpenData 每日定時行情同步</li>
                <li>包含全台農林漁牧生產統計與產銷預警</li>
              </ul>
            </div>
          </div>

          {/* Code Viewer (8 Cols) */}
          <div className="lg:col-span-8 bg-slate-900 rounded-xl border border-slate-800 flex flex-col overflow-hidden shadow-2xs">
            {/* Viewer Header */}
            <div className="p-3 bg-slate-850 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  {selectedFile.path}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {selectedFile.description}
                </div>
              </div>

              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? '已複製！' : '複製代碼'}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-3.5 overflow-x-auto max-h-[600px] font-mono text-xs text-slate-300 leading-relaxed bg-[#0b0f19]">
              <pre className="whitespace-pre">
                <code>{selectedFile.content}</code>
              </pre>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
