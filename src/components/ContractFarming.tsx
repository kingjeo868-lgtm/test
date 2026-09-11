import React from 'react';
import { 
  TreePine, 
  Sparkles, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Gift, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Users
} from 'lucide-react';
import { MOCK_CONTRACT_PROJECTS } from '../data/mockData';
import { ContractProject } from '../types';

interface ContractFarmingProps {
  onJoinContract: (project: ContractProject) => void;
}

export const ContractFarming: React.FC<ContractFarmingProps> = ({ onJoinContract }) => {
  return (
    <div className="min-h-screen bg-slate-50/60 pb-12">
      
      {/* Header Banner - High Density */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 shadow-xs">
        <div className="max-w-4xl mx-auto text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold px-2.5 py-0.5 rounded border border-emerald-400/30 shadow-2xs">
            <TreePine className="w-3.5 h-3.5" /> 友善大地・產地直通契約耕作
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold font-serif">
            在地小農契作與果樹認養專案
          </h1>
          <p className="text-emerald-200 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            跳過盤商中間轉手，直接與金牌產銷班長簽訂年度契作。享受產地第一手無毒甘甜，並享專屬掛牌與果園農家親訪體驗。
          </p>
        </div>
      </div>

      {/* Projects List Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-3.5">
        {MOCK_CONTRACT_PROJECTS.map((project) => {
          const progressPercent = Math.round((project.currentShares / project.targetShares) * 100);

          return (
            <div
              key={project.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:shadow-sm transition-shadow grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Left Image Section (5 Cols) */}
              <div className="lg:col-span-5 relative min-h-[190px] lg:min-h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                  契作認養招募中
                </div>
                <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  {project.location} ｜ {project.farmerName}
                </div>
              </div>

              {/* Right Details Section (7 Cols) */}
              <div className="lg:col-span-7 p-3 sm:p-4 flex flex-col justify-between space-y-2.5">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-emerald-800 text-xs">
                        已認養 {project.currentShares} 份 / 目標 {project.targetShares} 份
                      </span>
                      <span className="text-emerald-700 font-mono text-xs">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, progressPercent)}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" /> 剩餘: {project.daysLeft} 天
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-emerald-600" /> {project.currentShares} 位支持
                      </span>
                    </div>
                  </div>

                  {/* Benefits checklist */}
                  <div className="mt-2.5 bg-emerald-50/70 rounded-md p-2.5 border border-emerald-200 space-y-1">
                    <div className="text-xs font-bold text-emerald-950 flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5 text-emerald-700" /> 契作專屬權益
                    </div>
                    <ul className="text-[11px] text-emerald-900 space-y-0.5">
                      {project.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price and Join button */}
                <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-lg sm:text-xl font-black text-emerald-900 font-mono">
                      NT$ {project.pricePerShare.toLocaleString()}
                      <span className="text-[10px] font-normal text-slate-500 ml-1">/ 份</span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      收穫期程：{project.harvestSchedule}
                    </div>
                  </div>

                  <button
                    onClick={() => onJoinContract(project)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md shadow-2xs transition-colors flex items-center gap-1 text-xs cursor-pointer"
                  >
                    <span>立即參與契作</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
