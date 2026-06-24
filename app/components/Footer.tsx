"use client";

import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-purple-400">
                <Sparkles className="h-4 w-4 text-[var(--surface)]" />
              </div>
              <span className="font-display text-lg font-bold text-[var(--text-primary)]">
                Tâm Linh <span className="text-[var(--accent)]">Việt</span>
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Khám phá chiêm tinh học, tử vi và các công cụ tâm linh hiện đại giúp bạn hiểu rõ hơn về bản thân và vận mệnh.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3 tracking-wide uppercase">
              Tử vi & Bói toán
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><a href="/tu-vi/" className="hover:text-[var(--accent)] transition-colors">Lập lá số Tử Vi</a></li>
              <li><a href="/que/kinh-dich/" className="hover:text-[var(--accent)] transition-colors">Gieo Quẻ Kinh Dịch</a></li>
              <li><a href="/numerology/" className="hover:text-[var(--accent)] transition-colors">Thần Số Học</a></li>
              <li><a href="/tarot/" className="hover:text-[var(--accent)] transition-colors">Tarot</a></li>
              <li><a href="/zodiac/" className="hover:text-[var(--accent)] transition-colors">Cung Hoàng Đạo</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3 tracking-wide uppercase">
              Lịch & Phong thủy
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><a href="/calendar/" className="hover:text-[var(--accent)] transition-colors">Lịch Vạn Niên</a></li>
              <li><a href="/ngay/tot-xau/" className="hover:text-[var(--accent)] transition-colors">Xem Ngày Tốt</a></li>
              <li><a href="/phong-thuy/huong-nha/" className="hover:text-[var(--accent)] transition-colors">Xem Hướng Nhà</a></li>
              <li><a href="/phong-thuy/thuoc-lo-ban/" className="hover:text-[var(--accent)] transition-colors">Thước Lỗ Ban</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3 tracking-wide uppercase">
              Xem tuổi
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><a href="/tuoi/vo-chong/" className="hover:text-[var(--accent)] transition-colors">Tuổi Vợ Chồng</a></li>
              <li><a href="/tuoi/xong-dat/" className="hover:text-[var(--accent)] transition-colors">Tuổi Xông Đất</a></li>
              <li><a href="/tuoi/lam-nha/" className="hover:text-[var(--accent)] transition-colors">Tuổi Làm Nhà</a></li>
              <li><a href="/sim/" className="hover:text-[var(--accent)] transition-colors">Sim Phong Thủy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3 tracking-wide uppercase">
              Tâm linh
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><a href="/quiz/" className="hover:text-[var(--accent)] transition-colors">Quiz Tâm Linh</a></li>
              <li><a href="/dream/" className="hover:text-[var(--accent)] transition-colors">Giải Mã Giấc Mơ</a></li>
              <li><a href="/meditation/" className="hover:text-[var(--accent)] transition-colors">Thiền & Chữa Lành</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Tâm Linh Việt. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
            Được xây dựng với <Heart className="h-3 w-3 text-[var(--accent)]" /> và ánh trăng
          </p>
        </div>
      </div>
    </footer>
  );
}
