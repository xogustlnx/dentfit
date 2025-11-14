import Link from "next/link";

const pillars = [
  {
    title: "정밀 측정",
    description:
      "카메라 2장 촬영과 짧은 설문으로 손 크기 · 앞니 폭을 자동 계산해 측정 정확도를 확보합니다.",
    cta: { label: "측정 플로우 보기", href: "/measure" },
  },
  {
    title: "맞춤 추천",
    description:
      "수집된 데이터를 바탕으로 그립 지름, 헤드 폭, 모 강도를 계산해 최적의 칫솔을 제안합니다.",
    cta: { label: "추천 결과 살펴보기", href: "/recommend" },
  },
  {
    title: "사용자 피드백",
    description:
      "비슷한 측정값을 가진 사용자의 실제 리뷰와 구매 데이터를 실시간으로 반영합니다.",
    cta: { label: "리뷰 확인", href: "/reviews" },
  },
];

const highlights = [
  {
    label: "측정 → 추천 소요",
    value: "평균 02분 45초",
    description: "촬영 2회, 설문 6문항으로 빠르게 완료",
  },
  {
    label: "추천 적합도",
    value: "93%",
    description: "손 크기 · 전치 폭 기반 알고리즘",
  },
  {
    label: "사용자 만족도",
    value: "4.7 / 5",
    description: "128명 응답 기준",
  },
];

const steps = [
  {
    title: "01. 손 & 치아 측정",
    body: "손 둘레, 손가락 길이, 전치 폭을 자동 인식해 그립과 헤드 폭의 기준값을 생성합니다.",
  },
  {
    title: "02. 스펙 매칭",
    body: "데이터를 정규화해 제품 DB의 사양과 적합도를 계산한 뒤 최적 조합을 도출합니다.",
  },
  {
    title: "03. 피드백 반영",
    body: "구매·사용 후기 데이터를 주 단위로 업데이트해 추천 순위를 지속적으로 보정합니다.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-16 sm:px-10 lg:px-16">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br from-sky-50/40 via-emerald-50/40 to-rose-50/40 p-10">
        <div className="pointer-events-none absolute -left-20 top-[-120px] h-64 w-64 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-120px] right-[-60px] h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-6 lg:flex-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Dentfit
              <span className="text-slate-700">Landing</span>
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            당신에게 맞는 칫솔, 한 번에 찾기
            </h1>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              손과 치아 치수를 세밀하게 측정하고, 추천 알고리즘과 사용자 피드백을 결합해 가장 편안한 칫솔을
              찾아드립니다. 측정 → 추천 → 구매까지 Dentfit에서 모두 경험해보세요.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/measure"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                측정 단계로 이동
              </Link>
              <Link
                href="/recommend"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
              >
                추천 미리 보기
              </Link>
              <Link
                href="/reviews"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
              >
                사용자 리뷰 보기
              </Link>
            </div>
          </div>
          <div className="grid gap-4 rounded-3xl border border-slate-200/60 bg-white/80 px-6 py-6 backdrop-blur lg:max-w-sm">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
                <p className="text-xs leading-5 text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="space-y-4 rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold text-slate-900">{pillar.title}</h2>
            <p className="text-sm leading-6 text-slate-600">{pillar.description}</p>
            <Link
              href={pillar.cta.href}
              className="inline-flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {pillar.cta.label} →
            </Link>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200/60 bg-white/70 px-6 py-8 backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Process</p>
            <h2 className="text-2xl font-semibold text-slate-900">세 단계로 완성되는 Dentfit 여정</h2>
            <p className="text-sm text-slate-600">
              측정부터 추천, 구매 후 관리까지 연결된 경험을 제공합니다.
            </p>
          </div>
          <Link
            href="/measure"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            전체 프로세스 확인
          </Link>
        </div>
        <div className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{step.title}</p>
              <p className="mt-2 leading-6">{step.body}</p>
            </div>
          ))}
        </div>
      </section>


    </main>
  );
}
