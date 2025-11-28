"use client";

import { useState } from "react";
import {
  LuStar,
  LuFilter,
  LuCircleCheck,
  LuShield,
  LuInfo,
  LuHeart,
  LuX,
} from "react-icons/lu";

type FilterOption = {
  label: string;
  value: string;
};

type Review = {
  id: number;
  rating: number;
  title: string;
  content: string;
  author: string;
  age: number;
  usagePeriod: string;
  verified: {
    purchase: boolean;
    ai: boolean;
    expert: boolean;
  };
  empathy: number;
  filters: {
    ageGroup: string;
    gender: string;
    bleeding: boolean;
    electric: boolean;
  };
};

const ageGroups: FilterOption[] = [
  { label: "10대", value: "10" },
  { label: "20대", value: "20" },
  { label: "30대", value: "30" },
  { label: "40대", value: "40" },
  { label: "50대", value: "50" },
  { label: "60대+", value: "60+" },
];

const mockReviews: Review[] = [
  {
    id: 1,
    rating: 5,
    title: "3개월 쓰니 출혈 많이 줄었어요",
    content:
      "처음엔 모가 너무 부드러워서 안 닦이는 줄 알았는데, 1주일 쓰니 잇몸에서 피가 안 나더라고요. 지금은 3개월째 사용 중인데 정말 만족합니다.",
    author: "박지영",
    age: 52,
    usagePeriod: "3개월",
    verified: {
      purchase: true,
      ai: true,
      expert: true,
    },
    empathy: 89,
    filters: {
      ageGroup: "50",
      gender: "여성",
      bleeding: true,
      electric: false,
    },
  },
  {
    id: 2,
    rating: 5,
    title: "교정 중인데 정말 편해요",
    content:
      "교정 장치 때문에 칫솔 선택이 어려웠는데, 이 제품은 헤드가 작아서 구석구석 잘 닦이네요. 모도 부드러워서 잇몸 자극이 없어요.",
    author: "김민수",
    age: 28,
    usagePeriod: "2개월",
    verified: {
      purchase: true,
      ai: true,
      expert: false,
    },
    empathy: 67,
    filters: {
      ageGroup: "20",
      gender: "남성",
      bleeding: false,
      electric: false,
    },
  },
  {
    id: 3,
    rating: 4,
    title: "찬물에 시린 증상 개선",
    content:
      "찬물 마실 때 이가 시렸는데, 이 칫솔 사용 후 많이 나아졌어요. 모가 적당히 부드러워서 좋습니다.",
    author: "이수진",
    age: 35,
    usagePeriod: "1개월",
    verified: {
      purchase: true,
      ai: true,
      expert: false,
    },
    empathy: 45,
    filters: {
      ageGroup: "30",
      gender: "여성",
      bleeding: false,
      electric: false,
    },
  },
];

export default function ReviewsPage() {
  const [filters, setFilters] = useState({
    ageGroup: "",
    gender: "",
    bleeding: false,
    electric: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(mockReviews);

  const handleFilterChange = (key: string, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // 필터 적용
    const filtered = mockReviews.filter((review) => {
      if (newFilters.ageGroup && review.filters.ageGroup !== newFilters.ageGroup) return false;
      if (newFilters.gender && review.filters.gender !== newFilters.gender) return false;
      if (newFilters.bleeding && !review.filters.bleeding) return false;
      if (newFilters.electric && review.filters.electric) return false;
      return true;
    });

    setFilteredReviews(filtered);
  };

  const clearFilters = () => {
    setFilters({
      ageGroup: "",
      gender: "",
      bleeding: false,
      electric: false,
    });
    setFilteredReviews(mockReviews);
  };

  const activeFilterCount = Object.values(filters).filter((v) => v !== "" && v !== false).length;
  const resultCount = filteredReviews.length;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          광고 없는, 나와 같은 사람들의 진짜 후기
        </h1>
        <p className="text-sm text-slate-500">
          실구매자 인증과 전문가 검증으로 신뢰할 수 있는 리뷰만 제공합니다
        </p>
      </div>

      {/* 필터 섹션 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <LuFilter className="h-4 w-4" />
            <span>필터</span>
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-slate-900 px-1.5 py-0.5 text-xs text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              초기화
            </button>
          )}
        </div>

        {showFilters && (
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">연령대</label>
                <div className="flex flex-wrap gap-2">
                  {ageGroups.map((group) => (
                    <button
                      key={group.value}
                      onClick={() =>
                        handleFilterChange("ageGroup", filters.ageGroup === group.value ? "" : group.value)
                      }
                      className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                        filters.ageGroup === group.value
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {group.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">성별</label>
                <div className="flex gap-2">
                  {["여성", "남성"].map((gender) => (
                    <button
                      key={gender}
                      onClick={() =>
                        handleFilterChange("gender", filters.gender === gender ? "" : gender)
                      }
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        filters.gender === gender
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">증상</label>
                <label className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 transition-colors hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={filters.bleeding}
                    onChange={(e) => handleFilterChange("bleeding", e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-1 focus:ring-slate-400"
                  />
                  <span className="text-sm text-slate-700">잇몸 출혈 있음</span>
                </label>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">사용 경험</label>
                <label className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 transition-colors hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={filters.electric}
                    onChange={(e) => handleFilterChange("electric", e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-1 focus:ring-slate-400"
                  />
                  <span className="text-sm text-slate-700">전동칫솔 미사용</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 검색 결과 */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-sm text-slate-700">
            <span className="font-semibold text-slate-900">동일 조건 리뷰 {resultCount}개</span> 발견
          </p>
        </div>
      </div>

      {/* Top 리뷰 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Top 리뷰</h2>
          <span className="text-xs text-slate-500">공감순 정렬</span>
        </div>

        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      {/* 검증 시스템 안내 */}
      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5">
        <h3 className="mb-4 text-sm font-semibold text-slate-900">검증 시스템</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-start gap-2.5">
            <LuCircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
            <div>
              <p className="text-xs font-medium text-slate-900">실구매자 인증</p>
              <p className="mt-0.5 text-xs text-slate-500">구매 내역 연동 필수</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <LuShield className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
            <div>
              <p className="text-xs font-medium text-slate-900">AI 허위 탐지</p>
              <p className="mt-0.5 text-xs text-slate-500">의심 리뷰 자동 필터링</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <LuInfo className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
            <div>
              <p className="text-xs font-medium text-slate-900">신고 시스템</p>
              <p className="mt-0.5 text-xs text-slate-500">커뮤니티 자정 작용</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [empathized, setEmpathized] = useState(false);
  const [empathyCount, setEmpathyCount] = useState(review.empathy);

  const handleEmpathy = () => {
    if (empathized) {
      setEmpathyCount(empathyCount - 1);
    } else {
      setEmpathyCount(empathyCount + 1);
    }
    setEmpathized(!empathized);
  };

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5">
      {/* 헤더 */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <LuStar
              key={i}
              className={`h-4 w-4 ${
                i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          {review.verified.purchase && (
            <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-700">
              <LuCircleCheck className="h-3 w-3" />
              구매인증
            </span>
          )}
          {review.verified.expert && (
            <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
              <LuCircleCheck className="h-3 w-3" />
              전문가검증
            </span>
          )}
        </div>
      </div>

      {/* 제목 */}
      <h3 className="mb-2 text-base font-semibold text-slate-900">{review.title}</h3>

      {/* 내용 */}
      <p className="mb-4 text-sm leading-6 text-slate-600">{review.content}</p>

      {/* 작성자 정보 */}
      <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
        <span className="font-medium text-slate-700">
          {review.author}({review.age}세)
        </span>
        <span>·</span>
        <span>사용 기간 {review.usagePeriod}</span>
      </div>

      {/* 공감 및 필터 정보 */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <button
          onClick={handleEmpathy}
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
            empathized
              ? "bg-rose-50 text-rose-600"
              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <LuHeart className={`h-3.5 w-3.5 ${empathized ? "fill-rose-600" : ""}`} />
          <span>같은 필터 사용자 {empathyCount}명이 공감</span>
        </button>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          {review.filters.ageGroup && (
            <span className="rounded bg-slate-100 px-1.5 py-0.5">
              {review.filters.ageGroup}대
            </span>
          )}
          {review.filters.gender && (
            <span className="rounded bg-slate-100 px-1.5 py-0.5">{review.filters.gender}</span>
          )}
          {review.filters.bleeding && (
            <span className="rounded bg-slate-100 px-1.5 py-0.5">출혈</span>
          )}
        </div>
      </div>
    </article>
  );
}
