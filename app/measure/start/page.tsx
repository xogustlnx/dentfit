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
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
      <header className="flex items-center justify-between">
        <Link
          href="/measure"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-900"
        >
          <LuChevronLeft className="h-4 w-4" aria-hidden />
          <span>돌아가기</span>
        </Link>
        <p className="text-xs text-slate-400">
          {stepIndex + 1} / {STEP_ORDER.length}
        </p>
      </header>

      <StepNavigation activeStep={activeStep} onSelect={setActiveStep} progress={progress} stepIndex={stepIndex} />

      <section>
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
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {STEP_ORDER.map((step, index) => {
          const meta = STEP_META[step];
          const isActive = step === activeStep;
          const isDone = index < stepIndex;
          const isClickable = index <= stepIndex;

          return (
            <button
              key={step}
              type="button"
              onClick={() => isClickable && onSelect(step)}
              disabled={!isClickable}
              className={`flex flex-1 items-center gap-2 rounded-lg px-3 py-2.5 text-left transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : isDone
                  ? "bg-slate-100 text-slate-700"
                  : "bg-slate-50 text-slate-400"
              } ${!isClickable ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-slate-200"}`}
            >
              <div className={`flex h-5 w-5 shrink-0 items-center justify-center text-xs ${
                isActive ? "text-white" : isDone ? "text-slate-600" : "text-slate-400"
              }`}>
                {isDone ? (
                  <LuCircleCheck className="h-4 w-4" />
                ) : (
                  <span className="font-medium">{index + 1}</span>
                )}
              </div>
              <span className="text-xs font-medium">{meta.title}</span>
            </button>
          );
        })}
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full bg-slate-900 transition-all duration-300"
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
    <div className="rounded-lg bg-slate-50 px-3 py-2.5">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-900">{value}</p>
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
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">기본 정보</h2>
        <p className="mt-1 text-sm text-slate-500">{STEP_META.basic.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">이름</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="닉네임 가능"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 transition-colors focus:border-slate-400 focus:outline-none"
              required
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-slate-700">연령대</span>
              <select
                value={ageGroup}
                onChange={(event) => setAgeGroup(event.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 transition-colors focus:border-slate-400 focus:outline-none"
                required
              >
                <option value="">선택</option>
                <option value="10">10대</option>
                <option value="20">20대</option>
                <option value="30">30대</option>
                <option value="40">40대</option>
                <option value="50">50대</option>
                <option value="60+">60대 이상</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-slate-700">하루 양치 횟수</span>
              <select
                value={brushFreq}
                onChange={(event) => setBrushFreq(event.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 transition-colors focus:border-slate-400 focus:outline-none"
                required
              >
                <option value="">선택</option>
                <option value="1">1회</option>
                <option value="2">2회</option>
                <option value="3">3회</option>
                <option value="4+">4회 이상</option>
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">성별</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "여성", label: "여성" },
                { value: "남성", label: "남성" },
                { value: "", label: "선택 안 함" },
              ].map((option) => (
                <label
                  key={option.value || "none"}
                  className={`flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    gender === option.value
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white hover:bg-slate-50"
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

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">칫솔 교체 주기</span>
            <select
              value={brushReplaceCycle}
              onChange={(event) => setBrushReplaceCycle(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 transition-colors focus:border-slate-400 focus:outline-none"
              required
            >
              <option value="">선택</option>
              <option value="1">1주</option>
              <option value="2">2주</option>
              <option value="3">3주</option>
              <option value="4">4주</option>
              <option value="6">6주</option>
              <option value="8+">8주 이상</option>
            </select>
            <p className="text-xs text-slate-400">
              권장 주기와 비교합니다
            </p>
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">생활 습관</span>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 transition-colors hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={smoking}
                  onChange={(event) => setSmoking(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-1 focus:ring-slate-400"
                />
                <span className="text-sm text-slate-700">흡연 중</span>
              </label>
              <label className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 transition-colors hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={diabetes}
                  onChange={(event) => setDiabetes(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-1 focus:ring-slate-400"
                />
                <span className="text-sm text-slate-700">당뇨 있음</span>
              </label>
            </div>
            <p className="text-xs text-slate-400">
              잇몸질환 위험도 계산에 참고
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            다음
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
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">손 크기 측정</h2>
        <p className="mt-1 text-sm text-slate-500">{STEP_META.hand.description}</p>
      </div>

      {step === "calibration" ? (
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-900">1. 화면 스케일 보정</p>
            <p className="text-sm text-slate-600">
              카드(가로 {CARD_WIDTH_MM}mm)를 모니터에 올려두고 박스 너비를 맞춰주세요.
            </p>
          </div>

          <div className="space-y-4">
            <div className="mx-auto flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50" style={{ width: `${boxWidth}px`, height: "120px" }}>
              <span className="text-sm text-slate-500">카드 맞추기</span>
            </div>

            <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-700">너비 조정</span>
                <span className="font-medium text-slate-900">{boxWidth}px</span>
              </div>
              <input
                type="range"
                min="200"
                max="500"
                value={boxWidth}
                onChange={(e) => setBoxWidth(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-slate-900"
              />
            </div>

            <button
              onClick={handleCalibrationComplete}
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              완료
            </button>
          </div>
        </div>
      ) : step === "measurement" ? (
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-900">2. 손 길이 측정</p>
            <p className="text-sm text-slate-600">
              손을 올려두고 손목과 손가락 끝을 순서대로 클릭하세요.
            </p>
          </div>

          <div className="space-y-4">
            <div
              ref={measurementAreaRef}
              onClick={handleMeasurementAreaClick}
              className="relative flex h-[360px] cursor-crosshair items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 transition-colors hover:border-slate-400"
            >
              {measurementPoints.length === 0 && (
                <p className="text-center text-sm text-slate-500">
                  손을 올려두고<br />
                  클릭 2번으로 측정
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
                    <div className="h-4 w-4 rounded-full border-2 border-slate-900 bg-white"></div>
                    <div className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-1.5 py-0.5 text-xs text-white">
                      {index === 0 ? "시작" : "끝"}
                    </div>
                  </div>
                </div>
              ))}
              {measurementPoints.length === 2 && pxPerMm && measurementAreaRef.current && (
                <svg
                  className="absolute inset-0 pointer-events-none rounded-lg"
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
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                </svg>
              )}
            </div>

            {measurementPoints.length > 0 && (
              <div className="rounded-lg bg-slate-50 px-4 py-2.5 text-sm">
                <p className="text-slate-900">
                  {measurementPoints.length === 1 ? "끝점을 클릭하세요" : "측정 완료"}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {measurementPoints.length > 0 && (
                <button
                  onClick={handleRetake}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  다시 측정
                </button>
              )}
              <button
                onClick={handleBackToCalibration}
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-50"
              >
                스케일 다시 설정
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs text-slate-500">측정 완료</p>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-sm text-slate-700">손 길이</span>
              <span className="text-xl font-semibold text-slate-900">
                {handLength ? `${handLength.toFixed(1)}mm` : "-"}
              </span>
            </div>
            {pxPerMm && (
              <div className="rounded bg-white px-3 py-2">
                <p className="text-xs text-slate-500">캘리브레이션</p>
                <p className="mt-0.5 text-sm font-medium text-slate-700">1mm ≈ {pxPerMm.toFixed(2)}px</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleRetake}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              다시 측정
            </button>
            <button
              onClick={onNext}
              className="flex-1 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              다음
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
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">치아 크기 촬영</h2>
        <p className="mt-1 text-sm text-slate-500">{STEP_META.teeth.description}</p>
      </div>

      {measurementResult ? (
        <div className="space-y-5">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
            <img src={capturedImage!} alt="촬영된 치열 사진" className="h-[240px] w-full object-cover" />
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs text-slate-500">측정 결과</p>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              <MeasurementPill label="전치 폭" value={measurementResult.frontTeethWidth} />
              <MeasurementPill label="구치 높이" value={measurementResult.molarHeight} />
              <MeasurementPill label="권장 헤드" value={measurementResult.headWidth} />
              <MeasurementPill label="잇몸 라인" value={measurementResult.gumLine} />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleRetake}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              다시 촬영
            </button>
            <button
              onClick={onNext}
              className="flex-1 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              다음
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white">
            <ol className="divide-y divide-slate-100 text-sm">
              <li className="px-4 py-3">
                <p className="font-medium text-slate-900">1. 치열 정렬</p>
                <p className="mt-1 text-xs text-slate-600">
                  입을 가볍게 벌리고 앞니와 구치가 모두 프레임에 들어오도록 촬영하세요.
                </p>
              </li>
              <li className="px-4 py-3">
                <p className="font-medium text-slate-900">2. 노출 보정</p>
                <p className="mt-1 text-xs text-slate-600">
                  자연광을 이용하고 필요 시 화면 밝기를 조절하세요.
                </p>
              </li>
              <li className="px-4 py-3">
                <p className="font-medium text-slate-900">3. 재촬영</p>
                <p className="mt-1 text-xs text-slate-600">
                  교정 장치가 가려지면 입을 더 벌려 다시 촬영하세요.
                </p>
              </li>
            </ol>
          </div>

          <div className="space-y-3">
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400">
              앞니와 구치가 모두 보이도록 촬영
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50">
                갤러리
              </button>
              <button
                onClick={() => setIsCameraOpen(true)}
                className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-800"
              >
                카메라
              </button>
            </div>
            <button
              onClick={onNext}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              건너뛰기
            </button>
          </div>
        </div>
      )}

      {isCameraOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 px-4">
          <div className="relative w-full max-w-sm rounded-lg bg-white p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-900">치열 촬영</h3>
                <button
                  onClick={() => setIsCameraOpen(false)}
                  className="rounded px-2 py-1 text-xs text-slate-500 hover:bg-slate-100"
                >
                  닫기
                </button>
              </div>
              {cameraError ? (
                <p className="rounded bg-rose-50 px-3 py-2 text-xs text-rose-600">{cameraError}</p>
              ) : null}
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-black">
                <video ref={videoRef} className="h-64 w-full bg-black object-cover" playsInline muted />
              </div>
              <button
                onClick={handleCapture}
                className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                촬영
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
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">개별 설문</h2>
        <p className="mt-1 text-sm text-slate-500">{STEP_META.survey.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">양치할 때 잇몸에서 피가 나나요?</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "자주", label: "자주" },
                { value: "가끔", label: "가끔" },
                { value: "없음", label: "없음" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    bleeding === option.value
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white hover:bg-slate-50"
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

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">찬 음식/음료에 이가 시린가요?</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "자주", label: "자주" },
                { value: "가끔", label: "가끔" },
                { value: "없음", label: "없음" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    coldSensitive === option.value
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white hover:bg-slate-50"
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

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">치아 사이(치간)가 어떤가요?</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "벌어짐", label: "벌어짐" },
                { value: "보통", label: "보통" },
                { value: "촘촘", label: "촘촘" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    teethGap === option.value
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white hover:bg-slate-50"
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
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">현재 상황</span>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 transition-colors hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={bracesActive}
                  onChange={(event) => setBracesActive(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-1 focus:ring-slate-400"
                />
                <span className="text-sm text-slate-700">교정 중</span>
              </label>
              <label className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 transition-colors hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={implantActive}
                  onChange={(event) => setImplantActive(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-1 focus:ring-slate-400"
                />
                <span className="text-sm text-slate-700">임플란트 있음</span>
              </label>
              <label className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2 transition-colors hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={gumDisease}
                  onChange={(event) => setGumDisease(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-1 focus:ring-slate-400"
                />
                <span className="text-sm text-slate-700">잇몸질환 진단받음</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Link
            href="/measure"
            className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            돌아가기
          </Link>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            제출
          </button>
        </div>
      </form>
    </section>
  );
}
