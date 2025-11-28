"use client";

import { useState } from "react";
import {
  LuLock,
  LuCircleCheck,
  LuUser,
  LuUserCheck,
  LuMessageSquare,
  LuPlus,
  LuChevronDown,
  LuChevronUp,
  LuX,
} from "react-icons/lu";

type QnAType = "doctor" | "community";

type Question = {
  id: number;
  type: QnAType;
  title: string;
  content: string;
  author: string;
  date: string;
  publicAnswer?: string;
  privateAnswer?: string;
  answered: boolean;
  doctorName?: string;
};

const mockQuestions: Question[] = [
  {
    id: 1,
    type: "doctor",
    title: "잇몸에서 피가 나는데 칫솔 문제인가요?",
    content: "양치할 때마다 잇몸에서 피가 나는데, 칫솔 모가 너무 딱딱한 건지 궁금합니다.",
    author: "김미경",
    date: "2025.03.15",
    publicAnswer:
      "잇몸 출혈은 여러 원인이 있습니다. 초극세모 칫솔로 바꿔보시고, 양치 시 너무 세게 닦지 않도록 주의하세요.",
    privateAnswer:
      "귀하의 프로필을 보니 50대 여성이시고 치은염 경험이 있으시네요. 이 경우 잇몸 질환의 초기 증상일 수 있습니다. 정기적인 스케일링과 함께 부드러운 칫솔 모를 사용하시고, 치간칫솔도 병행하시는 것을 권장합니다. 2주 이상 지속되면 치과 방문을 권합니다.",
    answered: true,
    doctorName: "이치과 원장",
  },
  {
    id: 2,
    type: "community",
    title: "교정 중인데 어떤 칫솔이 좋을까요?",
    content: "교정 장치 때문에 칫솔 선택이 어려워요. 추천해주세요.",
    author: "박민수",
    date: "2025.03.14",
    publicAnswer:
      "교정 중이시라면 헤드가 작고 모가 부드러운 칫솔을 추천합니다. 치간칫솔도 함께 사용하시면 좋아요.",
    answered: true,
  },
  {
    id: 3,
    type: "doctor",
    title: "임플란트 주변 관리 방법",
    content: "임플란트를 받았는데 칫솔 선택이 중요하다고 들었어요.",
    author: "최영희",
    date: "2025.03.13",
    publicAnswer: "임플란트 주변은 특별한 관리가 필요합니다.",
    privateAnswer:
      "임플란트 주변은 자연 치아와 달리 잇몸이 치아에 직접 부착되어 있어 세심한 관리가 필요합니다. 초극세모 칫솔과 전용 치간칫솔을 사용하시고, 금속 부분을 긁지 않도록 주의하세요.",
    answered: true,
    doctorName: "김치과 원장",
  },
  {
    id: 4,
    type: "community",
    title: "칫솔 교체 주기는 어떻게 되나요?",
    content: "칫솔을 얼마나 자주 바꿔야 하나요?",
    author: "이준호",
    date: "2025.03.12",
    publicAnswer: "일반적으로 3개월마다 교체하는 것을 권장합니다.",
    answered: true,
  },
];

export default function QnAPage() {
  const [activeTab, setActiveTab] = useState<QnAType>("community");
  const [isSubscribed, setIsSubscribed] = useState(false); // 구독 여부
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const filteredQuestions = mockQuestions.filter((q) => q.type === activeTab);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          궁금할 땐 치과의사에게 직접 물어보세요
        </h1>
        <p className="text-sm text-slate-500">
          전문가 상담과 커뮤니티 Q&A로 궁금증을 해결하세요
        </p>
      </div>

      {/* 탭 선택 */}
      <div className="flex gap-2 rounded-lg border border-slate-200 bg-white p-1">
        <button
          onClick={() => setActiveTab("community")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "community"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <LuMessageSquare className="h-4 w-4" />
          <span>커뮤니티 Q&A</span>
        </button>
        <button
          onClick={() => setActiveTab("doctor")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "doctor"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <LuUserCheck className="h-4 w-4" />
          <span>의사 상담</span>
          {!isSubscribed && (
            <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] text-white">
              구독 필요
            </span>
          )}
        </button>
      </div>

      {/* 구독 안내 (의사 상담 탭이고 구독 안 했을 때) */}
      {activeTab === "doctor" && !isSubscribed && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <LuLock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-900">구독자 전용 콘텐츠</p>
              <p className="mt-1 text-xs text-amber-700">
                의사의 상세 답변을 보려면 정기배송 구독이 필요합니다.
              </p>
              <button
                onClick={() => setIsSubscribed(true)}
                className="mt-3 rounded-lg bg-amber-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-amber-700"
              >
                구독하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 질문 등록 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowQuestionForm(!showQuestionForm)}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          <LuPlus className="h-4 w-4" />
          <span>질문 등록</span>
        </button>
      </div>

      {/* 질문 등록 폼 */}
      {showQuestionForm && (
        <QuestionForm
          type={activeTab}
          onClose={() => setShowQuestionForm(false)}
        />
      )}

      {/* 질문 목록 */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
            <p className="text-sm text-slate-500">등록된 질문이 없습니다</p>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              isSubscribed={isSubscribed}
              isExpanded={expandedId === question.id}
              onToggleExpand={() => toggleExpand(question.id)}
            />
          ))
        )}
      </div>

      {/* 이용 안내 */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">이용 안내</h3>
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-start gap-2">
            <LuCircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
            <div>
              <p className="font-medium text-slate-700">무료 사용자</p>
              <p className="mt-0.5">질문 등록: 무제한 · 공개 Q&A 열람: 무제한</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <LuLock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
            <div>
              <p className="font-medium text-slate-700">구독자</p>
              <p className="mt-0.5">비밀 상세 답변 열람 가능 · 의사 맞춤 상담</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

type QuestionCardProps = {
  question: Question;
  isSubscribed: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
};

function QuestionCard({ question, isSubscribed, isExpanded, onToggleExpand }: QuestionCardProps) {
  const canViewPrivate = question.type === "community" || isSubscribed;

  return (
    <article className="rounded-lg border border-slate-200 bg-white">
      <div className="p-4">
        {/* 질문 헤더 */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {question.type === "doctor" ? (
                <LuUserCheck className="h-4 w-4 text-blue-600" />
              ) : (
                <LuUser className="h-4 w-4 text-slate-500" />
              )}
              <span className="text-sm font-medium text-slate-900">{question.author}</span>
              {question.doctorName && (
                <span className="text-xs text-slate-500">→ {question.doctorName}</span>
              )}
            </div>
            <h3 className="mt-2 text-base font-semibold text-slate-900">{question.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{question.content}</p>
            <p className="mt-2 text-xs text-slate-400">{question.date}</p>
          </div>
        </div>

        {/* 공개 답변 */}
        {question.publicAnswer && (
          <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <LuCircleCheck className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-xs font-medium text-slate-700">공개 답변</span>
            </div>
            <p className="text-sm text-slate-700">{question.publicAnswer}</p>
          </div>
        )}

        {/* 비밀 답변 */}
        {question.privateAnswer && (
          <div className="mt-3">
            {canViewPrivate ? (
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <LuCircleCheck className="h-3.5 w-3.5 text-blue-600" />
                  <span className="text-xs font-medium text-blue-700">상세 답변 (구독자 전용)</span>
                </div>
                <p className="text-sm text-slate-700">{question.privateAnswer}</p>
              </div>
            ) : (
              <button
                onClick={onToggleExpand}
                className="w-full rounded-lg border border-amber-200 bg-amber-50 p-3 text-left transition-colors hover:bg-amber-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LuLock className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-900">
                      상세 답변 보기 (구독 필요)
                    </span>
                  </div>
                  {isExpanded ? (
                    <LuChevronUp className="h-4 w-4 text-amber-600" />
                  ) : (
                    <LuChevronDown className="h-4 w-4 text-amber-600" />
                  )}
                </div>
                {isExpanded && (
                  <p className="mt-2 text-xs text-amber-700">
                    정기배송 구독 시 의사의 맞춤 상세 답변을 확인할 수 있습니다.
                  </p>
                )}
              </button>
            )}
          </div>
        )}

        {/* 답변 대기 중 */}
        {!question.answered && (
          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <p className="text-xs text-slate-500">답변 대기 중...</p>
          </div>
        )}
      </div>
    </article>
  );
}

type QuestionFormProps = {
  type: QnAType;
  onClose: () => void;
};

function QuestionForm({ type, onClose }: QuestionFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 API 호출
    alert("질문이 등록되었습니다.");
    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">
          {type === "doctor" ? "의사 상담 질문" : "커뮤니티 질문"}
        </h3>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
        >
          <LuX className="h-4 w-4" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="질문 제목을 입력하세요"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="질문 내용을 상세히 입력하세요"
            rows={4}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
}

