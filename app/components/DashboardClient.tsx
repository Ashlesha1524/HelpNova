'use client'
import React, { useEffect, useState } from "react";
import { AnimatePresence, Feature, motion } from "motion/react";
import { useRouter } from "next/navigation";
import axios from "axios";

function DashboardClient({ ownerId }: { ownerId: string }) {
    const navigate = useRouter()
    const [businessName, setBusinessName] = useState("")
    const [supportEmail, setSupportEmail] = useState("")
    const [knowledge, setKnowledge] = useState("")
    const [loading, setLoading] = useState(false)
    const [saved, setSaved] = useState(false)

    const handleSettings = async () => {
        setLoading(true)
        try {
            const result = await axios.post("/api/auth/settings", {
                ownerId,
                businessName,
                supportEmail,
                knowledge
            })
            console.log(result)
            setLoading(false)
            setSaved(true)
            setTimeout(() => {
                setSaved(false)
            }, 3000)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
useEffect(() => {
    if (ownerId) {
        const handleGetDetails = async () => {
            try {
                const result = await axios.post(
                    "/api/auth/settings/get",
                    { ownerId }
                );

                setBusinessName(result.data.setting?.businessName || "");
                setSupportEmail(result.data.setting?.supportEmail || "");
                setKnowledge(result.data.setting?.knowledge || "");

            } catch (error) {
                console.log(error);
            }
        };

        handleGetDetails();
    }
}, [ownerId]);
        return (
            <div className="min-h-screen bg-zinc-50 text-zinc-900">
                <motion.div
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200"
                >
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                        <div className="text-lg font-semibold tracking-tight" onClick={() => navigate.push("/")}>
                            Help<span className="text-zinc-400">Nova</span>
                        </div>
                        <button className="px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition" 
                        onClick={() => navigate.push("/embed")}>
                            Embed ChatBot
                        </button>

                    </div>
                </motion.div>

                <div className="flex justify-center px-4 py-14 mt-20">
                    <motion.div
                        className="w-full max-w-3xl bg-white rounded-2xl shadow-md border border-zinc-200 p-10"
                    >
                        <div className="mb-10">
                            <h1 className='text-2xl font-semibold'>ChatBot Settings</h1>
                            <p className='text-zinc-500 mt-1'> Manage your ChatBot configuration and preferences.</p>

                        </div>
                        <div className="mb-10">
                            <h1 className='text-lg font-medium mb-4'>Business Details</h1>
                            <div className='space-y-4'>
                                <input type="text" className=" w-full border border-zinc-500 rounded-xl px-4 py-3 text-semibold focus:outline-none 
                    focus:ring-2 focus:ring-black/80" placeholder="Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                                <input type="text" className=" w-full border border-zinc-500 rounded-xl px-4 py-3 text-semibold
                    focus:outline-none focus:ring-2 focus:ring-black/80" placeholder="Support Email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
                            </div>

                        </div>

                        <div className="mb-10">
                            <h1 className="text-lg font-medium mb-1">Knowledge Base</h1>
                            <p className="text-zinc-500 text-sm mb-2">Add FAQ, Policies, Delivery information, Refunds, etc</p>
                            <div className="space-y-4">
                                <textarea className="w-full h-44 border border-zinc-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                                    placeholder={`Example

• Refund policy: 7 days return available
• Delivery time: 3-5 business days
• Cash on Delivery available
• Support hours`} value={knowledge} onChange={(e) => setKnowledge(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='flex items-center justify-end gap-4'>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleSettings}
                                disabled={loading}
                                className="px-7 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-zinc-800
                            transition disabled:opacity-60">
                                {loading ? "Saving..." : "Save"}

                            </motion.button>
                            {saved && <motion.span
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-green-500 text-sm font-medium">
                                Settings Saved!
                            </motion.span>}

                        </div>


                    </motion.div>

                </div>


            </div>
        )
    }
    export default DashboardClient