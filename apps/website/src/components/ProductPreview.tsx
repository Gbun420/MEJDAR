"use client";

import { useState } from "react";
import { AnimateInView } from "./AnimateInView";

const tabs = [
  { id: "ordering" as const, label: "Customer ordering" },
  { id: "dashboard" as const, label: "Restaurant dashboard" },
  { id: "reservations" as const, label: "Reservations" },
  { id: "analytics" as const, label: "Analytics" },
];

type TabId = (typeof tabs)[number]["id"];

export function ProductPreview() {
  const [active, setActive] = useState<TabId>("ordering");

  return (
    <section className="bg-mejdar-offwhite py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateInView className="text-center">
          <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold tracking-tight text-mejdar-navy sm:text-4xl">
            See it in action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-mejdar-gray">
            Explore the features that help restaurants run their own direct
            ordering channel.
          </p>
        </AnimateInView>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                active === tab.id
                  ? "bg-mejdar-teal text-white shadow-sm"
                  : "bg-white text-mejdar-gray-dark hover:bg-mejdar-limestone"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Panels */}
        <div className="mt-8">
          {active === "ordering" && (
            <div
              id="panel-ordering"
              role="tabpanel"
              className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-mejdar-navy/10 bg-white shadow-lg"
            >
              <div className="flex items-center gap-2 bg-mejdar-limestone/60 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <span className="ml-2 text-xs text-mejdar-gray">harbourtable.mejdar.com/menu</span>
              </div>
              <div className="grid gap-6 p-6 sm:grid-cols-3">
                <div className="sm:col-span-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-mejdar-gray">
                    Categories
                  </h4>
                  {["Starters", "Mains", "Seafood", "Desserts", "Drinks"].map((cat) => (
                    <div key={cat} className={`mt-2 rounded-md px-3 py-2 text-sm ${cat === "Mains" ? "bg-mejdar-teal/10 font-semibold text-mejdar-teal" : "text-mejdar-gray-dark hover:bg-mejdar-limestone"}`}>
                      {cat}
                    </div>
                  ))}
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-[family-name:var(--font-dm-sans)] text-lg font-bold text-mejdar-navy">Mains</h4>
                    <div className="flex gap-2">
                      <span className="rounded-full border border-mejdar-teal/30 px-3 py-1 text-xs font-medium text-mejdar-teal">Collection</span>
                      <span className="rounded-full border border-mejdar-gray/20 px-3 py-1 text-xs text-mejdar-gray">Delivery</span>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {[
                      { name: "Rabbit Stew", desc: "Traditional Maltese rabbit braised in tomato, garlic and red wine", price: "€18.50" },
                      { name: "Lampuki Fillet", desc: "Grilled dolphinfish with capers, olives and roasted vegetables", price: "€22.00" },
                      { name: "Beef Bragioli", desc: "Beef olives stuffed with bacon, parsley and garlic in rich gravy", price: "€19.50" },
                      { name: "Chicken Polpetti", desc: "Handmade chicken meatballs with herb mash and seasonal greens", price: "€16.50" },
                    ].map((item) => (
                      <div key={item.name} className="rounded-xl border border-mejdar-navy/5 p-4 transition hover:shadow-sm">
                        <div className="h-24 rounded-lg bg-mejdar-limestone" />
                        <h5 className="mt-3 font-[family-name:var(--font-dm-sans)] text-sm font-bold text-mejdar-navy">{item.name}</h5>
                        <p className="mt-1 text-xs text-mejdar-gray line-clamp-2">{item.desc}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-bold text-mejdar-teal">{item.price}</span>
                          <button className="rounded-md bg-mejdar-teal px-3 py-1 text-xs font-semibold text-white transition hover:bg-mejdar-teal-light">Add</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === "dashboard" && (
            <div
              id="panel-dashboard"
              role="tabpanel"
              className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-mejdar-navy/10 bg-white shadow-lg"
            >
              <div className="flex items-center gap-2 bg-mejdar-limestone/60 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <span className="ml-2 text-xs text-mejdar-gray">admin.mejdar.com/dashboard</span>
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-4">
                {[
                  { label: "Today's orders", value: "68", change: "+12%" },
                  { label: "Revenue today", value: "€2,847", change: "+8%" },
                  { label: "Active reservations", value: "23", change: "" },
                  { label: "Avg. order value", value: "€41.87", change: "+5%" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-mejdar-navy/5 p-4">
                    <div className="text-xs text-mejdar-gray">{stat.label}</div>
                    <div className="mt-1 font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-mejdar-navy">{stat.value}</div>
                    {stat.change && <div className="mt-1 text-xs text-mejdar-teal">{stat.change} vs last week</div>}
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <div className="rounded-xl border border-mejdar-navy/5 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-[family-name:var(--font-dm-sans)] text-sm font-bold text-mejdar-navy">Incoming orders</h4>
                    <span className="rounded-full bg-mejdar-teal/10 px-2 py-0.5 text-xs font-semibold text-mejdar-teal">3 new</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {[
                      { id: "#1482", items: "2x Rabbit Stew, 1x Lampuki", type: "Collection", time: "2 min ago" },
                      { id: "#1481", items: "1x Fish Soup, 2x Platter", type: "Delivery", time: "8 min ago" },
                      { id: "#1480", items: "4x Beef Bragioli, 4x Wine", type: "Dine-in", time: "15 min ago" },
                    ].map((order) => (
                      <div key={order.id} className="flex items-center justify-between rounded-lg border border-mejdar-navy/5 px-3 py-2.5">
                        <div>
                          <span className="text-sm font-semibold text-mejdar-navy">{order.id}</span>
                          <span className="ml-2 text-xs text-mejdar-gray">{order.items}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="rounded-full bg-mejdar-limestone px-2 py-0.5 text-xs text-mejdar-gray-dark">{order.type}</span>
                          <span className="text-xs text-mejdar-gray">{order.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === "reservations" && (
            <div
              id="panel-reservations"
              role="tabpanel"
              className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-mejdar-navy/10 bg-white shadow-lg"
            >
              <div className="flex items-center gap-2 bg-mejdar-limestone/60 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <span className="ml-2 text-xs text-mejdar-gray">admin.mejdar.com/reservations</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-[family-name:var(--font-dm-sans)] text-lg font-bold text-mejdar-navy">Reservations — Wednesday, 30 July</h4>
                  <div className="flex gap-2">
                    <span className="rounded-md bg-mejdar-limestone px-3 py-1 text-xs font-medium text-mejdar-navy">Day</span>
                    <span className="rounded-md px-3 py-1 text-xs text-mejdar-gray hover:bg-mejdar-limestone">Week</span>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { time: "12:30", name: "Borg Party", guests: 6, table: "Table 8", status: "Confirmed", deposit: "Yes" },
                    { time: "13:00", name: "Camilleri", guests: 2, table: "Table 3", status: "Confirmed", deposit: "No" },
                    { time: "19:00", name: "Vella Group", guests: 8, table: "Table 1+2", status: "Pending", deposit: "Yes" },
                    { time: "19:30", name: "Spiteri", guests: 4, table: "Table 5", status: "Confirmed", deposit: "No" },
                    { time: "20:00", name: "Grech Family", guests: 10, table: "Terrace", status: "Waitlist", deposit: "No" },
                    { time: "20:30", name: "Zammit Couple", guests: 2, table: "Table 2", status: "Confirmed", deposit: "Yes" },
                  ].map((res, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-mejdar-navy/5 px-3 py-2.5">
                      <div className="text-center">
                        <div className="font-[family-name:var(--font-dm-sans)] text-sm font-bold text-mejdar-navy">{res.time}</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-mejdar-navy">{res.name}</div>
                        <div className="text-xs text-mejdar-gray">{res.guests} guests · {res.table}</div>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${res.status === "Confirmed" ? "bg-green-50 text-green-700" : res.status === "Pending" ? "bg-yellow-50 text-yellow-700" : "bg-mejdar-limestone text-mejdar-gray-dark"}`}>
                        {res.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {active === "analytics" && (
            <div
              id="panel-analytics"
              role="tabpanel"
              className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-mejdar-navy/10 bg-white shadow-lg"
            >
              <div className="flex items-center gap-2 bg-mejdar-limestone/60 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <span className="ml-2 text-xs text-mejdar-gray">admin.mejdar.com/reports</span>
              </div>
              <div className="p-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-mejdar-navy/5 p-4">
                    <div className="text-xs text-mejdar-gray">Weekly revenue</div>
                    <div className="mt-1 font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-mejdar-navy">€18,432</div>
                    <div className="mt-1 text-xs text-mejdar-teal">+12% vs last week</div>
                  </div>
                  <div className="rounded-xl border border-mejdar-navy/5 p-4">
                    <div className="text-xs text-mejdar-gray">Total orders</div>
                    <div className="mt-1 font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-mejdar-navy">438</div>
                    <div className="mt-1 text-xs text-mejdar-teal">+8% vs last week</div>
                  </div>
                  <div className="rounded-xl border border-mejdar-navy/5 p-4">
                    <div className="text-xs text-mejdar-gray">Repeat customers</div>
                    <div className="mt-1 font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-mejdar-navy">34%</div>
                    <div className="mt-1 text-xs text-mejdar-teal">+3% vs last week</div>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-mejdar-navy/5 p-4">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-mejdar-gray">Top items this week</h5>
                    {[
                      { name: "Rabbit Stew", orders: 87 },
                      { name: "Lampuki Fillet", orders: 72 },
                      { name: "Fish Soup", orders: 65 },
                      { name: "Maltese Platter", orders: 58 },
                      { name: "Beef Bragioli", orders: 51 },
                    ].map((item, i) => (
                      <div key={item.name} className="mt-2 flex items-center gap-3">
                        <span className="w-4 text-xs text-mejdar-gray">{i + 1}</span>
                        <span className="flex-1 text-sm text-mejdar-navy">{item.name}</span>
                        <div className="w-24 rounded-full bg-mejdar-limestone">
                          <div className="h-1.5 rounded-full bg-mejdar-teal" style={{ width: `${(item.orders / 87) * 100}%` }} />
                        </div>
                        <span className="text-xs text-mejdar-gray">{item.orders}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-mejdar-navy/5 p-4">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-mejdar-gray">Peak hours</h5>
                    <div className="mt-3 flex items-end gap-1">
                      {[
                        { h: "10", v: 15 }, { h: "11", v: 35 }, { h: "12", v: 85 }, { h: "13", v: 90 },
                        { h: "14", v: 50 }, { h: "15", v: 20 }, { h: "16", v: 15 }, { h: "17", v: 25 },
                        { h: "18", v: 55 }, { h: "19", v: 80 }, { h: "20", v: 95 }, { h: "21", v: 70 },
                        { h: "22", v: 30 },
                      ].map((bar) => (
                        <div key={bar.h} className="flex flex-1 flex-col items-center gap-1">
                          <div className="w-full rounded-t bg-mejdar-teal" style={{ height: `${bar.v * 0.5}px` }} />
                          <span className="text-[8px] text-mejdar-gray">{bar.h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
