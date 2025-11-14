"use client";

import { type FormEvent, type ReactNode, useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LuCamera,
  LuClipboardList,
  LuChevronLeft,
  LuCircleDashed,
  LuCircleCheck,
  LuInfo,
  LuSparkles,
} from "react-icons/lu";

const STEP_ORDER = ["basic", "hand", "teeth", "survey"] as const;

const STEP_META: Record<(typeof STEP_ORDER)[number], { title: string; description: string; icon: ReactNode }> = {
  basic: {
    title: "기본 정보",
    description: "이름, 나이, 성별 등 기본 정보를 입력합니다.",
    icon: <LuClipboardList className="h-4 w-4" aria-hidden />,
  },
  hand: {
    title: "손 크기 측정",
    description: "손 촬영으로 손가락 길이와 손 둘레를 인식합니다.",
    icon: <LuCamera className="h-4 w-4" aria-hidden />,
  },
  teeth: {
    title: "치아 크기 측정",
    description: "치열 촬영으로 헤드 폭과 모 길이를 계산합니다.",
    icon: <LuCamera className="h-4 w-4" aria-hidden />,
  },
  survey: {
    title: "개별 설문",
    description: "치아 관련 건강 정보를 입력해 추천을 보정합니다.",
    icon: <LuClipboardList className="h-4 w-4" aria-hidden />,
  },
};

type StepKey = (typeof STEP_ORDER)[number];

export default function MeasureStartPage() {
  const [activeStep, setActiveStep] = useState<StepKey>("basic");
  const stepIndex = STEP_ORDER.indexOf(activeStep);
  const progress = useMemo(() => {
    const totalSteps = STEP_ORDER.length as number;
    if (totalSteps <= 1) return 1;
    return stepIndex / (totalSteps - 1);
  }, [stepIndex]);

  const handleNext = () => {
    const nextStep = STEP_ORDER[stepIndex + 1];
    if (nextStep) setActiveStep(nextStep);
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-16">
      <header className="flex items-center gap-3 text-sm text-slate-500">
        <Link
          href="/measure"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-600 transition-colors hover:bg-slate-100"
        >
          <LuChevronLeft className="h-4 w-4" aria-hidden />
          측정 안내로 돌아가기
        </Link>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">네 단계 측정을 바로 진행해보세요.</span>
      </header>

      <StepNavigation activeStep={activeStep} onSelect={setActiveStep} progress={progress} stepIndex={stepIndex} />

      <section className="space-y-10">
        {activeStep === "basic" && <BasicStep onNext={handleNext} />}
        {activeStep === "hand" && <HandStep onNext={handleNext} />}
        {activeStep === "teeth" && <TeethStep onNext={handleNext} />}
        {activeStep === "survey" && <SurveyStep />}
      </section>
    </main>
  );
}

type NavProps = {
  activeStep: StepKey;
  onSelect: (step: StepKey) => void;
  progress: number;
  stepIndex: number;
};

function StepNavigation({ activeStep, onSelect, progress, stepIndex }: NavProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {STEP_ORDER.map((step, index) => {
          const meta = STEP_META[step];
          const isActive = step === activeStep;
          const isDone = index < stepIndex;

          return (
            <button
              key={step}
              type="button"
              onClick={() => onSelect(step)}
              className={`flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-500 hover:bg-slate-100"
              }`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-[11px] text-slate-600">
                {index + 1}
              </span>
              <span className="tracking-[0.2em] uppercase">{meta.title}</span>
              {isDone ? <LuCircleCheck className="h-3 w-3" /> : null}
              {isActive && !isDone ? <LuCircleDashed className="h-3 w-3" /> : null}
            </button>
          );
        })}
      </div>
      <div className="h-[3px] rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-slate-900 transition-all"
          style={{ width: `${Math.max(progress, 0) * 100}%` }}
        />
      </div>
    </div>
  );
}

type StepProps = {
  onNext: () => void;
};

type MeasurementPillProps = {
  label: string;
  value: string;
};

function MeasurementPill({ label, value }: MeasurementPillProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}

function BasicStep({ onNext }: StepProps) {
  const [name, setName] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [gender, setGender] = useState("");
  const [smoking, setSmoking] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [brushFreq, setBrushFreq] = useState("");
  const [brushReplaceCycle, setBrushReplaceCycle] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNext();
  };

  return (
    <section className="space-y-7 rounded-3xl border border-slate-200 bg-white px-7 py-9">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600">
            <LuClipboardList className="h-4 w-4" aria-hidden />
          </span>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Step 01</p>
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">기본 정보 입력</h2>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 text-sm text-slate-600">
        <div className="space-y-5  border-slate-200 bg-white ">
          <label className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold text-slate-900">이름 (닉네임 가능)</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="예: 김스마일"
              className="rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-colors focus:border-slate-400 focus:outline-none"
              required
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2.5">
              <span className="text-sm font-semibold text-slate-900">연령대</span>
              <select
                value={ageGroup}
                onChange={(event) => setAgeGroup(event.target.value)}
                className="rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-colors focus:border-slate-400 focus:outline-none"
                required
              >
                <option value="">선택하세요</option>
                <option value="10">10대</option>
                <option value="20">20대</option>
                <option value="30">30대</option>
                <option value="40">40대</option>
                <option value="50">50대</option>
                <option value="60+">60대 이상</option>
              </select>
            </label>

            <label className="flex flex-col gap-2.5">
              <span className="text-sm font-semibold text-slate-900">하루 양치 횟수</span>
              <select
                value={brushFreq}
                onChange={(event) => setBrushFreq(event.target.value)}
                className="rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-colors focus:border-slate-400 focus:outline-none"
                required
              >
                <option value="">선택하세요</option>
                <option value="1">1회</option>
                <option value="2">2회</option>
                <option value="3">3회</option>
                <option value="4+">4회 이상</option>
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold text-slate-900">성별</span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "여성", label: "여성" },
                { value: "남성", label: "남성" },
                { value: "", label: "선택 안 함" },
              ].map((option) => (
                <label
                  key={option.value || "none"}
                  className={`flex items-center justify-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                    gender === option.value
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={gender === option.value}
                    onChange={(event) => setGender(event.target.value)}
                    className="hidden"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <label className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold text-slate-900">현재 칫솔 교체 주기</span>
            <select
              value={brushReplaceCycle}
              onChange={(event) => setBrushReplaceCycle(event.target.value)}
              className="rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-colors focus:border-slate-400 focus:outline-none"
              required
            >
              <option value="">선택하세요</option>
              <option value="1">1주</option>
              <option value="2">2주</option>
              <option value="3">3주</option>
              <option value="4">4주</option>
              <option value="6">6주</option>
              <option value="8+">8주 이상</option>
            </select>
            <p className="text-xs leading-5 text-slate-500">
              지금 패턴이 실제 권장 주기와 얼마나 다른지 비교해 봅니다.
            </p>
          </label>

          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold text-slate-900">생활 습관</span>
            <div className="grid grid-cols-2 gap-2.5">
              <label className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 transition-all hover:border-slate-300 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={smoking}
                  onChange={(event) => setSmoking(event.target.checked)}
                  className="h-5 w-5 rounded border-2 border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-300"
                />
                <span className="text-sm font-medium text-slate-900">흡연 중</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 transition-all hover:border-slate-300 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={diabetes}
                  onChange={(event) => setDiabetes(event.target.checked)}
                  className="h-5 w-5 rounded border-2 border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-300"
                />
                <span className="text-sm font-medium text-slate-900">당뇨 있음</span>
              </label>
            </div>
            <p className="text-xs leading-5 text-slate-500">
              잇몸질환/치주염 위험도를 계산할 때 참고합니다.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="submit"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 sm:flex-initial"
          >
            다음 단계로 이동
          </button>
        </div>
      </form>
    </section>
  );
}

function HandStep({ onNext }: StepProps) {
  const [step, setStep] = useState<"calibration" | "measurement" | "complete">("calibration");
  const [boxWidth, setBoxWidth] = useState(333); // 초기 박스 너비 (px)
  const [pxPerMm, setPxPerMm] = useState<number | null>(null); // 1mm = ?px
  const [measurementPoints, setMeasurementPoints] = useState<{ x: number; y: number }[]>([]);
  const [handLength, setHandLength] = useState<number | null>(null);
  const measurementAreaRef = useRef<HTMLDivElement | null>(null);

  const CARD_WIDTH_MM = 85.6; // 표준 카드 가로 길이

  const handleCalibrationComplete = () => {
    const calculatedPxPerMm = boxWidth / CARD_WIDTH_MM;
    setPxPerMm(calculatedPxPerMm);
    setStep("measurement");
  };

  const handleMeasurementAreaClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (step !== "measurement") return;

    const rect = measurementAreaRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (measurementPoints.length < 2) {
      const newPoints = [...measurementPoints, { x, y }];
      setMeasurementPoints(newPoints);

      if (newPoints.length === 2 && pxPerMm) {
        // 두 점 사이의 거리 계산 (px)
        const dx = newPoints[1].x - newPoints[0].x;
        const dy = newPoints[1].y - newPoints[0].y;
        const distancePx = Math.sqrt(dx * dx + dy * dy);
        // mm로 변환
        const lengthMm = distancePx / pxPerMm;
        setHandLength(lengthMm);
        setStep("complete");
      }
    }
  };

  const handleRetake = () => {
    setMeasurementPoints([]);
    setHandLength(null);
    setStep("measurement");
  };

  const handleBackToCalibration = () => {
    setMeasurementPoints([]);
    setHandLength(null);
    setPxPerMm(null);
    setStep("calibration");
  };

  return (
    <section className="space-y-8 border border-slate-200/60 bg-white px-7 py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white text-slate-600">
            <LuCamera className="h-5 w-5" aria-hidden />
          </span>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Step 02</p>
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">손 크기 측정 (베타)</h2>
          </div>
        </div>
      </header>

      {step === "calibration" ? (
        <div className="space-y-7">
          <div className="space-y-3">
            <p className="text-base font-semibold text-slate-900">1단계. 화면 스케일 보정</p>
            <p className="text-sm leading-7 text-slate-600">
              표준 카드 가로 길이: <span className="font-semibold text-slate-900">{CARD_WIDTH_MM}mm</span>
            </p>
            <p className="text-sm leading-7 text-slate-600">
              실제 카드를 모니터에 가로로 올려두고, 아래 박스의 너비를 카드와 같게 맞춰주세요.
            </p>
          </div>

          <div className="space-y-5">
            <div className="mx-auto flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-300/80 bg-gradient-to-br from-slate-50/50 to-white transition-all" style={{ width: `${boxWidth}px`, height: "140px" }}>
              <span className="text-sm font-medium text-slate-500">카드를 맞춰주세요</span>
            </div>

            <div className="space-y-4 rounded-2xl border border-slate-200/60 bg-slate-50/30 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">박스 너비 조정</span>
                <span className="font-semibold text-slate-900">{boxWidth}px</span>
              </div>
              <input
                type="range"
                min="200"
                max="500"
                value={boxWidth}
                onChange={(e) => setBoxWidth(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-slate-900 transition-all"
                style={{
                  background: `linear-gradient(to right, #0f172a 0%, #0f172a ${((boxWidth - 200) / 300) * 100}%, #e2e8f0 ${((boxWidth - 200) / 300) * 100}%, #e2e8f0 100%)`,
                }}
              />
            </div>

            <button
              onClick={handleCalibrationComplete}
              className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:from-slate-800 hover:to-slate-700"
            >
              캘리브레이션 완료
            </button>
          </div>
        </div>
      ) : step === "measurement" ? (
        <div className="space-y-7">
          <div className="space-y-3">
            <p className="text-base font-semibold text-slate-900">2단계. 손 길이 측정</p>
            <p className="text-sm leading-7 text-slate-600">
              손을 화면에 올려두고, 아래 영역을 클릭해서 측정 시작점(손목)과 측정 끝점(손가락 끝)을 순서대로 찍어주세요.
            </p>
          </div>

          <div className="space-y-5">
            <div
              ref={measurementAreaRef}
              onClick={handleMeasurementAreaClick}
              className="relative flex h-[420px] cursor-crosshair items-center justify-center rounded-2xl border-2 border-dashed border-slate-300/80 bg-gradient-to-br from-slate-50/50 to-white transition-all hover:border-slate-400/80"
            >
              {measurementPoints.length === 0 && (
                <p className="text-center text-sm font-medium text-slate-500">
                  이 영역에 손을 올려 놓고,<br />
                  클릭 2번으로 길이를 측정합니다.
                </p>
              )}
              {measurementPoints.map((point, index) => (
                <div
                  key={index}
                  className="absolute z-10"
                  style={{
                    left: `${point.x}px`,
                    top: `${point.y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="relative">
                    <div className="h-5 w-5 rounded-full border-2 border-slate-900 bg-white shadow-md"></div>
                    <div className="absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white">
                      {index === 0 ? "시작점" : "끝점"}
                    </div>
                  </div>
                </div>
              ))}
              {measurementPoints.length === 2 && pxPerMm && measurementAreaRef.current && (
                <svg
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{ width: "100%", height: "100%" }}
                  viewBox={`0 0 ${measurementAreaRef.current.clientWidth} ${measurementAreaRef.current.clientHeight}`}
                  preserveAspectRatio="none"
                >
                  <line
                    x1={measurementPoints[0].x}
                    y1={measurementPoints[0].y}
                    x2={measurementPoints[1].x}
                    y2={measurementPoints[1].y}
                    stroke="#0f172a"
                    strokeWidth="2.5"
                    strokeDasharray="5,5"
                    opacity="0.8"
                  />
                </svg>
              )}
            </div>

            {measurementPoints.length > 0 && (
              <div className="rounded-xl border border-slate-200/80 bg-white px-5 py-4 text-sm shadow-sm">
                <p className="font-semibold text-slate-900">
                  {measurementPoints.length === 1 ? "끝점을 클릭해주세요" : "측정 완료"}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {measurementPoints.length > 0 && (
                <button
                  onClick={handleRetake}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200/80 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
                >
                  다시 측정하기
                </button>
              )}
              <button
                onClick={handleBackToCalibration}
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200/60 px-6 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300"
              >
                카드 길이 다시 설정
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/30 p-7 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">측정 완료</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                <span className="text-base font-medium text-slate-600">손 길이</span>
                <span className="text-2xl font-bold text-slate-900">
                  {handLength ? `${handLength.toFixed(1)}mm` : "-"}
                </span>
              </div>
              {pxPerMm && (
                <div className="rounded-lg bg-slate-50/50 px-4 py-2.5">
                  <p className="text-xs font-medium text-slate-500">캘리브레이션 정보</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">1mm ≈ {pxPerMm.toFixed(2)}px</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row">
            <button
              onClick={handleRetake}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200/80 px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
            >
              다시 측정하기
            </button>
            <button
              onClick={onNext}
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:from-slate-800 hover:to-slate-700"
            >
              다음 단계로 이동
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function TeethStep({ onNext }: StepProps) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [measurementResult, setMeasurementResult] = useState<
    | null
    | {
        frontTeethWidth: string;
        molarHeight: string;
        headWidth: string;
        gumLine: string;
      }
  >(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!isCameraOpen) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      return;
    }

    setCameraError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("이 기기에서 카메라를 사용할 수 없습니다.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          return videoRef.current.play();
        }
      })
      .catch(() => {
        setCameraError("카메라 접근 권한을 허용해 주세요.");
        setIsCameraOpen(false);
      });

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, [isCameraOpen]);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 720;
    canvas.height = video.videoHeight || 1280;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);
    setMeasurementResult({
      frontTeethWidth: "전치 폭 8.4mm",
      molarHeight: "구치 높이 9.1mm",
      headWidth: "권장 헤드 폭 8mm",
      gumLine: "잇몸 라인 기울기 12°",
    });
    setIsCameraOpen(false);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setMeasurementResult(null);
    setIsCameraOpen(true);
  };

  return (
    <section className="space-y-7 rounded-3xl border border-slate-200 bg-white px-7 py-9">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600">
            <LuSparkles className="h-4 w-4" aria-hidden />
          </span>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Step 03</p>
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">치아 크기 촬영</h2>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100">
          <LuInfo className="h-4 w-4" aria-hidden /> 교정 장치 착용 시 팁
        </button>
      </header>

      {measurementResult ? (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <img src={capturedImage!} alt="촬영된 치열 사진" className="h-[300px] w-full object-cover" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">summary</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">추정 측정 정보</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <MeasurementPill label="전치 폭" value={measurementResult.frontTeethWidth} />
              <MeasurementPill label="구치 높이" value={measurementResult.molarHeight} />
              <MeasurementPill label="권장 헤드" value={measurementResult.headWidth} />
              <MeasurementPill label="잇몸 라인" value={measurementResult.gumLine} />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={handleRetake}
              className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
            >
              다시 촬영하기
            </button>
            <button
              onClick={onNext}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              설문 단계로 이동
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white">
              <ol className="divide-y divide-slate-200 text-sm text-slate-600">
                <li className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">01 · 치열 정렬</p>
                    <p>
                      입을 가볍게 벌리고 스마트폰을 수평으로 맞춰 촬영하세요. 앞니와 구치가 모두 프레임 안에 들어오는지 확인합니다.
                    </p>
                  </div>
                  <span className="text-xs text-slate-400">반사 최소화</span>
                </li>
                <li className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">02 · 노출 보정</p>
                    <p>
                      자연광을 이용하면 반사로 인한 측정 오류를 줄일 수 있습니다. 필요 시 화면 밝기를 낮춰 주세요.
                    </p>
                  </div>
                  <span className="text-xs text-slate-400">자동 화이트밸런스</span>
                </li>
                <li className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">03 · 재촬영 가이드</p>
                    <p>
                      교정 장치가 가려지는 경우 입을 조금 더 벌리고 다시 촬영해주세요. 필요 시 측면 각도로 한 장 더 촬영할 수 있습니다.
                    </p>
                  </div>
                  <span className="text-xs text-slate-400">추가 촬영 1장 권장</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-600">
            <div className="flex h-[260px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400">
              앞니와 구치가 모두 프레임에 담기도록 촬영해 주세요.
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100">
                갤러리에서 선택
              </button>
              <button
                onClick={() => setIsCameraOpen(true)}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-800"
              >
                카메라 열기
              </button>
            </div>
            <button
              onClick={onNext}
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
            >
              설문 단계로 이동
            </button>
            <p className="text-[11px] leading-5 text-slate-500">
              촬영 결과는 전치 폭·구치 높이·잇몸 라인을 기준으로 자동 보정됩니다.
            </p>
          </div>
        </div>
      )}

      {isCameraOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 px-4 py-8">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">치열 촬영</h3>
                <button
                  onClick={() => setIsCameraOpen(false)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100"
                >
                  닫기
                </button>
              </div>
              {cameraError ? (
                <p className="rounded-2xl bg-rose-50 px-3 py-2 text-xs text-rose-500">{cameraError}</p>
              ) : null}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black/80">
                <video ref={videoRef} className="h-72 w-full bg-black object-cover" playsInline muted />
              </div>
              <button
                onClick={handleCapture}
                className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                촬영하기
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function SurveyStep() {
  const router = useRouter();
  const [bleeding, setBleeding] = useState("");
  const [coldSensitive, setColdSensitive] = useState("");
  const [teethGap, setTeethGap] = useState("");
  const [bracesActive, setBracesActive] = useState(false);
  const [implantActive, setImplantActive] = useState(false);
  const [gumDisease, setGumDisease] = useState(false);

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
     event.preventDefault();
     router.push("/recommend");
   };

   return (
    <section className="space-y-7 rounded-3xl border border-slate-200 bg-white px-7 py-9">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600">
            <LuClipboardList className="h-4 w-4" aria-hidden />
          </span>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Step 04</p>
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">개별 설문 (1분)</h2>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600">
          <LuInfo className="h-4 w-4" aria-hidden /> 모든 항목 입력 후 제출하세요
        </span>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 text-sm text-slate-600">
        <div className="space-y-5  border-slate-200 bg-white ">
          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold text-slate-900">양치할 때 잇몸에서 피가 나나요?</span>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { value: "자주", label: "자주 난다" },
                { value: "가끔", label: "가끔 난다" },
                { value: "없음", label: "거의 없다" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                    bleeding === option.value
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="bleeding"
                    value={option.value}
                    checked={bleeding === option.value}
                    onChange={(event) => setBleeding(event.target.value)}
                    className="hidden"
                    required
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold text-slate-900">찬 음식/음료에 이가 시린가요?</span>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { value: "자주", label: "자주 시리다" },
                { value: "가끔", label: "가끔 시리다" },
                { value: "없음", label: "거의 없다" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${
                    coldSensitive === option.value
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="coldSensitive"
                    value={option.value}
                    checked={coldSensitive === option.value}
                    onChange={(event) => setColdSensitive(event.target.value)}
                    className="hidden"
                    required
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold text-slate-900">치아 사이(치간)가 어떤가요?</span>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { value: "벌어짐", label: "치아 사이가 제법 벌어져 있다" },
                { value: "보통", label: "보통이다" },
                { value: "촘촘", label: "아주 촘촘하다" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center gap-3 rounded-xl border-2 px-3 py-3 text-sm font-medium transition-all ${
                    teethGap === option.value
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="teethGap"
                    value={option.value}
                    checked={teethGap === option.value}
                    onChange={(event) => setTeethGap(event.target.value)}
                    className="hidden"
                    required
                  />
                  <span className="text-center">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold text-slate-900">현재 상황</span>
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 transition-all hover:border-slate-300 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={bracesActive}
                  onChange={(event) => setBracesActive(event.target.checked)}
                  className="h-5 w-5 rounded border-2 border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-300"
                />
                <span className="text-sm font-medium text-slate-900">교정 중</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 transition-all hover:border-slate-300 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={implantActive}
                  onChange={(event) => setImplantActive(event.target.checked)}
                  className="h-5 w-5 rounded border-2 border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-300"
                />
                <span className="text-sm font-medium text-slate-900">임플란트 있음</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 transition-all hover:border-slate-300 hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={gumDisease}
                  onChange={(event) => setGumDisease(event.target.checked)}
                  className="h-5 w-5 rounded border-2 border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-300"
                />
                <span className="text-sm font-medium text-slate-900">치과에서 잇몸질환 진단받음</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/measure"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            준비 화면으로 돌아가기
          </Link>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            설문 제출 후 추천 보기
          </button>
        </div>
      </form>
    </section>
  );
}
