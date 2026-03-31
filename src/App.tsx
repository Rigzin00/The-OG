import { Navbar } from './Navbar';


function App() {
  return (
    <div className="bg-white">
      <div className="min-h-screen bg-zinc-50 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-400"></div>
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-400"></div>

        <Navbar />

        <div className="relative z-10">

        <main className="flex items-center min-h-[calc(100vh-120px)] px-8 gap-12">
          <div className="flex-1 max-w-2xl">
            <div className="w-10 h-10 bg-white rounded-full shadow-sm mb-8"></div>

            <h1 className="text-7xl font-bold leading-none tracking-tight mb-8">
              <span className="text-gray-400 block">Design that</span>
              <span className="text-black block">delivers results.</span>
            </h1>

            <p className="text-xl leading-relaxed max-w-2xl mb-10">
              <span className="text-black font-medium">Strategic design that drives growth, not just looks good.</span>
              <span className="text-gray-500"> I create everything your brand needs to attract customers and turn them into sales.</span>
            </p>

            <button
              className="bg-black text-white rounded-full px-6 py-3 flex items-center gap-3 font-semibold text-sm hover:bg-gray-900 transition-colors"
              style={{
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-pink-500"></div>
              Book a call with me
            </button>
          </div>

          <div className="flex-1 relative min-h-[600px] perspective">
            <div className="absolute inset-0 w-full h-full">
              <div
                className="absolute w-[500px] h-[320px] bg-white rounded-2xl p-6 shadow-2xl border border-white/10 left-0 top-16"
                style={{
                  transform: 'rotate(-6deg)',
                  zIndex: 0
                }}
              >
                <div className="h-full flex flex-col gap-3">
                  <div className="h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="text-gray-700 text-sm font-semibold">Your Brand Showcase</div>
                </div>
              </div>

              <div
                className="absolute w-[500px] h-[320px] bg-slate-900 rounded-2xl p-6 shadow-2xl border border-white/10 right-0 top-32"
                style={{
                  transform: 'rotate(12deg)',
                  zIndex: 10
                }}
              >
                <div className="h-full flex flex-col gap-3">
                  <div className="h-24 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-slate-700 rounded w-4/5"></div>
                    <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                    <div className="h-3 bg-slate-700 rounded w-3/4"></div>
                  </div>
                  <div className="text-slate-400 text-xs font-semibold">Dark Theme</div>
                </div>
              </div>

              <div
                className="absolute w-[500px] h-[320px] bg-slate-900 rounded-2xl p-6 shadow-2xl border border-white/10 left-1/2 top-24"
                style={{
                  transform: 'translateX(-50%) rotate(3deg)',
                  zIndex: 20,
                  boxShadow: '0 50px 100px rgba(0, 0, 0, 0.8), 0 25px 50px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="h-full flex flex-col gap-3">
                  <div className="h-20 bg-gradient-to-br from-slate-800 to-black rounded-xl flex items-center justify-center px-4">
                    <div className="text-lime-400 text-sm font-bold text-center leading-tight">SCALE YOUR OPERATIONS</div>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="text-lime-400 font-bold text-base">[10X]</div>
                    <div className="h-3 bg-slate-700 rounded w-4/5"></div>
                    <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                  </div>
                  <div className="text-lime-400 text-xs font-semibold">Premium Design System</div>
                </div>
              </div>

              <div
                className="absolute w-[500px] h-[320px] bg-slate-900 rounded-2xl p-6 shadow-2xl border border-white/10 right-8 bottom-8"
                style={{
                  transform: 'rotate(15deg)',
                  zIndex: 10
                }}
              >
                <div className="h-full flex flex-col gap-3">
                  <div className="h-24 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-slate-700 rounded w-4/5"></div>
                    <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                    <div className="h-3 bg-slate-700 rounded w-3/4"></div>
                  </div>
                  <button className="w-full bg-white text-slate-900 rounded-lg py-2 text-sm font-bold hover:bg-gray-100 transition-colors">
                    LaunchNow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      </div>

      
    </div>
  );
}

export default App;