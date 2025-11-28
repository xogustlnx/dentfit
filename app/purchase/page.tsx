"use client";

import { useState } from "react";
import Link from "next/link";
import { LuChevronLeft, LuPlus, LuMinus, LuCircleCheck, LuUsers, LuUser, LuCalendar } from "react-icons/lu";

type PurchaseMode = "single" | "subscription";

type SubscriptionProduct = {
  id: string;
  name: string;
  quantity: number;
  cycle: string; // "3개월마다", "매월", "2개월마다"
  price: number;
};

type FamilyMember = {
  id: string;
  name: string;
  age: number;
  status: string;
  recommendation: string;
  nextUpdate?: string;
};

const defaultSubscription: SubscriptionProduct[] = [
  {
    id: "toothbrush",
    name: "초극세모 칫솔",
    quantity: 1,
    cycle: "3개월마다",
    price: 12000,
  },
  {
    id: "interdental",
    name: "치간칫솔 S",
    quantity: 3,
    cycle: "매월",
    price: 4500,
  },
  {
    id: "toothpaste",
    name: "치약 (추천 제품)",
    quantity: 1,
    cycle: "2개월마다",
    price: 8500,
  },
];

const mockFamilyMembers: FamilyMember[] = [
  {
    id: "daughter",
    name: "수빈",
    age: 13,
    status: "교정 중",
    recommendation: "교정용 칫솔 추천",
    nextUpdate: "6개월 후: 교정 종료 감지 → 일반 청소년용 자동 제안",
  },
  {
    id: "mother",
    name: "시어머니",
    age: 78,
    status: "임플란트",
    recommendation: "임플란트 전용 칫솔",
    nextUpdate: "3개월 후: '잇몸 상태 변화 있으신가요?' 체크 알림",
  },
];

export default function PurchasePage() {
  const [mode, setMode] = useState<PurchaseMode>("single");
  const [subscriptionProducts, setSubscriptionProducts] = useState<SubscriptionProduct[]>(defaultSubscription);
  const [deliveryDay, setDeliveryDay] = useState("1");
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [showAddFamily, setShowAddFamily] = useState(false);

  const calculateMonthlyCost = () => {
    let total = 0;
    subscriptionProducts.forEach((product) => {
      if (product.cycle === "매월") {
        total += product.price;
      } else if (product.cycle === "2개월마다") {
        total += product.price / 2;
      } else if (product.cycle === "3개월마다") {
        total += product.price / 3;
      }
    });
    return Math.round(total);
  };

  const monthlyCost = calculateMonthlyCost();
  const discount = Math.round(monthlyCost * 0.15);
  const finalCost = monthlyCost - discount;

  const updateProductQuantity = (id: string, delta: number) => {
    setSubscriptionProducts((prev) =>
      prev.map((product) => {
        if (product.id === id) {
          const newQuantity = Math.max(1, product.quantity + delta);
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );
  };

  const addFamilyMember = (member: FamilyMember) => {
    setFamilyMembers((prev) => [...prev, member]);
    setShowAddFamily(false);
  };

  const removeFamilyMember = (id: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
      {/* 헤더 */}
      <header className="flex items-center justify-between">
        <Link
          href="/recommend"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-900"
        >
          <LuChevronLeft className="h-4 w-4" aria-hidden />
          <span>돌아가기</span>
        </Link>
      </header>

      {/* 모드 선택 */}
      <div className="flex gap-2 rounded-lg border border-slate-200 bg-white p-1">
        <button
          onClick={() => setMode("single")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "single"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          개별 구매
        </button>
        <button
          onClick={() => setMode("subscription")}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "subscription"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          정기 배송
        </button>
      </div>

      {mode === "single" ? (
        <SinglePurchaseSection />
      ) : (
        <SubscriptionSection
          subscriptionProducts={subscriptionProducts}
          deliveryDay={deliveryDay}
          setDeliveryDay={setDeliveryDay}
          updateProductQuantity={updateProductQuantity}
          monthlyCost={monthlyCost}
          discount={discount}
          finalCost={finalCost}
          familyMembers={familyMembers}
          addFamilyMember={addFamilyMember}
          removeFamilyMember={removeFamilyMember}
          showAddFamily={showAddFamily}
          setShowAddFamily={setShowAddFamily}
        />
      )}
    </main>
  );
}

function SinglePurchaseSection() {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

  // 제품 정보 (실제로는 URL 파라미터나 상태에서 가져올 수 있음)
  const product = {
    name: "초극세모 칫솔",
    description: "부드러운 실리콘 그립과 초슬림 헤드 구성으로 손 크기와 앞니 폭에 맞게 정교하게 설계된 칫솔입니다.",
    price: 13900,
    image: "/tooth brush.webp",
  };

  const additionalOptions = [
    { id: "case", name: "칫솔 케이스", price: 4500 },
    { id: "stand", name: "스탠드 홀더", price: 12000 },
  ];

  const baseTotal = product.price * quantity;
  const optionsTotal = Array.from(selectedOptions).reduce((sum, id) => {
    const option = additionalOptions.find((o) => o.id === id);
    return sum + (option ? option.price : 0);
  }, 0);
  const finalTotal = baseTotal + optionsTotal;

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">개별 구매</h2>
        <p className="mt-1 text-sm text-slate-500">원하는 제품을 개별적으로 구매합니다</p>
      </div>

      {/* 제품 정보 */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex gap-4">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900">{product.name}</h3>
            <p className="mt-1 text-xs text-slate-600">{product.description}</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              ₩{product.price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* 수량 선택 */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <label className="mb-2 block text-sm font-medium text-slate-700">수량</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 transition-colors hover:bg-slate-50"
          >
            <LuMinus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center text-sm font-medium text-slate-900">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 transition-colors hover:bg-slate-50"
          >
            <LuPlus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 추가 옵션 */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">추가 옵션</h3>
        <div className="space-y-2">
          {additionalOptions.map((option) => {
            const isSelected = selectedOptions.has(option.id);
            return (
              <label
                key={option.id}
                className={`flex items-center justify-between rounded-lg border px-3 py-2.5 transition-colors ${
                  isSelected
                    ? "border-slate-900 bg-slate-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleOption(option.id)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-1 focus:ring-slate-400"
                  />
                  <span className="text-sm text-slate-700">{option.name}</span>
                </div>
                <span className="text-sm font-medium text-slate-900">
                  ₩{option.price.toLocaleString()}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 금액 요약 */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">제품 금액</span>
            <span className="font-medium text-slate-900">
              ₩{baseTotal.toLocaleString()}
            </span>
          </div>
          {optionsTotal > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">추가 옵션</span>
              <span className="font-medium text-slate-900">
                ₩{optionsTotal.toLocaleString()}
              </span>
            </div>
          )}
          <div className="border-t border-slate-200 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-900">최종 결제 금액</span>
              <span className="text-lg font-bold text-slate-900">
                ₩{finalTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 결제 버튼 */}
      <button className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
        결제하기
      </button>
    </div>
  );
}

type SubscriptionSectionProps = {
  subscriptionProducts: SubscriptionProduct[];
  deliveryDay: string;
  setDeliveryDay: (day: string) => void;
  updateProductQuantity: (id: string, delta: number) => void;
  monthlyCost: number;
  discount: number;
  finalCost: number;
  familyMembers: FamilyMember[];
  addFamilyMember: (member: FamilyMember) => void;
  removeFamilyMember: (id: string) => void;
  showAddFamily: boolean;
  setShowAddFamily: (show: boolean) => void;
};

function SubscriptionSection({
  subscriptionProducts,
  deliveryDay,
  setDeliveryDay,
  updateProductQuantity,
  monthlyCost,
  discount,
  finalCost,
  familyMembers,
  addFamilyMember,
  removeFamilyMember,
  showAddFamily,
  setShowAddFamily,
}: SubscriptionSectionProps) {
  return (
    <div className="space-y-6">
      {/* 정기배송 설정 */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">내 정기배송</h2>
          <p className="mt-1 text-sm text-slate-500">배송 주기와 제품을 설정하세요</p>
        </div>

        {/* 배송 주기 */}
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <LuCalendar className="h-4 w-4" />
            배송 주기
          </label>
          <select
            value={deliveryDay}
            onChange={(e) => setDeliveryDay(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
          >
            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day.toString()}>
                매월 {day}일
              </option>
            ))}
          </select>
        </div>

        {/* 포함 제품 */}
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">포함 제품</h3>
          <div className="space-y-3">
            {subscriptionProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-900">{product.name}</span>
                    <span className="text-xs text-slate-500">×{product.quantity}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">{product.cycle}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateProductQuantity(product.id, -1)}
                    className="rounded-lg border border-slate-200 bg-white p-1 text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    <LuMinus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-slate-900">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => updateProductQuantity(product.id, 1)}
                    className="rounded-lg border border-slate-200 bg-white p-1 text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    <LuPlus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 비용 요약 */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">월 평균 비용</span>
              <span className="font-medium text-slate-900">₩{monthlyCost.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">정기배송 할인</span>
              <span className="font-medium text-emerald-600">-15% (₩{discount.toLocaleString()} 절약)</span>
            </div>
            <div className="border-t border-slate-200 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900">최종 월 비용</span>
                <span className="text-lg font-bold text-slate-900">₩{finalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 혜택 */}
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">혜택</h3>
          <div className="space-y-2">
            {[
              "15% 할인 (개별 구매 대비)",
              "배송비 무료",
              "언제든 변경/취소 가능",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-slate-700">
                <LuCircleCheck className="h-4 w-4 shrink-0 text-slate-600" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 가족 관리 */}
      <FamilyManagementSection
        familyMembers={familyMembers}
        addFamilyMember={addFamilyMember}
        removeFamilyMember={removeFamilyMember}
        showAddFamily={showAddFamily}
        setShowAddFamily={setShowAddFamily}
      />
    </div>
  );
}

type FamilyManagementSectionProps = {
  familyMembers: FamilyMember[];
  addFamilyMember: (member: FamilyMember) => void;
  removeFamilyMember: (id: string) => void;
  showAddFamily: boolean;
  setShowAddFamily: (show: boolean) => void;
};

function FamilyManagementSection({
  familyMembers,
  addFamilyMember,
  removeFamilyMember,
  showAddFamily,
  setShowAddFamily,
}: FamilyManagementSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">생애주기 자동 관리</h2>
          <p className="mt-1 text-sm text-slate-500">가족 구성원 추가 시 맞춤 관리</p>
        </div>
        {!showAddFamily && (
          <button
            onClick={() => setShowAddFamily(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <LuPlus className="h-4 w-4" />
            <span>가족 추가</span>
          </button>
        )}
      </div>

      {/* 가족 구성원 목록 */}
      {familyMembers.length === 0 && !showAddFamily ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
          <LuUsers className="mx-auto h-8 w-8 text-slate-400" />
          <p className="mt-3 text-sm text-slate-600">가족 구성원이 없습니다</p>
          <p className="mt-1 text-xs text-slate-500">가족을 추가하면 맞춤 관리가 가능합니다</p>
        </div>
      ) : (
        <div className="space-y-3">
          {familyMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <LuUser className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-semibold text-slate-900">{member.name}</span>
                    <span className="text-xs text-slate-500">({member.age}세)</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-slate-600">
                      <span className="font-medium">현재:</span> {member.status} - {member.recommendation}
                    </p>
                    {member.nextUpdate && (
                      <p className="text-xs text-slate-500">{member.nextUpdate}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeFamilyMember(member.id)}
                  className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
                >
                  <LuMinus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 가족 추가 폼 */}
      {showAddFamily && (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">가족 구성원 추가</h3>
          <div className="space-y-3">
            {mockFamilyMembers
              .filter((m) => !familyMembers.some((fm) => fm.id === m.id))
              .map((member) => (
                <button
                  key={member.id}
                  onClick={() => addFamilyMember(member)}
                  className="w-full rounded-lg border border-slate-200 bg-white p-3 text-left transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {member.name} ({member.age}세)
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">{member.recommendation}</p>
                    </div>
                    <LuPlus className="h-4 w-4 text-slate-400" />
                  </div>
                </button>
              ))}
            <button
              onClick={() => setShowAddFamily(false)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* 안내 */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs text-slate-600">
          <span className="font-medium">기본:</span> 본인 1명 관리
        </p>
        <p className="mt-1 text-xs text-slate-600">
          <span className="font-medium">선택:</span> 가족 추가 (최대 5명)
        </p>
      </div>

      {/* 결제 버튼 */}
      <div className="pt-4">
        <button className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
          정기배송 시작하기
        </button>
      </div>
    </div>
  );
}
