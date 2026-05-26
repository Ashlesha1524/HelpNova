'use client';

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useState } from "react";

function EmbedClient({ ownerId }: { ownerId: string }) {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const embedCode = `<script 
    src="${process.env.NEXT_PUBLIC_APP_URL}/chatbot.js" 
    data-owner-id="${ownerId}">
</script>`

    const copyCode = () => {
        navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }


    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900">
            <div className="sticky top-0 z-40 bg-white border-b border-zinc-200">
                <div className="max-w-7xl mx-auto px-6 h-16 py-2 flex items-center justify-between">

                    <div
                        className="text-lg font-semibold cursor-pointer"
                        onClick={() => router.push('/')}
                    >
                        Help<span className="text-zinc-400">Nova</span>
                    </div>

                    <button
                        className="px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition"
                        onClick={() => router.push('/dashboard')}
                    >
                        Back to Dashboard
                    </button>

                </div>
            </div>

            <div className="flex justify-center px-4 py-14">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className=" w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6">

                    <h1 className="text-2xl font-semibold mb-2">Embed ChatBot</h1>
                    <p>Copy and paste this code before <code>&lt;/body&gt;</code></p>
                    <div className=" relative bg-zinc-900 text-zinc-100 p-5 rounded-xl text-sm font-mono mb-10">
                        <pre className="overflow-x-auto">{embedCode}</pre>
                        <button
                            className="absolute top-3 right-3 px-3 py-1.5 bg-white
                         text-zinc-900 text-xs font-medium rounded-lg hover:bg-zinc-200 transition"
                            onClick={copyCode}
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                    <ol className="list-decimal list-inside space-y-3 text-sm text-zinc-600">
                        <li>Copy the embed script</li>
                        <li>Paste it before</li>
                        <li>Reload your website</li>
                    </ol>

               <div className="mt-14">
    <h1 className="text-lg font-bold text-black mb-2">
        Live Preview
    </h1>

    <p className="text-sm text-zinc-600 mb-6">
        This is how the chatbot will look on your website.
    </p>

    {/* Browser Mockup */}
    <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-xl bg-white">

        {/* Browser Top Bar */}
        <div className="flex items-center gap-2 px-4 h-10 bg-zinc-100 border-b border-zinc-200">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-400"></span>

            <span className="ml-4 text-xs text-zinc-500">
                Your-website.com
            </span>
        </div>

        {/* Website Area */}
        <div className=" relative h-72 p-6 text-zinc-400 text-sm bg-white">
            Your website goes here.

            <div className="absolute bottom-24 right-6 w-64 rounded-xl shadow-xl border border-zinc-200 overflow-hidden">
                <div className="bg-black text-white text-xs px-3 py-2 flex justify-between items-center">
                    <span>Customer Support</span>
                    <span>❌</span>
                </div>
                <div className="p-3 space-y-2 bg-zinc-50">
                    <div className="bg-zinc-200 text-zinc-800 text-xs px-3 py-2 rounded-w-fit">Hello! How can I help you today?</div>
                    <div className="bg-blue-100 text-blue-800 text-xs px-3 py-2 rounded-lg ml-auto w-fit">What is the return policy?</div>

                </div>
                 
            </div>

            <motion.div
            animate={{y:[0,-8,0]}}
                transition={{repeat:Infinity, duration:3}}
                className="
                absolute bottom-6 right-6 
                w-14 h-14 rounded-full 
                bg-black text-white 
                flex items-center justify-center shadow-2xl cursor-pointer">🗨️
                
            </motion.div>
        </div>
        

    </div>
</div>


                </motion.div>

            </div>
        </div>
    );
}

export default EmbedClient;