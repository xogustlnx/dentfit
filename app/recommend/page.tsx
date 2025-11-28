"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuStar } from "react-icons/lu";

const rankingList = [
  {
    rank: 1,
    name: "Lumen Wave Pro",
    desc: "슬림 헤드 · Soft 모, 추천 적합도 92%",
    price: "₩12,500",
    match: "92%",
    features: ["Soft 모", "슬림 헤드", "4주 교체"],
    link: "/",
  },
  {
    rank: 2,
    name: "Puremint Flex Mini",
    desc: "좁은 치간용 미니 헤드, 교정 사용자 만족도 높음",
    price: "₩11,300",
    match: "88%",
    features: ["미니 헤드", "교정용", "탄력 모"],
    link: "/",
  },
  {
    rank: 3,
    name: "Brillia Gentle Air",
    desc: "무게 중심 안정화 · 초미세모, 잇몸 자극 최소화",
    price: "₩14,200",
    match: "87%",
    features: ["초미세모", "무게 밸런스", "민감성"],
    link: "/",
  },
  {
    rank: 4,
    name: "Atria Leaf Lite",
    desc: "라이트 그립 · 친환경 모, 매월 구독 옵션",
    price: "₩13,500",
    match: "84%",
    features: ["가벼움", "친환경", "구독"],
    link: "/",
  },
  {
    rank: 5,
    name: "Mossy Calm Slim",
    desc: "연두색 모 패턴 · Soft+, 민감성 잇몸에 최적",
    price: "₩10,900",
    match: "82%",
    features: ["Soft+", "슬림", "민감성"],
    link: "/",
  },
];

const matchingSteps = [
  {
    title: "측정값 정규화",
    desc: "손 둘레, 손가락 길이를 정규화해 각 제품의 그립 구간과 매칭합니다.",
  },
  {
    title: "헤드 매칭",
    desc: "앞니 폭과 치열 간격을 기반으로 헤드 폭 / 모 배열을 점수화합니다.",
  },
  {
    title: "피드백 보정",
    desc: "사용 만족도와 재구매율을 주 단위로 갱신해 랭킹을 재정렬합니다.",
  },
];

export default function RecommendPage() {
  const [isReady, setIsReady] = useState(false);
  const [rankingVisible, setRankingVisible] = useState(false);
  const rankingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!rankingRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRankingVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(rankingRef.current);
    return () => observer.disconnect();
  }, []);

  const fadeClass = isReady ? "animate-fade-up" : "opacity-0 translate-y-6";
  const delayStyle = (seconds: number) => (isReady ? { animationDelay: `${seconds}s` } : undefined);
  const rankingFadeClass = rankingVisible ? "animate-fade-up" : "opacity-0 translate-y-6";
  const rankingDelayStyle = (seconds: number) => (rankingVisible ? { animationDelay: `${seconds}s` } : undefined);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 lg:px-16">
      <section
        className={`flex flex-col gap-10 rounded-3xl border border-slate-200/50 bg-gradient-to-br from-sky-50/40 via-rose-50/40 to-indigo-50/50 p-10 ${fadeClass}`}
        style={delayStyle(0)}
      >
        <div className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${fadeClass}`} style={delayStyle(0.08)}>
          <div className={`space-y-4 lg:flex-1 ${fadeClass}`} style={delayStyle(0.16)}>
           
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              손 크기와 앞니 폭으로 정의한
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-emerald-500 to-rose-500">
                나만의 칫솔 프로필
              </span>
            </h1>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              최근 측정값을 기준으로 손에 안정적인 그립과 전치·구치 라인에 맞는 헤드 폭을 계산했습니다. 아래 추천 리스트는 동일한 필터 조건으로 선별된 제품 순위입니다.
            </p>
            <div className={`flex flex-wrap gap-3 text-xs ${fadeClass}`} style={delayStyle(0.24)}>
              <span className="rounded-full border border-slate-200 px-3 py-1 text-slate-600">손 둘레 185mm</span>
              <span className="rounded-full border border-slate-200 px-3 py-1 text-slate-600">전치 폭 8.4mm</span>
              <span className="rounded-full border border-slate-200 px-3 py-1 text-slate-600">Soft+ 모 선호</span>
            </div>
          </div>
          <div className={`w-full max-w-xs rounded-3xl border border-slate-200/70 bg-white/80 px-6 py-8 backdrop-blur ${fadeClass}`} style={delayStyle(0.3)}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-600">맞춤 적합도</span>
              <span className="text-lg font-semibold text-slate-900">93%</span>
            </div>
            <dl className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <dt>그립 권장 지름</dt>
                <dd className="font-medium text-slate-900">18mm</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>헤드 권장 폭</dt>
                <dd className="font-medium text-slate-900">8mm</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>추천 모 강도</dt>
                <dd className="font-medium text-slate-900">Soft+</dd>
              </div>
            </dl>
            <Link
              href="/measure"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
            >
              측정값 다시 입력하기
            </Link>
          </div>
        </div>

        <div className={`relative rounded-3xl border border-slate-200/60 bg-white/70 px-6 py-8 backdrop-blur ${fadeClass}`} style={delayStyle(0.38)}>
          <span className="absolute -top-3 left-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 shadow-sm">
            최적의 칫솔
          </span>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
              <Image
                src="/tooth brush.webp"
                alt="Aquila Soft Precision 칫솔"
                width={220}
                height={300}
                className="h-auto w-[180px] rounded-3xl border border-slate-200/70 object-cover shadow-xl"
                priority
              />
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Aquila</p>
                <p className="text-3xl font-semibold tracking-tight text-slate-900">Soft Precision</p>
                <p className="text-xs leading-5 text-slate-500">
                  부드러운 실리콘 그립과 초슬림 헤드 구성으로 손 크기와 앞니 폭에 맞게 정교하게 설계된 칫솔입니다.
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="flex items-center gap-0.5 text-amber-500">
                      <LuStar className="h-4 w-4 fill-current" />
                      <LuStar className="h-4 w-4 fill-current" />
                      <LuStar className="h-4 w-4 fill-current" />
                      <LuStar className="h-4 w-4 fill-current" />
                      <LuStar className="h-4 w-4 text-slate-200" />
                    </span>
                    <span className="text-xs font-medium text-slate-500">4.7 / 5 (128명)</span>
                  </div>
                  <blockquote className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-1.5 text-xs leading-5 text-slate-500 italic">
                    "손목이 작은 편인데 손잡이가 딱 맞고 헤드가 얇아서 구치까지 편하게 닿아요." — 김*연
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">그립</p>
              <p className="mt-2">실리콘 코팅 · 18mm</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">헤드</p>
              <p className="mt-2">슬림 헤드 · 8mm</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">모</p>
              <p className="mt-2">Soft+ · 미세모 38 Cluster</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">기본가</p>
              <p className="mt-2">₩13,900 · 리필 2개 포함</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">구매 옵션 선택</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 hover:bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">구독 구매</span>
                  <span className="text-xs font-semibold text-slate-500">₩9,900 /월</span>
                </div>
                <p className="text-xs leading-5 text-slate-500">리필 2개 포함 · 교체 주기 알림 · 무료 배송</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>최종 결제 금액</span>
                  <span className="font-semibold text-slate-700">₩9,900 /월</span>
                </div>
                <Link
                  href="/purchase?type=subscription"
                  className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
                >
                  구매하기
                </Link>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 hover:bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">낱개 구매</span>
                  <span className="text-xs font-semibold text-slate-500">₩13,900</span>
                </div>
                <p className="text-xs leading-5 text-slate-500">본체 + 추가 모 1개 · 당일 출고 · 무료 반품 30일</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>최종 결제 금액</span>
                  <span className="font-semibold text-slate-700">₩13,900</span>
                </div>
                <Link
                  href="/purchase?type=single"
                  className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
                >
                  구매하기
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
              <div>
                <p className="font-medium text-slate-900">모 교체 주기</p>
                <p>4주 주기로 교체 알림 전송</p>
              </div>
              <span className="text-xs text-slate-500">자동 안내</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
              <div>
                <p className="font-medium text-slate-900">대체 모델</p>
                <p>Brillia Gentle Air · Soft 모</p>
              </div>
              <Link href="/" className="text-xs font-medium text-slate-500 underline decoration-slate-300">
                비교하기
              </Link>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
              <div>
                <p className="font-medium text-slate-900">관련 액세서리</p>
                <p>미끄럼 방지 슬리브 · 스탠드 홀더</p>
              </div>
              <Link href="/" className="text-xs font-medium text-slate-500 underline decoration-slate-300">
                장바구니 추가
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={rankingRef}
        className={`space-y-6 border-t border-slate-200 py-8 ${rankingFadeClass}`}
        style={rankingDelayStyle(0)}
      >
        <div className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${rankingFadeClass}`} style={rankingDelayStyle(0.08)}>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">ranking list</p>
            <h2 className="text-2xl font-semibold text-slate-900">나와 비슷한 사용자가 선호한 칫솔</h2>
            <p className="text-sm text-slate-600">손 둘레 ±5mm / 전치 폭 ±0.5mm 조건으로 필터링된 상위 5개 제품입니다.</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            전체 랭킹 보기
          </Link>
        </div>
        <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
          {rankingList.map((item, index) => (
            <div
              key={item.rank}
              className={`flex flex-col gap-4 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between ${rankingFadeClass}`}
              style={rankingDelayStyle(0.16 + index * 0.08)}
            >
              <div className="flex flex-1 items-start gap-4">
                <span className="text-lg font-semibold text-slate-700">{item.rank}</span>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold text-slate-900">{item.name}</p>
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                      적합도 {item.match}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
                    {item.features.map((feature) => (
                      <span key={feature} className="rounded-full border border-slate-200 px-2 py-0.5">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 sm:w-[200px] sm:flex-row sm:items-center sm:justify-end sm:gap-3">
                <span className="text-base font-semibold text-slate-900">{item.price}</span>
                <Link
                  href={item.link}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
                >
                  구매하기
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

