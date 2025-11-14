export default function ReviewsPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-16">
      <section className="rounded-3xl border border-slate-200 bg-white px-8 py-12 text-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">reviews</p>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">리뷰 섹션 준비 중</h1>
          <p className="text-sm leading-6 text-slate-600">
            비슷한 데이터를 가진 사용자들의 생생한 후기와 유지 관리 팁을 곧 확인할 수 있습니다. 현재 컴포넌트를 정교하게 설계하고 있으니 잠시만 기다려 주세요.
          </p>
        </div>
        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-xs font-medium text-slate-500">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
          구현 진행 중 · 업데이트 예정
        </div>
      </section>
    </main>
  );
}
