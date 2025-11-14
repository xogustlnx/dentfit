import Link from "next/link";
import { LuRuler, LuSparkles, LuCamera, LuClipboardList } from "react-icons/lu";

export default function MeasurePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 lg:px-16">
      <section className="flex flex-col gap-10 rounded-3xl border border-slate-200/40 bg-gradient-to-br from-sky-50/40 via-emerald-50/40 to-slate-100/40 p-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="space-y-6 lg:flex-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100/80 px-4 py-1 text-xs font-semibold uppercase text-slate-500">
              <span>precision</span>
              <span>measure</span>
            </div>
            <p className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              손과 치아 데이터를 정밀하게 측정해{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-emerald-500 to-slate-600">
                최적의 맞춤값
              </span>
              을 확보
            </p>
            <p className="max-w-xl leading-7 text-slate-600">
              손 너비와 앞니 크기를 기반으로 그립 두께와 헤드 폭을 계산해 최적의 칫솔을 추천합니다. 촬영부터
              추천까지 평균 2분 45초 내에 완료되며, 모든 데이터는 암호화해 안전하게 보관합니다.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/measure/start"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-[1px] hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                <LuRuler className="h-4 w-4" aria-hidden />
                측정 시작하기
              </Link>
            </div>
          </div>
          <div className="w-full lg:max-w-sm lg:self-center">
            <div className="rounded-3xl border border-slate-200/70 bg-white/60 px-5 py-6 backdrop-blur-md flex flex-col gap-5">
              <div className="flex flex-col gap-1.5 text-sm leading-relaxed text-slate-600">
                <span className="text-sm font-semibold text-slate-900">최근 측정 요약</span>
                <span>손 둘레 185mm · 엄지 길이 62mm</span>
                <span>전치 폭 8.4mm · 구치 높이 9.1mm</span>
                <span>권장 그립 155mm · 헤드 8mm · 모 Soft+</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-slate-200 px-2.5 py-1 text-slate-600">Soft Grip</span>
                <span className="rounded-full border border-slate-200 px-2.5 py-1 text-slate-600">Slim 8mm</span>
                <span className="rounded-full border border-slate-200 px-2.5 py-1 text-slate-600">38 Cluster</span>
              </div>
              <Link
                href="/recommend"
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
              >
                전체 분석 요약 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article
          id="hand"
          className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white/60 p-6 backdrop-blur-md transition-transform hover:-translate-y-1"
        >
          <div>
            <h2 className="text-lg font-semibold text-slate-900">손 크기 측정</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 mb-4">
              스마트폰 카메라 두 장만 촬영하시면 손가락 길이, 손바닥 폭, 손목 둘레가 자동 인식됩니다. 화면을
              3초간 터치해 주시면 그립 압력 분포도 함께 기록되어 안정적인 손잡이 지름을 계산해 드립니다.
            </p>
          </div>
          <button className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900">
            <LuRuler className="h-4 w-4" aria-hidden />
            측정 가이드 열기
          </button>
        </article>
        <article
          id="teeth"
          className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white/60 p-6 backdrop-blur-md transition-transform hover:-translate-y-1"
        >
          <div>
            <h2 className="text-lg font-semibold text-slate-900">치아 크기 분석</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              하단 치열을 촬영하면 전치 간격, 구치 높이, 잇몸 라인 기울기를 자동 측정해 헤드 폭과 모 길이를
              산출합니다. 교정 장치를 착용하고 계시면 금속 영역을 자동으로 제외하고 계산합니다.
            </p>
          </div>
          <button className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/60 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300">
            <LuSparkles className="h-4 w-4" aria-hidden />
            분석 폼 작성
          </button>
        </article>
        <article className="flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white/60 p-6 backdrop-blur-md transition-transform hover:-translate-y-1">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">설문 · 추가 진단</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              하루 양치 횟수, 치실 사용 여부, 최근 치과 진료 이력 등을 확인해 추천 우선순위를 조정합니다. 설문은
              진행 상황에 맞춰 필요한 질문만 노출되어 1분 안에 완료하실 수 있습니다.
            </p>
          </div>
          <button className="mt-auto rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300">
            설문 계속하기
          </button>
        </article>
      </section>
    </main>
  );
}

