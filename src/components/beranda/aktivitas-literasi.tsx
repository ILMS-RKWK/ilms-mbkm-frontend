"use client";

import { useRef } from "react";
import { TrendingUp } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import berandaData from "@/json/beranda.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function AktivitasLiterasi() {
  const { data: weeklyData, totalHours } = berandaData.weeklyActivity;
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const chartData = {
    labels: weeklyData.map((d) => d.day),
    datasets: [
      {
        data: weeklyData.map((d) => d.hours),
        backgroundColor: weeklyData.map((d) =>
          d.hours > 2 ? "#99BD4A" : "#e2e8f0"
        ),
        borderRadius: 4,
        borderSkipped: false as const,
        barPercentage: 0.9,
        categoryPercentage: 0.9,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleFont: { size: 12, weight: "bold" as const },
        bodyFont: { size: 11 },
        padding: 8,
        cornerRadius: 8,
        callbacks: {
          label: (ctx: TooltipItem<"bar">) => `${ctx.parsed.y} jam`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: "#94a3b8",
          font: { size: 11, weight: 600 },
        },
      },
      y: {
        display: false,
        beginAtZero: true,
      },
    },
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-[#1e293b] mb-5">
        Aktivitas Literasi
      </h2>

      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        {/* Chart Area - fixed height container */}
        <div ref={chartContainerRef} style={{ position: "relative", height: "160px", width: "100%" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Total section */}
        <div className="pt-4 mt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-medium">
            Total Minggu Ini
          </p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-2xl font-extrabold text-[#1e293b]">
              {totalHours} Jam
            </span>
            <div className="flex items-center gap-1 text-[#99BD4A]">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
