import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
            <div className="flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="flex justify-center pt-10 pb-6">
                        <div className="h-16 w-16 rounded-xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center text-primary dark:text-white">
                            <span className="material-symbols-outlined !text-4xl">school</span>
                        </div>
                    </div>
                    <h1 className="text-[#111817] dark:text-white tracking-light text-3xl font-bold leading-tight text-center pb-3">
                        Hoş Geldiniz
                    </h1>
                    <p className="text-center text-gray-500 dark:text-gray-400 text-base pb-8">
                        Hesabınıza giriş yapın veya yeni bir hesap oluşturun.
                    </p>
                    <div className="flex px-4 py-3">
                        <div className="flex h-10 flex-1 items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-800 p-1">
                            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-gray-700 has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-[#111817] dark:has-[:checked]:text-white text-[#618983] dark:text-gray-400 text-sm font-medium leading-normal transition-colors">
                                <span className="truncate">Giriş Yap</span>
                                <input
                                    defaultChecked
                                    className="invisible w-0"
                                    name="auth-toggle"
                                    type="radio"
                                    value="Giriş Yap"
                                />
                            </label>
                            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-gray-700 has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-[#111817] dark:has-[:checked]:text-white text-[#618983] dark:text-gray-400 text-sm font-medium leading-normal transition-colors">
                                <span className="truncate">Üye Ol</span>
                                <input
                                    className="invisible w-0"
                                    name="auth-toggle"
                                    type="radio"
                                    value="Üye Ol"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="space-y-4 px-4 py-3">
                        <label className="flex flex-col w-full">
                            <p className="text-[#111817] dark:text-white text-base font-medium leading-normal pb-2">
                                E-posta
                            </p>
                            <div className="flex w-full items-stretch rounded-xl">
                                <input
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111817] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6e4] dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 h-14 placeholder:text-[#618983] p-[15px] text-base font-normal leading-normal transition-all"
                                    placeholder="E-posta adresinizi girin"
                                    type="email"
                                />
                            </div>
                        </label>
                        <label className="flex flex-col w-full">
                            <p className="text-[#111817] dark:text-white text-base font-medium leading-normal pb-2">
                                Şifre
                            </p>
                            <div className="flex w-full items-stretch rounded-xl">
                                <input
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-xl text-[#111817] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6e4] dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 h-14 placeholder:text-[#618983] p-[15px] pr-2 text-base font-normal leading-normal transition-all"
                                    placeholder="Şifrenizi girin"
                                    type="password"
                                />
                                <div className="text-[#618983] dark:text-gray-400 flex border border-[#dbe6e4] dark:border-gray-700 bg-white dark:bg-gray-800 items-center justify-center pr-[15px] rounded-r-xl border-l-0">
                                    <span className="material-symbols-outlined">visibility</span>
                                </div>
                            </div>
                        </label>
                        <div className="flex justify-end">
                            <Link
                                className="text-sm font-medium text-primary dark:text-primary/90 hover:underline"
                                href="#"
                            >
                                Şifremi Unuttum?
                            </Link>
                        </div>
                    </div>
                    <div className="px-4 py-3">
                        <Link href="/">
                            <button className="flex h-14 w-full items-center justify-center rounded-xl bg-primary px-6 text-base font-bold text-black shadow-sm transition-transform active:scale-[0.98]">
                                Giriş Yap
                            </button>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4 px-4 py-3">
                        <hr className="w-full border-t border-gray-300 dark:border-gray-700" />
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 shrink-0">
                            Veya
                        </p>
                        <hr className="w-full border-t border-gray-300 dark:border-gray-700" />
                    </div>
                    <div className="flex flex-col space-y-3 px-4 py-3">
                        <button className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 text-base font-medium text-[#111817] dark:text-white shadow-sm transition-transform active:scale-[0.98]">
                            <img
                                alt="Google logo"
                                className="h-6 w-6"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmR1VxhOVLZ4Sgbe20oaYaQdTiqCwAF9H_C2vHAArHMZxiu-rZxj46JWwieWpcw8h-7036yp7r2V3CZ1QfzS92IlktBqRo75uJiBkhavZWGYXnyhAdNIUn4Uwm9jB9-a_ZaxzQN5lfYuCoW9kBdpKQCTiFIGS0bdB1aEEdu-eTw0Bvn3q_Kze3jgcI6kq_BJI3cAFEWTDqc2JBRHxg13ZfRYcBRxvp3wdc3sPj-8MMV3uAnaVh9FkspnfoZLWSFRxS-iRSgLLbUt4"
                            />
                            Google ile Devam Et
                        </button>
                        <button className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-black dark:bg-white px-6 text-base font-medium text-white dark:text-black shadow-sm transition-transform active:scale-[0.98]">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.22,2.09c-1.63,0-2.88,1.05-3.69,2.1C12.72,5.3,12.08,7.1,12.08,7.1s-0.1,0.22-0.34,0.22S11.5,7.1,11.5,7.1 s-0.64-1.8-1.45-2.91C9.23,3.14,8,2.09,6.4,2.09C4.3,2.09,2,3.84,2,6.75c0,2.89,1.52,5.2,4.31,5.2c1.47,0,2.5-0.79,3.3-0.79 s1.83,0.79,3.3,0.79c2.8,0,4.31-2.3,4.31-5.2C21.52,3.84,19.22,2.09,17.22,2.09z M12.03,13.1c-1.86,0-3.32,1.2-4.27,2.83 c-0.95,1.63-1.6,3.48-1.6,5.34c0,2.2,0.92,3.64,2.59,3.64c1.55,0,2.37-0.95,3.95-0.95s2.39,0.95,3.95,0.95 c1.67,0,2.59-1.44,2.59-3.64c0-1.86-0.65-3.71-1.6-5.34C15.35,14.3,13.88,13.1,12.03,13.1z"></path>
                            </svg>
                            Apple ile Devam Et
                        </button>
                    </div>
                    <div className="px-4 py-6">
                        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                            Devam ederek,{" "}
                            <Link
                                className="font-medium text-primary dark:text-primary/90 hover:underline"
                                href="#"
                            >
                                Hizmet Şartları
                            </Link>
                            'nı ve{" "}
                            <Link
                                className="font-medium text-primary dark:text-primary/90 hover:underline"
                                href="#"
                            >
                                Gizlilik Politikası
                            </Link>
                            'nı kabul etmiş olursunuz.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
