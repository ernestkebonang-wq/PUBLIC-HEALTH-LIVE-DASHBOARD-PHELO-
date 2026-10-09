import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Filter,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { HealthArticle, LanguageCode } from '../types';
import { APPROVED_HEALTH_ARTICLES } from '../data/healthLibrary';

interface HealthLibraryViewProps {
  currentLang: LanguageCode;
  initialArticleId?: string;
  initialCategory?: string;
}

export const HealthLibraryView: React.FC<HealthLibraryViewProps> = ({ 
  currentLang,
  initialArticleId,
  initialCategory
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [activeArticle, setActiveArticle] = useState<HealthArticle | null>(() => {
    if (initialArticleId) {
      return APPROVED_HEALTH_ARTICLES.find(a => a.id === initialArticleId) || null;
    }
    return null;
  });

  React.useEffect(() => {
    if (initialArticleId) {
      const match = APPROVED_HEALTH_ARTICLES.find(a => a.id === initialArticleId);
      if (match) {
        setActiveArticle(match);
        setSelectedCategory(match.category);
      }
    } else if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialArticleId, initialCategory]);

  const categories = [
    { id: 'all', labelEn: 'All Topics', labelTn: 'Dintlha Tsotlhe' },
    { id: 'diarrhoeal', labelEn: 'Diarrhoea & Hydration', labelTn: 'Letshololo & ORS' },
    { id: 'respiratory', labelEn: 'Cough & TB', labelTn: 'Sehuba & TB' },
    { id: 'maternal_child', labelEn: 'Maternal & Child', labelTn: 'Boimana & Bana' },
    { id: 'malaria', labelEn: 'Malaria Risk', labelTn: 'Bolwetse jwa Malaria' },
    { id: 'first_aid', labelEn: 'Snakebite / First Aid', labelTn: 'Noga / First Aid' },
    { id: 'mental_health', labelEn: 'Mental Wellbeing', labelTn: 'Maikutlo & Lifeline' },
  ];

  const filteredArticles = useMemo(() => {
    return APPROVED_HEALTH_ARTICLES.filter(art => {
      if (selectedCategory !== 'all' && art.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesEn = art.titleEn.toLowerCase().includes(q) || art.summaryEn.toLowerCase().includes(q);
        const matchesTn = art.titleTn.toLowerCase().includes(q) || art.summaryTn.toLowerCase().includes(q);
        return matchesEn || matchesTn;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Title & Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 mb-1">
          <BookOpen className="w-4 h-4 text-teal-700" />
          <span>{currentLang === 'tn' ? 'Dikaelo tsa Botsogo tse di Dumeletsweng' : 'Approved Health Protocols'}</span>
          <span aria-hidden="true">·</span>
          <span>{currentLang === 'tn' ? 'Ministry of Health Botswana' : 'MoH Botswana Aligned'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {currentLang === 'tn' ? 'Kitso le Kaelo ya Botsogo mo Gae' : 'Botswana Public Health Protocols'}
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-2xl">
          {currentLang === 'tn'
            ? 'Dikaelo tse di netefaditsweng tsa kalafo ya bana, thibelo ya malaria, go tlhokomela boimana le thuso ya bofefo.'
            : 'Clinically vetted guidance on acute conditions, rehydration preparation, malaria prevention, and maternal danger signs.'}
        </p>
      </div>

      {/* Nature & Living Health Environment Banner */}
      <div className="mb-6 rounded-3xl overflow-hidden relative shadow-sm border border-slate-200 aspect-[21/6] max-h-48 bg-slate-900">
        <img
          src="/src/assets/images/botswana_nature_wellness_1790159662795.jpg"
          alt="Okavango delta waterways representing health and vitality"
          className="w-full h-full object-cover opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent flex flex-col justify-center px-6 text-white">
          <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider mb-1">
            Botswana Primary Healthcare Standards
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold max-w-md">
            Pula & Boitekanelo: Prevention, Early Action, Community Care
          </h3>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs mb-6 space-y-3">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={currentLang === 'tn' ? 'Batla ka kgang ya botsogo...' : 'Search health topics or symptoms...'}
            className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-slate-300 focus:border-teal-700 outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {currentLang === 'tn' ? cat.labelTn : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Content Layout: List & Active Article modal/drawer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map(article => (
          <div
            key={article.id}
            className="bg-white rounded-2xl border border-slate-200 hover:border-teal-300 shadow-xs hover:shadow-sm transition-all p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                <span className="font-semibold text-teal-800 uppercase tracking-wide">
                  {article.category}
                </span>
                <span>{article.mohProtocolVersion}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {currentLang === 'tn' ? article.titleTn : article.titleEn}
              </h3>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {currentLang === 'tn' ? article.summaryTn : article.summaryEn}
              </p>

              {/* Warning signs snippet */}
              <div className="mt-3 p-2.5 bg-rose-50/70 border border-rose-100 rounded-xl">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-900 mb-1">
                  <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                  <span>{currentLang === 'tn' ? 'Ela Tlhoko:' : 'Watch Out For:'}</span>
                </div>
                <div className="text-[11px] text-rose-800 line-clamp-2">
                  {(currentLang === 'tn' ? article.warningSignsTn : article.warningSignsEn)[0]}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Reviewed {article.reviewDate}
              </span>

              <button
                onClick={() => setActiveArticle(article)}
                className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1"
              >
                <span>{currentLang === 'tn' ? 'Bala Tshedimosetso' : 'Read Protocol'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50">
              <div>
                <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
                  {activeArticle.category} · {activeArticle.mohProtocolVersion}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                  {currentLang === 'tn' ? activeArticle.titleTn : activeArticle.titleEn}
                </h2>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5 text-sm text-slate-800 leading-relaxed">
              <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-xl text-xs text-teal-950 font-medium">
                {currentLang === 'tn' ? activeArticle.summaryTn : activeArticle.summaryEn}
              </div>

              {/* Body */}
              <div className="whitespace-pre-line text-xs sm:text-sm text-slate-700">
                {currentLang === 'tn' ? activeArticle.contentTn : activeArticle.contentEn}
              </div>

              {/* Warning signs */}
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                  <span>{currentLang === 'tn' ? 'Matshwao a Kotsi a a Tlhokang Kokelo:' : 'Clinical Danger Signs (Seek Care Promptly):'}</span>
                </h4>
                <ul className="space-y-1 text-xs text-rose-900">
                  {(currentLang === 'tn' ? activeArticle.warningSignsTn : activeArticle.warningSignsEn).map((sign, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practical steps */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>{currentLang === 'tn' ? 'Dikgato tse di Mosola mo Gae:' : 'Practical Home Interventions:'}</span>
                </h4>
                <ul className="space-y-1 text-xs text-slate-700">
                  {(currentLang === 'tn' ? activeArticle.practicalStepsTn : activeArticle.practicalStepsEn).map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-teal-700">✓</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metadata footnote */}
              <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                Approved by {activeArticle.reviewedBy} · Review Date: {activeArticle.reviewDate}
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end shrink-0">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
              >
                Close Protocol
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
