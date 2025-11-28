"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./navigation";
import { LuBell, LuUser, LuX, LuRotateCw, LuSparkles, LuCreditCard, LuCircleCheck, LuLock } from "react-icons/lu";

type Notification = {
  id: number;
  date: string;
  title: string;
  message: string;
  type: "replacement" | "reorder";
  product?: string;
  actions: {
    primary: { label: string; href?: string };
    secondary?: { label: string; href?: string };
  };
};

const mockNotifications: Notification[] = [
  {
    id: 1,
    date: "2025년 4월 1일",
    title: "칫솔 사용 90일 되었습니다. 교체 시기예요!",
    message: "일반 칫솔 권장 교체 주기는 3개월입니다.",
    type: "replacement",
    product: "일반 칫솔",
    actions: {
      primary: { label: "재구매하기", href: "/purchase" },
      secondary: { label: "다른 제품 추천받기", href: "/recommend" },
    },
  },
  {
    id: 2,
    date: "2025년 5월 15일",
    title: "치간칫솔 S 사이즈 재주문하시겠어요?",
    message: "치간칫솔 권장 교체 주기는 1.5개월입니다.",
    type: "reorder",
    product: "치간칫솔 S",
    actions: {
      primary: { label: "1개월 배송", href: "/purchase" },
      secondary: { label: "2개월 배송", href: "/purchase" },
    },
  },
];

type SubscriptionStatus = {
  toothbrush: {
    active: boolean;
    plan?: string;
    monthlyCost?: number;
    nextDelivery?: string;
  };
  community: {
    active: boolean;
  };
};

const mockSubscriptionStatus: SubscriptionStatus = {
  toothbrush: {
    active: true,
    plan: "정기배송",
    monthlyCost: 6800,
    nextDelivery: "2025년 4월 1일",
  },
  community: {
    active: true,
  },
};

export function Header() {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [unreadCount] = useState(2); // 읽지 않은 알림 개수
  const [subscriptionStatus] = useState<SubscriptionStatus>(mockSubscriptionStatus);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-base font-semibold tracking-tight text-slate-900">
              Dentfit
            </span>
            <span className="hidden text-xs uppercase tracking-[0.14em] text-slate-400 sm:inline">
              Precision Toothbrush Lab
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-medium text-slate-500 sm:flex">
            {navItems.map(({ href, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "transition-colors hover:text-slate-900",
                    isActive ? "text-slate-900" : "",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotifications(true)}
              className="relative rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label="알림"
            >
              <LuBell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>
            <button
              onClick={() => setShowSubscription(true)}
              className="relative rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label="구독"
            >
              <LuCreditCard className="h-5 w-5" />
              {(subscriptionStatus.toothbrush.active || subscriptionStatus.community.active) && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500" />
              )}
            </button>
            <button
              className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label="프로필"
            >
              <LuUser className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 알림 모달 */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-end bg-slate-900/50 p-4 pt-20 sm:p-6 sm:pt-24"
          onClick={() => setShowNotifications(false)}
        >
          <div
            className="w-full max-w-md rounded-lg border border-slate-200 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-semibold text-slate-900">알림</h2>
              <button
                onClick={() => setShowNotifications(false)}
                className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <LuX className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
              {mockNotifications.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <p className="text-sm text-slate-500">알림이 없습니다</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {mockNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 구독 상태 모달 */}
      {showSubscription && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-end bg-slate-900/50 p-4 pt-20 sm:p-6 sm:pt-24"
          onClick={() => setShowSubscription(false)}
        >
          <div
            className="w-full max-w-md rounded-lg border border-slate-200 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-semibold text-slate-900">구독 상태</h2>
              <button
                onClick={() => setShowSubscription(false)}
                className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <LuX className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-12rem)] overflow-y-auto p-5">
              <div className="space-y-4">
                {/* 칫솔 정기배송 */}
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900">칫솔 정기배송</h3>
                    {subscriptionStatus.toothbrush.active ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                        <LuCircleCheck className="h-3 w-3" />
                        구독 중
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">미구독</span>
                    )}
                  </div>
                  {subscriptionStatus.toothbrush.active ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">요금제</span>
                        <span className="font-medium text-slate-900">
                          {subscriptionStatus.toothbrush.plan}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">월 비용</span>
                        <span className="font-medium text-slate-900">
                          ₩{subscriptionStatus.toothbrush.monthlyCost?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">다음 배송</span>
                        <span className="font-medium text-slate-900">
                          {subscriptionStatus.toothbrush.nextDelivery}
                        </span>
                      </div>
                      <Link
                        href="/purchase"
                        className="mt-3 block rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        구독 관리
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href="/purchase"
                      className="mt-2 block rounded-lg bg-slate-900 px-3 py-2 text-center text-xs font-medium text-white transition-colors hover:bg-slate-800"
                    >
                      구독 시작하기
                    </Link>
                  )}
                </div>

                {/* 커뮤니티 구독 */}
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900">커뮤니티 구독</h3>
                    {subscriptionStatus.community.active ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                        <LuCircleCheck className="h-3 w-3" />
                        구독 중
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">미구독</span>
                    )}
                  </div>
                  {subscriptionStatus.community.active ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <LuCircleCheck className="h-4 w-4 text-emerald-600" />
                        <span>의사 상담 상세 답변 열람 가능</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <LuCircleCheck className="h-4 w-4 text-emerald-600" />
                        <span>전문가 맞춤 상담</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <LuLock className="h-3.5 w-3.5 text-slate-400" />
                        <span>의사 상담 상세 답변 잠금</span>
                      </div>
                      <Link
                        href="/purchase"
                        className="mt-2 block rounded-lg bg-slate-900 px-3 py-2 text-center text-xs font-medium text-white transition-colors hover:bg-slate-800"
                      >
                        구독 시작하기
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <div className="px-5 py-4">
      <div className="mb-2 flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
          {notification.type === "replacement" ? (
            <LuRotateCw className="h-4 w-4 text-slate-600" />
          ) : (
            <LuSparkles className="h-4 w-4 text-slate-600" />
          )}
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-xs text-slate-500">{notification.date}</p>
          <h3 className="text-sm font-semibold text-slate-900">{notification.title}</h3>
          {notification.message && (
            <p className="text-xs text-slate-600">{notification.message}</p>
          )}
        </div>
      </div>

      <div className="ml-11 flex gap-2">
        <Link
          href={notification.actions.primary.href || "#"}
          className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-center text-xs font-medium text-white transition-colors hover:bg-slate-800"
        >
          {notification.actions.primary.label}
        </Link>
        {notification.actions.secondary && (
          <Link
            href={notification.actions.secondary.href || "#"}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            {notification.actions.secondary.label}
          </Link>
        )}
      </div>
    </div>
  );
}

