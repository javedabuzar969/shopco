import { Link } from "react-router";
import { useState } from "react";

const links = {
  Company: ["About", "Features", "Works", "Career"],
  Help: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"],
  FAQ: ["Account", "Manage Deliveries", "Orders", "Payments"],
  Resources: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="border-t border-gray-200">
      {/* Newsletter */}
      <div className="bg-black mx-4 sm:mx-8 lg:mx-16 rounded-3xl px-8 sm:px-14 py-12 flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
        <h2
          className="text-white font-black text-2xl sm:text-4xl uppercase leading-tight max-w-[480px] tracking-tight text-center lg:text-left"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Stay Upto Date About Our Latest Offers
        </h2>
        <div className="flex flex-col gap-3 w-full max-w-[380px]">
          <div className="flex items-center bg-white rounded-full px-5 py-3 gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-transparent outline-none text-sm flex-1 text-gray-800 placeholder:text-gray-400"
            />
          </div>
          <button className="bg-white text-black rounded-full px-6 py-3 text-sm font-bold hover:bg-gray-100 transition-colors">
            Subscribe to Newsletter
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-4 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-10">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              SHOP.CO
            </span>
            <p className="text-gray-500 text-sm leading-relaxed">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex gap-2 mt-1">
              {(["twitter", "fb", "ig", "gh"] as const).map(s => (
                <button key={s} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {s === "twitter" && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />}
                    {s === "fb" && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
                    {s === "ig" && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>}
                    {s === "gh" && <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />}
                  </svg>
                </button>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([section, items]) => (
            <div key={section} className="flex flex-col gap-4">
              <span className="font-bold text-xs tracking-widest uppercase text-gray-400">{section}</span>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item}>
                    <Link to="#" className="text-sm text-gray-700 hover:text-black transition-colors">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">Shop.co © 2000-2024, All Rights Reserved</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {["VISA", "Mastercard", "PayPal", "Apple Pay", "Google Pay"].map(p => (
              <div key={p} className="border border-gray-200 rounded-md px-2.5 py-1 text-[10px] font-bold text-gray-500 bg-white">
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
